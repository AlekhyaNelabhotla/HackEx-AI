# 🤖 HackexAI - AI Integration Setup Guide

## 🎯 Complete Ollama & AI Model Setup

This guide covers everything you need to get AI functionality working in HackexAI.

## 📋 Quick Start Checklist

- [ ] Ollama installed and running
- [ ] AI model downloaded (llama3.2:1b recommended)
- [ ] HackexAI configured for your model
- [ ] Test conversation successful

## 🔧 Ollama Installation

### Windows
```powershell
# Method 1: Using winget (recommended)
winget install ollama

# Method 2: Download installer
# Visit https://ollama.ai and download the Windows installer
```

### macOS
```bash
# Method 1: Using Homebrew
brew install ollama

# Method 2: Download from website
# Visit https://ollama.ai
```

### Linux
```bash
# Official installation script
curl -fsSL https://ollama.ai/install.sh | sh
```

## 🚀 Starting Ollama Service

### Start the Service
```bash
# Start Ollama server (keep this terminal open)
ollama serve

# You should see output like:
# time=2024-XX-XX level=INFO source=images.go:XXX msg="total blobs: X"
# time=2024-XX-XX level=INFO source=images.go:XXX msg="total unused blobs removed: X"
# time=2024-XX-XX level=INFO source=routes.go:XXX msg="Listening on 127.0.0.1:11434"
```

### Verify Installation
```bash
# In a new terminal, test Ollama
ollama --version

# Should output: ollama version is X.X.X
```

## 🧠 AI Model Selection & Download

### Recommended Models

| Model | Size | RAM Required | Use Case |
|-------|------|-------------|----------|
| `llama3.2:1b` | 1.3GB | 4-8GB | **Recommended** - Fast, lightweight |
| `llama3.2:3b` | 2.5GB | 8-16GB | Balanced performance |
| `llama3.1:8b` | 5.5GB | 16-32GB | High quality responses |
| `llama3.3` | 8GB+ | 32GB+ | Latest, most capable |

### Download Your Chosen Model

```bash
# For testing and lightweight systems (RECOMMENDED)
ollama pull llama3.2:1b

# For balanced performance
ollama pull llama3.2:3b

# For high-performance systems
ollama pull llama3.1:8b

# For cutting-edge capabilities (requires powerful hardware)
ollama pull llama3.3
```

### Monitor Download Progress
```bash
# Models are large files - monitor progress:
# ✓ f02dd72bb242 100% ████████████████████████ 1.3 GB                         
# ✓ 9368374632b6 100% ████████████████████████  3.4 kB                         
# ✓ 56bb8bd477a5 100% ████████████████████████   67 B                         
# ✓ 9123f7e87ad0 100% ████████████████████████   34 kB                        
# verifying sha256 digest
# writing manifest
# success
```

### Verify Model Installation
```bash
# List installed models
ollama list

# Test model directly
ollama run llama3.2:1b "Hello, how are you?"
```

## ⚙️ HackexAI Configuration

### Update Model in main.js
```javascript
// In main.js, around line 15:
class AIService {
    constructor() {
        this.conversationHistory = [];
        this.defaultModel = 'llama3.2:1b'; // ← Change this to your model
        // ...
    }
}
```

### Available Model Options
```javascript
// Lightweight options
this.defaultModel = 'llama3.2:1b';
this.defaultModel = 'llama3.2:3b';

// High-performance options  
this.defaultModel = 'llama3.1:8b';
this.defaultModel = 'llama3.3';

// You can also use specific versions
this.defaultModel = 'llama3.2:1b-instruct-q4_0';
```

## 🧪 Testing Your Setup

### 1. Start Ollama
```bash
# Terminal 1: Start Ollama service
ollama serve
```

### 2. Test Model Directly
```bash
# Terminal 2: Test the model
ollama run llama3.2:1b "Explain what you are in one sentence."
```

### 3. Start HackexAI
```bash
# Terminal 3: In your project directory
npm run build:css
npm start
```

