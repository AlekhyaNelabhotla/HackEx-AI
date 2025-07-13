# HackexAI - Development Setup

## 🚀 Quick Start

### Development Mode (Hot Reload)
```bash
npm run dev
```
This starts both CSS watching and Electron with hot reload.

### Production Build
```bash
npm start
```
This builds CSS once and starts Electron.

### CSS Only
```bash
npm run build:css    # Build once
npm run watch:css    # Watch for changes
```

## 📁 Project Structure

```
HackexAI/
├── main.js                 # Electron main process
├── preload.js             # Preload script
├── package.json           # Dependencies & scripts
├── tailwind.config.js     # Tailwind configuration
└── renderer/
    ├── index.html         # Main app window
    ├── index.js          # Renderer entry point
    ├── components/       # React components
    │   └── ChatPanel.js  # Main chat interface
    └── styles/
        ├── styles.css    # Main stylesheet (Tailwind + imports)
        ├── base.css      # Base styles
        ├── topbar.css    # Top bar styles
        ├── filesystem.css # File system styles
        ├── systemstats.css # System stats styles
        ├── chatpanel.css  # Chat panel layout
        └── components/   # Modular component styles
            ├── input.css  # Cyberpunk input component
            ├── button.css # Cyberpunk button component
            └── chat.css   # Chat layout component
```

## 🎨 CSS Architecture

### Modular Components
- **Clean separation** of concerns
- **Reusable** cyberpunk components
- **BEM-inspired** naming convention
- **Minimal specificity** conflicts

### Component Classes
- `.cyberpunk-input` - Main input styling
- `.cyberpunk-btn` - Button components
- `.chat-panel` - Chat layout
- `.ai-chat-panel` - Main panel container

## ⚡ Development Features

- **Hot reload** CSS changes
- **Concurrent** build process
- **Clean** modular architecture
- **Optimized** Tailwind build
- **VS Code** tasks integration

## 🛠 VS Code Integration

Use `Ctrl+Shift+P` → "Tasks: Run Task" → "Start Development"

Or use the command palette to run individual tasks:
- Build CSS
- Watch CSS  
- Start Development

## 🎯 Cyberpunk Theme

The application uses a consistent cyberpunk aesthetic with:
- **Cyan accents** (#22d3ee)
- **Purple highlights** (#8b5cf6)
- **Dark backgrounds** (various shades)
- **Glassmorphism** effects
- **Smooth animations**
- **Glow effects**

## 📝 Notes

- CSS is compiled from `renderer/styles.css` to `renderer/dist/styles.css`
- All component styles are imported via the main stylesheet
- Tailwind purges unused CSS for optimal file size
- Development mode watches for changes automatically
