const React = window.React;
const ReactDOM = window.ReactDOM;

// Import react-icons (FontAwesome)
// -*- coding: utf-8 -*-
// HackEx-AI Renderer - Main UI Component
// Make sure we have fallbacks for all icons in case they don't load
const ReactIcons = window.ReactIcons || {};
const FaHome = ReactIcons.FaHome || (() => React.createElement("span", null, "HOME"));
const FaDownload = ReactIcons.FaDownload || (() => React.createElement("span", null, "DL"));
const FaFolder = ReactIcons.FaFolder || (() => React.createElement("span", null, "DIR"));
const FaFile = ReactIcons.FaFile || (() => React.createElement("span", null, "FILE"));
const FaDesktop = ReactIcons.FaDesktop || (() => React.createElement("span", null, "DESK"));
const FaRegFileAlt = ReactIcons.FaRegFileAlt || (() => React.createElement("span", null, "DOC"));
const FaMusic = ReactIcons.FaMusic || (() => React.createElement("span", null, "MUSIC"));
const FaVideo = ReactIcons.FaVideo || (() => React.createElement("span", null, "VIDEO"));
const FaImage = ReactIcons.FaImage || (() => React.createElement("span", null, "IMG"));
const FaFilePdf = ReactIcons.FaFilePdf || (() => React.createElement("span", null, "PDF"));
const FaFileWord = ReactIcons.FaFileWord || (() => React.createElement("span", null, "DOC"));
const FaFileExcel = ReactIcons.FaFileExcel || (() => React.createElement("span", null, "XLS"));
const FaFilePowerpoint = ReactIcons.FaFilePowerpoint || (() => React.createElement("span", null, "PPT"));
const FaFileCode = ReactIcons.FaFileCode || (() => React.createElement("span", null, "CODE"));
const FaFileArchive = ReactIcons.FaFileArchive || (() => React.createElement("span", null, "ZIP"));
const FaFileAudio = ReactIcons.FaFileAudio || (() => React.createElement("span", null, "AUDIO"));
const FaFileVideo = ReactIcons.FaFileVideo || (() => React.createElement("span", null, "VIDEO"));
const FaSearch = ReactIcons.FaSearch || (() => React.createElement("span", null, "SEARCH"));

// Helper: File type detection
function getFileType(filename) {
    const ext = filename.toLowerCase().split('.').pop();
    const audioExts = ['mp3', 'wav', 'flac', 'aac', 'm4a', 'ogg', 'wma'];
    const videoExts = ['mp4', 'avi', 'mkv', 'mov', 'wmv', 'flv', 'm4v', 'webm'];
    const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'svg', 'webp'];
    const codeExts = ['js', 'ts', 'html', 'css', 'py', 'java', 'cpp', 'c', 'cs', 'php', 'rb', 'go', 'rs'];
    const archiveExts = ['zip', 'rar', '7z', 'tar', 'gz', 'bz2'];
    
    if (audioExts.includes(ext)) return 'audio';
    if (videoExts.includes(ext)) return 'video';
    if (imageExts.includes(ext)) return 'image';
    if (ext === 'pdf') return 'pdf';
    if (['doc', 'docx'].includes(ext)) return 'word';
    if (['xls', 'xlsx'].includes(ext)) return 'excel';
    if (['ppt', 'pptx'].includes(ext)) return 'powerpoint';
    if (codeExts.includes(ext)) return 'code';
    if (archiveExts.includes(ext)) return 'archive';
    return 'file';
}

