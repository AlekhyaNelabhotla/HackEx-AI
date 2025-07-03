// ChatPanel.js - AI chat interface component
const React = window.React;

/**
 * ChatPanel component for AI chat interface
 * @param {Object} props - Component props
 */
function ChatPanel({ handleChatSend }) {
    return (
        React.createElement("div", { className: "panel ai-chat-panel" },
            React.createElement("h2", null, "AI Command Terminal"),
            React.createElement("div", { id: "chat-display", className: "chat-terminal" }, "Files Go Here"),
            React.createElement("div", { className: "chat-input-area" },
                React.createElement("input", { 
                    id: "chat-input", 
                    placeholder: ">> Enter command or query...", 
                    className: "text-input" 
                }),
                React.createElement("button", { 
                    id: "chat-send", 
                    className: "send-button"
                }, "EXECUTE ", React.createElement("span", { className: "arrow" }, "▶"))
            )
        )
    );
}

// Export the component
module.exports = ChatPanel;
