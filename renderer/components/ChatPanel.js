// ChatPanel.js - Functional AI chat interface component
const React = window.React;

/**
 * ChatPanel component for AI chat interface with full functionality
 * @param {Object} props - Component props
 * @param {string} props.currentDirectory - Current file system directory for context
 * @param {Object} props.systemStats - Current system statistics for AI context
 */
function ChatPanel({ currentDirectory, systemStats }) {
    const [messages, setMessages] = React.useState([]);
    const [inputValue, setInputValue] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [isConnected, setIsConnected] = React.useState(null);
    const [currentModel, setCurrentModel] = React.useState('llama3.3');
    const [availableModels, setAvailableModels] = React.useState([]);
    const chatDisplayRef = React.useRef(null);

    // Load chat history and check AI connection on mount
    React.useEffect(() => {
        initializeChat();
    }, []);

    // Auto-scroll to bottom when new messages arrive
    React.useEffect(() => {
        if (chatDisplayRef.current) {
            chatDisplayRef.current.scrollTop = chatDisplayRef.current.scrollHeight;
        }
    }, [messages]);

    const initializeChat = async () => {
        try {
            // Check connection and load models
            const modelsResult = await window.electronAPI.aiListModels();
            if (modelsResult.success) {
                setAvailableModels(modelsResult.models);
                setIsConnected(true);
                addSystemMessage('🤖 HackexAI connected successfully! Type your message below.');
            } else {
                setIsConnected(false);
                addSystemMessage('⚠️ AI service not available. Please ensure Ollama is installed and running.');
            }

            // Load previous chat history
            const historyResult = await window.electronAPI.aiGetHistory();
            if (historyResult.success && historyResult.history.length > 0) {
                const formattedHistory = historyResult.history.map(msg => ({
                    id: Date.now() + Math.random(),
                    role: msg.role,
                    content: msg.content,
                    timestamp: new Date(msg.timestamp)
                }));
                setMessages(formattedHistory);
            }
        } catch (error) {
            console.error('Error initializing chat:', error);
            setIsConnected(false);
            addSystemMessage('❌ Error initializing AI chat. Please check your setup.');
        }
    };

    const addSystemMessage = (content) => {
        const systemMessage = {
            id: Date.now() + Math.random(),
            role: 'system',
            content,
            timestamp: new Date()
        };
        setMessages(prev => [...prev, systemMessage]);
    };

    const handleSend = async () => {
        if (!inputValue.trim() || isLoading) return;

        const userMessage = {
            id: Date.now() + Math.random(),
            role: 'user',
            content: inputValue.trim(),
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            // Prepare context for AI
            const context = {
                currentDirectory,
                systemStats,
                timestamp: new Date().toISOString()
            };

            const response = await window.electronAPI.aiChat(userMessage.content, context);

            const aiMessage = {
                id: Date.now() + Math.random(),
                role: 'assistant',
                content: response.message,
                timestamp: new Date(),
                model: response.model,
                success: response.success
            };

            setMessages(prev => [...prev, aiMessage]);

            if (!response.success) {
                setIsConnected(false);
            }
        } catch (error) {
            console.error('Error sending message:', error);
            const errorMessage = {
                id: Date.now() + Math.random(),
                role: 'system',
                content: '❌ Error sending message. Please try again.',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const clearChat = async () => {
        try {
            await window.electronAPI.aiClearHistory();
            setMessages([]);
            addSystemMessage('🧹 Chat history cleared.');
        } catch (error) {
            console.error('Error clearing chat:', error);
            addSystemMessage('❌ Error clearing chat history.');
        }
    };

    const formatMessage = (message) => {
        if (!message.content) return '';
        
        // Basic escape HTML to prevent XSS
        let formatted = message.content
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;');
        
        // Format code blocks (triple backticks)
        formatted = formatted.replace(/```([\s\S]*?)```/g, 
            '<div class="code-block">$1</div>');
        
        // Format inline code (single backticks)
        formatted = formatted.replace(/`([^`]+)`/g, 
            '<code class="inline-code">$1</code>');
        
        // Format bold text
        formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        // Format italic text
        formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
        
        // Format line breaks (preserve newlines)
        formatted = formatted.replace(/\n/g, '<br>');
        
        // Format lists
        formatted = formatted.replace(/^- (.*$)/gim, '• $1');
        formatted = formatted.replace(/^\* (.*$)/gim, '• $1');
        
        return formatted;
    };

    const getMessageIcon = (role) => {
        switch (role) {
            case 'user': return '👤';
            case 'assistant': return '🤖';
            case 'system': return '⚙️';
            default: return '💬';
        }
    };

    const getMessageClass = (message) => {
        let baseClass = 'chat-message';
        if (message.role === 'user') baseClass += ' user-message';
        if (message.role === 'assistant') baseClass += ' ai-message';
        if (message.role === 'system') baseClass += ' system-message';
        if (message.success === false) baseClass += ' error-message';
        return baseClass;
    };

    return (
        React.createElement("div", { className: "panel ai-chat-panel" },
            // Header with status and controls
            React.createElement("div", { className: "chat-header" },
                React.createElement("h2", null, "🤖 HackexAI Chat"),
                React.createElement("div", { className: "chat-controls" },
                    React.createElement("span", { 
                        className: `connection-status ${isConnected ? 'connected' : 'disconnected'}` 
                    }, isConnected ? '🟢 Connected' : '🔴 Disconnected'),
                    React.createElement("button", { 
                        className: "clear-chat-btn",
                        onClick: clearChat,
                        title: "Clear chat history"
                    }, "🗑️")
                )
            ),
            
            // Chat display area
            React.createElement("div", { 
                ref: chatDisplayRef,
                className: "chat-display"
            }, messages.length === 0 
                ? React.createElement("div", { className: "empty-chat" }, 
                    "👋 Welcome to HackexAI! Start by typing a message below.")
                : messages.map(message => 
                    React.createElement("div", { 
                        key: message.id,
                        className: getMessageClass(message)
                    },
                        React.createElement("div", { className: "message-header" },
                            React.createElement("span", { className: "message-icon" }, getMessageIcon(message.role)),
                            React.createElement("span", { className: "message-role" }, 
                                message.role === 'user' ? 'You' : 
                                message.role === 'assistant' ? `AI${message.model ? ` (${message.model})` : ''}` : 
                                'System'
                            ),
                            React.createElement("span", { className: "message-time" }, 
                                message.timestamp.toLocaleTimeString()
                            )
                        ),
                        React.createElement("div", { 
                            className: "message-content",
                            dangerouslySetInnerHTML: { __html: formatMessage(message) }
                        })
                    )
                )
            ),
            
            // Loading indicator
            isLoading && React.createElement("div", { className: "loading-indicator" },
                React.createElement("span", null, "🤖 AI is thinking..."),
                React.createElement("div", { className: "loading-dots" },
                    React.createElement("span", null, "●"),
                    React.createElement("span", null, "●"),
                    React.createElement("span", null, "●")
                )
            ),
            
            // Enhanced Input area with clean modular design
            React.createElement("div", { className: "cyberpunk-input-container" },
                React.createElement("div", { className: "cyberpunk-input-wrapper" },
                    // Floating label
                    React.createElement("label", { 
                        className: `cyberpunk-label ${inputValue ? 'active' : ''}`,
                        htmlFor: "chat-input"
                    }, "💬 Message HackexAI"),
                    
                    // Clean input field
                    React.createElement("textarea", {
                        id: "chat-input",
                        value: inputValue,
                        onChange: (e) => {
                            setInputValue(e.target.value);
                            // Auto-resize textarea
                            e.target.style.height = 'auto';
                            e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
                        },
                        onKeyPress: handleKeyPress,
                        placeholder: "✨ Ask me anything... Type your message here",
                        className: "cyberpunk-input",
                        rows: 1,
                        disabled: isLoading || !isConnected,
                        autoComplete: "off",
                        spellCheck: false,
                        maxLength: 4000
                    }),
                    
                    // Character counter and status
                    React.createElement("div", { className: "cyberpunk-input-footer" },
                        React.createElement("span", { className: "char-counter" }, 
                            `${inputValue.length}/4000`
                        ),
                        React.createElement("span", { className: `connection-status ${isConnected ? 'online' : 'offline'}` },
                            isConnected ? "🟢 AI Ready" : "🔴 Offline"
                        )
                    )
                ),
                
                // Clean send button
                React.createElement("button", {
                    onClick: handleSend,
                    disabled: !inputValue.trim() || isLoading || !isConnected,
                    className: `cyberpunk-btn ${isLoading ? 'loading' : ''}`
                }, 
                    React.createElement("div", { className: "cyberpunk-btn-content" },
                        React.createElement("span", { className: "cyberpunk-btn-text" },
                            isLoading ? "Sending..." : "Send"
                        ),
                        !isLoading && React.createElement("span", { className: "cyberpunk-btn-icon" }, "▶")
                    )
                )
            )
        )
    );
}

// Export the component
module.exports = ChatPanel;
