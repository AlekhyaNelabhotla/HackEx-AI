// app.js - Main application entry point
// Import React and ReactDOM from window globals
const React = window.React;
const ReactDOM = window.ReactDOM;
const { useState, useEffect, useCallback, useMemo } = React;

// Import components
import { TopBar } from './components/TopBar.js';
import { FileSystem } from './components/FileSystem.js';
import { SemiSpeedometer } from './components/SemiSpeedometer.js';
import { CircularProgress } from './components/CircularProgress.js';

// Import window.ReactIcons icons
const ReactIcons = window.ReactIcons || {};
const {
  FaHome, FaDownload, FaFolder, FaFile, FaDesktop,
  FaRegFileAlt, FaMusic, FaVideo, FaImage,
  FaFilePdf, FaFileWord, FaFileExcel, FaFilePowerpoint,
  FaFileCode, FaFileArchive, FaFileAudio, FaFileVideo,
  FaSearch
} = ReactIcons;

/**
 * Icon component for file system items
 */
function Icon({ name, isDirectory }) {
  if (isDirectory) {
    // Special folder types
    if (name === 'Home') return React.createElement(FaHome, null);
    if (name === 'Downloads') return React.createElement(FaDownload, null);
    if (name === 'Documents') return React.createElement(FaRegFileAlt, null);
    if (name === 'Desktop') return React.createElement(FaDesktop, null);
    if (name === 'Music') return React.createElement(FaMusic, null);
    if (name === 'Videos') return React.createElement(FaVideo, null);
    if (name === 'Pictures') return React.createElement(FaImage, null);
    
    // Default folder
    return React.createElement(FaFolder, null);
  } else {
    // File type based on extension
    const fileType = getFileType(name);
    
    if (fileType === 'audio') return React.createElement(FaFileAudio, null);
    if (fileType === 'video') return React.createElement(FaFileVideo, null);
    if (fileType === 'image') return React.createElement(FaImage, null);
    if (fileType === 'pdf') return React.createElement(FaFilePdf, null);
    if (fileType === 'word') return React.createElement(FaFileWord, null);
    if (fileType === 'excel') return React.createElement(FaFileExcel, null);
    if (fileType === 'powerpoint') return React.createElement(FaFilePowerpoint, null);
    if (fileType === 'code') return React.createElement(FaFileCode, null);
    if (fileType === 'archive') return React.createElement(FaFileArchive, null);
    
    // Default file
    return React.createElement(FaFile, null);
  }
}

// Helper: File type detection
function getFileType(filename) {
  const ext = filename.toLowerCase().split('.').pop();
  const audioExts = ['mp3', 'wav', 'flac', 'aac', 'm4a', 'ogg', 'wma'];
  const videoExts = ['mp4', 'avi', 'mkv', 'mov', 'wmv', 'flv', 'm4v', 'webm'];
  const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'svg', 'webp'];
  const codeExts = ['js', 'ts', 'html', 'css', 'py', 'java', 'cpp', 'c', 'cs', 'php', 'rb', 'go', 'rs'];
  const archiveExts = ['zip', 'rar', '7z', 'tar', 'gz', 'bz2'];
  
  if (audioExts.includes(ext)) return 'audio';
  if (videoExts.includes(ext)) return 'video';
  if (imageExts.includes(ext)) return 'image';
  if (ext === 'pdf') return 'pdf';
  if (['doc', 'docx'].includes(ext)) return 'word';
  if (['xls', 'xlsx'].includes(ext)) return 'excel';
  if (['ppt', 'pptx'].includes(ext)) return 'powerpoint';
  if (codeExts.includes(ext)) return 'code';
  if (archiveExts.includes(ext)) return 'archive';
  return 'file';
}

/**
 * Main application component
 */
