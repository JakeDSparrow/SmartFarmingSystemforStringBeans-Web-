import React from 'react';
import { Menu, Search, Download, Mail, Bell, User } from 'lucide-react';

interface HeaderProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
          className="p-2 hover:bg-gray-100 rounded transition-colors"
          title={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          <Menu size={24} />
        </button>
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <Search size={20} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Search" 
            className="flex-1 outline-none text-sm" 
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 rounded transition-colors" title="Download">
          <Download size={20} />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded transition-colors" title="Messages">
          <Mail size={20} />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded transition-colors" title="Notifications">
          <Bell size={20} />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded transition-colors" title="Profile">
          <User size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;