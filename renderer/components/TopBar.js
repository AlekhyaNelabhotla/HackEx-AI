// TopBar.js - Application header component
const React = window.React;

/**
 * TopBar component for the app header with title and close button
 */
export function TopBar() {
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
            React.createElement("button", { 
                className: "close-button", 
                onClick: handleClose 
            }, "X")
        )
    );
}
