const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    getSystemStats: () => ipcRenderer.invoke('get-system-stats'),
    listDirectory: (dir) => ipcRenderer.invoke('list-directory', dir),
    getHomeDirectory: () => ipcRenderer.invoke('get-home-directory'),
    openFileExplorer: (path) => ipcRenderer.invoke('open-file-explorer', path),
    openFile: (path) => ipcRenderer.invoke('open-file', path),
    closeWindow: () => ipcRenderer.send('close-window')
});