function App() {
  // System information state
  const [cpuUsage, setCpuUsage] = useState(0);
  const [ramUsage, setRamUsage] = useState(0);
  const [diskUsage, setDiskUsage] = useState(0);
  const [gpuUsage, setGpuUsage] = useState(0);
  const [gpuTemp, setGpuTemp] = useState(0);
  const [cpuTemp, setCpuTemp] = useState(0);
  const [gpuModel, setGpuModel] = useState('');
  
  // File system state
  const [currentDirPath, setCurrentDirPath] = useState('');
  const [fileSystemItems, setFileSystemItems] = useState([]);
  const [homeDirectory, setHomeDirectory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Chat panel state
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hello! I am HackexAI. How can I assist you today?' }
  ]);
  const [messageInput, setMessageInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  
  // Initialize file system and system stats
  useEffect(() => {
    // Get home directory and navigate to it
    window.electronAPI.getHomeDirectory().then(homePath => {
      console.log('Home directory:', homePath);
      setHomeDirectory(homePath);
      handleNavigateToFolder(homePath);
    }).catch(err => {
      console.error('Error getting home directory:', err);
    });
    
    // Set up system stats interval
    const statsInterval = setInterval(() => {
      window.electronAPI.getSystemStats().then(stats => {
        setCpuUsage(stats.cpuUsage);
        setRamUsage(stats.ramUsage);
        setDiskUsage(stats.diskUsage);
        setGpuUsage(stats.gpuUsage || 0);
        setGpuTemp(stats.gpuTemp || 0);
        setCpuTemp(stats.cpuTemp || 0);
        setGpuModel(stats.gpuModel || 'GPU Information Unavailable');
      }).catch(err => {
        console.error('Error fetching system stats:', err);
      });
    }, 2000);
    
    return () => clearInterval(statsInterval);
  }, []);
  
  // File system navigation handlers
  const handleNavigateToFolder = useCallback((folderPath) => {
    window.electronAPI.readDirectory(folderPath)
      .then(items => {
        console.log(`Navigated to ${folderPath}`, items);
        setCurrentDirPath(folderPath);
        setFileSystemItems(items);
      })
      .catch(err => {
        console.error(`Error reading directory ${folderPath}:`, err);
      });
  }, []);
  
  const handleFileItemClick = useCallback((item) => {
    if (item.isDirectory) {
      handleNavigateToFolder(item.path);
    } else {
      window.electronAPI.openFile(item.path)
        .catch(err => console.error(`Error opening file ${item.path}:`, err));
    }
  }, [handleNavigateToFolder]);
  
  const handleGoBack = useCallback(() => {
    const parentPath = currentDirPath.substring(0, currentDirPath.lastIndexOf('\\'));
    if (parentPath) {
      handleNavigateToFolder(parentPath);
    }
  }, [currentDirPath, handleNavigateToFolder]);
  
  const handleGoToHome = useCallback(() => {
    if (homeDirectory) {
      handleNavigateToFolder(homeDirectory);
    }
  }, [homeDirectory, handleNavigateToFolder]);
  
  const handleOpenExplorer = useCallback(() => {
    window.electronAPI.openExplorer(currentDirPath)
      .catch(err => console.error(`Error opening explorer at ${currentDirPath}:`, err));
  }, [currentDirPath]);
  
  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);
  
  // Chat handlers
  const handleSendMessage = useCallback(() => {
    if (!messageInput.trim()) return;
    
    const userMessage = { sender: 'user', text: messageInput };
    setMessages(prev => [...prev, userMessage]);
    setMessageInput('');
    setIsThinking(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse = { 
        sender: 'ai', 
        text: `I'm a demo AI. You said: "${messageInput}". In a real app, this would use an actual AI backend.` 
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsThinking(false);
    }, 1500);
  }, [messageInput]);
  
  // Handle chat input change
  const handleMessageInputChange = useCallback((e) => {
    setMessageInput(e.target.value);
  }, []);
  
  // Handle chat input keydown (for Enter key)
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);
  
  // Filter files based on search query
  const filteredFileSystemItems = useMemo(() => {
    if (!searchQuery.trim()) {
      return fileSystemItems;
    }
    return fileSystemItems.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [fileSystemItems, searchQuery]);

  return React.createElement(
    'div',
    { className: 'app-container' },
    React.createElement(TopBar, null),
    React.createElement(
      'div',
      { className: 'main-content' },
      // System Stats Panel
      React.createElement(
        'div',
        { className: 'system-stats-panel' },
        React.createElement('h2', null, 'System Diagnostics'),
        React.createElement(
          'div',
          { className: 'stats-container' },
          React.createElement(
            'div',
            { className: 'stats-card' },
            React.createElement('h3', null, 'CPU Usage'),
            React.createElement(SemiSpeedometer, { 
              label: 'CPU', 
              value: cpuUsage, 
              unit: '%' 
            })
          ),
          React.createElement(
            'div',
            { className: 'stats-card' },
            React.createElement('h3', null, 'RAM Usage'),
            React.createElement(SemiSpeedometer, { 
              label: 'RAM', 
              value: ramUsage, 
              unit: '%' 
            })
          ),
          React.createElement(
            'div',
            { className: 'stats-card' },
            React.createElement('h3', null, 'Disk Usage'),
            React.createElement(CircularProgress, { 
              value: diskUsage, 
              label: 'Disk Space' 
            })
          ),
          React.createElement(
            'div',
            { className: 'stats-card' },
            React.createElement(
              'h3',
              null,
              'GPU Stats'
            ),
            React.createElement(
              'div',
              { className: 'gpu-stats' },
              React.createElement(
                'div',
                { className: 'gpu-header' },
                React.createElement('div', { className: 'gpu-model' }, gpuModel)
              ),
              React.createElement(
                'div',
                null,
                'Usage:',
                React.createElement(
                  'div',
                  { className: 'gpu-bar' },
                  React.createElement('div', { 
                    className: 'gpu-progress', 
                    style: { width: `${gpuUsage}%` } 
                  })
                ),
                React.createElement(
                  'div',
                  { className: 'gpu-values' },
                  React.createElement('span', null, '0%'),
                  React.createElement('span', null, `${gpuUsage}%`),
                  React.createElement('span', null, '100%')
                )
              ),
              React.createElement(
                'div',
                null,
                'Temperature:',
                React.createElement(
                  'div',
                  { className: 'gpu-bar' },
                  React.createElement('div', { 
                    className: 'gpu-progress', 
                    style: { 
                      width: `${(gpuTemp / 100) * 100}%`,
                      backgroundColor: gpuTemp > 80 ? 'var(--color-critical)' : 
                                      gpuTemp > 70 ? 'var(--color-warning)' : 
                                      'var(--color-gpu-accent)'
                    } 
                  })
                ),
                React.createElement(
                  'div',
                  { className: 'gpu-values' },
                  React.createElement('span', null, '0°C'),
                  React.createElement('span', null, `${gpuTemp}°C`),
                  React.createElement('span', null, '100°C')
                )
              )
            )
          )
        )
      ),
      
      // File System Panel
      React.createElement(
        'div',
        { className: 'desktop-panel' },
        React.createElement('h2', null, 'File Explorer'),
        React.createElement(
          'div',
          { className: 'search-container' },
          React.createElement('input', {
            type: 'text',
            className: 'search-input',
            placeholder: 'Search files and folders...',
            value: searchQuery,
            onChange: handleSearchChange
          }),
          React.createElement(FaSearch, { className: 'search-icon' })
        ),
        React.createElement(
          'div',
          { className: 'shortcuts-container' },
          React.createElement(
            'button',
            { 
              className: 'shortcut-button', 
              onClick: handleGoToHome 
            },
            React.createElement(FaHome, { className: 'shortcut-icon' }),
            'Home'
          ),
          homeDirectory && React.createElement(
            'button',
            { 
              className: 'shortcut-button', 
              onClick: () => handleNavigateToFolder(`${homeDirectory}\\Desktop`) 
            },
            React.createElement(FaDesktop, { className: 'shortcut-icon' }),
            'Desktop'
          ),
          homeDirectory && React.createElement(
            'button',
            { 
              className: 'shortcut-button', 
              onClick: () => handleNavigateToFolder(`${homeDirectory}\\Documents`) 
            },
            React.createElement(FaRegFileAlt, { className: 'shortcut-icon' }),
            'Documents'
          ),
          homeDirectory && React.createElement(
            'button',
            { 
              className: 'shortcut-button', 
              onClick: () => handleNavigateToFolder(`${homeDirectory}\\Downloads`) 
            },
            React.createElement(FaDownload, { className: 'shortcut-icon' }),
            'Downloads'
          ),
          homeDirectory && React.createElement(
            'button',
            { 
              className: 'shortcut-button', 
              onClick: () => handleNavigateToFolder(`${homeDirectory}\\Music`) 
            },
            React.createElement(FaMusic, { className: 'shortcut-icon' }),
            'Music'
          ),
          homeDirectory && React.createElement(
            'button',
            { 
              className: 'shortcut-button', 
              onClick: () => handleNavigateToFolder(`${homeDirectory}\\Videos`) 
            },
            React.createElement(FaVideo, { className: 'shortcut-icon' }),
            'Videos'
          ),
          homeDirectory && React.createElement(
            'button',
            { 
              className: 'shortcut-button', 
              onClick: () => handleNavigateToFolder(`${homeDirectory}\\Pictures`) 
            },
            React.createElement(FaImage, { className: 'shortcut-icon' }),
            'Pictures'
          )
        ),
        React.createElement(
          'div',
          { className: 'path-navigator' },
          React.createElement(
            'div',
            { 
              className: 'path-part',
              onClick: handleGoBack
            },
            '< Back'
          ),
          React.createElement('span', { className: 'path-separator' }, ' | '),
          currentDirPath.split('\\').map((part, index, arr) => {
            // Build the path up to this part
            const pathToHere = arr.slice(0, index + 1).join('\\');
            return React.createElement(
              React.Fragment,
              { key: index },
              React.createElement(
                'div',
                { 
                  className: 'path-part',
                  onClick: () => handleNavigateToFolder(pathToHere)
                },
                part || 'Computer'
              ),
              index < arr.length - 1 && React.createElement(
                'span',
                { className: 'path-separator' },
                ' > '
              )
            );
          })
        ),
        React.createElement(
          'div',
          { className: 'directory-contents' },
          filteredFileSystemItems.map(item => React.createElement(
            'div',
            { 
              key: item.path,
              className: 'dir-item',
              onClick: () => handleFileItemClick(item)
            },
            React.createElement(
              'div',
              { className: 'dir-item-icon' },
              React.createElement(Icon, { name: item.name, isDirectory: item.isDirectory })
            ),
            React.createElement('div', { className: 'dir-item-name' }, item.name)
          ))
        )
      ),
      
      // AI Chat Panel
      React.createElement(
        'div',
        { className: 'ai-chat-panel' },
        React.createElement('h2', null, 'AI Assistant'),
        React.createElement(
          'div',
          { className: 'chat-messages' },
          messages.map((message, index) => React.createElement(
            'div',
            { 
              key: index,
              className: `message ${message.sender === 'user' ? 'user-message' : 'ai-message'}`
            },
            message.text
          )),
          isThinking && React.createElement(
            'div',
            { className: 'thinking' },
            React.createElement('div', { className: 'dot' }),
            React.createElement('div', { className: 'dot' }),
            React.createElement('div', { className: 'dot' })
          )
        ),
        React.createElement(
          'div',
          { className: 'chat-input-container' },
          React.createElement('textarea', {
            className: 'chat-input',
            placeholder: 'Type your message...',
            value: messageInput,
            onChange: handleMessageInputChange,
            onKeyDown: handleKeyDown
          }),
          React.createElement(
            'button',
            { 
              className: 'chat-submit',
              onClick: handleSendMessage
            },
            'Send'
          )
        )
      )
    )
  );
}

// Initialize the app once DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(React.createElement(App));
});
