import React from 'react';
import { 
  User, 
  Cloud, 
  Settings, 
  LayoutDashboard,
  Droplets,
  Thermometer,
  CloudDrizzle,
  Sprout,
  Calendar,
  TrendingUp,
  BarChart3
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  isSidebarOpen: boolean;
}

interface MenuItemProps {
  icon: React.ElementType;
  label: string;
  view: string;
  currentView: string;
  setCurrentView: (view: string) => void;
  isSidebarOpen: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ 
  icon: Icon, 
  label, 
  view, 
  currentView, 
  setCurrentView,
  isSidebarOpen 
}) => (
  <button
    onClick={() => setCurrentView(view)}
    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors relative group ${
      currentView === view 
        ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' 
        : 'text-gray-700 hover:bg-gray-50'
    }`}
    title={!isSidebarOpen ? label : ''}
  >
    <Icon size={20} className="flex-shrink-0" />
    <span className={`text-sm whitespace-nowrap transition-all duration-300 ${
      isSidebarOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'
    }`}>
      {label}
    </span>
    
    {/* Tooltip for collapsed state */}
    {!isSidebarOpen && (
      <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
        {label}
      </div>
    )}
  </button>
);

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, isSidebarOpen }) => {
  return (
    <div className={`${
      isSidebarOpen ? 'w-64' : 'w-16'
    } bg-white border-r transition-all duration-300 flex flex-col`}>
      <div className={`p-4 border-b flex items-center gap-2 ${
        isSidebarOpen ? 'justify-start' : 'justify-center'
      }`}>
        <User size={24} className="flex-shrink-0" />
        <span className={`font-semibold whitespace-nowrap transition-all duration-300 ${
          isSidebarOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'
        }`}>
          Admin
        </span>
      </div>
      
      <div className="flex-1 overflow-y-auto overflow-x-visible">
        <div className="py-2">
          <MenuItem 
            icon={LayoutDashboard} 
            label="Dashboard" 
            view="dashboard" 
            currentView={currentView} 
            setCurrentView={setCurrentView}
            isSidebarOpen={isSidebarOpen}
          />
          <MenuItem 
            icon={User} 
            label="Users" 
            view="users" 
            currentView={currentView} 
            setCurrentView={setCurrentView}
            isSidebarOpen={isSidebarOpen}
          />
          <MenuItem 
            icon={Droplets} 
            label="Soil Moisture" 
            view="soil-moisture" 
            currentView={currentView} 
            setCurrentView={setCurrentView}
            isSidebarOpen={isSidebarOpen}
          />
          <MenuItem 
            icon={Thermometer} 
            label="Temperature" 
            view="temperature" 
            currentView={currentView} 
            setCurrentView={setCurrentView}
            isSidebarOpen={isSidebarOpen}
          />
          <MenuItem 
            icon={CloudDrizzle} 
            label="Humidity" 
            view="humidity" 
            currentView={currentView} 
            setCurrentView={setCurrentView}
            isSidebarOpen={isSidebarOpen}
          />
          <MenuItem 
            icon={Cloud} 
            label="Weather Update" 
            view="weather" 
            currentView={currentView} 
            setCurrentView={setCurrentView}
            isSidebarOpen={isSidebarOpen}
          />
          <MenuItem 
            icon={Sprout} 
            label="Water Distribution" 
            view="water-distribution" 
            currentView={currentView} 
            setCurrentView={setCurrentView}
            isSidebarOpen={isSidebarOpen}
          />
          <MenuItem 
            icon={Calendar} 
            label="Irrigation Schedule" 
            view="irrigation-schedule" 
            currentView={currentView} 
            setCurrentView={setCurrentView}
            isSidebarOpen={isSidebarOpen}
          />
          
          {isSidebarOpen && (
            <div className="px-4 py-2 text-sm font-medium text-gray-500 mt-4">
              Analytics & Reporting
            </div>
          )}
          
          {!isSidebarOpen && (
            <div className="border-t my-2"></div>
          )}
          
          <MenuItem 
            icon={TrendingUp} 
            label="Pattern Analyzer" 
            view="pattern-analyzer" 
            currentView={currentView} 
            setCurrentView={setCurrentView}
            isSidebarOpen={isSidebarOpen}
          />
          <MenuItem 
            icon={BarChart3} 
            label="Seasonal Summary" 
            view="seasonal-summary" 
            currentView={currentView} 
            setCurrentView={setCurrentView}
            isSidebarOpen={isSidebarOpen}
          />
          
          <div className="border-t my-2"></div>
          
          <MenuItem 
            icon={Settings} 
            label="Settings" 
            view="settings" 
            currentView={currentView} 
            setCurrentView={setCurrentView}
            isSidebarOpen={isSidebarOpen}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;