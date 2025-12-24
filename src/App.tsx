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
import PatternAnalyzer from './pages/PatternAnalyzer';
import SeasonalSummary from './pages/SeasonalSummary';
import Settings from './pages/Settings';
import Login from './pages/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('dashboard');
  };

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
        return <PatternAnalyzer />;
      case 'seasonal-summary':
        return <SeasonalSummary />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  // Show main app if authenticated
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        currentView={currentView}
        setCurrentView={setCurrentView}
        isSidebarOpen={isSidebarOpen}
      />
      
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