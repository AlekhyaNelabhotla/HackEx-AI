# 🔧 HackexAI - Complete Setup Guide

## 🎯 Overview
This guide will walk you through setting up HackexAI from scratch. Follow these steps carefully for a smooth installation experience.

## 📋 Prerequisites

### Required Software
1. **Node.js (v18.0.0+)** - [Download](https://nodejs.org/)
2. **Git** - [Download](https://git-scm.com/)
3. **Ollama** - [Download](https://ollama.ai/)

### System Requirements
- **OS**: Windows 10/11, macOS 10.15+, Linux Ubuntu 18.04+
- **RAM**: 8GB minimum (16GB recommended for larger AI models)
- **Storage**: 10GB free space (more for additional AI models)
- **Network**: Internet connection for initial setup and model downloads

## 🚀 Installation Steps

### Step 1: Install Node.js and npm
```bash
# Verify installation
node --version  # Should show v18.0.0 or higher
npm --version   # Should show npm version
```

### Step 2: Install Ollama
```bash
# Windows (using winget)
winget install ollama

# macOS (using Homebrew)
brew install ollama

# Linux
curl -fsSL https://ollama.ai/install.sh | sh
```

### Step 3: Clone and Setup Project
```bash
# Clone the repository
git clone https://github.com/YourUsername/HackEx-AI.git
cd HackEx-AI

# Install dependencies
npm install

# Install system information package
npm install systeminformation

# Install Ollama JavaScript client
npm install ollama

# Install React Icons for UI enhancement
npm install react-icons
```

### Step 4: Start Ollama Service
```bash
# Start Ollama in a new terminal window
ollama serve

# Keep this terminal open - Ollama needs to run continuously
```

### Step 5: Download AI Models
```bash
# In another terminal, download your preferred model
# Lightweight option (recommended for testing)
ollama pull llama3.2:1b

# Alternative models (choose one based on your system):
# ollama pull llama3.2:3b    # Medium size, good balance
# ollama pull llama3.1:8b    # Large, more capable
# ollama pull llama3.3       # Latest, most advanced
```

### Step 6: Build and Run
```bash
# Build CSS styles
npm run build:css

# Start the application
npm start
```

### Step 3: Build CSS
```bash
# Build Tailwind CSS (required before first run)
npm run build:css

# Wait for "Done in XXXms" message, then press Ctrl+C to stop the watcher
```

### Step 4: Run Application
```bash
# Start the application
npm start
```

## Troubleshooting

### Issue 1: System Stats Showing 0% or Not Updating

**Symptoms**: CPU, RAM, GPU gauges show 0% or don't update

**Solutions**:
1. **Run as Administrator** (Windows):
   ```bash
   # Right-click terminal and "Run as Administrator"
   npm start
   ```

2. **Install Windows Build Tools**:
   ```bash
   npm install --global windows-build-tools
   ```

3. **Rebuild systeminformation**:
   ```bash
   npm rebuild systeminformation
   ```

4. **Alternative**: If still failing, try:
   ```bash
   npm uninstall systeminformation
   npm install systeminformation@5.27.7
   ```

### Issue 2: Application Won't Start

**Solutions**:
1. **Clear npm cache**:
   ```bash
   npm cache clean --force
   ```

2. **Delete node_modules and reinstall**:
   ```bash
   rmdir /s node_modules
   del package-lock.json
   npm install
   ```

3. **Check Electron version compatibility**:
   ```bash
   npm list electron
   ```

### Issue 3: File System Not Working

**Solutions**:
1. **Check folder permissions**: Ensure the app has read access to user folders
2. **Run from user directory**: Don't run from system directories
3. **Windows Defender**: Add exclusion for the project folder

### Issue 4: CSS/Styling Issues

**Solutions**:
1. **Rebuild CSS**:
   ```bash
   npm run build:css
   ```
   
2. **Check if dist folder exists**: `renderer/dist/styles.css` should be present

3. **Clear browser cache**: Restart the application

### Issue 5: Layout/Responsiveness Problems

**Symptoms**: Interface appears stretched, cut off, or components are not fully visible

**Causes**: Different screen resolutions, display scaling, or window sizes

**Solutions**:
1. **Check Display Settings**:
   - Right-click desktop → Display Settings
   - Ensure scaling is set to 100% or 125% (not 150%+)
   - Try different resolution if available

2. **Window Size Issues**:
   ```bash
   # The app auto-detects screen size, but you can force window size in main.js
   # Look for createWindow() function and adjust width/height if needed
   ```

3. **High DPI Displays**:
   - App includes responsive design for various screen sizes
   - Should automatically adapt to screens from 1366x768 to 4K
   - If issues persist, check Windows display scaling

4. **Screen Resolution Debugging**:
   ```bash
   # Run app with debug logging to see screen info
   npm start -- --enable-logging
   # Check console for screen resolution details
   ```

5. **Manual Resolution Check**:
   - Press F12 in the running app to open DevTools
   - Check console for any layout warnings
   - Look for responsive design breakpoints being triggered

## System Requirements

### Minimum Requirements
- **OS**: Windows 10 version 1903 or later
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 500MB free space
- **Node.js**: 18.x or later
- **Electron**: Compatible GPU for hardware acceleration
- **Screen Resolution**: 1366x768 minimum (responsive design supports smaller)

### Recommended Setup
- **OS**: Windows 11
- **RAM**: 16GB
- **CPU**: Multi-core processor for better performance
- **GPU**: Dedicated graphics card for GPU monitoring
- **Screen Resolution**: 1920x1080 or higher for optimal experience

## Performance Optimization

### For Better Performance
1. **Close other applications** before running
2. **Run from SSD** if available
3. **Ensure adequate RAM** (8GB+)
4. **Update graphics drivers**

### For Development
1. **Use VS Code** with React extensions
2. **Enable hot reload** for CSS changes
3. **Use React DevTools** for debugging

## Common Environment Issues

### Issue: Different Node.js Versions
```bash
# Check version
node --version

# Use nvm (if installed) to switch versions
nvm use 18
```

### Issue: Missing Python/Visual Studio Build Tools
```bash
# Install Windows build tools
npm install --global windows-build-tools

# Or install Visual Studio Build Tools manually
```

### Issue: Antivirus Blocking
- **Add exclusions** for:
  - Project folder
  - `node_modules` folder
  - Electron executable

## Testing Installation

### Verify Everything Works
1. **System Stats**: Should show real CPU, RAM, GPU values
2. **File System**: Should show your actual folders and files
3. **Context Menu**: Right-click should show Windows-like menu
4. **Search**: Should filter files in real-time
5. **Navigation**: Folder icons should work properly

### Debug Mode
```bash
# Run with debug information
npm start -- --enable-logging
```

## Contact/Support

If you still encounter issues:
1. **Check console logs** for error messages
2. **Run in debug mode** with `--enable-logging`
3. **Compare Node.js and npm versions** between working and non-working systems
4. **Ensure all dependencies** are properly installed

## Version Compatibility

| Component | Version | Notes |
|-----------|---------|-------|
| Node.js | 18+ | Required for React 19 |
| Electron | 37.1.0 | Tested version |
| React | 19.1.0 | Latest stable |
| Tailwind | 3.4.17 | For styling |
| systeminformation | 5.27.7 | System stats |

## Platform Notes

### Windows 10
- Ensure Windows is updated to version 1903+
- May need administrator rights for system monitoring

### Windows 11
- Fully supported
- Better performance and compatibility
- Enhanced security features supported

### Screen Compatibility

**Supported Resolutions**:
- **Minimum**: 1366x768 (laptop/tablet)
- **Optimal**: 1920x1080 (desktop)
- **Large**: 2560x1440+ (automatically scales)

**Layout Modes**:
- **Wide Screen (>1400px)**: Three-panel horizontal layout
- **Medium Screen (1200-1400px)**: Responsive horizontal layout with smaller panels
- **Small Screen (<1200px)**: Vertical stacked layout

**Display Scaling**:
- **100%-125%**: Recommended for best experience
- **150%+**: May cause layout issues, use with caution
- **High DPI**: Automatically detected and supported
