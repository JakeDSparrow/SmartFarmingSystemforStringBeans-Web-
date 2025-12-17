import { useState } from 'react';
import Sidebar from './components/common/Sidebar';
import Header from './components/common/Header';
import Dashboard from './pages/Dashboard';

function App() {
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <div className="text-2xl">Users Page - Coming Soon</div>;
      case 'soil-moisture':
        return <div className="text-2xl">Soil Moisture Page - Coming Soon</div>;
      case 'temperature':
        return <div className="text-2xl">Temperature Page - Coming Soon</div>;
      case 'humidity':
        return <div className="text-2xl">Humidity Page - Coming Soon</div>;
      case 'weather':
        return <div className="text-2xl">Weather Page - Coming Soon</div>;
      case 'water-distribution':
        return <div className="text-2xl">Water Distribution Page - Coming Soon</div>;
      case 'irrigation-schedule':
        return <div className="text-2xl">Irrigation Schedule Page - Coming Soon</div>;
      case 'pattern-analyzer':
        return <div className="text-2xl">Pattern Analyzer Page - Coming Soon</div>;
      case 'seasonal-summary':
        return <div className="text-2xl">Seasonal Summary Page - Coming Soon</div>;
      case 'settings':
        return <div className="text-2xl">Settings Page - Coming Soon</div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - now properly collapsible */}
      <Sidebar 
        currentView={currentView}
        setCurrentView={setCurrentView}
        isSidebarOpen={isSidebarOpen}
      />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;