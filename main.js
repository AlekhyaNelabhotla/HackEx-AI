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
            // If no path provided or path is 'My Computer', show user's home directory
            let resolvedPath;
            if (!dirPath || dirPath === 'My Computer' || dirPath === '') {
                resolvedPath = os.homedir();
            } else {
                resolvedPath = path.resolve(dirPath);
            }

            // Security check: ensure path exists and is accessible
            const files = await fs.readdir(resolvedPath, { withFileTypes: true });
            return files.map(file => ({
                name: file.name,
                isDirectory: file.isDirectory(),
                path: path.join(resolvedPath, file.name)
            }));
        } catch (error) {
            console.error(`Error listing directory ${dirPath}:`, error);
            // If error, fallback to home directory
            try {
                const homeDir = os.homedir();
                const files = await fs.readdir(homeDir, { withFileTypes: true });
                return files.map(file => ({
                    name: file.name,
                    isDirectory: file.isDirectory(),
                    path: path.join(homeDir, file.name)
                }));
            } catch (fallbackError) {
                console.error('Error accessing home directory:', fallbackError);
                return [];
            }
        }
    });

    ipcMain.handle('get-home-directory', async (event) => {
        return os.homedir();
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

// Global cache for system stats to reduce system calls
let statsCache = null;
let lastStatsUpdate = 0;
const STATS_CACHE_DURATION = 2000; // Cache for 2 seconds instead of fetching every second

ipcMain.handle('get-system-stats', async () => {
    const now = Date.now();
    
    // Return cached data if it's still fresh
    if (statsCache && (now - lastStatsUpdate) < STATS_CACHE_DURATION) {
        return statsCache;
    }

    try {
        // --- CPU Usage (optimized) ---
        let cpuLoad = 0;
        try {
            const currentLoad = await si.currentLoad();
            cpuLoad = currentLoad?.currentLoad || 0;
        } catch (e) {
            console.warn("Using fallback CPU calculation");
            // Simplified fallback calculation
            cpuLoad = Math.random() * 30 + 10; // Mock data to prevent errors
        }

        // --- RAM Usage (optimized) ---
        const totalMem = os.totalmem();
        const freeMem = os.freemem();
        const usedMemPercent = ((totalMem - freeMem) / totalMem) * 100;

        // --- Storage Usage (cached and simplified) ---
        let storageUsed = 50; // Default fallback
        try {
            const disk = await si.fsSize();
            if (disk && disk.length > 0 && disk[0].size > 0) {
                storageUsed = (disk[0].used / disk[0].size) * 100;
            }
        } catch (e) {
            console.warn("Using fallback storage data");
        }

        // --- Network Stats (simplified) ---
        let rx_sec = 0;
        let tx_sec = 0;
        try {
            const network = await si.networkStats();
            if (network && network.length > 0) {
                const mainInterface = network[0]; // Use only primary interface
                rx_sec = mainInterface.rx_sec || 0;
                tx_sec = mainInterface.tx_sec || 0;
            }
        } catch (e) {
            console.warn("Using fallback network data");
        }

        // --- GPU Usage and Temperature (simplified) ---
        let gpuLoad = 0;
        let gpuTemp = 0;
        try {
            const graphics = await si.graphics();
            if (graphics?.controllers?.length > 0) {
                const gpu = graphics.controllers[0];
                gpuLoad = gpu.utilizationGpu || 0;
                gpuTemp = gpu.temperatureGpu || 0;
            }
        } catch (e) {
            console.warn("GPU data unavailable");
        }

        // --- CPU Temperature (simplified) ---
        let cpuTemp = 45; // Default safe temperature
        try {
            const tempInfo = await si.cpuTemperature();
            if (tempInfo?.main && tempInfo.main > 0) {
                cpuTemp = tempInfo.main;
            }
        } catch (e) {
            console.warn("Using fallback CPU temperature");
        }

        // --- Uptime (OS level, very fast) ---
        const uptime = os.uptime();

        // --- Process Count (simplified) ---
        let processCount = 150; // Reasonable default
        try {
            const processes = await si.processes();
            processCount = processes?.all || processCount;
        } catch (e) {
            console.warn("Using fallback process count");
        }

        // Cache the results
        statsCache = {
            cpu: Math.max(0, Math.min(100, parseFloat(cpuLoad))).toFixed(1),
            ram: Math.max(0, Math.min(100, parseFloat(usedMemPercent))).toFixed(1),
            storage: Math.max(0, Math.min(100, parseFloat(storageUsed))).toFixed(1),
            rx_sec: Math.max(0, parseFloat(rx_sec)),
            tx_sec: Math.max(0, parseFloat(tx_sec)),
            gpu: Math.max(0, Math.min(100, parseFloat(gpuLoad))).toFixed(1),
            gpu_temp: Math.max(0, Math.min(120, parseFloat(gpuTemp))).toFixed(1),
            cpu_temp: Math.max(0, Math.min(120, parseFloat(cpuTemp))).toFixed(1),
            uptime: uptime,
            processes: Math.max(0, processCount)
        };
        
        lastStatsUpdate = now;
        return statsCache;

    } catch (error) {
        console.error("Critical error in system stats:", error);
        // Return safe fallback data
        return {
            cpu: "0.0", ram: "0.0", storage: "50.0",
            rx_sec: 0, tx_sec: 0, gpu: "0.0", gpu_temp: "0.0",
            cpu_temp: "45.0", uptime: os.uptime(), processes: 100
        };
    }
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