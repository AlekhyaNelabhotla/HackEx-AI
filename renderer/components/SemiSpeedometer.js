const React = window.React;

function SemiSpeedometer({ label, value, unit = "%" }) {
    const radius = 45;
    const circumference = Math.PI * radius;
    const progress = Math.min(Math.max(value, 0), 100) / 100 * circumference;

    return (
        React.createElement("div", { className: "flex flex-col items-center" },
            React.createElement("svg", { className: "w-48 h-24", viewBox: "0 0 100 50" },
                React.createElement("path", {
                    d: "M 5 50 A 45 45 0 0 1 95 50",
                    stroke: "#1e293b",
                    "stroke-width": "10",
                    fill: "transparent"
                }),
                React.createElement("path", {
                    d: "M 5 50 A 45 45 0 0 1 95 50",
                    stroke: "#22d3ee",
                    "stroke-width": "10",
                    fill: "transparent",
                    "stroke-dasharray": circumference,
                    "stroke-dashoffset": circumference - progress,
                    "stroke-linecap": "round"
                })
            ),
            React.createElement("p", { className: "mt-2 text-lg" }, `${label}`),
            React.createElement("p", { className: "text-2xl font-bold text-cyan-400" }, `${value}${unit}`)
        )
    );
}

module.exports = SemiSpeedometer;
