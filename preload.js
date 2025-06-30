const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    getSystemStats: () => ipcRenderer.invoke('get-system-stats'),
    listDirectory: (dir) => ipcRenderer.invoke('list-directory', dir),
    closeWindow: () => ipcRenderer.send('close-window') // Expose close window function
});