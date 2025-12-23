import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Droplets, TrendingUp, TrendingDown, AlertCircle, Calendar, Download } from 'lucide-react';
import ProgressRing from '../components/common/ProgressRing';

interface SoilMoistureData {
  time: string;
  value: number;
}

interface AreaData {
  id: string;
  name: string;
  currentMoisture: number;
  status: 'optimal' | 'low' | 'high';
  lastUpdated: string;
}

const SoilMoisture: React.FC = () => {
  const [selectedArea, setSelectedArea] = useState<string>('area1');
  const [timeRange, setTimeRange] = useState<string>('today');

  // Sample data for the main chart
  const soilMoistureData: SoilMoistureData[] = [
    { time: '8:41', value: 65 },
    { time: '8:42', value: 72 },
    { time: '8:43', value: 68 },
    { time: '8:44', value: 75 },
    { time: '8:45', value: 70 },
    { time: '8:46', value: 73 },
    { time: '8:47', value: 80 },
    { time: '8:48', value: 76 },
    { time: '8:49', value: 72 },
    { time: '8:50', value: 68 }
  ];

  // Sample area data
  const areas: AreaData[] = [
    { id: 'area1', name: 'Area 1', currentMoisture: 70, status: 'optimal', lastUpdated: '2 mins ago' },
    { id: 'area2', name: 'Area 2', currentMoisture: 68, status: 'optimal', lastUpdated: '3 mins ago' },
    { id: 'area3', name: 'Area 3', currentMoisture: 45, status: 'low', lastUpdated: '1 min ago' },
    { id: 'area4', name: 'Area 4', currentMoisture: 85, status: 'high', lastUpdated: '5 mins ago' },
    { id: 'area5', name: 'Area 5', currentMoisture: 72, status: 'optimal', lastUpdated: '2 mins ago' },
    { id: 'area6', name: 'Area 6', currentMoisture: 66, status: 'optimal', lastUpdated: '4 mins ago' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'low':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'high':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'optimal':
        return <TrendingUp size={18} className="text-green-600" />;
      case 'low':
        return <TrendingDown size={18} className="text-yellow-600" />;
      case 'high':
        return <AlertCircle size={18} className="text-blue-600" />;
      default:
        return null;
    }
  };

  const selectedAreaData = areas.find(area => area.id === selectedArea);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Soil Moisture Monitoring</h1>
          <p className="text-gray-600 text-sm mt-1">Real-time soil moisture levels across all areas</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Select time range"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download size={20} />
            Export
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Average Moisture</span>
            <Droplets className="text-blue-600" size={20} />
          </div>
          <div className="text-3xl font-bold text-gray-800">68%</div>
          <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
            <TrendingUp size={16} />
            <span>+5% from yesterday</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Optimal Areas</span>
            <TrendingUp className="text-green-600" size={20} />
          </div>
          <div className="text-3xl font-bold text-gray-800">4/6</div>
          <div className="text-sm text-gray-600 mt-2">Areas in good condition</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Alerts</span>
            <AlertCircle className="text-yellow-600" size={20} />
          </div>
          <div className="text-3xl font-bold text-gray-800">2</div>
          <div className="text-sm text-gray-600 mt-2">Require attention</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Last Updated</span>
            <Calendar className="text-gray-600" size={20} />
          </div>
          <div className="text-lg font-bold text-gray-800">Just now</div>
          <div className="text-sm text-gray-600 mt-2">Auto-refresh enabled</div>
        </div>
      </div>

      {/* Main Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {selectedAreaData?.name} - Moisture Trend
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Current: {selectedAreaData?.currentMoisture}% • Last updated: {selectedAreaData?.lastUpdated}
            </p>
          </div>
          <select
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Select area"
          >
            {areas.map(area => (
              <option key={area.id} value={area.id}>{area.name}</option>
            ))}
          </select>
        </div>

        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={soilMoistureData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="time" 
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
              label={{ value: 'Moisture (%)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#3b82f6" 
              strokeWidth={3}
              dot={{ fill: '#3b82f6', r: 4 }}
              activeDot={{ r: 6 }}
            />
            {/* Reference lines for optimal range */}
            <Line 
              type="monotone" 
              dataKey={() => 60} 
              stroke="#10b981" 
              strokeWidth={1}
              strokeDasharray="5 5"
              dot={false}
            />
            <Line 
              type="monotone" 
              dataKey={() => 80} 
              stroke="#10b981" 
              strokeWidth={1}
              strokeDasharray="5 5"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>

        <div className="mt-4 flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
            <span className="text-gray-600">Current Moisture</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-1 bg-green-600"></div>
            <span className="text-gray-600">Optimal Range (60-80%)</span>
          </div>
        </div>
      </div>

      {/* Area Cards */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">All Areas Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {areas.map((area) => (
            <div 
              key={area.id}
              className={`bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer ${
                selectedArea === area.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedArea(area.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{area.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">Updated {area.lastUpdated}</p>
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full border text-xs font-medium ${getStatusColor(area.status)}`}>
                  {getStatusIcon(area.status)}
                  <span className="capitalize">{area.status}</span>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <ProgressRing percentage={area.currentMoisture} />
                <div className="mt-4 w-full">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Dry</span>
                    <span>Optimal</span>
                    <span>Wet</span>
                  </div>
                  <div className="h-2 bg-gradient-to-r from-red-400 via-green-400 to-blue-400 rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-600 rounded-lg">
            <Droplets className="text-white" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Smart Recommendations</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 font-bold">⚠️</span>
                <span><strong>Area 3</strong> has low moisture (45%). Consider irrigation within the next 2 hours.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">ℹ️</span>
                <span><strong>Area 4</strong> moisture is high (85%). Reduce watering schedule to prevent over-saturation.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Areas 1, 2, 5, and 6 are in optimal condition. Continue current irrigation schedule.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoilMoisture;