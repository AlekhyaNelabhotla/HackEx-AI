# 🚀 HackexAI - The Future of Desktop AI Integration

<div align="center">

![HackexAI Logo](https://img.shields.io/badge/HackexAI-v1.0.0-blue?style=for-the-badge&logo=robot&logoColor=white)
![Electron](https://img.shields.io/badge/Electron-37.1.0-47848F?style=for-the-badge&logo=electron&logoColor=white)
![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Ollama](https://img.shields.io/badge/Ollama-AI-000000?style=for-the-badge&logo=llama&logoColor=white)

**🎯 Transforming desktop computing with intelligent AI assistance**

[Features](#-features) • [Installation](#-installation) • [Tech Stack](#-tech-stack) • [Vision](#-our-vision) • [Contributing](#-contributing)

</div>

---

## 🌟 Our Vision

**HackexAI** represents the next evolution in desktop computing - a seamless fusion of artificial intelligence and system management. We envision a future where every desktop application is intelligently enhanced, where complex system operations become conversational, and where AI doesn't just assist but truly understands your workflow.

> *"Breaking the boundaries between human intent and machine capability"*

### 🎭 What Makes Us Different

- **🧠 True AI Integration**: Not just a chatbot overlay, but deep AI integration with system operations
- **🎨 Futuristic Design**: Cutting-edge UI that feels like science fiction made real
- **⚡ Real-time Intelligence**: Live system monitoring with AI-powered insights
- **🔧 Developer-First**: Built by developers, for developers, with extensibility at its core

---

## ✨ Features

### 🤖 AI-Powered Chat Interface
- **Conversational File Management**: Navigate, search, and manipulate files through natural language
- **Intelligent System Analysis**: Get AI insights on system performance and optimization
- **Context-Aware Responses**: AI understands your current system state and working directory
- **Multi-Model Support**: Seamlessly switch between different Ollama models

### 📊 Advanced System Monitoring
- **Real-time Performance Metrics**: CPU, RAM, GPU, and storage monitoring with beautiful visualizations
- **Network Traffic Analysis**: Live upload/download speed tracking
- **Temperature Monitoring**: Keep track of CPU and GPU temperatures
- **Process Management**: Monitor running processes and system uptime

### 🗂️ Intelligent File System
- **Visual File Explorer**: Modern, responsive file browser with advanced operations
- **Smart Context Menus**: Cut, copy, paste, delete, rename with visual feedback
- **Quick Access**: Instant navigation to frequently used directories
- **File Properties**: Detailed file information and metadata

### 🎨 Stunning Visual Design
- **Glassmorphism UI**: Modern frosted glass effects with subtle animations
- **Cyberpunk Aesthetics**: Neon accents and gradient overlays
- **Responsive Design**: Optimized for various screen sizes and resolutions
- **Dark Theme**: Easy on the eyes with high contrast for readability

---

## 🚀 Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - [Download here](https://git-scm.com/)
- **Ollama** - [Download here](https://ollama.ai/)

### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/YourUsername/HackEx-AI.git
cd HackEx-AI

# 2. Install dependencies
npm install

# 3. Install Ollama (Windows)
winget install ollama

# 4. Start Ollama service
ollama serve

# 5. Download AI model (in a new terminal)
ollama pull llama3.2:1b

# 6. Build CSS styles
npm run build:css

# 7. Launch HackexAI
npm start
```

### 🔧 Configuration

#### Ollama Setup
1. **Install Ollama**: Visit [ollama.ai](https://ollama.ai/) and download the installer
2. **Start Service**: Run `ollama serve` in your terminal
3. **Download Models**: Choose from available models:
   ```bash
   # Lightweight (recommended for testing)
   ollama pull llama3.2:1b
   
   # More powerful options
   ollama pull llama3.2:3b
   ollama pull llama3.1:8b
   ollama pull llama3.3:latest
   ```

#### Model Configuration
Edit `main.js` to change the default model:
```javascript
this.defaultModel = 'llama3.2:1b'; // Change this to your preferred model
```

---

## 🛠️ Tech Stack

### Core Technologies

| Technology | Version | Purpose | Why We Chose It |
|------------|---------|---------|-----------------|
| **Electron** | 37.1.0 | Desktop Framework | Cross-platform, web tech familiarity, rich ecosystem |
| **React** | 19.1.0 | UI Framework | Component reusability, virtual DOM, massive community |
| **Node.js** | Latest LTS | Backend Runtime | JavaScript everywhere, npm ecosystem, async I/O |
| **Ollama** | 0.9.6+ | AI Engine | Local AI, privacy-focused, model flexibility |

### Styling & Design

| Tool | Purpose | Benefits |
|------|---------|----------|
| **Tailwind CSS** | Utility Framework | Rapid development, consistent design, small bundle |
| **Custom CSS** | Advanced Styling | Glassmorphism effects, animations, gradients |
| **CSS Grid/Flexbox** | Layout | Responsive design, modern alignment |

### System Integration

| Package | Function | Capability |
|---------|----------|------------|
| **systeminformation** | System Metrics | CPU, RAM, GPU, network monitoring |
| **Node.js FS** | File Operations | Directory listing, file manipulation |
| **Electron IPC** | Process Communication | Secure renderer-main communication |

---

## 📁 Project Structure

```
HackEx-AI/
├── 📂 renderer/                 # Frontend React components
│   ├── 📂 components/          # Reusable UI components
│   │   ├── ChatPanel.js        # AI chat interface
│   │   ├── SystemStats.js      # Performance monitoring
│   │   ├── FileSystem.js       # File browser
│   │   ├── TopBar.js          # Application header
│   │   └── Speedometer.js      # Network visualizations
│   ├── 📂 styles/             # CSS stylesheets
│   │   ├── base.css           # Global styles
│   │   ├── chatpanel.css      # Chat interface styling
│   │   ├── systemstats.css    # Monitoring panel styles
│   │   └── topbar.css         # Header styling
│   ├── index.html             # Main application window
│   └── app.js                 # Application orchestrator
├── 📂 infra/                   # (Future) Infrastructure as Code
├── main.js                     # Electron main process
├── preload.js                  # Secure API bridge
├── package.json               # Dependencies & scripts
├── tailwind.config.js         # Tailwind configuration
└── README.md                  # You are here! 📍
```

---

## 🎨 Design Philosophy

### Visual Identity
- **Color Palette**: Cyan (#22d3ee), Blue (#3b82f6), Purple (#8b5cf6)
- **Typography**: Orbitron for headers, Inter for body text, Fira Code for code
- **Effects**: Glassmorphism, subtle animations, neon glows
- **Layout**: Clean, spacious, with clear visual hierarchy

### User Experience
- **Intuitive Navigation**: Every action should feel natural
- **Immediate Feedback**: Visual responses to user interactions
- **Accessibility**: High contrast, readable fonts, keyboard navigation
- **Performance**: Smooth animations, optimized rendering

---

## 🔮 Future Roadmap

### Phase 1: Core Enhancement (Current)
- ✅ AI Chat Integration
- ✅ System Monitoring
- ✅ File Management
- ✅ Modern UI Design

### Phase 2: Intelligence Expansion
- 🔄 Advanced AI Commands
- 🔄 Plugin System
- 🔄 Voice Commands
- 🔄 Multi-language Support

### Phase 3: Platform Evolution
- 📋 Cloud Integration
- 📋 Team Collaboration
- 📋 Mobile Companion App
- 📋 Enterprise Features

### Phase 4: Ecosystem
- 📋 Developer APIs
- 📋 Third-party Integrations
- 📋 Marketplace
- 📋 Community Platform

---

## 🤝 Contributing

We believe in the power of community! Here's how you can contribute:

### 🐛 Bug Reports
Found an issue? [Open an issue](https://github.com/YourUsername/HackEx-AI/issues) with:
- Detailed description
- Steps to reproduce
- System information
- Screenshots (if applicable)

### 💡 Feature Requests
Have an idea? We'd love to hear it! [Create a feature request](https://github.com/YourUsername/HackEx-AI/issues/new) with:
- Clear description of the feature
- Use case examples
- Mockups (if available)

### 🔧 Development Setup

```bash
# Fork the repository on GitHub
# Clone your fork
git clone https://github.com/YourUsername/HackEx-AI.git

# Create a feature branch
git checkout -b feature/amazing-feature

# Make your changes
# Test thoroughly
npm run build:css
npm start

# Commit your changes
git commit -m "Add amazing feature"

# Push to your fork
git push origin feature/amazing-feature

# Create a Pull Request
```

### 📋 Development Guidelines
- Follow existing code style
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation if needed
- Keep commits atomic and descriptive

---

## 🏆 Awards & Recognition

<div align="center">

![GitHub Stars](https://img.shields.io/github/stars/YourUsername/HackEx-AI?style=social)
![GitHub Forks](https://img.shields.io/github/forks/YourUsername/HackEx-AI?style=social)
![GitHub Issues](https://img.shields.io/github/issues/YourUsername/HackEx-AI)
![GitHub PRs](https://img.shields.io/github/issues-pr/YourUsername/HackEx-AI)

*Building the future, one commit at a time*

</div>

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**MIT License Summary:**
- ✅ Commercial use
- ✅ Modification
- ✅ Distribution
- ✅ Private use
- ❌ Liability
- ❌ Warranty

---

## 🙏 Acknowledgments

### Special Thanks
- **Ollama Team** - For making local AI accessible and powerful
- **Electron Community** - For the robust desktop application framework
- **React Team** - For the incredible UI library
- **Open Source Community** - For endless inspiration and support

### Inspiration
This project draws inspiration from:
- Futuristic interfaces in sci-fi media
- Modern AI development tools
- Community feedback and feature requests
- The vision of seamless human-AI collaboration

---

## 📞 Contact & Support

<div align="center">

### Get in Touch

[![Discord](https://img.shields.io/badge/Discord-Join%20Server-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/hackexai)
[![Twitter](https://img.shields.io/badge/Twitter-Follow%20Us-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/hackexai)
[![Email](https://img.shields.io/badge/Email-Contact%20Us-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:support@hackexai.dev)

**Love HackexAI? Give us a ⭐ on GitHub!**

---

*Made with ❤️ by the HackexAI Team*

*"The future is not something we enter. The future is something we create."*

</div>
