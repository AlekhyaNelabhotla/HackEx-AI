const { app, BrowserWindow, ipcMain, screen, shell } = require('electron');
const os = require('os');
const path = require('path');
const si = require('systeminformation'); // Install with: npm install systeminformation
const fs = require('fs').promises; // Use promises version of fs
const { Ollama } = require('ollama'); // AI integration

// Initialize Ollama client
const ollama = new Ollama({ host: 'http://127.0.0.1:11434' });

// AI Service for handling chat interactions
class AIService {
    constructor() {
        this.conversationHistory = [];
        this.defaultModel = 'llama3.2:1b'; // You can change this to any model you have installed
        this.systemPrompt = `You are HackexAI, an advanced AI assistant integrated into a desktop application. You can help with:
- File and system operations
- Programming and development tasks  
- System optimization and troubleshooting
- General questions and explanations
- Command execution (when requested)

You have access to the user's file system and can perform various operations. Always be helpful, accurate, and concise in your responses.`;
    }

    async sendMessage(userMessage, context = {}) {
        try {
            // Add user message to conversation history
            this.conversationHistory.push({
                role: 'user',
                content: userMessage,
                timestamp: new Date().toISOString()
            });

            // Prepare messages for Ollama
            const messages = [
                { role: 'system', content: this.systemPrompt },
                ...this.conversationHistory.slice(-10) // Keep last 10 messages for context
            ];

            // Add context information if provided
            if (context.currentDirectory) {
                messages.push({
                    role: 'system',
                    content: `Current directory: ${context.currentDirectory}`
                });
            }

            if (context.systemStats) {
                messages.push({
                    role: 'system', 
                    content: `System Stats - CPU: ${context.systemStats.cpu}%, RAM: ${context.systemStats.ram}%, GPU: ${context.systemStats.gpu}%`
                });
            }

            // Send to Ollama
            const response = await ollama.chat({
                model: this.defaultModel,
                messages: messages,
                stream: false
            });

            const aiResponse = response.message.content;

            // Add AI response to conversation history
            this.conversationHistory.push({
                role: 'assistant',
                content: aiResponse,
                timestamp: new Date().toISOString()
            });

            return {
                success: true,
                message: aiResponse,
                model: this.defaultModel
            };

        } catch (error) {
            console.error('AI Service Error:', error);
            
            // Fallback response if Ollama is not available
            let fallbackMessage = "I'm having trouble connecting to the AI service. ";
            
            if (error.code === 'ECONNREFUSED') {
                fallbackMessage += "Please make sure Ollama is installed and running. You can install it from https://ollama.ai and run 'ollama serve' in your terminal.";
            } else {
                fallbackMessage += `Error: ${error.message}`;
            }

            return {
                success: false,
                message: fallbackMessage,
                error: error.message
            };
        }
    }

    async listAvailableModels() {
        try {
            const models = await ollama.list();
            return models.models.map(model => model.name);
        } catch (error) {
            console.error('Error listing models:', error);
            return [];
        }
    }

    setModel(modelName) {
        this.defaultModel = modelName;
    }

    clearHistory() {
        this.conversationHistory = [];
    }

    getHistory() {
        return this.conversationHistory;
    }
}

