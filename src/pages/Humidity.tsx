import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CloudDrizzle, TrendingUp, Wind, AlertTriangle, Download } from 'lucide-react';

interface HumidityData {
  time: string;
  value: number;
}

interface AreaData {
  id: string;
  name: string;
  currentHumidity: number;
  status: 'normal' | 'dry' | 'humid';
  lastUpdated: string;
}

const Humidity: React.FC = () => {
  const [selectedArea, setSelectedArea] = useState<string>('area1');
  const [timeRange, setTimeRange] = useState<string>('today');

  const humidityData: HumidityData[] = [
    { time: '8:41', value: 65 },
    { time: '8:42', value: 68 },
    { time: '8:43', value: 66 },
    { time: '8:44', value: 70 },
    { time: '8:45', value: 67 },
    { time: '8:46', value: 72 },
    { time: '8:47', value: 75 },
    { time: '8:48', value: 73 },
    { time: '8:49', value: 70 },
    { time: '8:50', value: 68 }
  ];

  const areas: AreaData[] = [
    { id: 'area1', name: 'Area 1', currentHumidity: 68, status: 'normal', lastUpdated: '2 mins ago' },
    { id: 'area2', name: 'Area 2', currentHumidity: 70, status: 'normal', lastUpdated: '3 mins ago' },
    { id: 'area3', name: 'Area 3', currentHumidity: 45, status: 'dry', lastUpdated: '1 min ago' },
    { id: 'area4', name: 'Area 4', currentHumidity: 72, status: 'normal', lastUpdated: '5 mins ago' },
    { id: 'area5', name: 'Area 5', currentHumidity: 88, status: 'humid', lastUpdated: '2 mins ago' },
    { id: 'area6', name: 'Area 6', currentHumidity: 65, status: 'normal', lastUpdated: '4 mins ago' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'dry':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'humid':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getHumidityColor = (humidity: number) => {
    if (humidity < 50) return 'from-yellow-400 to-orange-500';
    if (humidity >= 50 && humidity <= 80) return 'from-blue-400 to-blue-600';
    return 'from-blue-600 to-indigo-700';
  };

  const selectedAreaData = areas.find(area => area.id === selectedArea);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Humidity Monitoring</h1>
          <p className="text-gray-600 text-sm mt-1">Real-time humidity levels across all areas</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Select time range for humidity data"
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
            <span className="text-gray-600 text-sm">Average Humidity</span>
            <CloudDrizzle className="text-blue-600" size={20} />
          </div>
          <div className="text-3xl font-bold text-gray-800">68%</div>
          <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
            <TrendingUp size={16} />
            <span>+3% from yesterday</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Highest</span>
            <Wind className="text-indigo-600" size={20} />
          </div>
          <div className="text-3xl font-bold text-gray-800">88%</div>
          <div className="text-sm text-gray-600 mt-2">Area 5</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Lowest</span>
            <Wind className="text-orange-600" size={20} />
          </div>
          <div className="text-3xl font-bold text-gray-800">45%</div>
          <div className="text-sm text-gray-600 mt-2">Area 3</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Alerts</span>
            <AlertTriangle className="text-yellow-600" size={20} />
          </div>
          <div className="text-3xl font-bold text-gray-800">2</div>
          <div className="text-sm text-gray-600 mt-2">Out of range</div>
        </div>
      </div>

      {/* Main Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {selectedAreaData?.name} - Humidity Trend
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Current: {selectedAreaData?.currentHumidity}% • Last updated: {selectedAreaData?.lastUpdated}
            </p>
          </div>
          <select
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Select area for humidity monitoring"
          >
            {areas.map(area => (
              <option key={area.id} value={area.id}>{area.name}</option>
            ))}
          </select>
        </div>

        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={humidityData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="time" 
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
              label={{ value: 'Humidity (%)', angle: -90, position: 'insideLeft' }}
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
              dataKey={() => 50} 
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
            <span className="text-gray-600">Current Humidity</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-1 bg-green-600"></div>
            <span className="text-gray-600">Optimal Range (50-80%)</span>
          </div>
        </div>
      </div>

      {/* Area Cards with Humidity Gauges */}
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
                  <span className="capitalize">{area.status}</span>
                </div>
              </div>

              <div className="flex flex-col items-center">
                {/* Humidity Gauge */}
                <div className="relative w-40 h-24">
                  <svg viewBox="0 0 200 120" className="w-full h-full">
                    {/* Background arc */}
                    <path 
                      d="M 20 100 A 80 80 0 0 1 180 100" 
                      fill="none" 
                      stroke="#e5e7eb" 
                      strokeWidth="20"
                      strokeLinecap="round"
                    />
                    {/* Foreground arc - animated */}
                    <path 
                      d={`M 20 100 A 80 80 0 0 1 ${20 + (area.currentHumidity / 100) * 160} ${100 - Math.sqrt(6400 - Math.pow((area.currentHumidity / 100) * 160 - 80, 2))}`}
                      fill="none" 
                      stroke={`url(#gradient-${area.id})`}
                      strokeWidth="20"
                      strokeLinecap="round"
                      className="transition-all duration-500"
                    />
                    {/* Gradient definition */}
                    <defs>
                      <linearGradient id={`gradient-${area.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor={area.currentHumidity < 50 ? '#fbbf24' : '#3b82f6'} />
                        <stop offset="100%" stopColor={area.currentHumidity > 80 ? '#4f46e5' : '#3b82f6'} />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  {/* Center text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-center mt-8">
                      <div className="text-3xl font-bold text-blue-600">{area.currentHumidity}%</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide">Humidity</div>
                    </div>
                  </div>
                </div>

                {/* Scale labels */}
                <div className="flex justify-between w-full text-xs text-gray-500 mt-2">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-lg border border-blue-200">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-600 rounded-lg">
            <CloudDrizzle className="text-white" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Smart Recommendations</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 font-bold">⚠️</span>
                <span><strong>Area 3</strong> humidity is low (45%). Increase misting or watering frequency.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">💧</span>
                <span><strong>Area 5</strong> humidity is high (88%). Improve ventilation to prevent fungal growth.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Areas 1, 2, 4, and 6 are within optimal humidity range. Continue current management.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Humidity;