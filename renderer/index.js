const React = window.React;
const ReactDOM = window.ReactDOM;

// Inlined and refined SemiSpeedometer component for direct use in index.js
function SemiSpeedometer({ label, value, unit = "%", max = 100, accentColor = "#22d3ee", className = "" }) { // Added className prop
    const radius = 45;
    const circumference = Math.PI * radius; // Arc length of a semi-circle

    // Normalize value to 0-100% for the progress calculation relative to 'max'
    const normalizedValue = (value / max) * 100;
    const progress = Math.min(Math.max(normalizedValue, 0), 100) / 100 * circumference;

    return (
        React.createElement("div", { className: `semi-speedometer-container ${className}` }, // Apply className here
            React.createElement("svg", { className: "w-36 h-18", viewBox: "0 0 100 50" }, // Adjusted viewBox for semi-circle
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
            React.createElement("p", { className: "mt-1 text-sm" }, `${label}`), // Uses custom CSS class
            React.createElement("p", { className: "text-lg font-bold" }, `${value}${unit}`) // Uses custom CSS class
        )
    );
}

// CircularProgress component for storage usage
function CircularProgress({ value, label, size = 100, strokeWidth = 10, accentColor = "#22d3ee" }) {
    const radius = (size / 2) - (strokeWidth / 2);
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;

    return (
        React.createElement("div", { className: "circular-progress-container" }, // Added a container class
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

function App() {
    const [stats, setStats] = React.useState({
        cpu: 0, ram: 0, storage: 0, rx_sec: 0, tx_sec: 0, gpu: 0, gpu_temp: 0, cpu_temp: 0, uptime: 0, processes: 0
    });
    const [currentDirPath, setCurrentDirPath] = React.useState(''); // State to track current directory path
    const [fileSystemItems, setFileSystemItems] = React.useState([]); // State to store file system items

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
                if (isMounted) {
                    const items = await window.electronAPI.listDirectory(currentDirPath);
                    if (isMounted) {
                        setFileSystemItems(Array.isArray(items) ? items : []);
                    }
                }
            } catch (error) {
                console.warn('Error loading directory contents:', error);
                if (isMounted) {
                    setFileSystemItems([]);
                }
            }
        };
        
        if (currentDirPath) {
            loadDirectoryContents();
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
            const parentPath = currentDirPath.substring(0, currentDirPath.lastIndexOf('\\'));
            if (parentPath && parentPath.length > 2) {
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
            const homeDir = await window.electronAPI.getHomeDirectory();
            const targetPath = `${homeDir}\\${folderName}`;
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
                button.innerText = "⚡ CORE OPTIMIZED";
            } else {
                button.innerText = "⚡ OPTIMIZE CORE";
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
            React.createElement("div", { className: "panel system-stats-panel" },
                React.createElement("h2", null, "System Diagnostics"),

                // CPU & RAM first
                React.createElement("div", { className: "meter-group" },
                    React.createElement(SemiSpeedometer, { label: "CPU Load", value: stats.cpu, unit: "%", max: 100, accentColor: "var(--color-accent-primary)" }),
                    React.createElement(SemiSpeedometer, { label: "RAM Usage", value: stats.ram, unit: "%", max: 100, accentColor: "var(--color-accent-primary)" })
                ),

                // GPU Load & Temp
                React.createElement("div", { className: "meter-group gpu-group" },
                    React.createElement(SemiSpeedometer, { label: "GPU Load", value: stats.gpu, unit: "%", max: 100, accentColor: "var(--color-gpu-accent)", className: "gpu-usage" }),
                    React.createElement(SemiSpeedometer, { label: "GPU Temp", value: stats.gpu_temp, unit: "°C", max: 120, accentColor: "var(--color-warning)", className: "gpu-temp" })
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
                        React.createElement("div", { id: "download-text", className: "network-item" }, `${formatNetworkSpeed(stats.rx_sec)} ↓`),
                        React.createElement("div", { id: "upload-text", className: "network-item" }, `${formatNetworkSpeed(stats.tx_sec)} ↑`)
                    )
                ),

                // CPU Temp below network
                React.createElement("div", { className: "data-block" },
                    React.createElement("h3", null, "CPU Temp"),
                    React.createElement("div", { id: "temp-text", className: "temp-stat" }, `${stats.cpu_temp}°C`)
                ),

                

                // Uptime & Processes
                React.createElement("div", { className: "data-block" },
                    React.createElement("h3", null, "System Info"),
                    React.createElement("p", null, "Uptime: ", React.createElement("span", { id: "uptime-text" }, formatUptime(stats.uptime))),
                    React.createElement("p", null, "Processes: ", React.createElement("span", { id: "processes-text" }, stats.processes))
                ),

                // Boost Button
                React.createElement("button", { id: "boost-button", className: "action-button" }, "⚡ OPTIMIZE CORE")
            ),

                React.createElement("div", { className: "panel desktop-panel" }, // Changed to desktop-panel
                    React.createElement("h2", null, "Data Core & Sessions"),
                    React.createElement("div", { className: "desktop-icons-container" },
                        React.createElement("div", { className: "desktop-icon", onClick: handleGoToHome }, React.createElement("span", { className: "icon" }, "🏠"), "Home"),
                        React.createElement("div", { className: "desktop-icon", onClick: () => handleNavigateToFolder('Downloads') }, React.createElement("span", { className: "icon" }, "📂"), "Downloads"),
                        React.createElement("div", { className: "desktop-icon", onClick: () => handleNavigateToFolder('Documents') }, React.createElement("span", { className: "icon" }, "📄"), "Documents"),
                        React.createElement("div", { className: "desktop-icon", onClick: () => handleNavigateToFolder('Desktop') }, React.createElement("span", { className: "icon" }, "🖥️"), "Desktop"),
                        React.createElement("div", { className: "desktop-icon ai-shortcut" }, React.createElement("span", { className: "icon" }, "🧠"), "Project X"),
                        React.createElement("div", { className: "desktop-icon ai-shortcut" }, React.createElement("span", { className: "icon" }, "🧠"), "Cleanup Routine")
                    ),
                    currentDirPath && React.createElement("div", { className: "current-directory-view" },
                        React.createElement("h3", null, `Current Directory: ${currentDirPath}`),
                        React.createElement("div", { className: "directory-controls" },
                            React.createElement("button", { className: "action-button small", onClick: handleGoBack }, "⬆️ Back"),
                            React.createElement("button", { className: "action-button small", onClick: handleGoToHome }, "🏠 Home")
                        ),
                        React.createElement("div", { className: "file-list" },
                            fileSystemItems.length > 0 ? (
                                fileSystemItems.map((item, index) => (
                                    React.createElement("div", { key: `${item.path}-${index}`, className: `file-item ${item.isDirectory ? 'folder' : 'file'}`, onClick: () => handleFileItemClick(item) },
                                        React.createElement("span", { className: "icon" }, item.isDirectory ? "📁" : "📄"),
                                        item.name
                                    )
                                ))
                            ) : (
                                React.createElement("p", null, "Directory is empty or inaccessible.")
                            )
                        ),
                        React.createElement("button", { id: "open-file-explorer-button", className: "action-button small" }, "Open File Explorer")
                    )
                ),

                React.createElement("div", { className: "panel ai-chat-panel" },
                    React.createElement("h2", null, "AI Command Terminal"),
                    React.createElement("div", { id: "chat-display", className: "chat-terminal" }, "Files Go Here"),
                    React.createElement("div", { className: "chat-input-area" },
                        React.createElement("input", { id: "chat-input", placeholder: ">> Enter command or query...", className: "text-input" }),
                        React.createElement("button", { id: "chat-send", className: "send-button" }, "EXECUTE ", React.createElement("span", { className: "arrow" }, "▶"))
                    )
                )
            )
        )
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(App));