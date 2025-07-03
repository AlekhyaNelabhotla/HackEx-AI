// FileSystem.js - File system navigation component
const React = window.React;

// Import icons
import { Icon } from './Icons.js';
const ReactIcons = window.ReactIcons || {};
const FaSearch = ReactIcons.FaSearch || (() => React.createElement("span", null, "🔍"));

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

/**
 * FileSystem component for browsing and interacting with the file system
 * @param {Object} props - Component props
 */
export function FileSystem({
    currentDirPath,
    fileSystemItems,
    searchQuery,
    handleFileItemClick,
    handleGoBack,
    handleGoToHome,
    handleNavigateToFolder,
    handleOpenExplorer,
    handleSearchChange
}) {
    // Filter files based on search query
    const filteredFileSystemItems = React.useMemo(() => {
        if (!searchQuery.trim()) {
            return fileSystemItems;
        }
        return fileSystemItems.filter(item => 
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [fileSystemItems, searchQuery]);

    return (
        React.createElement("div", { className: "panel desktop-panel", style: { width: '950px', minWidth: '950px' } },
            React.createElement("h2", null, "Data Core & Sessions"),
            
            // Navigation shortcuts
            React.createElement("div", { className: "desktop-icons-container" },
                React.createElement("div", { className: "desktop-icon", onClick: handleGoToHome },
                    React.createElement(FileIcon, { name: "home", isDirectory: true }), "Home"),
                React.createElement("div", { className: "desktop-icon", onClick: () => handleNavigateToFolder('Downloads') },
                    React.createElement(FileIcon, { name: "downloads", isDirectory: true }), "Downloads"),
                React.createElement("div", { className: "desktop-icon", onClick: () => handleNavigateToFolder('Documents') },
                    React.createElement(FileIcon, { name: "documents", isDirectory: true }), "Documents"),
                React.createElement("div", { className: "desktop-icon", onClick: () => handleNavigateToFolder('Desktop') },
                    React.createElement(FileIcon, { name: "desktop", isDirectory: true }), "Desktop"),
                React.createElement("div", { className: "desktop-icon", onClick: () => handleNavigateToFolder('Music') },
                    React.createElement(FileIcon, { name: "music", isDirectory: true }), "Music"),
                React.createElement("div", { className: "desktop-icon", onClick: () => handleNavigateToFolder('Videos') },
                    React.createElement(FileIcon, { name: "videos", isDirectory: true }), "Videos"),
                React.createElement("div", { className: "desktop-icon", onClick: () => handleNavigateToFolder('Pictures') },
                    React.createElement(FileIcon, { name: "pictures", isDirectory: true }), "Pictures")
            ),
            
            // Directory content view - only show if we have a current directory
            currentDirPath && React.createElement("div", { className: "current-directory-view" },
                React.createElement("h3", null, `Current Directory: ${currentDirPath}`),
                
                // Navigation controls
                React.createElement("div", { className: "directory-controls" },
                    React.createElement("button", { className: "action-button small", onClick: handleGoBack }, "⬆️ Back"),
                    React.createElement("button", { className: "action-button small", onClick: handleGoToHome }, "🏠 Home")
                ),
                
                // Search bar
                React.createElement("div", { className: "search-bar-container" },
                    React.createElement("div", { className: "search-input-wrapper" },
                        FaSearch ? React.createElement(FaSearch, { className: "search-icon" }) : React.createElement("span", { className: "search-icon" }, "🔍"),
                        React.createElement("input", { 
                            type: "text", 
                            placeholder: "Search files and folders...", 
                            value: searchQuery,
                            onChange: handleSearchChange,
                            className: "search-input" 
                        })
                    )
                ),
                
                // File list
                React.createElement("div", { className: "file-list" },
                    filteredFileSystemItems.length > 0 ? (
                        filteredFileSystemItems.map((item, index) => (
                            React.createElement("div", { 
                                key: `${item.path}-${index}`, 
                                className: `file-item ${item.isDirectory ? 'folder' : 'file'}`, 
                                onClick: () => handleFileItemClick(item) 
                            },
                                React.createElement(FileIcon, { name: item.name, isDirectory: item.isDirectory }),
                                React.createElement("span", { className: "file-name" }, item.name)
                            )
                        ))
                    ) : (
                        React.createElement("p", { className: "empty-message" }, 
                            searchQuery ? `No files found matching "${searchQuery}"` : "Directory is empty or inaccessible."
                        )
                    )
                ),
                
                // Open in Explorer button
                React.createElement("button", { 
                    id: "open-file-explorer-button", 
                    className: "action-button small",
                    onClick: handleOpenExplorer
                }, "Open File Explorer")
            )
        )
    );
}

// Export the component
module.exports = FileSystem;
