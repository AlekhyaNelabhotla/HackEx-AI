const React = window.React;

/**
 * SemiSpeedometer component
 * @param {Object} props - Component props
 * @param {string} props.label - Label text below the speedometer
 * @param {number} props.value - Current value to display
 * @param {string} props.unit - Unit to display after the value (%, °C, etc)
 * @param {number} props.max - Maximum value for the scale (default: 100)
 * @param {string} props.accentColor - Color for the filled part (default: #22d3ee)
 * @param {string} props.className - Additional CSS classes
 */
export function SemiSpeedometer({ 
    label, 
    value, 
    unit = "%", 
    max = 100, 
    accentColor = "#22d3ee", 
    className = "" 
}) {
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

// Export the component
module.exports = SemiSpeedometer;
