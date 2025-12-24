import React, { useState, useRef, useEffect } from 'react';
import { Menu, Search, Download, Mail, Bell, User, Settings, LogOut, ChevronDown } from 'lucide-react';

interface HeaderProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
        <button className="p-2 hover:bg-gray-100 rounded transition-colors relative" title="Download">
          <Download size={20} />
        </button>
        
        <button className="p-2 hover:bg-gray-100 rounded transition-colors relative" title="Messages">
          <Mail size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full"></span>
        </button>
        
        <button className="p-2 hover:bg-gray-100 rounded transition-colors relative" title="Notifications">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full"></span>
        </button>

        {/* Profile Dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded transition-colors"
            title="Open profile menu"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
              <User size={18} className="text-white" />
            </div>
            <ChevronDown size={16} className="text-gray-600" />
          </button>

          {/* Dropdown Menu */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              <div className="px-4 py-3 border-b border-gray-200">
                <div className="font-semibold text-gray-800">John Doe</div>
                <div className="text-sm text-gray-600">john.doe@gmail.com</div>
              </div>
              
              <div className="py-2">
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    // Navigate to settings
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition-colors text-left"
                >
                  <Settings size={18} className="text-gray-600" />
                  <span className="text-gray-700">Settings</span>
                </button>
                
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    // Logout - reload page to go back to login
                    window.location.reload();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition-colors text-left text-red-600"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;