// Helper: Directory and file icon with enhanced file type support
function Icon({ name, isDirectory }) {
    if (isDirectory) {
        // Special folder types
        if (name.toLowerCase() === "home") return FaHome ? React.createElement(FaHome, { className: "icon" }) : React.createElement("span", { className: "icon" }, "HOME");
        if (name.toLowerCase() === "downloads") return FaDownload ? React.createElement(FaDownload, { className: "icon" }) : React.createElement("span", { className: "icon" }, "DL");
        if (name.toLowerCase() === "desktop") return FaDesktop ? React.createElement(FaDesktop, { className: "icon" }) : React.createElement("span", { className: "icon" }, "DESK");
        if (name.toLowerCase() === "documents") return FaRegFileAlt ? React.createElement(FaRegFileAlt, { className: "icon" }) : React.createElement("span", { className: "icon" }, "DOCS");
        if (name.toLowerCase() === "music") return FaMusic ? React.createElement(FaMusic, { className: "icon" }) : React.createElement("span", { className: "icon" }, "MUSIC");
        if (name.toLowerCase() === "videos") return FaVideo ? React.createElement(FaVideo, { className: "icon" }) : React.createElement("span", { className: "icon" }, "VIDEO");
        if (name.toLowerCase() === "pictures") return FaImage ? React.createElement(FaImage, { className: "icon" }) : React.createElement("span", { className: "icon" }, "IMG");
        // Default folder
        return FaFolder ? React.createElement(FaFolder, { className: "icon" }) : React.createElement("span", { className: "icon" }, "DIR");
    }
    
    // File type icons
    const fileType = getFileType(name);
    switch (fileType) {
        case 'audio':
            return FaFileAudio ? React.createElement(FaFileAudio, { className: "icon file-audio" }) : React.createElement("span", { className: "icon" }, "AUDIO");
        case 'video':
            return FaFileVideo ? React.createElement(FaFileVideo, { className: "icon file-video" }) : React.createElement("span", { className: "icon" }, "VIDEO");
        case 'image':
            return FaImage ? React.createElement(FaImage, { className: "icon file-image" }) : React.createElement("span", { className: "icon" }, "IMG");
        case 'pdf':
            return FaFilePdf ? React.createElement(FaFilePdf, { className: "icon file-pdf" }) : React.createElement("span", { className: "icon" }, "PDF");
        case 'word':
            return FaFileWord ? React.createElement(FaFileWord, { className: "icon file-word" }) : React.createElement("span", { className: "icon" }, "DOC");
        case 'excel':
            return FaFileExcel ? React.createElement(FaFileExcel, { className: "icon file-excel" }) : React.createElement("span", { className: "icon" }, "XLS");
        case 'powerpoint':
            return FaFilePowerpoint ? React.createElement(FaFilePowerpoint, { className: "icon file-powerpoint" }) : React.createElement("span", { className: "icon" }, "PPT");
        case 'code':
            return FaFileCode ? React.createElement(FaFileCode, { className: "icon file-code" }) : React.createElement("span", { className: "icon" }, "CODE");
        case 'archive':
            return FaFileArchive ? React.createElement(FaFileArchive, { className: "icon file-archive" }) : React.createElement("span", { className: "icon" }, "ZIP");
        default:
            return FaFile ? React.createElement(FaFile, { className: "icon" }) : React.createElement("span", { className: "icon" }, "FILE");
    }
}

// SemiSpeedometer component for direct use in index.js
function SemiSpeedometer({ label, value, unit = "%", max = 100, accentColor = "#22d3ee", className = "" }) {
    const radius = 45;
    const circumference = Math.PI * radius; // Arc length of a semi-circle

    // Normalize value to 0-100% for the progress calculation relative to 'max'
    const normalizedValue = (value / max) * 100;
    const progress = Math.min(Math.max(normalizedValue, 0), 100) / 100 * circumference;

    return (
        React.createElement("div", { className: `semi-speedometer-container ${className}` },
            React.createElement("svg", { className: "w-36 h-18", viewBox: "0 0 100 50" },
                // Background Arc
                React.createElement("path", {
                    d: "M 5 50 A 45 45 0 0 1 95 50", // Half circle arc
                    stroke: "#1e293b", // Hardcoded color to match CSS targeting. CSS will override.
                    strokeWidth: "8",
                    fill: "none",
                    strokeLinecap: "round"
                }),
                // Fill Arc
                React.createElement("path", {
                    d: "M 5 50 A 45 45 0 0 1 95 50", // Same arc for fill
                    stroke: accentColor, // Passed dynamic accent color
                    strokeWidth: "8",
                    fill: "none",
                    strokeDasharray: circumference,
                    strokeDashoffset: circumference - progress,
                    strokeLinecap: "round",
                    style: { transition: 'stroke-dashoffset 0.5s ease-out' }
                }),
                // Markers (Text labels at 0, 50, 100, or custom for temp)
                // These are dynamically positioned for a 180-degree arc
                // 0% (left)
                React.createElement("text", { x: "5", y: "48", textAnchor: "middle", fill: "#B0B0B0", fontSize: "7", fontFamily: "Roboto Mono" }, "0"),
                // 50% (top, or mid-range for custom max)
                React.createElement("text", { x: "50", y: "8", textAnchor: "middle", fill: "#B0B0B0", fontSize: "7", fontFamily: "Roboto Mono" }, `${max === 100 ? "50" : (max / 2)}`),
                // 100% (right, or max for custom max)
                React.createElement("text", { x: "95", y: "48", textAnchor: "middle", fill: "#B0B0B0", fontSize: "7", fontFamily: "Roboto Mono" }, `${max}`)
            ),
            React.createElement("p", { className: "mt-1 text-sm" }, `${label}`),
            React.createElement("p", { className: "text-lg font-bold" }, `${value}${unit}`)
        )
    );
}

// CircularProgress component for storage usage
function CircularProgress({ value, label, size = 100, strokeWidth = 10, accentColor = "#22d3ee" }) {
    const radius = (size / 2) - (strokeWidth / 2);
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;

    return (
        React.createElement("div", { className: "circular-progress-container" },
            React.createElement("svg", { width: size, height: size, viewBox: `0 0 ${size} ${size}` },
                React.createElement("circle", {
                    stroke: "#1e293b", // Background circle
                    fill: "transparent",
                    strokeWidth: strokeWidth,
                    r: radius,
                    cx: size / 2,
                    cy: size / 2,
                }),
                React.createElement("circle", {
                    stroke: accentColor, // Progress circle
                    fill: "transparent",
                    strokeWidth: strokeWidth,
                    strokeDasharray: circumference,
                    strokeDashoffset: offset,
                    strokeLinecap: "round",
                    r: radius,
                    cx: size / 2,
                    cy: size / 2,
                    style: { transition: 'stroke-dashoffset 0.5s ease-out' },
                    transform: `rotate(-90 ${size / 2} ${size / 2})` // Start from top
                }),
                React.createElement("text", {
                    x: "50%",
                    y: "50%",
                    dy: ".3em", // Adjust text vertical alignment
                    textAnchor: "middle",
                    className: "text-lg font-bold",
                    fill: "var(--color-accent-primary)" // Use CSS variable
                }, `${value}%`)
            ),
            React.createElement("p", { className: "mt-1 text-sm" }, label)
        )
    );
}

