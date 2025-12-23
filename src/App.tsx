import { useState } from 'react';
import Sidebar from './components/common/Sidebar';
import Header from './components/common/Header';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import SoilMoisture from './pages/SoilMoisture';
import Temperature from './pages/Temperature';
import Humidity from './pages/Humidity';
import Weather from './pages/Weather';
import WaterDistribution from './pages/WaterDistribution';
import IrrigationSchedule from './pages/IrrigationSchedule';
import SeasonalSummary from './pages/SeasonalSummary';

function App() {
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <Users />;
      case 'soil-moisture':
        return <SoilMoisture />;
      case 'temperature':
        return <Temperature />;
      case 'humidity':
        return <Humidity />;
      case 'weather':
        return <Weather />;
      case 'water-distribution':
        return <WaterDistribution />;
      case 'irrigation-schedule':
        return <IrrigationSchedule />;
      case 'pattern-analyzer':
        return <div className="text-2xl">Pattern Analyzer Page - Coming Soon</div>;
      case 'seasonal-summary':
        return <SeasonalSummary />;
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