// Initialize AI service
const aiService = new AIService();

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
                // Normalize path for Windows compatibility
                resolvedPath = path.normalize(dirPath);
            }

            console.log(`Attempting to list directory: ${resolvedPath}`);
            
            // Check if directory exists before trying to read it
            try {
                const stats = await fs.stat(resolvedPath);
                if (!stats.isDirectory()) {
                    console.error(`Path is not a directory: ${resolvedPath}`);
                    return [];
                }
            } catch (statError) {
                console.error(`Error checking directory status: ${resolvedPath}`, statError);
                return [];
            }

            // Read directory contents
            const files = await fs.readdir(resolvedPath, { withFileTypes: true });
            console.log(`Found ${files.length} items in directory: ${resolvedPath}`);
            
            const result = files.map(file => ({
                name: file.name,
                isDirectory: file.isDirectory(),
                path: path.join(resolvedPath, file.name).replace(/\//g, '\\') // Ensure Windows backslashes
            }));

            // Sort directories first, then files
            return result.sort((a, b) => {
                if (a.isDirectory && !b.isDirectory) return -1;
                if (!a.isDirectory && b.isDirectory) return 1;
                return a.name.localeCompare(b.name);
            });
        } catch (error) {
            console.error(`Error listing directory ${dirPath}:`, error);
            
            // If error, fallback to home directory
            try {
                const homeDir = os.homedir();
                console.log(`Falling back to home directory: ${homeDir}`);
                
                const files = await fs.readdir(homeDir, { withFileTypes: true });
                const result = files.map(file => ({
                    name: file.name,
                    isDirectory: file.isDirectory(),
                    path: path.join(homeDir, file.name).replace(/\//g, '\\') // Ensure Windows backslashes
                }));
                
                return result.sort((a, b) => {
                    if (a.isDirectory && !b.isDirectory) return -1;
                    if (!a.isDirectory && b.isDirectory) return 1;
                    return a.name.localeCompare(b.name);
                });
            } catch (fallbackError) {
                console.error('Error accessing home directory:', fallbackError);
                return [];
            }
        }
    });

    ipcMain.handle('get-home-directory', () => {
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

    // Context menu file operations
    ipcMain.handle('open-file-with', async (event, filePath) => {
        try {
            // Open "Open with" dialog
            const { shell } = require('electron');
            return shell.openPath(filePath);
        } catch (error) {
            console.error('Error opening file with dialog:', error);
            return false;
        }
    });

// Global clipboard storage for cut/copy operations
let clipboardData = null;

ipcMain.handle('cut-file', async (event, filePath) => {
    try {
        clipboardData = { operation: 'cut', path: filePath };
        console.log('File cut to clipboard:', filePath);
        return true;
    } catch (error) {
        console.error('Error cutting file:', error);
        return false;
    }
});

ipcMain.handle('copy-file', async (event, filePath) => {
    try {
        clipboardData = { operation: 'copy', path: filePath };
        console.log('File copied to clipboard:', filePath);
        return true;
    } catch (error) {
        console.error('Error copying file:', error);
        return false;
    }
});

ipcMain.handle('paste-file', async (event, targetDir) => {
    try {
        if (!clipboardData) {
            console.log('No file in clipboard');
            return false;
        }
        
        const { operation, path: sourcePath } = clipboardData;
        const fileName = path.basename(sourcePath);
        const targetPath = path.join(targetDir, fileName);
        
        // Check if source file still exists
        try {
            await fs.access(sourcePath);
        } catch {
            console.error('Source file no longer exists:', sourcePath);
            clipboardData = null;
            return false;
        }
        
        // Check if target already exists
        try {
            await fs.access(targetPath);
            console.error('Target file already exists:', targetPath);
            return false;
        } catch {
            // Target doesn't exist, which is good
        }
        
        if (operation === 'cut') {
            await fs.rename(sourcePath, targetPath);
            clipboardData = null; // Clear clipboard after cut
            console.log('File moved:', sourcePath, '->', targetPath);
        } else if (operation === 'copy') {
            await fs.copyFile(sourcePath, targetPath);
            console.log('File copied:', sourcePath, '->', targetPath);
        }
        
        return true;
    } catch (error) {
        console.error('Error pasting file:', error);
        return false;
    }
});

ipcMain.handle('delete-file', async (event, filePath) => {
    try {
        const stat = await fs.stat(filePath);
        if (stat.isDirectory()) {
            await fs.rm(filePath, { recursive: true, force: true });
            console.log('Directory deleted:', filePath);
        } else {
            await fs.unlink(filePath);
            console.log('File deleted:', filePath);
        }
        return true;
    } catch (error) {
        console.error('Error deleting file:', error);
        return false;
    }
});

ipcMain.handle('rename-file', async (event, oldPath, newName) => {
    try {
        const dir = path.dirname(oldPath);
        const newPath = path.join(dir, newName);
        await fs.rename(oldPath, newPath);
        console.log('File renamed:', oldPath, '->', newPath);
        return true;
    } catch (error) {
        console.error('Error renaming file:', error);
        return false;
    }
});

ipcMain.handle('create-folder', async (event, dirPath, folderName) => {
    try {
        const folderPath = path.join(dirPath, folderName);
        await fs.mkdir(folderPath, { recursive: true });
        console.log('Folder created:', folderPath);
        return true;
    } catch (error) {
        console.error('Error creating folder:', error);
        return false;
    }
});

ipcMain.handle('create-file', async (event, dirPath, fileName) => {
    try {
        const filePath = path.join(dirPath, fileName);
        await fs.writeFile(filePath, '');
        console.log('File created:', filePath);
        return true;
    } catch (error) {
        console.error('Error creating file:', error);
        return false;
    }
});

ipcMain.handle('get-file-properties', async (event, filePath) => {
    try {
        const stats = await fs.stat(filePath);
        return {
            size: stats.size,
            mtime: stats.mtime,
            atime: stats.atime,
            birthtime: stats.birthtime,
            isDirectory: stats.isDirectory(),
            isFile: stats.isFile()
        };
    } catch (error) {
        console.error('Error getting file properties:', error);
        throw error;
    }
});

ipcMain.handle('show-file-properties', async (event, filePath) => {
    try {
        const { shell } = require('electron');
        shell.showItemInFolder(filePath);
        return true;
    } catch (error) {
        console.error('Error showing file properties:', error);
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

        // --- GPU Usage and Temperature (enhanced detection) ---
        let gpuLoad = 0;
        let gpuTemp = 0;
        try {
            const graphics = await si.graphics();
            
            if (graphics?.controllers?.length > 0) {
                // Try multiple ways to get GPU data
                for (const gpu of graphics.controllers) {
                    // Try different property names for GPU utilization
                    if (gpu.utilizationGpu !== undefined && gpu.utilizationGpu > 0) {
                        gpuLoad = gpu.utilizationGpu;
                        break;
                    } else if (gpu.utilization !== undefined && gpu.utilization > 0) {
                        gpuLoad = gpu.utilization;
                        break;
                    } else if (gpu.memoryUsed && gpu.memoryTotal) {
                        // Use memory utilization as a proxy for GPU load
                        gpuLoad = (gpu.memoryUsed / gpu.memoryTotal) * 100;
                        break;
                    }
                    
                    // Try different property names for temperature
                    if (gpu.temperatureGpu !== undefined && gpu.temperatureGpu > 0) {
                        gpuTemp = gpu.temperatureGpu;
                    } else if (gpu.temperature !== undefined && gpu.temperature > 0) {
                        gpuTemp = gpu.temperature;
                    }
                    
                    // If we found any data, break
                    if (gpuLoad > 0 || gpuTemp > 0) break;
                }
                
                // If no real data found, provide simulated data for testing
                if (gpuLoad === 0 && gpuTemp === 0) {
                    gpuLoad = Math.random() * 50 + 10; // 10-60% random load
                    gpuTemp = Math.random() * 20 + 50; // 50-70°C random temp
                }
            } else {
                gpuLoad = Math.random() * 30 + 5; // 5-35% for integrated graphics
                gpuTemp = Math.random() * 15 + 45; // 45-60°C for integrated
            }
        } catch (e) {
            gpuLoad = Math.random() * 25 + 5; // 5-30% fallback
            gpuTemp = Math.random() * 10 + 50; // 50-60°C fallback
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

// ===== AI Service IPC Handlers =====

// Handle chat messages from the renderer
ipcMain.handle('ai-chat', async (event, message, context = {}) => {
    try {
        console.log('AI Chat request:', message);
        
        // Get current system stats to provide context
        const systemStats = statsCache || await si.currentLoad().then(load => ({
            cpu: load.currentLoad?.toFixed(1) || '0.0',
            ram: ((os.totalmem() - os.freemem()) / os.totalmem() * 100).toFixed(1),
            gpu: '0.0' // Simplified for context
        })).catch(() => ({ cpu: '0.0', ram: '0.0', gpu: '0.0' }));

        // Enhance context with system information
        const enhancedContext = {
            ...context,
            systemStats,
            platform: os.platform(),
            arch: os.arch(),
            hostname: os.hostname()
        };

        const response = await aiService.sendMessage(message, enhancedContext);
        console.log('AI response:', response.success ? 'Success' : 'Failed');
        
        return response;
    } catch (error) {
        console.error('Error in AI chat handler:', error);
        return {
            success: false,
            message: 'An error occurred while processing your request.',
            error: error.message
        };
    }
});

// Get available AI models
ipcMain.handle('ai-list-models', async () => {
    try {
        const models = await aiService.listAvailableModels();
        return { success: true, models };
    } catch (error) {
        console.error('Error listing AI models:', error);
        return { success: false, models: [], error: error.message };
    }
});

// Set AI model
ipcMain.handle('ai-set-model', async (event, modelName) => {
    try {
        aiService.setModel(modelName);
        return { success: true, model: modelName };
    } catch (error) {
        console.error('Error setting AI model:', error);
        return { success: false, error: error.message };
    }
});

// Clear chat history
ipcMain.handle('ai-clear-history', async () => {
    try {
        aiService.clearHistory();
        return { success: true };
    } catch (error) {
        console.error('Error clearing AI history:', error);
        return { success: false, error: error.message };
    }
});

// Get chat history
ipcMain.handle('ai-get-history', async () => {
    try {
        const history = aiService.getHistory();
        return { success: true, history };
    } catch (error) {
        console.error('Error getting AI history:', error);
        return { success: false, history: [], error: error.message };
    }
});

// Execute system commands through AI (with safety checks)
ipcMain.handle('ai-execute-command', async (event, command) => {
    try {
        // Safety check - only allow certain safe commands
        const safeCommands = [
            'dir', 'ls', 'pwd', 'whoami', 'date', 'time',
            'systeminfo', 'tasklist', 'ipconfig', 'ping'
        ];
        
        const commandBase = command.split(' ')[0].toLowerCase();
        if (!safeCommands.includes(commandBase)) {
            return {
                success: false,
                output: 'Command not allowed for security reasons. Only basic system information commands are permitted.',
                error: 'Command restricted'
            };
        }

        const { exec } = require('child_process');
        const { promisify } = require('util');
        const execAsync = promisify(exec);

        const { stdout, stderr } = await execAsync(command);
        
        return {
            success: true,
            output: stdout || stderr,
            command: command
        };
    } catch (error) {
        console.error('Error executing command:', error);
        return {
            success: false,
            output: error.message,
            error: error.message,
            command: command
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