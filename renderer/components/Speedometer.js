const React = require('react');

function Speedometer({ label, value }) {
    const strokeDasharray = 282;
    const progress = (value / 100) * strokeDasharray;

    return (
        React.createElement("div", { className: "flex flex-col items-center" },
            React.createElement("svg", { className: "w-40 h-40 rotate-[-90deg]", viewBox: "0 0 100 100" },
                React.createElement("circle", {
                    cx: "50", cy: "50", r: "45",
                    stroke: "#1e293b", "stroke-width": "10",
                    fill: "transparent"
                }),
                React.createElement("circle", {
                    cx: "50", cy: "50", r: "45",
                    stroke: "#22d3ee", "stroke-width": "10",
                    fill: "transparent",
                    "stroke-dasharray": strokeDasharray,
                    "stroke-dashoffset": strokeDasharray - progress,
                    "stroke-linecap": "round"
                })
            ),
            React.createElement("p", { className: "mt-4 text-xl" }, `${label}`),
            React.createElement("p", { className: "text-2xl font-bold text-cyan-400" }, `${value}%`)
        )
    );
}

module.exports = Speedometer;
