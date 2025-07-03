// SystemStats.js - System statistics display component
const React = window.React;
const SemiSpeedometer = require('./SemiSpeedometer');
const CircularProgress = require('./CircularProgress');

/**
 * Helper function for dynamic unit conversion for network speed
 */
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

/**
 * Function to format Uptime
 */
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

/**
 * SystemStats component for displaying system metrics
 * @param {Object} props - Component props
 * @param {Object} props.stats - System statistics object
 * @param {number} props.stats.cpu - CPU usage percentage
 * @param {number} props.stats.ram - RAM usage percentage
 * @param {number} props.stats.storage - Storage usage percentage
 * @param {number} props.stats.rx_sec - Network download speed in bytes/sec
 * @param {number} props.stats.tx_sec - Network upload speed in bytes/sec
 * @param {number} props.stats.gpu - GPU usage percentage
 * @param {number} props.stats.gpu_temp - GPU temperature in °C
 * @param {number} props.stats.cpu_temp - CPU temperature in °C
 * @param {number} props.stats.uptime - System uptime in seconds
 * @param {number} props.stats.processes - Number of running processes
 */
function SystemStats({ stats, handleBoostClick }) {
    return (
        React.createElement("div", { className: "panel system-stats-panel" },
            // CPU & RAM first
            React.createElement("div", { className: "meter-group" },
                React.createElement(SemiSpeedometer, { 
                    label: "CPU Load", 
                    value: stats.cpu, 
                    unit: "%", 
                    max: 100, 
                    accentColor: "var(--color-accent-primary)" 
                }),
                React.createElement(SemiSpeedometer, { 
                    label: "RAM Usage", 
                    value: stats.ram, 
                    unit: "%", 
                    max: 100, 
                    accentColor: "var(--color-accent-primary)" 
                })
            ),

            // GPU Load & Temp
            React.createElement("div", { className: "meter-group gpu-group" },
                React.createElement(SemiSpeedometer, { 
                    label: "GPU Load", 
                    value: stats.gpu, 
                    unit: "%", 
                    max: 100, 
                    accentColor: "var(--color-gpu-accent)", 
                    className: "gpu-usage" 
                }),
                React.createElement(SemiSpeedometer, { 
                    label: "GPU Temp", 
                    value: stats.gpu_temp, 
                    unit: "°C", 
                    max: 120, 
                    accentColor: "var(--color-warning)", 
                    className: "gpu-temp" 
                })
            ),

            // Storage below
            React.createElement("div", { className: "data-block-group" },
                React.createElement("div", { className: "data-block flex-center" },
                    React.createElement(CircularProgress, { 
                        label: "Storage Used", 
                        value: stats.storage, 
                        size: 80, 
                        strokeWidth: 8, 
                        accentColor: "var(--color-accent-primary)" 
                    })
                )
            ),

            // Network below storage
            React.createElement("div", { className: "data-block" },
                React.createElement("h3", null, "Network Flow"),
                React.createElement("div", { className: "network-stats" },
                    React.createElement("div", { 
                        id: "download-text", 
                        className: "network-item" 
                    }, `${formatNetworkSpeed(stats.rx_sec)} ↓`),
                    React.createElement("div", { 
                        id: "upload-text", 
                        className: "network-item" 
                    }, `${formatNetworkSpeed(stats.tx_sec)} ↑`)
                )
            ),

            // CPU Temp below network
            React.createElement("div", { className: "data-block" },
                React.createElement("h3", null, "CPU Temp"),
                React.createElement("div", { 
                    id: "temp-text", 
                    className: "temp-stat" 
                }, `${stats.cpu_temp}°C`)
            ),

            // Uptime & Processes
            React.createElement("div", { className: "data-block" },
                React.createElement("h3", null, "System Info"),
                React.createElement("p", null, "Uptime: ", 
                    React.createElement("span", { 
                        id: "uptime-text" 
                    }, formatUptime(stats.uptime))
                ),
                React.createElement("p", null, "Processes: ", 
                    React.createElement("span", { 
                        id: "processes-text" 
                    }, stats.processes)
                )
            ),

            // Boost Button
            React.createElement("button", { 
                id: "boost-button", 
                className: "action-button",
                onClick: handleBoostClick
            }, "⚡ OPTIMIZE CORE")
        )
    );
}

// Export the component
module.exports = SystemStats;
