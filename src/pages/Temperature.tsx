import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Thermometer, TrendingUp, TrendingDown, AlertTriangle, Download } from 'lucide-react';

interface TemperatureData {
  time: string;
  value: number;
}

interface AreaData {
  id: string;
  name: string;
  currentTemp: number;
  status: 'normal' | 'hot' | 'cold';
  lastUpdated: string;
}

const Temperature: React.FC = () => {
  const [selectedArea, setSelectedArea] = useState<string>('area1');
  const [timeRange, setTimeRange] = useState<string>('today');

  const temperatureData: TemperatureData[] = [
    { time: '8:41', value: 24 },
    { time: '8:42', value: 25 },
    { time: '8:43', value: 24 },
    { time: '8:44', value: 26 },
    { time: '8:45', value: 25 },
    { time: '8:46', value: 27 },
    { time: '8:47', value: 28 },
    { time: '8:48', value: 27 },
    { time: '8:49', value: 26 },
    { time: '8:50', value: 25 }
  ];

  const areas: AreaData[] = [
    { id: 'area1', name: 'Area 1', currentTemp: 25, status: 'normal', lastUpdated: '2 mins ago' },
    { id: 'area2', name: 'Area 2', currentTemp: 26, status: 'normal', lastUpdated: '3 mins ago' },
    { id: 'area3', name: 'Area 3', currentTemp: 32, status: 'hot', lastUpdated: '1 min ago' },
    { id: 'area4', name: 'Area 4', currentTemp: 24, status: 'normal', lastUpdated: '5 mins ago' },
    { id: 'area5', name: 'Area 5', currentTemp: 16, status: 'cold', lastUpdated: '2 mins ago' },
    { id: 'area6', name: 'Area 6', currentTemp: 27, status: 'normal', lastUpdated: '4 mins ago' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'hot':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'cold':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getTempColor = (temp: number) => {
    if (temp < 18) return 'from-blue-400 to-blue-600';
    if (temp >= 18 && temp <= 28) return 'from-green-400 to-green-600';
    return 'from-red-400 to-red-600';
  };

  const getTempPosition = (temp: number) => {
    // Scale temperature (0-40°C) to position (0-100%)
    const min = 0;
    const max = 40;
    return Math.min(Math.max(((temp - min) / (max - min)) * 100, 0), 100);
  };

  const selectedAreaData = areas.find(area => area.id === selectedArea);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Temperature Monitoring</h1>
          <p className="text-gray-600 text-sm mt-1">Real-time temperature readings across all areas</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Select time range for temperature data"
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
            <span className="text-gray-600 text-sm">Average Temp</span>
            <Thermometer className="text-orange-600" size={20} />
          </div>
          <div className="text-3xl font-bold text-gray-800">25.8°C</div>
          <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
            <TrendingUp size={16} />
            <span>+2°C from yesterday</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Highest</span>
            <TrendingUp className="text-red-600" size={20} />
          </div>
          <div className="text-3xl font-bold text-gray-800">32°C</div>
          <div className="text-sm text-gray-600 mt-2">Area 3</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Lowest</span>
            <TrendingDown className="text-blue-600" size={20} />
          </div>
          <div className="text-3xl font-bold text-gray-800">16°C</div>
          <div className="text-sm text-gray-600 mt-2">Area 5</div>
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
              {selectedAreaData?.name} - Temperature Trend
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Current: {selectedAreaData?.currentTemp}°C • Last updated: {selectedAreaData?.lastUpdated}
            </p>
          </div>
          <select
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Select area for temperature details"
          >
            {areas.map(area => (
              <option key={area.id} value={area.id}>{area.name}</option>
            ))}
          </select>
        </div>

        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={temperatureData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="time" 
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
              label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft' }}
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
              stroke="#f97316" 
              strokeWidth={3}
              dot={{ fill: '#f97316', r: 4 }}
              activeDot={{ r: 6 }}
            />
            {/* Reference lines for optimal range */}
            <Line 
              type="monotone" 
              dataKey={() => 18} 
              stroke="#10b981" 
              strokeWidth={1}
              strokeDasharray="5 5"
              dot={false}
            />
            <Line 
              type="monotone" 
              dataKey={() => 28} 
              stroke="#10b981" 
              strokeWidth={1}
              strokeDasharray="5 5"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>

        <div className="mt-4 flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
            <span className="text-gray-600">Current Temperature</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-1 bg-green-600"></div>
            <span className="text-gray-600">Optimal Range (18-28°C)</span>
          </div>
        </div>
      </div>

      {/* Area Cards with Thermometers */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">All Areas Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {areas.map((area) => (
            <div 
              key={area.id}
              className={`bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer ${
                selectedArea === area.id ? 'ring-2 ring-orange-500' : ''
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

              <div className="flex items-center justify-center gap-8">
                {/* Thermometer Visualization */}
                <div className="relative">
                  <div className="w-8 h-48 bg-gray-200 rounded-full relative overflow-hidden">
                    {/* Temperature fill */}
                    <div 
                      className={`absolute bottom-0 w-full bg-gradient-to-t ${getTempColor(area.currentTemp)} transition-all duration-500`}
                      style={{ height: `${getTempPosition(area.currentTemp)}%` }}
                    ></div>
                  </div>
                  {/* Bulb at bottom */}
                  <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br ${getTempColor(area.currentTemp)} rounded-full border-4 border-white shadow-lg flex items-center justify-center`}>
                    <span className="text-white text-xs font-bold">{area.currentTemp}°</span>
                  </div>
                </div>

                {/* Temperature scale */}
                <div className="flex flex-col justify-between h-48 text-xs text-gray-500">
                  <span>40°C</span>
                  <span>30°C</span>
                  <span>20°C</span>
                  <span>10°C</span>
                  <span>0°C</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border border-orange-200">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-orange-600 rounded-lg">
            <Thermometer className="text-white" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Smart Recommendations</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">🔥</span>
                <span><strong>Area 3</strong> temperature is high (32°C). Consider increased watering or shade installation.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">❄️</span>
                <span><strong>Area 5</strong> temperature is low (16°C). Monitor for frost risk during night hours.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Areas 1, 2, 4, and 6 are within optimal temperature range. No action required.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Temperature;