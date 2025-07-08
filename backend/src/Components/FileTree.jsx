import React, { useState } from 'react';
import { 
  File, 
  Folder, 
  FolderOpen, 
  ChevronRight, 
  ChevronDown,
  Plus,
  Search
} from 'lucide-react';

const FileTree = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFolders, setExpandedFolders] = useState(new Set(['src', 'components']));
  
  // Mock file structure
  const fileStructure = [
    {
      name: 'src',
      type: 'folder',
      children: [
        {
          name: 'components',
          type: 'folder',
          children: [
            { name: 'App.jsx', type: 'file' },
            { name: 'Sidebar.jsx', type: 'file' },
            { name: 'ChatInterface.jsx', type: 'file' },
            { name: 'CodeEditor.jsx', type: 'file' },
          ]
        },
        {
          name: 'pages',
          type: 'folder',
          children: [
            { name: 'Home.jsx', type: 'file' },
            { name: 'Login.jsx', type: 'file' },
            { name: 'Signup.jsx', type: 'file' },
          ]
        },
        { name: 'App.jsx', type: 'file' },
        { name: 'main.jsx', type: 'file' },
        { name: 'index.css', type: 'file' },
      ]
    },
    {
      name: 'public',
      type: 'folder',
      children: [
        { name: 'vite.svg', type: 'file' }
      ]
    },
    { name: 'package.json', type: 'file' },
    { name: 'vite.config.js', type: 'file' },
    { name: 'tailwind.config.js', type: 'file' },
  ];

  const toggleFolder = (folderName) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderName)) {
      newExpanded.delete(folderName);
    } else {
      newExpanded.add(folderName);
    }
    setExpandedFolders(newExpanded);
  };

  const renderFileItem = (item, level = 0) => {
    const isExpanded = expandedFolders.has(item.name);
    const paddingLeft = `${level * 20 + 8}px`;

    if (item.type === 'folder') {
      return (
        <div key={item.name}>
          <div
            className="flex items-center p-2 hover:bg-base-200 cursor-pointer"
            style={{ paddingLeft }}
            onClick={() => toggleFolder(item.name)}
          >
            {isExpanded ? (
              <ChevronDown size={16} className="mr-1" />
            ) : (
              <ChevronRight size={16} className="mr-1" />
            )}
            {isExpanded ? (
              <FolderOpen size={16} className="mr-2 text-primary" />
            ) : (
              <Folder size={16} className="mr-2 text-primary" />
            )}
            <span className="text-sm">{item.name}</span>
          </div>
          {isExpanded && item.children && (
            <div>
              {item.children.map(child => renderFileItem(child, level + 1))}
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div
          key={item.name}
          className="flex items-center p-2 hover:bg-base-200 cursor-pointer"
          style={{ paddingLeft }}
        >
          <File size={16} className="mr-2 text-secondary" />
          <span className="text-sm">{item.name}</span>
        </div>
      );
    }
  };

  const filteredFiles = (items) => {
    if (!searchTerm) return items;
    return items.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.children && item.children.some(child => 
        child.name.toLowerCase().includes(searchTerm.toLowerCase())
      ))
    );
  };

  return (
    <div className="h-full bg-base-100 flex flex-col">
      {/* Header */}
      <div className="bg-base-200 p-4 border-b border-base-300">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">Explorer</h3>
          <button className="btn btn-ghost btn-sm">
            <Plus size={16} />
          </button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50" />
          <input
            type="text"
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input input-bordered input-sm w-full pl-10"
          />
        </div>
      </div>

      {/* File Tree */}
      <div className="flex-1 overflow-y-auto">
        {filteredFiles(fileStructure).map(item => renderFileItem(item))}
      </div>
    </div>
  );
};

export default FileTree;
