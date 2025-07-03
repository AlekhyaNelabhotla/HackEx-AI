// Icons.js - Central file for icons configuration
// Importing required React components
const React = window.React;

// Icon components using Font Awesome classes
export const Icon = {
  // Folder icons
  Home: props => React.createElement('i', { 
    className: `fas fa-home ${props.className || ''}`,
    style: props.style || {}
  }),
  
  Downloads: props => React.createElement('i', { 
    className: `fas fa-download ${props.className || ''}`,
    style: props.style || {}
  }),
  
  Documents: props => React.createElement('i', { 
    className: `far fa-file-alt ${props.className || ''}`,
    style: props.style || {}
  }),
  
  Desktop: props => React.createElement('i', { 
    className: `fas fa-desktop ${props.className || ''}`,
    style: props.style || {}
  }),
  
  Music: props => React.createElement('i', { 
    className: `fas fa-music ${props.className || ''}`,
    style: props.style || {}
  }),
  
  Videos: props => React.createElement('i', { 
    className: `fas fa-video ${props.className || ''}`,
    style: props.style || {}
  }),
  
  Pictures: props => React.createElement('i', { 
    className: `fas fa-image ${props.className || ''}`,
    style: props.style || {}
  }),
  
  Folder: props => React.createElement('i', { 
    className: `fas fa-folder ${props.className || ''}`,
    style: props.style || {}
  }),
  
  // File icons
  File: props => React.createElement('i', { 
    className: `fas fa-file ${props.className || ''}`,
    style: props.style || {}
  }),
  
  FileAudio: props => React.createElement('i', { 
    className: `fas fa-file-audio ${props.className || ''} file-audio`,
    style: props.style || {}
  }),
  
  FileVideo: props => React.createElement('i', { 
    className: `fas fa-file-video ${props.className || ''} file-video`,
    style: props.style || {}
  }),
  
  FileImage: props => React.createElement('i', { 
    className: `fas fa-file-image ${props.className || ''} file-image`,
    style: props.style || {}
  }),
  
  FilePdf: props => React.createElement('i', { 
    className: `fas fa-file-pdf ${props.className || ''} file-pdf`,
    style: props.style || {}
  }),
  
  FileWord: props => React.createElement('i', { 
    className: `fas fa-file-word ${props.className || ''} file-word`,
    style: props.style || {}
  }),
  
  FileExcel: props => React.createElement('i', { 
    className: `fas fa-file-excel ${props.className || ''} file-excel`,
    style: props.style || {}
  }),
  
  FilePowerpoint: props => React.createElement('i', { 
    className: `fas fa-file-powerpoint ${props.className || ''} file-powerpoint`,
    style: props.style || {}
  }),
  
  FileCode: props => React.createElement('i', { 
    className: `fas fa-file-code ${props.className || ''} file-code`,
    style: props.style || {}
  }),
  
  FileArchive: props => React.createElement('i', { 
    className: `fas fa-file-archive ${props.className || ''} file-archive`,
    style: props.style || {}
  }),
  
  // UI Icons
  Search: props => React.createElement('i', { 
    className: `fas fa-search ${props.className || ''}`,
    style: props.style || {}
  }),
  
  Back: props => React.createElement('i', { 
    className: `fas fa-arrow-up ${props.className || ''}`,
    style: props.style || {}
  })
};

// Helper function to get the appropriate icon component for a file
function getFileIcon(filename) {
  const ext = filename.toLowerCase().split('.').pop();
  
  // File type groups for better organization
  const audioExts = ['mp3', 'wav', 'flac', 'aac', 'm4a', 'ogg', 'wma'];
  const videoExts = ['mp4', 'avi', 'mkv', 'mov', 'wmv', 'flv', 'm4v', 'webm'];
  const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'svg', 'webp'];
  const codeExts = ['js', 'ts', 'html', 'css', 'py', 'java', 'cpp', 'c', 'cs', 'php', 'rb', 'go', 'rs'];
  const archiveExts = ['zip', 'rar', '7z', 'tar', 'gz', 'bz2'];
  
  // Return the appropriate icon based on extension
  if (audioExts.includes(ext)) return Icons.FileAudio;
  if (videoExts.includes(ext)) return Icons.FileVideo;
  if (imageExts.includes(ext)) return Icons.FileImage;
  if (ext === 'pdf') return Icons.FilePdf;
  if (['doc', 'docx'].includes(ext)) return Icons.FileWord;
  if (['xls', 'xlsx'].includes(ext)) return Icons.FileExcel;
  if (['ppt', 'pptx'].includes(ext)) return Icons.FilePowerpoint;
  if (codeExts.includes(ext)) return Icons.FileCode;
  if (archiveExts.includes(ext)) return Icons.FileArchive;
  
  // Default file icon
  return Icons.File;
}

// FileIcon component for rendering the appropriate icon
function FileIcon({ name, isDirectory }) {
  if (isDirectory) {
    // Special folder types
    const lowerName = name.toLowerCase();
    if (lowerName === "home") return React.createElement(Icons.Home, { className: "icon" });
    if (lowerName === "downloads") return React.createElement(Icons.Downloads, { className: "icon" });
    if (lowerName === "desktop") return React.createElement(Icons.Desktop, { className: "icon" });
    if (lowerName === "documents") return React.createElement(Icons.Documents, { className: "icon" });
    if (lowerName === "music") return React.createElement(Icons.Music, { className: "icon" });
    if (lowerName === "videos") return React.createElement(Icons.Videos, { className: "icon" });
    if (lowerName === "pictures") return React.createElement(Icons.Pictures, { className: "icon" });
    
    // Default folder
    return React.createElement(Icons.Folder, { className: "icon" });
  }
  
  // File icon based on file type
  const IconComponent = getFileIcon(name);
  return React.createElement(IconComponent, { className: "icon" });
}

// Export for use in other modules
module.exports = {
  Icons,
  FileIcon,
  getFileIcon
};