// Helper function for dynamic unit conversion for network speed
function formatNetworkSpeed(bytesPerSecond) {
    const kbps = bytesPerSecond / 1024;
    if (kbps < 1000) { // Less than 1 MB/s
        return `${kbps.toFixed(2)} KB/s`;
    } else if (kbps < 1000 * 1000) { // Less than 1 GB/s
        return `${(kbps / 1024).toFixed(2)} MB/s`;
    } else {
        return `${(kbps / (1024 * 1024)).toFixed(2)} GB/s`;
    }
}

// Helper function for formatting file sizes
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    if (bytes < 1024) return `${bytes} Bytes`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}

// Function to format Uptime
const formatUptime = (seconds) => {
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    let parts = [];
    if (d > 0) parts.push(`${d}d`);
    if (h > 0 || d > 0) parts.push(`${h}h`);
    if (m > 0 || h > 0 || d > 0) parts.push(`${m}m`);
    parts.push(`${s}s`);
    return parts.join(' ');
};

function TopBar() {
    const handleClose = () => {
        window.electronAPI.closeWindow();
    };

    return (
        React.createElement("div", {
            className: "header-container", // Apply drag region here
        },
            React.createElement("h1", { style: { WebkitAppRegion: "no-drag" } }, // Text is not draggable
                React.createElement("span", { className: "main-title" }, "HackexAI"),
                " ",
                React.createElement("span", { className: "subtitle" }, "∞ Core Interface ∞")
            ),
            React.createElement("button", { className: "close-button", onClick: handleClose }, "X")
        )
    );
}

function SystemStats({ stats, handleBoostClick }) {
    return (
        React.createElement("div", { className: "panel system-stats-panel" },
            // CPU & RAM first
            React.createElement("div", { className: "meter-group" },
                React.createElement(SemiSpeedometer, { label: "CPU Load", value: stats.cpu, unit: "%", max: 100, accentColor: "var(--color-accent-primary)" }),
                React.createElement(SemiSpeedometer, { label: "RAM Usage", value: stats.ram, unit: "%", max: 100, accentColor: "var(--color-accent-primary)" })
            ),

            // GPU Load & Temp
            React.createElement("div", { className: "meter-group gpu-group" },
                React.createElement(SemiSpeedometer, { label: "GPU Load", value: stats.gpu, unit: "%", max: 100, accentColor: "var(--color-gpu-accent)", className: "gpu-usage" }),
                React.createElement(SemiSpeedometer, { label: "GPU Temp", value: stats.gpu_temp, unit: "C", max: 120, accentColor: "var(--color-warning)", className: "gpu-temp" })
            ),

            // Storage below
            React.createElement("div", { className: "data-block-group" },
                React.createElement("div", { className: "data-block flex-center" },
                    React.createElement(CircularProgress, { label: "Storage Used", value: stats.storage, size: 80, strokeWidth: 8, accentColor: "var(--color-accent-primary)" })
                )
            ),

            // Network below storage
            React.createElement("div", { className: "data-block" },
                React.createElement("h3", null, "Network Flow"),
                React.createElement("div", { className: "network-stats" },
                    React.createElement("div", { id: "download-text", className: "network-item" }, `${formatNetworkSpeed(stats.rx_sec)} DN`),
                    React.createElement("div", { id: "upload-text", className: "network-item" }, `${formatNetworkSpeed(stats.tx_sec)} UP`)
                )
            ),

            // CPU Temp below network
            React.createElement("div", { className: "data-block" },
                React.createElement("h3", null, "CPU Temp"),
                React.createElement("div", { id: "temp-text", className: "temp-stat" }, `${stats.cpu_temp}C`)
            ),

            // Uptime & Processes
            React.createElement("div", { className: "data-block" },
                React.createElement("h3", null, "System Info"),
                React.createElement("p", null, "Uptime: ", React.createElement("span", { id: "uptime-text" }, formatUptime(stats.uptime))),
                React.createElement("p", null, "Processes: ", React.createElement("span", { id: "processes-text" }, stats.processes))
            ),

            // Boost Button
            React.createElement("button", { id: "boost-button", className: "action-button" }, "OPTIMIZE CORE")
        )
    );
}

