import React, { useState, useEffect } from 'react';
import { Droplets, Play, Square, Clock, TrendingUp, AlertCircle, Activity } from 'lucide-react';

interface AreaStatus {
  id: string;
  name: string;
  isActive: boolean;
  waterLevel: number;
  duration: number;
  flowRate: number;
  status: 'idle' | 'active' | 'paused' | 'completed';
  totalWaterUsed: number;
  lastIrrigation: string;
}

const WaterDistribution: React.FC = () => {
  const [areas, setAreas] = useState<AreaStatus[]>([
    { id: 'area1', name: 'Area 1', isActive: false, waterLevel: 0, duration: 0, flowRate: 2.5, status: 'idle', totalWaterUsed: 245, lastIrrigation: '2 hours ago' },
    { id: 'area2', name: 'Area 2', isActive: false, waterLevel: 0, duration: 0, flowRate: 2.3, status: 'idle', totalWaterUsed: 198, lastIrrigation: '3 hours ago' },
    { id: 'area3', name: 'Area 3', isActive: false, waterLevel: 0, duration: 0, flowRate: 2.8, status: 'idle', totalWaterUsed: 312, lastIrrigation: '1 hour ago' },
    { id: 'area4', name: 'Area 4', isActive: false, waterLevel: 0, duration: 0, flowRate: 2.2, status: 'idle', totalWaterUsed: 176, lastIrrigation: '4 hours ago' },
    { id: 'area5', name: 'Area 5', isActive: false, waterLevel: 0, duration: 0, flowRate: 2.6, status: 'idle', totalWaterUsed: 289, lastIrrigation: '2 hours ago' },
    { id: 'area6', name: 'Area 6', isActive: false, waterLevel: 0, duration: 0, flowRate: 2.4, status: 'idle', totalWaterUsed: 223, lastIrrigation: '3 hours ago' }
  ]);

  const [globalControl, setGlobalControl] = useState<'start' | 'stop'>('stop');

  // Simulate water flow animation
  useEffect(() => {
    const interval = setInterval(() => {
      setAreas(prevAreas =>
        prevAreas.map(area => {
          if (area.isActive && area.waterLevel < 100) {
            return {
              ...area,
              waterLevel: Math.min(area.waterLevel + 2, 100),
              duration: area.duration + 1,
              totalWaterUsed: area.totalWaterUsed + (area.flowRate / 60)
            };
          }
          if (area.waterLevel >= 100) {
            return { ...area, status: 'completed', isActive: false };
          }
          return area;
        })
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const toggleArea = (areaId: string) => {
    setAreas(prevAreas =>
      prevAreas.map(area =>
        area.id === areaId
          ? {
              ...area,
              isActive: !area.isActive,
              status: !area.isActive ? 'active' : 'idle',
              waterLevel: !area.isActive ? area.waterLevel : 0,
              duration: !area.isActive ? area.duration : 0
            }
          : area
      )
    );
  };

  const startAll = () => {
    setGlobalControl('start');
    setAreas(prevAreas =>
      prevAreas.map(area => ({
        ...area,
        isActive: true,
        status: 'active',
        waterLevel: 0,
        duration: 0
      }))
    );
  };

  const stopAll = () => {
    setGlobalControl('stop');
    setAreas(prevAreas =>
      prevAreas.map(area => ({
        ...area,
        isActive: false,
        status: 'idle',
        waterLevel: 0,
        duration: 0
      }))
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const totalWaterUsed = areas.reduce((sum, area) => sum + area.totalWaterUsed, 0);
  const activeAreas = areas.filter(area => area.isActive).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Water Distribution Control</h1>
          <p className="text-gray-600 text-sm mt-1">Manage irrigation across all cultivation areas</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={startAll}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-lg font-medium"
          >
            <Play size={20} />
            START ALL
          </button>
          <button
            onClick={stopAll}
            className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-lg font-medium"
          >
            <Square size={20} />
            STOP ALL
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Active Areas</span>
            <Activity className="text-green-600" size={20} />
          </div>
          <div className="text-3xl font-bold text-gray-800">{activeAreas}/6</div>
          <div className="text-sm text-gray-600 mt-2">Currently irrigating</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Total Water Used</span>
            <Droplets className="text-blue-600" size={20} />
          </div>
          <div className="text-3xl font-bold text-gray-800">{totalWaterUsed.toFixed(0)}L</div>
          <div className="text-sm text-gray-600 mt-2">Today's consumption</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Avg Flow Rate</span>
            <TrendingUp className="text-purple-600" size={20} />
          </div>
          <div className="text-3xl font-bold text-gray-800">2.5</div>
          <div className="text-sm text-gray-600 mt-2">Liters per minute</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">System Status</span>
            <AlertCircle className="text-green-600" size={20} />
          </div>
          <div className="text-2xl font-bold text-green-600">Operational</div>
          <div className="text-sm text-gray-600 mt-2">All systems normal</div>
        </div>
      </div>

      {/* Area Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {areas.map((area) => (
          <div key={area.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{area.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">Last: {area.lastIrrigation}</p>
                </div>
                <div className={`flex items-center gap-1 px-3 py-1 rounded-full border text-xs font-medium ${getStatusColor(area.status)}`}>
                  <span className="capitalize">{area.status}</span>
                </div>
              </div>

              {/* Water Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Water Flow</span>
                  <span className="font-semibold">{area.waterLevel.toFixed(0)}%</span>
                </div>
                <div className="relative h-10 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`absolute top-0 left-0 h-full bg-gradient-to-r transition-all duration-300 ${
                      area.isActive
                        ? 'from-cyan-400 to-blue-500'
                        : 'from-gray-300 to-gray-400'
                    }`}
                    style={{
                      width: `${area.waterLevel}%`,
                      backgroundImage: area.isActive
                        ? 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.1) 10px, rgba(255,255,255,.1) 20px)'
                        : 'none'
                    }}
                  >
                    {area.isActive && (
                      <div className="h-full w-full animate-pulse"></div>
                    )}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`text-sm font-bold ${area.waterLevel > 50 ? 'text-white' : 'text-gray-700'}`}>
                      {area.waterLevel > 0 ? `${area.waterLevel.toFixed(0)}%` : 'Ready'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
                    <Clock size={14} />
                    <span>Duration</span>
                  </div>
                  <div className="text-lg font-bold text-gray-800">
                    {Math.floor(area.duration / 60)}:{(area.duration % 60).toString().padStart(2, '0')}
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
                    <Droplets size={14} />
                    <span>Flow Rate</span>
                  </div>
                  <div className="text-lg font-bold text-gray-800">{area.flowRate} L/m</div>
                </div>
              </div>

              {/* Water Usage */}
              <div className="bg-blue-50 p-3 rounded-lg mb-4">
                <div className="text-xs text-gray-600 mb-1">Total Water Used</div>
                <div className="text-2xl font-bold text-blue-600">{area.totalWaterUsed.toFixed(1)}L</div>
              </div>

              {/* Control Button */}
              <button
                onClick={() => toggleArea(area.id)}
                className={`w-full py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                  area.isActive
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                {area.isActive ? (
                  <>
                    <Square size={18} />
                    Stop Irrigation
                  </>
                ) : (
                  <>
                    <Play size={18} />
                    Start Irrigation
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* System Information */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-600 rounded-lg">
            <Droplets className="text-white" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">System Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
              <div>
                <div className="font-semibold mb-1">Water Pressure</div>
                <div>45 PSI - Optimal</div>
              </div>
              <div>
                <div className="font-semibold mb-1">Tank Level</div>
                <div>85% - 1,700L remaining</div>
              </div>
              <div>
                <div className="font-semibold mb-1">Next Scheduled</div>
                <div>Today at 6:00 PM</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-green-600 rounded-lg">
            <TrendingUp className="text-white" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Smart Recommendations</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Water pressure is optimal across all zones. System efficiency at 98%.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">ℹ️</span>
                <span>Consider scheduling Area 4 for irrigation - last watered 4 hours ago.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 font-bold">⚠️</span>
                <span>Rain expected this afternoon. You may skip the 6:00 PM scheduled irrigation.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaterDistribution;