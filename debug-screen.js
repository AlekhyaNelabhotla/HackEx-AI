// Debug Screen Info Script
// Add this to your renderer/index.js temporarily for debugging screen issues

function debugScreenInfo() {
    const info = {
        // Window dimensions
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
        
        // Screen dimensions
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        
        // Available screen space (excluding taskbar)
        availWidth: window.screen.availWidth,
        availHeight: window.screen.availHeight,
        
        // Device pixel ratio (for high DPI screens)
        devicePixelRatio: window.devicePixelRatio,
        
        // Viewport dimensions
        documentWidth: document.documentElement.clientWidth,
        documentHeight: document.documentElement.clientHeight,
        
        // User agent for OS/browser detection
        userAgent: navigator.userAgent,
        
        // Calculated ratios
        aspectRatio: (window.innerWidth / window.innerHeight).toFixed(2),
        pixelDensity: window.devicePixelRatio >= 2 ? 'High DPI' : 'Standard DPI'
    };
    
    console.log('=== SCREEN DEBUG INFO ===');
    Object.entries(info).forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
    });
    console.log('========================');
    
    // Check if screen is likely to have layout issues
    const totalRequiredWidth = 1650; // Approximate total width needed
    const hasLayoutIssues = window.innerWidth < totalRequiredWidth;
    
    if (hasLayoutIssues) {
        console.warn(`⚠️ POTENTIAL LAYOUT ISSUE: Window width (${window.innerWidth}px) is less than recommended (${totalRequiredWidth}px)`);
        console.log('💡 Responsive design should handle this automatically');
    }
    
    return info;
}

// Call this function after the app loads
// You can add this line temporarily in your React.useEffect
// debugScreenInfo();

module.exports = { debugScreenInfo };
