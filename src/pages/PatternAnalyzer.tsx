import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Cloud, CloudRain, Sun, TrendingUp, Activity, Zap, Download, Calendar } from 'lucide-react';

interface WeatherPattern {
  month: string;
  temperature: number;
  humidity: number;
  rainfall: number;
  soilMoisture: number;
}

const PatternAnalyzer: React.FC = () => {
  const [timeRange, setTimeRange] = useState<string>('year');
  const [analysisType, setAnalysisType] = useState<string>('correlation');

  // Sample data for patterns
  const weatherPatterns: WeatherPattern[] = [
    { month: 'Jan', temperature: 25, humidity: 65, rainfall: 120, soilMoisture: 68 },
    { month: 'Feb', temperature: 26, humidity: 63, rainfall: 95, soilMoisture: 65 },
    { month: 'Mar', temperature: 27, humidity: 62, rainfall: 80, soilMoisture: 62 },
    { month: 'Apr', temperature: 29, humidity: 68, rainfall: 110, soilMoisture: 70 },
    { month: 'May', temperature: 30, humidity: 72, rainfall: 180, soilMoisture: 75 },
    { month: 'Jun', temperature: 29, humidity: 75, rainfall: 220, soilMoisture: 78 },
    { month: 'Jul', temperature: 28, humidity: 77, rainfall: 240, soilMoisture: 80 },
    { month: 'Aug', temperature: 28, humidity: 76, rainfall: 230, soilMoisture: 79 },
    { month: 'Sep', temperature: 28, humidity: 74, rainfall: 200, soilMoisture: 76 },
    { month: 'Oct', temperature: 27, humidity: 70, rainfall: 160, soilMoisture: 72 },
    { month: 'Nov', temperature: 26, humidity: 68, rainfall: 140, soilMoisture: 69 },
    { month: 'Dec', temperature: 25, humidity: 66, rainfall: 130, soilMoisture: 67 }
  ];

  const correlationData = [
    { factor: 'Rainfall', correlation: 0.92, impact: 'High' },
    { factor: 'Humidity', correlation: 0.78, impact: 'Medium' },
    { factor: 'Temperature', correlation: -0.45, impact: 'Medium' },
    { factor: 'Wind Speed', correlation: -0.23, impact: 'Low' },
    { factor: 'UV Index', correlation: -0.18, impact: 'Low' }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Low':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Environmental Pattern Analyzer</h1>
          <p className="text-gray-600 text-sm mt-1">Analyze correlations between environmental factors</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            aria-label="Select time range for analysis"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
            <option value="all">All Time</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download size={20} />
            Export
          </button>
        </div>
      </div>

      {/* Current Weather Card */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Current Conditions</h2>
            <p className="text-sm opacity-90">Dagupan, Pangasinan</p>
          </div>
          <Sun size={48} className="text-yellow-300" />
        </div>

        <div className="text-5xl font-bold mb-4">33°C</div>
        <p className="text-sm mb-6 opacity-90">
          Thunderstorms developing in the afternoon. Highs 32 to 34°...
        </p>

        <div className="flex gap-4 overflow-x-auto pb-2">
          {[
            { time: '1 pm', temp: '33°', icon: Cloud },
            { time: '2 pm', temp: '33°', icon: Cloud },
            { time: '3 pm', temp: '33°', icon: Cloud },
            { time: '4 pm', temp: '32°', icon: CloudRain },
            { time: '5 pm', temp: '30°', icon: CloudRain },
            { time: '6 pm', temp: '28°', icon: CloudRain }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2 min-w-max bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <div className="text-xs">{item.time}</div>
              <item.icon size={24} />
              <div className="text-sm font-semibold">{item.temp}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/20">
          <div>
            <div className="text-sm opacity-80">Precipitation</div>
            <div className="text-2xl font-bold">14mm</div>
          </div>
          <div>
            <div className="text-sm opacity-80">Wind</div>
            <div className="text-2xl font-bold">Moderate (5)</div>
          </div>
          <div>
            <div className="text-sm opacity-80">Humidity</div>
            <div className="text-2xl font-bold">66%</div>
          </div>
        </div>
      </div>

      {/* Analysis Type Selector */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setAnalysisType('correlation')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              analysisType === 'correlation'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Correlation Analysis
          </button>
          <button
            onClick={() => setAnalysisType('trends')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              analysisType === 'trends'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Trend Analysis
          </button>
          <button
            onClick={() => setAnalysisType('patterns')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              analysisType === 'patterns'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Pattern Detection
          </button>
        </div>
      </div>

      {/* Multi-Factor Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Environmental Factors Over Time</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={weatherPatterns}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '12px' }} />
            <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="temperature" stroke="#f97316" strokeWidth={2} name="Temperature (°C)" />
            <Line type="monotone" dataKey="humidity" stroke="#3b82f6" strokeWidth={2} name="Humidity (%)" />
            <Line type="monotone" dataKey="rainfall" stroke="#10b981" strokeWidth={2} name="Rainfall (mm)" />
            <Line type="monotone" dataKey="soilMoisture" stroke="#8b5cf6" strokeWidth={2} name="Soil Moisture (%)" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Correlation Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Correlation with Soil Moisture</h2>
          <div className="space-y-4">
            {correlationData.map((item, idx) => (
              <div key={idx} className="border-b pb-4 last:border-b-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-700">{item.factor}</span>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full border text-xs font-medium ${getImpactColor(item.impact)}`}>
                      {item.impact}
                    </span>
                    <span className="font-bold text-gray-800">{item.correlation.toFixed(2)}</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all ${
                      item.correlation > 0 ? 'bg-green-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.abs(item.correlation) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Negative</span>
                  <span>Positive</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Rainfall Impact Analysis</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weatherPatterns}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip />
              <Bar dataKey="rainfall" fill="#3b82f6" name="Rainfall (mm)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-green-600 rounded-lg">
              <TrendingUp className="text-white" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Strong Correlation</h3>
          </div>
          <p className="text-sm text-gray-700">
            Rainfall shows a <strong>92% positive correlation</strong> with soil moisture. 
            Expected rain can reduce irrigation needs significantly.
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-blue-600 rounded-lg">
              <Activity className="text-white" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Seasonal Pattern</h3>
          </div>
          <p className="text-sm text-gray-700">
            Peak moisture levels occur during <strong>July-September</strong> (rainy season). 
            Reduce irrigation by 40-60% during these months.
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-purple-600 rounded-lg">
              <Zap className="text-white" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Optimization</h3>
          </div>
          <p className="text-sm text-gray-700">
            Smart scheduling based on weather patterns can <strong>reduce water usage by 35%</strong> 
            while maintaining optimal moisture levels.
          </p>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border border-orange-200">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-orange-600 rounded-lg">
            <Activity className="text-white" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">AI-Powered Recommendations</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Based on historical patterns, <strong>reduce irrigation by 30%</strong> this week due to high humidity (66%).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">ℹ️</span>
                <span>Thunderstorms expected this afternoon will provide 14mm of rainfall. Skip scheduled irrigation for Areas 1, 3, and 5.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">💡</span>
                <span>Temperature-humidity correlation suggests optimal irrigation window is <strong>6-9 AM</strong> for maximum efficiency.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatternAnalyzer;