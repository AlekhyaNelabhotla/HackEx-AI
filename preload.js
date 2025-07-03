const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    getSystemStats: () => ipcRenderer.invoke('get-system-stats'),
    listDirectory: (dir) => ipcRenderer.invoke('list-directory', dir),
    getHomeDirectory: () => ipcRenderer.invoke('get-home-directory'),
    openFileExplorer: (path) => ipcRenderer.invoke('open-file-explorer', path),
    openFile: (path) => ipcRenderer.invoke('open-file', path),
    closeWindow: () => ipcRenderer.send('close-window'),
    
    // Context menu operations
    openFileWith: (path) => ipcRenderer.invoke('open-file-with', path),
    cutFile: (path) => ipcRenderer.invoke('cut-file', path),
    copyFile: (path) => ipcRenderer.invoke('copy-file', path),
    pasteFile: (targetDir) => ipcRenderer.invoke('paste-file', targetDir),
    deleteFile: (path) => ipcRenderer.invoke('delete-file', path),
    renameFile: (oldPath, newName) => ipcRenderer.invoke('rename-file', oldPath, newName),
    createFolder: (dirPath, folderName) => ipcRenderer.invoke('create-folder', dirPath, folderName),
    createFile: (dirPath, fileName) => ipcRenderer.invoke('create-file', dirPath, fileName),
    getFileProperties: (path) => ipcRenderer.invoke('get-file-properties', path),
    showFileProperties: (path) => ipcRenderer.invoke('show-file-properties', path)
});