### 4. Test in Application
1. Open HackexAI
2. Navigate to the AI Chat panel
3. Type a test message: "Hello, are you working?"
4. Verify you get a response with the model name shown

## 🐛 Troubleshooting

### Common Issues

#### 1. "Connection Refused" or "AI Service Error"
```bash
# Check if Ollama is running
ps aux | grep ollama  # Linux/macOS
tasklist | findstr ollama  # Windows

# If not running, start it:
ollama serve
```

#### 2. "Model Not Found"
```bash
# List available models
ollama list

# If your model isn't listed, download it:
ollama pull llama3.2:1b

# Check the exact model name and update main.js
```

#### 3. Slow Responses
```bash
# Check system resources
# CPU/RAM usage should be reasonable
# Consider using a smaller model:
ollama pull llama3.2:1b  # Instead of larger models
```

#### 4. Out of Memory Errors
```bash
# Use a smaller model
ollama pull llama3.2:1b

# Or increase virtual memory/swap space
# Close other memory-intensive applications
```

#### 5. Port Already in Use
```bash
# Check what's using port 11434
netstat -ano | findstr :11434  # Windows
lsof -i :11434  # Linux/macOS

# Kill conflicting process or change Ollama port:
ollama serve --host 127.0.0.1:11435
```

## 🔧 Advanced Configuration

### Custom Ollama Settings
```bash
# Change host/port
ollama serve --host 0.0.0.0:11434

# Set environment variables
export OLLAMA_HOST=127.0.0.1:11434
export OLLAMA_MODELS=/custom/path/models
```

### Multiple Models
```javascript
// In main.js, you can implement model switching:
async listAvailableModels() {
    try {
        const models = await ollama.list();
        return models.models.map(model => model.name);
    } catch (error) {
        console.error('Error listing models:', error);
        return [];
    }
}

setModel(modelName) {
    this.defaultModel = modelName;
}
```

### Performance Tuning
```bash
# For better performance, consider:
# 1. SSD storage for faster model loading
# 2. Adequate RAM (see model requirements)
# 3. Close unnecessary applications
# 4. Use GPU acceleration (if available)
```

## 📊 Model Comparison

### Performance vs Resource Usage

| Model | Response Quality | Speed | RAM Usage | Best For |
|-------|------------------|-------|-----------|----------|
| llama3.2:1b | Good | Fast | Low (4GB) | Testing, lightweight |
| llama3.2:3b | Very Good | Medium | Medium (8GB) | Daily use |
| llama3.1:8b | Excellent | Slower | High (16GB) | Complex tasks |
| llama3.3 | Outstanding | Slowest | Very High (32GB+) | Professional use |

### Choosing the Right Model

**For Development/Testing:**
- Use `llama3.2:1b` - fast responses, low resource usage

**For Daily Use:**
- Use `llama3.2:3b` - good balance of quality and performance

**For Production/Professional:**
- Use `llama3.1:8b` or `llama3.3` - best quality responses

## 🔄 Updating and Maintenance

### Update Ollama
```bash
# Windows
winget upgrade ollama

# macOS
brew upgrade ollama

# Linux
curl -fsSL https://ollama.ai/install.sh | sh
```

### Update Models
```bash
# Re-download model to get latest version
ollama pull llama3.2:1b

# Remove old models to save space
ollama rm old-model-name
```

### Monitor Resource Usage
- Check CPU/RAM usage during AI conversations
- Monitor disk space (models can be large)
- Restart Ollama service if performance degrades

## 🎉 Success!

If you can:
1. ✅ Start Ollama service without errors
2. ✅ See your model in `ollama list`
3. ✅ Get responses from `ollama run model-name "test"`
4. ✅ Chat successfully in HackexAI

**You're all set! Enjoy your AI-powered desktop experience! 🚀**

---

*Need more help? Check our [main README](README.md) or [general setup guide](SETUP_GUIDE.md)*
