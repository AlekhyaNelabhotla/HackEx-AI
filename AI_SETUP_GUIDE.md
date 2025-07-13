# HackEx AI - Local AI Integration Setup Guide

## 🚀 Quick Start with Local AI

Your HackEx AI application now includes powerful local AI capabilities using Ollama. Follow these steps to get the AI chat functionality working:

### Step 1: Install Ollama

1. **Download Ollama** from https://ollama.ai
2. **Install** the downloaded package for Windows
3. **Verify installation** by opening PowerShell and running:
   ```powershell
   ollama --version
   ```

### Step 2: Start Ollama Service

1. **Open PowerShell** as Administrator
2. **Start the Ollama service**:
   ```powershell
   ollama serve
   ```
   Keep this terminal window open while using the AI features.

### Step 3: Download a Language Model

1. **In a new PowerShell window**, download a model:
   ```powershell
   # Download Llama 3.2 (3B parameters - good balance of speed/quality)
   ollama pull llama3.3
   
   # Alternative: Smaller, faster model
   ollama pull llama3.3:1b
   
   # Alternative: Larger, more capable model  
   ollama pull llama3.1:8b
   ```

### Step 4: Test Your Setup

1. **Launch HackEx AI** (if not already running)
2. **Look for the AI Chat panel** on the right side
3. **Check connection status** - should show "🟢 Connected"
4. **Send a test message** like "Hello, can you help me?"

## 🤖 AI Features Available

### Chat Capabilities
- **Natural conversations** with context awareness
- **System information** access (CPU, RAM, GPU stats)
- **File system awareness** (current directory context)
- **Code formatting** with syntax highlighting
- **Conversation history** persistence

### System Integration
- **File operations** assistance
- **System monitoring** explanations  
- **Command suggestions** (safe commands only)
- **Troubleshooting** help

## ⚙️ Configuration Options

### Changing AI Models
The application defaults to `llama3.3`. To use a different model:

1. **Download the model**:
   ```powershell
   ollama pull <model-name>
   ```

2. **Available models include**:
   - `llama3.3` - Default, balanced performance
   - `llama3.3:1b` - Fast, lighter model
   - `llama3.1:8b` - More capable, slower
   - `codellama` - Specialized for coding
   - `mistral` - Alternative general model

3. **The model can be changed** through the chat interface (feature will be added in future updates)

### Performance Tips
- **Use smaller models** (1b, 3b) for faster responses
- **Use larger models** (8b+) for more detailed, accurate responses
- **Keep Ollama running** in the background for best performance
- **Close other AI applications** to free up resources

## 🔧 Troubleshooting

### Connection Issues
- **"🔴 Disconnected"** status:
  1. Ensure Ollama is running (`ollama serve`)
  2. Check if port 11434 is available
  3. Restart the application

### Model Download Issues
- **Slow downloads**: Use smaller models first
- **Network errors**: Check internet connection
- **Storage space**: Models require 2-8GB each

### Performance Issues
- **Slow responses**: Try a smaller model
- **High CPU usage**: Normal for local AI processing
- **Memory usage**: Close other applications if needed

## 📋 Quick Commands Reference

```powershell
# Essential Ollama commands
ollama serve              # Start Ollama service
ollama list              # Show installed models  
ollama pull <model>      # Download a model
ollama rm <model>        # Remove a model
ollama ps               # Show running models
```

## 🎯 Next Steps

Once your AI is working:
1. **Explore natural language queries** about your system
2. **Ask for help** with file management
3. **Request system optimization** suggestions
4. **Get coding assistance** and explanations
5. **Use it as your personal** desktop assistant

## 🛟 Support

If you encounter issues:
1. **Check Ollama logs** in the terminal where you ran `ollama serve`
2. **Restart both** Ollama and HackEx AI
3. **Try a different model** if responses seem slow
4. **Check system resources** (RAM, disk space)

---

**Happy AI-powered computing! 🚀**
