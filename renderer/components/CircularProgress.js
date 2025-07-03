// CircularProgress.js - Circular progress component for storage usage
const React = window.React;

/**
 * CircularProgress component for displaying percentage-based metrics in a circular gauge
 * @param {Object} props - Component props
 * @param {number} props.value - The value to display (0-100)
 * @param {string} props.label - Label text below the progress circle
 * @param {number} props.size - Size of the SVG in pixels (default: 100)
 * @param {number} props.strokeWidth - Width of the progress stroke (default: 10)
 * @param {string} props.accentColor - Color for the filled part (default: #22d3ee)
 */
export function CircularProgress({ 
    value, 
    label, 
    size = 100, 
    strokeWidth = 10, 
    accentColor = "#22d3ee" 
}) {
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

// Export the component
module.exports = CircularProgress;
