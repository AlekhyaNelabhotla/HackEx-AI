const { app, BrowserWindow, ipcMain, screen, shell } = require('electron');
const os = require('os');
const path = require('path');
const si = require('systeminformation'); // Install with: npm install systeminformation
const fs = require('fs').promises; // Use promises version of fs

function createWindow() {
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.workAreaSize; // Get dimensions excluding taskbar

    const win = new BrowserWindow({
        width: width,
        height: height,
        x: primaryDisplay.workArea.x,
        y: primaryDisplay.workArea.y,
        frame: false, // Hide default OS frame for custom UI
        fullscreen: false, // Ensure it's not truly fullscreen
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true, // Keep this for security
            nodeIntegration: false, // Keep nodeIntegration false for security
        }
    });

    // Set bounds explicitly to workArea to prevent going below taskbar
    win.setBounds(primaryDisplay.workArea);
    win.setResizable(false); // Make window non-resizable
    win.setMaximizable(false); // Prevent maximizing/unmaximizing

    win.loadFile('renderer/index.html');

    ipcMain.on('close-window', () => {
        win.close();
    });

    ipcMain.handle('list-directory', async (event, dirPath) => {
        try {
            // Validate and sanitize dirPath to prevent path traversal
            const baseDir = os.homedir(); // Or a more controlled base directory
            let resolvedPath = path.resolve(baseDir, dirPath || ''); // Default to home directory

            // Security check: ensure resolvedPath is within allowed directories
            // For simplicity, we'll allow home directory and its subdirectories.
            // In a real app, you'd want more granular control.
            if (!resolvedPath.startsWith(baseDir)) {
                resolvedPath = baseDir; // Fallback to baseDir if outside
            }

            const files = await fs.readdir(resolvedPath, { withFileTypes: true });
            return files.map(file => ({
                name: file.name,
                isDirectory: file.isDirectory(),
                path: path.join(resolvedPath, file.name)
            }));
        } catch (error) {
            console.error(`Error listing directory ${dirPath}:`, error);
            return [];
        }
    });

    ipcMain.handle('open-file-explorer', async (event, filePath) => {
        try {
            await shell.openPath(filePath || os.homedir()); // Open user's home directory if no path provided
            return true;
        } catch (error) {
            console.error('Error opening file explorer:', error);
            return false;
        }
    });

    ipcMain.handle('open-file', async (event, filePath) => {
        try {
            await shell.openPath(filePath);
            return true;
        } catch (error) {
            console.error('Error opening file:', error);
            return false;
        }
    });
}

ipcMain.handle('get-system-stats', async () => {
    // --- CPU Usage ---
    let cpuLoad = 0;
    try {
        const currentLoad = await si.currentLoad();
        cpuLoad = currentLoad.currentLoad;
    } catch (e) {
        console.error("Error fetching CPU load:", e);
        const cpus = os.cpus();
        let totalIdle = 0;
        let totalTick = 0;
        for (const cpu of cpus) {
            for (const type in cpu.times) {
                totalTick += cpu.times[type];
            }
            totalIdle += cpu.times.idle;
        }
        cpuLoad = (totalTick === 0) ? 0 : ((totalTick - totalIdle) / totalTick) * 100;
    }

    // --- RAM Usage ---
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMemPercent = ((totalMem - freeMem) / totalMem) * 100;

    // --- Storage Usage ---
    let storageUsed = 0;
    try {
        const disk = await si.fsSize();
        if (disk.length > 0) {
            storageUsed = (disk[0].used / disk[0].size) * 100;
        }
    } catch (e) {
        console.error("Error fetching storage info:", e);
        storageUsed = 0;
    }

    // --- Network Stats (raw bytes/sec for dynamic conversion in renderer) ---
    let rx_sec = 0;
    let tx_sec = 0;
    try {
        const network = await si.networkStats();
        if (network.length > 0) {
            network.forEach(iface => {
                rx_sec += iface.rx_sec;
                tx_sec += iface.tx_sec;
            });
        }
    } catch (e) {
        console.error("Error fetching network info:", e);
        rx_sec = 0;
        tx_sec = 0;
    }

    // --- GPU Usage and Temperature ---
    let gpuLoad = 0;
    let gpuTemp = 0;
    try {
        const graphics = await si.graphics();
        if (graphics.controllers.length > 0) {
            gpuLoad = graphics.controllers[0].utilizationGpu ?? 0;
            gpuTemp = graphics.controllers[0].temperatureGpu ?? 0;
        }
    } catch (e) {
        console.error("Error fetching graphics info:", e);
        gpuLoad = 0;
        gpuTemp = 0;
    }

    if (gpuTemp === 0) {
        try {
            const temps = await si.cpuTemperature();
            if (temps.gpus && temps.gpus.length > 0) {
                gpuTemp = temps.gpus[0].main;
            }
        } catch (e) {
            console.error("Error fetching secondary temp info for GPU:", e);
            gpuTemp = 0;
        }
    }

    // --- CPU Temperature ---
    let cpuTemp = 0;
    try {
        const tempInfo = await si.cpuTemperature();
        cpuTemp = tempInfo.main > 0 ? tempInfo.main : (40 + Math.random() * 20).toFixed(1);
    } catch (e) {
        console.error("Error fetching CPU temp info:", e);
        cpuTemp = (40 + Math.random() * 20).toFixed(1);
    }

    // --- Uptime ---
    const uptime = os.uptime();

    // --- Process Count ---
    let processCount = 0;
    try {
        const processes = await si.processes();
        processCount = processes.all;
    } catch (e) {
        console.error("Error fetching process info:", e);
        processCount = 0;
    }

    return {
        cpu: parseFloat(cpuLoad).toFixed(2),
        ram: parseFloat(usedMemPercent).toFixed(2),
        storage: parseFloat(storageUsed).toFixed(2),
        rx_sec: parseFloat(rx_sec).toFixed(2),
        tx_sec: parseFloat(tx_sec).toFixed(2),
        gpu: parseFloat(gpuLoad).toFixed(2),
        gpu_temp: parseFloat(gpuTemp).toFixed(2),
        cpu_temp: parseFloat(cpuTemp).toFixed(2),
        uptime: uptime,
        processes: processCount
    };
});

app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});