function FileSystem({ currentDirPath, fileSystemItems, searchQuery, handleFileItemClick, handleGoBack, handleGoToHome, handleNavigateToFolder, handleOpenExplorer, handleSearchChange, handleRefreshDirectory }) {
    const [contextMenu, setContextMenu] = React.useState(null);
    const [selectedItem, setSelectedItem] = React.useState(null);
    const [propertiesModal, setPropertiesModal] = React.useState(null);

    // Filter files based on search query
    const filteredFileSystemItems = React.useMemo(() => {
        if (!searchQuery.trim()) {
            return fileSystemItems;
        }
        return fileSystemItems.filter(item => 
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [fileSystemItems, searchQuery]);

    // Handle right-click context menu with improved positioning
    const handleRightClick = React.useCallback((e, item) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Calculate optimal position to prevent off-screen positioning
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const menuWidth = 180; // Approximate context menu width
        const menuHeight = 300; // Approximate context menu max height 
        
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        // Adjust X position if menu would go off-screen to the right
        let finalX = mouseX;
        if (mouseX + menuWidth > windowWidth) {
            finalX = mouseX - menuWidth;
        }
        
        // Adjust Y position if menu would go off-screen at the bottom
        let finalY = mouseY;
        if (mouseY + menuHeight > windowHeight) {
            finalY = mouseY - menuHeight;
        }
        
        // Ensure menu doesn't go off-screen to the left or top
        finalX = Math.max(10, finalX);
        finalY = Math.max(10, finalY);
        
        setSelectedItem(item);
        setContextMenu({
            x: finalX,
            y: finalY,
            visible: true
        });
    }, []);

    // Hide context menu when clicking elsewhere
    React.useEffect(() => {
        const handleClickOutside = () => {
            setContextMenu(null);
            setSelectedItem(null);
        };
        
        if (contextMenu) {
            document.addEventListener('click', handleClickOutside);
            return () => document.removeEventListener('click', handleClickOutside);
        }
    }, [contextMenu]);

    // Context menu actions
    const handleContextAction = React.useCallback(async (action) => {
        if (!selectedItem && !['paste', 'createFolder', 'createFile', 'refresh'].includes(action)) return;
        
        try {
            switch (action) {
                case 'open':
                    await handleFileItemClick(selectedItem);
                    break;
                case 'openWith':
                    const opened = await window.electronAPI.openFileWith(selectedItem.path);
                    if (!opened) {
                        alert('Failed to open file with external application');
                    }
                    break;
                case 'cut':
                    const cutSuccess = await window.electronAPI.cutFile(selectedItem.path);
                    if (cutSuccess) {
                        console.log(`Cut: ${selectedItem.name}`);
                    } else {
                        alert('Failed to cut file');
                    }
                    break;
                case 'copy':
                    const copySuccess = await window.electronAPI.copyFile(selectedItem.path);
                    if (copySuccess) {
                        console.log(`Copied: ${selectedItem.name}`);
                    } else {
                        alert('Failed to copy file');
                    }
                    break;
                case 'paste':
                    const pasteSuccess = await window.electronAPI.pasteFile(currentDirPath);
                    if (pasteSuccess) {
                        handleRefreshDirectory();
                        console.log('File pasted successfully');
                    } else {
                        alert('Nothing to paste or paste operation failed');
                    }
                    break;
                case 'delete':
                    if (confirm(`Are you sure you want to delete "${selectedItem.name}"?\n\nThis action cannot be undone.`)) {
                        const deleteSuccess = await window.electronAPI.deleteFile(selectedItem.path);
                        if (deleteSuccess) {
                            handleRefreshDirectory();
                            console.log(`Deleted: ${selectedItem.name}`);
                        } else {
                            alert('Failed to delete file. It may be in use or you may not have permission.');
                        }
                    }
                    break;
                case 'rename':
                    const newName = prompt('Enter new name:', selectedItem.name);
                    if (newName && newName.trim() !== '' && newName !== selectedItem.name) {
                        // Validate filename
                        const invalidChars = /[<>:"/\\|?*]/g;
                        if (invalidChars.test(newName)) {
                            alert('Invalid filename. Cannot contain: < > : " / \\ | ? *');
                            break;
                        }
                        const renameSuccess = await window.electronAPI.renameFile(selectedItem.path, newName.trim());
                        if (renameSuccess) {
                            handleRefreshDirectory();
                            console.log(`Renamed: ${selectedItem.name} -> ${newName}`);
                        } else {
                            alert('Failed to rename file. It may be in use or you may not have permission.');
                        }
                    }
                    break;
                case 'properties':
                    if (selectedItem) {
                        try {
                            const properties = await window.electronAPI.getFileProperties(selectedItem.path);
                            setPropertiesModal({
                                item: selectedItem,
                                properties: properties
                            });
                        } catch (error) {
                            console.warn('Failed to get file properties:', error);
                            alert('Failed to get file properties');
                        }
                    }
                    break;
                case 'createFolder':
                    const folderName = prompt('Enter folder name:');
                    if (folderName && folderName.trim() !== '') {
                        // Validate folder name
                        const invalidChars = /[<>:"/\\|?*]/g;
                        if (invalidChars.test(folderName)) {
                            alert('Invalid folder name. Cannot contain: < > : " / \\ | ? *');
                            break;
                        }
                        const createFolderSuccess = await window.electronAPI.createFolder(currentDirPath, folderName.trim());
                        if (createFolderSuccess) {
                            handleRefreshDirectory();
                            console.log(`Created folder: ${folderName}`);
                        } else {
                            alert('Failed to create folder. Folder may already exist or you may not have permission.');
                        }
                    }
                    break;
                case 'createFile':
                    const fileName = prompt('Enter file name (with extension):');
                    if (fileName && fileName.trim() !== '') {
                        // Validate filename
                        const invalidChars = /[<>:"/\\|?*]/g;
                        if (invalidChars.test(fileName)) {
                            alert('Invalid filename. Cannot contain: < > : " / \\ | ? *');
                            break;
                        }
                        const createFileSuccess = await window.electronAPI.createFile(currentDirPath, fileName.trim());
                        if (createFileSuccess) {
                            handleRefreshDirectory();
                            console.log(`Created file: ${fileName}`);
                        } else {
                            alert('Failed to create file. File may already exist or you may not have permission.');
                        }
                    }
                    break;
                case 'refresh':
                    handleRefreshDirectory();
                    console.log('Directory refreshed');
                    break;
                default:
                    console.log(`Context action: ${action}`);
            }
        } catch (error) {
            console.warn(`Error performing ${action}:`, error);
            alert(`Failed to ${action}: ${error.message || 'Unknown error'}`);
        }
        
        setContextMenu(null);
        setSelectedItem(null);
    }, [selectedItem, currentDirPath, handleFileItemClick, handleRefreshDirectory]);
    
    return (
        React.createElement("div", { className: "panel desktop-panel", style: { width: '950px', minWidth: '950px' } },
            React.createElement("h2", null, "Data Core & Sessions"),
            React.createElement("div", { className: "desktop-icons-container" },
                React.createElement("div", { className: "desktop-icon", onClick: handleGoToHome },
                  FaHome ? React.createElement(FaHome, { className: "icon" }) : React.createElement("span", { className: "icon" }, "HOME"), "Home"),
                React.createElement("div", { className: "desktop-icon", onClick: () => handleNavigateToFolder('Downloads') },
                  React.createElement(Icon, { name: "downloads", isDirectory: true }), "Downloads"),
                React.createElement("div", { className: "desktop-icon", onClick: () => handleNavigateToFolder('Documents') },
                  React.createElement(Icon, { name: "documents", isDirectory: true }), "Documents"),
                React.createElement("div", { className: "desktop-icon", onClick: () => handleNavigateToFolder('Desktop') },
                  React.createElement(Icon, { name: "desktop", isDirectory: true }), "Desktop"),
                React.createElement("div", { className: "desktop-icon", onClick: () => handleNavigateToFolder('Music') },
                  React.createElement(Icon, { name: "music", isDirectory: true }), "Music"),
                React.createElement("div", { className: "desktop-icon", onClick: () => handleNavigateToFolder('Videos') },
                  React.createElement(Icon, { name: "videos", isDirectory: true }), "Videos"),
                React.createElement("div", { className: "desktop-icon", onClick: () => handleNavigateToFolder('Pictures') },
                  React.createElement(Icon, { name: "pictures", isDirectory: true }), "Pictures")
            ),
            currentDirPath && React.createElement("div", { className: "current-directory-view" },
                React.createElement("h3", null, `Current Directory: ${currentDirPath}`),
                React.createElement("div", { className: "directory-controls" },
                    React.createElement("button", { className: "action-button small", onClick: handleGoBack }, "Back"),
                    React.createElement("button", { className: "action-button small", onClick: handleGoToHome }, "Home")
                ),
                React.createElement("div", { className: "search-bar-container" },
                    React.createElement("div", { className: "search-input-wrapper" },
                        FaSearch ? React.createElement(FaSearch, { className: "search-icon" }) : React.createElement("span", { className: "search-icon" }, "SEARCH"),
                        React.createElement("input", { 
                            type: "text", 
                            placeholder: "Search files and folders...", 
                            value: searchQuery,
                            onChange: handleSearchChange,
                            className: "search-input" 
                        })
                    )
                ),
                React.createElement("div", { 
                    className: "file-list",
                    onContextMenu: (e) => {
                        // Only show context menu if clicking on empty space
                        if (e.target.classList.contains('file-list') || e.target.classList.contains('empty-message')) {
                            handleRightClick(e, null);
                        }
                    }
                },
                    filteredFileSystemItems.length > 0 ? (
                        filteredFileSystemItems.map((item, index) => (
                            React.createElement("div", { 
                                key: `${item.path}-${index}`, 
                                className: `file-item ${item.isDirectory ? 'folder' : 'file'}`, 
                                onClick: () => handleFileItemClick(item),
                                onContextMenu: (e) => handleRightClick(e, item)
                            },
                                React.createElement(Icon, { name: item.name, isDirectory: item.isDirectory }),
                                React.createElement("span", { className: "file-name" }, item.name)
                            )
                        ))
                    ) : (
                        React.createElement("p", { className: "empty-message" }, 
                            searchQuery ? `No files found matching "${searchQuery}"` : "Directory is empty or inaccessible."
                        )
                    )
                ),
                React.createElement("button", { id: "open-file-explorer-button", className: "action-button small" }, "Open File Explorer"),
                
                // Context Menu
                contextMenu && React.createElement("div", {
                    className: "context-menu",
                    style: {
                        position: 'fixed',
                        left: contextMenu.x,
                        top: contextMenu.y,
                        backgroundColor: '#2a2a2a',
                        border: '1px solid #444',
                        borderRadius: '4px',
                        padding: '4px 0',
                        zIndex: 1000,
                        minWidth: '180px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
                    }
                },
                    // Open actions
                    selectedItem && !selectedItem.isDirectory && React.createElement("div", {
                        className: "context-menu-item",
                        onClick: () => handleContextAction('open')
                    }, "Open"),
                    selectedItem && !selectedItem.isDirectory && React.createElement("div", {
                        className: "context-menu-item",
                        onClick: () => handleContextAction('openWith')
                    }, "Open with..."),
                    selectedItem && React.createElement("div", { className: "context-menu-separator" }),
                    
                    // Edit actions
                    selectedItem && React.createElement("div", {
                        className: "context-menu-item",
                        onClick: () => handleContextAction('cut')
                    }, "Cut"),
                    selectedItem && React.createElement("div", {
                        className: "context-menu-item",
                        onClick: () => handleContextAction('copy')
                    }, "Copy"),
                    React.createElement("div", {
                        className: "context-menu-item",
                        onClick: () => handleContextAction('paste')
                    }, "Paste"),
                    React.createElement("div", { className: "context-menu-separator" }),
                    
                    // Create actions (show when right-clicking on empty space)
                    !selectedItem && React.createElement("div", {
                        className: "context-menu-item",
                        onClick: () => handleContextAction('createFolder')
                    }, "New Folder"),
                    !selectedItem && React.createElement("div", {
                        className: "context-menu-item",
                        onClick: () => handleContextAction('createFile')
                    }, "New File"),
                    !selectedItem && React.createElement("div", { className: "context-menu-separator" }),
                    
                    // Delete and rename
                    selectedItem && React.createElement("div", {
                        className: "context-menu-item",
                        onClick: () => handleContextAction('rename')
                    }, "Rename"),
                    selectedItem && React.createElement("div", {
                        className: "context-menu-item context-menu-danger",
                        onClick: () => handleContextAction('delete')
                    }, "Delete"),
                    selectedItem && React.createElement("div", { className: "context-menu-separator" }),
                    
                    // Properties and refresh
                    selectedItem && React.createElement("div", {
                        className: "context-menu-item",
                        onClick: () => handleContextAction('properties')
                    }, "Properties"),
                    React.createElement("div", {
                        className: "context-menu-item",
                        onClick: () => handleContextAction('refresh')
                    }, "Refresh")
                )
            ),
            
            // Properties Modal
            propertiesModal && React.createElement("div", { 
                className: "modal-overlay",
                onClick: () => setPropertiesModal(null)
            },
                React.createElement("div", { 
                    className: "properties-modal",
                    onClick: (e) => e.stopPropagation()
                },
                    React.createElement("div", { className: "modal-header" },
                        React.createElement("h3", null, `${propertiesModal.item.name} Properties`),
                        React.createElement("button", { 
                            className: "modal-close",
                            onClick: () => setPropertiesModal(null)
                        }, "×")
                    ),
                    React.createElement("div", { className: "modal-content" },
                        React.createElement("div", { className: "property-row" },
                            React.createElement("span", { className: "property-label" }, "Name:"),
                            React.createElement("span", { className: "property-value" }, propertiesModal.item.name)
                        ),
                        React.createElement("div", { className: "property-row" },
                            React.createElement("span", { className: "property-label" }, "Type:"),
                            React.createElement("span", { className: "property-value" }, propertiesModal.item.isDirectory ? "Folder" : "File")
                        ),
                        React.createElement("div", { className: "property-row" },
                            React.createElement("span", { className: "property-label" }, "Location:"),
                            React.createElement("span", { className: "property-value" }, propertiesModal.item.path)
                        ),
                        propertiesModal.properties && React.createElement("div", { className: "property-row" },
                            React.createElement("span", { className: "property-label" }, "Size:"),
                            React.createElement("span", { className: "property-value" }, formatFileSize(propertiesModal.properties.size))
                        ),
                        propertiesModal.properties && React.createElement("div", { className: "property-row" },
                            React.createElement("span", { className: "property-label" }, "Modified:"),
                            React.createElement("span", { className: "property-value" }, new Date(propertiesModal.properties.mtime).toLocaleString())
                        ),
                        propertiesModal.properties && React.createElement("div", { className: "property-row" },
                            React.createElement("span", { className: "property-label" }, "Created:"),
                            React.createElement("span", { className: "property-value" }, new Date(propertiesModal.properties.birthtime).toLocaleString())
                        ),
                        propertiesModal.properties && React.createElement("div", { className: "property-row" },
                            React.createElement("span", { className: "property-label" }, "Accessed:"),
                            React.createElement("span", { className: "property-value" }, new Date(propertiesModal.properties.atime).toLocaleString())
                        )
                    )
                )
            )
        )
    );
}

function ChatPanel({ handleChatSend }) {
    return (
        React.createElement("div", { className: "panel ai-chat-panel" },
            React.createElement("h2", null, "AI Command Terminal"),
            React.createElement("div", { id: "chat-display", className: "chat-terminal" }, "Files Go Here"),
            React.createElement("div", { className: "chat-input-area" },
                React.createElement("input", { id: "chat-input", placeholder: ">> Enter command or query...", className: "text-input" }),
                React.createElement("button", { id: "chat-send", className: "send-button" }, "EXECUTE")
            )
        )
    );
}

function App() {
    const [stats, setStats] = React.useState({
        cpu: 0, ram: 0, storage: 0, rx_sec: 0, tx_sec: 0, gpu: 0, gpu_temp: 0, cpu_temp: 0, uptime: 0, processes: 0
    });
    const [currentDirPath, setCurrentDirPath] = React.useState(''); // State to track current directory path
    const [fileSystemItems, setFileSystemItems] = React.useState([]); // State to store file system items
    const [searchQuery, setSearchQuery] = React.useState(''); // State for file search

    React.useEffect(() => {
        let isMounted = true;
        
        const fetchStats = async () => {
            try {
                if (isMounted) {
                    const data = await window.electronAPI.getSystemStats();
                    if (isMounted && data) {
                        setStats(data);
                    }
                }
            } catch (error) {
                console.warn('Failed to fetch system stats:', error);
                // Keep using previous stats on error
            }
        };

        // Initial fetch
        fetchStats();

        // Fetch stats every 3 seconds instead of 1 second to reduce resource usage
        const interval = setInterval(fetchStats, 3000);

        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, []);

    // Initialize with user's home directory
    React.useEffect(() => {
        const initializeFileSystem = async () => {
            try {
                const homeDir = await window.electronAPI.getHomeDirectory();
                setCurrentDirPath(homeDir);
            } catch (error) {
                console.error('Error getting home directory:', error);
                setCurrentDirPath('');
            }
        };
        initializeFileSystem();
    }, []);

    // Effect to load directory contents
    React.useEffect(() => {
        let isMounted = true;
        
        const loadDirectoryContents = async () => {
            try {
                if (isMounted && currentDirPath) {
                    console.log('Loading directory:', currentDirPath); // Debug
                    const items = await window.electronAPI.listDirectory(currentDirPath);
                    console.log('Directory items received:', items); // Debug
                    if (isMounted) {
                        setFileSystemItems(Array.isArray(items) ? items : []);
                        // Clear search when directory changes
                        setSearchQuery('');
                    }
                }
            } catch (error) {
                console.warn('Error loading directory contents:', error);
                if (isMounted) {
                    setFileSystemItems([]);
                    setSearchQuery(''); // Clear search on error too
                }
            }
        };
        
        if (currentDirPath) {
            loadDirectoryContents();
        } else {
            // Clear files when no directory is selected
            setFileSystemItems([]);
            setSearchQuery(''); // Clear search when no directory
        }

        return () => {
            isMounted = false;
        };
    }, [currentDirPath]); // Reload when currentDirPath changes

    const handleFileItemClick = React.useCallback(async (item) => {
        try {
            if (item.isDirectory) {
                setCurrentDirPath(item.path);
            } else {
                const success = await window.electronAPI.openFile(item.path);
                if (!success) {
                    console.warn(`Failed to open file: ${item.path}`);
                }
            }
        } catch (error) {
            console.warn('Error handling file click:', error);
        }
    }, []);

    const handleGoBack = React.useCallback(() => {
        if (currentDirPath) {
            // Use Windows backslash for path parsing
            const parentPath = currentDirPath.substring(0, currentDirPath.lastIndexOf('\\'));
            if (parentPath && parentPath.length > 2) { // C:\ minimum
                setCurrentDirPath(parentPath);
            }
        }
    }, [currentDirPath]);

    const handleGoToHome = React.useCallback(async () => {
        try {
            const homeDir = await window.electronAPI.getHomeDirectory();
            setCurrentDirPath(homeDir);
        } catch (error) {
            console.warn('Error getting home directory:', error);
        }
    }, []);

    const handleNavigateToFolder = React.useCallback(async (folderName) => {
        try {
            // Get home directory
            const homeDir = await window.electronAPI.getHomeDirectory();
            console.log(`Home directory: ${homeDir}`);
            console.log(`Navigating to folder: ${folderName}`);
            
            // Special paths for Windows standard folders
            let targetPath;
            if (folderName === 'Music' || folderName === 'Videos' || folderName === 'Pictures' || 
                folderName === 'Documents' || folderName === 'Downloads' || folderName === 'Desktop') {
                targetPath = `${homeDir}\\${folderName}`;
            } else {
                targetPath = folderName; // Use absolute path if provided
            }
            
            console.log(`Target path: ${targetPath}`);
            
            // Set the path and let the effect load the directory
            setCurrentDirPath(targetPath);
            
        } catch (error) {
            console.warn(`Error navigating to ${folderName}:`, error);
        }
    }, []);

    const handleOpenExplorer = React.useCallback(async () => {
        try {
            await window.electronAPI.openFileExplorer(currentDirPath);
        } catch (error) {
            console.warn('Failed to open explorer:', error);
        }
    }, [currentDirPath]);

    // Optimized event handlers
    const handleBoostClick = React.useCallback(() => {
        const button = document.getElementById('boost-button');
        if (button) {
            button.classList.toggle('active');
            if (button.classList.contains('active')) {
                button.innerText = "CORE OPTIMIZED";
            } else {
                button.innerText = "OPTIMIZE CORE";
            }
        }
        console.log("Boost button clicked!");
    }, []);

    const handleChatSend = React.useCallback(() => {
        const inputElement = document.getElementById('chat-input');
        const display = document.getElementById('chat-display');
        
        if (!inputElement || !display) return;
        
        const input = inputElement.value;
        if (input.trim() === "") return;

        display.innerHTML += `<div><b>You:</b> ${input}</div>`;

        setTimeout(() => {
            display.innerHTML += `<div><b>AI:</b> Query acknowledged. Standing by for deeper system integration.</div>`;
            display.scrollTop = display.scrollHeight;
        }, 500); // Reduced timeout for better responsiveness

        inputElement.value = "";
        inputElement.focus();
    }, []);

    // Search functionality
    const handleSearchChange = React.useCallback((e) => {
        setSearchQuery(e.target.value);
    }, []);

    // Refresh directory contents
    const handleRefreshDirectory = React.useCallback(async () => {
        if (currentDirPath) {
            try {
                const items = await window.electronAPI.listDirectory(currentDirPath);
                setFileSystemItems(Array.isArray(items) ? items : []);
            } catch (error) {
                console.warn('Error refreshing directory:', error);
                setFileSystemItems([]);
            }
        }
    }, [currentDirPath]);

    React.useEffect(() => {
        const boostButton = document.getElementById('boost-button');
        const chatSendButton = document.getElementById('chat-send');
        const chatInput = document.getElementById('chat-input');
        const openExplorerButton = document.getElementById('open-file-explorer-button');

        const handleKeyPress = (event) => {
            if (event.key === 'Enter') {
                handleChatSend();
            }
        };

        // Add event listeners
        if (boostButton) {
            boostButton.addEventListener('click', handleBoostClick);
        }
        if (chatSendButton) {
            chatSendButton.addEventListener('click', handleChatSend);
        }
        if (chatInput) {
            chatInput.addEventListener('keypress', handleKeyPress);
        }
        if (openExplorerButton) {
            openExplorerButton.addEventListener('click', handleOpenExplorer);
        }

        // Cleanup function
        return () => {
            if (boostButton) boostButton.removeEventListener('click', handleBoostClick);
            if (chatSendButton) chatSendButton.removeEventListener('click', handleChatSend);
            if (chatInput) chatInput.removeEventListener('keypress', handleKeyPress);
            if (openExplorerButton) openExplorerButton.removeEventListener('click', handleOpenExplorer);
        };
    }, [handleBoostClick, handleChatSend, handleOpenExplorer]);


    return (
        React.createElement("div", { className: "w-screen h-screen bg-black text-white flex flex-col" },
            React.createElement(TopBar),
            React.createElement("div", { className: "app-container" },
                // System Stats Panel (Left)
                React.createElement(SystemStats, { 
                    stats: stats,
                    handleBoostClick: handleBoostClick
                }),
                
                // File System Panel (Middle)
                React.createElement(FileSystem, {
                    currentDirPath: currentDirPath,
                    fileSystemItems: fileSystemItems,
                    searchQuery: searchQuery,
                    handleFileItemClick: handleFileItemClick,
                    handleGoBack: handleGoBack,
                    handleGoToHome: handleGoToHome,
                    handleNavigateToFolder: handleNavigateToFolder,
                    handleOpenExplorer: handleOpenExplorer,
                    handleSearchChange: handleSearchChange,
                    handleRefreshDirectory: handleRefreshDirectory
                }),
                
                // AI Chat Panel (Right)
                React.createElement(ChatPanel, {
                    handleChatSend: handleChatSend
                })
            )
        )
    );
}

// Debug logs
console.log('Debug: App is defined', typeof App === 'function');

// Wait for DOM to be ready before rendering
document.addEventListener('DOMContentLoaded', function() {
    const rootElement = document.getElementById("root");
    if (rootElement) {
        console.log('Root element found, rendering app...');
        const root = ReactDOM.createRoot(rootElement);
        root.render(React.createElement(App));
    } else {
        console.error('Root element not found!');
    }
});

// Fallback in case DOMContentLoaded has already fired
if (document.readyState === 'loading') {
    // DOM is still loading, the event listener above will handle it
} else {
    // DOM is already loaded
    const rootElement = document.getElementById("root");
    if (rootElement) {
        console.log('Root element found (fallback), rendering app...');
        const root = ReactDOM.createRoot(rootElement);
        root.render(React.createElement(App));
    } else {
        console.error('Root element not found (fallback)!');
    }
}
