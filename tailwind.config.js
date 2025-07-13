// Tailwind CSS Configuration - Optimized for HackexAI
module.exports = {
  content: [
    "./renderer/**/*.{html,js,jsx}",
    "./renderer/components/**/*.js"
  ],
  safelist: [
    // Preserve cyberpunk component classes
    'cyberpunk-input',
    'cyberpunk-input-container',
    'cyberpunk-input-wrapper', 
    'cyberpunk-input-footer',
    'cyberpunk-btn',
    'cyberpunk-btn-content',
    'cyberpunk-btn-text',
    'cyberpunk-btn-icon',
    'char-counter',
    'connection-status',
    'online',
    'offline'
  ],
  theme: {
    extend: {
      colors: {
        // HackexAI Brand Colors
        'cyber-blue': '#22d3ee',
        'cyber-purple': '#8b5cf6',
        'cyber-dark': '#0f172a',
        'cyber-darker': '#020617',
        'cyber-gray': '#1e293b',
        'cyber-light': '#f8fafc'
      },
      fontFamily: {
        'cyber': ['Orbitron', 'monospace'],
        'main': ['Rajdhani', 'sans-serif'],
        'mono': ['Roboto Mono', 'monospace']
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 3s ease-in-out infinite'
      },
      keyframes: {
        glow: {
          '0%': { 
            boxShadow: '0 0 20px rgba(34, 211, 238, 0.3)' 
          },
          '100%': { 
            boxShadow: '0 0 40px rgba(34, 211, 238, 0.6)' 
          }
        }
      }
    }
  },
  plugins: []
}