import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';
import { CloudRain, Droplets, TrendingUp, TrendingDown, Calendar, Download, Sun, Cloud } from 'lucide-react';

interface MonthlyData {
  month: string;
  waterUsage: number;
  rainfall: number;
  avgTemp: number;
  avgHumidity: number;
  irrigationHours: number;
}

const SeasonalSummary: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number>(2025);
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');

  const monthlyData: MonthlyData[] = [
    { month: 'Jan', waterUsage: 450, rainfall: 120, avgTemp: 25, avgHumidity: 65, irrigationHours: 180 },
    { month: 'Feb', waterUsage: 480, rainfall: 95, avgTemp: 26, avgHumidity: 63, irrigationHours: 192 },
    { month: 'Mar', waterUsage: 520, rainfall: 80, avgTemp: 27, avgHumidity: 62, irrigationHours: 208 },
    { month: 'Apr', waterUsage: 580, rainfall: 110, avgTemp: 29, avgHumidity: 68, irrigationHours: 232 },
    { month: 'May', waterUsage: 640, rainfall: 180, avgTemp: 30, avgHumidity: 72, irrigationHours: 256 },
    { month: 'Jun', waterUsage: 720, rainfall: 220, avgTemp: 29, avgHumidity: 75, irrigationHours: 288 },
    { month: 'Jul', waterUsage: 680, rainfall: 240, avgTemp: 28, avgHumidity: 77, irrigationHours: 272 },
    { month: 'Aug', waterUsage: 650, rainfall: 230, avgTemp: 28, avgHumidity: 76, irrigationHours: 260 },
    { month: 'Sep', waterUsage: 600, rainfall: 200, avgTemp: 28, avgHumidity: 74, irrigationHours: 240 },
    { month: 'Oct', waterUsage: 550, rainfall: 160, avgTemp: 27, avgHumidity: 70, irrigationHours: 220 },
    { month: 'Nov', waterUsage: 480, rainfall: 140, avgTemp: 26, avgHumidity: 68, irrigationHours: 192 },
    { month: 'Dec', waterUsage: 420, rainfall: 130, avgTemp: 25, avgHumidity: 66, irrigationHours: 168 }
  ];

  const seasonalData = [
    { season: 'Dry Season', value: 35, color: '#f59e0b' },
    { season: 'Rainy Season', value: 45, color: '#3b82f6' },
    { season: 'Transition', value: 20, color: '#10b981' }
  ];

  const totalWaterUsage = monthlyData.reduce((sum, month) => sum + month.waterUsage, 0);
  const totalRainfall = monthlyData.reduce((sum, month) => sum + month.rainfall, 0);
  const avgTemperature = (monthlyData.reduce((sum, month) => sum + month.avgTemp, 0) / 12).toFixed(1);
  const avgHumidity = (monthlyData.reduce((sum, month) => sum + month.avgHumidity, 0) / 12).toFixed(1);

  const getSeason = (month: string) => {
    const rainyMonths = ['Jul', 'Aug', 'Sep'];
    const dryMonths = ['Jan', 'Feb', 'Mar', 'Apr'];
    
    if (rainyMonths.includes(month)) return { name: 'Rainy Season', color: 'bg-blue-100 text-blue-800' };
    if (dryMonths.includes(month)) return { name: 'Dry Season', color: 'bg-orange-100 text-orange-800' };
    return { name: 'Transition', color: 'bg-green-100 text-green-800' };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Seasonal Irrigation Behavior Summary</h1>
          <p className="text-gray-600 text-sm mt-1">Annual water usage patterns and seasonal trends</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedYear}
            title='Selected Year'
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={2025}>2025</option>
            <option value={2024}>2024</option>
            <option value={2023}>2023</option>
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
            <span className="text-gray-600 text-sm">Total Water Usage</span>
            <Droplets className="text-blue-600" size={20} />
          </div>
          <div className="text-3xl font-bold text-gray-800">{totalWaterUsage.toLocaleString()}L</div>
          <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
            <TrendingDown size={16} />
            <span>-12% from last year</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Total Rainfall</span>
            <CloudRain className="text-indigo-600" size={20} />
          </div>
          <div className="text-3xl font-bold text-gray-800">{totalRainfall}mm</div>
          <div className="flex items-center gap-1 mt-2 text-sm text-blue-600">
            <TrendingUp size={16} />
            <span>+8% from last year</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Avg Temperature</span>
            <Sun className="text-orange-600" size={20} />
          </div>
          <div className="text-3xl font-bold text-gray-800">{avgTemperature}°C</div>
          <div className="text-sm text-gray-600 mt-2">Annual average</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Avg Humidity</span>
            <Cloud className="text-cyan-600" size={20} />
          </div>
          <div className="text-3xl font-bold text-gray-800">{avgHumidity}%</div>
          <div className="text-sm text-gray-600 mt-2">Annual average</div>
        </div>
      </div>

      {/* Season Overview */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Seasonal Overview</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="space-y-3">
              <div className="flex gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-700 mb-3">Dry Season (Jan-Apr)</h3>
                  {['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL'].map(month => (
                    <div key={month} className="py-2 px-4 text-sm hover:bg-gray-50 transition-colors rounded">
                      {month}
                    </div>
                  ))}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-700 mb-3">Transition (May-Jun, Oct-Nov)</h3>
                  {['MAY', 'JUNE'].map(month => (
                    <div key={month} className="py-2 px-4 text-sm hover:bg-gray-50 transition-colors rounded">
                      {month}
                    </div>
                  ))}
                  {['OCTOBER', 'NOVEMBER'].map(month => (
                    <div key={month} className="py-2 px-4 text-sm hover:bg-gray-50 transition-colors rounded">
                      {month}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-700 mb-3">Rainy Season (Jul-Sep)</h3>
                  {['JULY', 'AUGUST', 'SEPTEMBER'].map(month => (
                    <div key={month} className="py-2 px-4 text-sm bg-cyan-50 hover:bg-cyan-100 transition-colors rounded">
                      {month}
                    </div>
                  ))}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-700 mb-3">Cold Months (Dec)</h3>
                  <div className="py-2 px-4 text-sm hover:bg-gray-50 transition-colors rounded">
                    DECEMBER
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center border-2 border-gray-300 rounded-lg p-6 bg-gradient-to-br from-blue-50 to-cyan-50">
            <CloudRain size={64} className="text-blue-600 mb-4" />
            <span className="text-3xl font-bold text-gray-800 mb-2">RAINY SEASON</span>
            <span className="text-sm text-gray-600">Peak rainfall: July-September</span>
            <span className="text-xs text-gray-500 mt-2">Reduce irrigation by 40-60%</span>
          </div>
        </div>
      </div>

      {/* Main Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Monthly Water Usage & Rainfall</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('chart')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                viewMode === 'chart'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Chart View
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                viewMode === 'table'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Table View
            </button>
          </div>
        </div>

        {viewMode === 'chart' ? (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={monthlyData}>
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
              <Bar dataKey="waterUsage" fill="#3b82f6" name="Water Usage (L)" />
              <Bar dataKey="rainfall" fill="#10b981" name="Rainfall (mm)" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-sm">Month</th>
                  <th className="px-4 py-3 text-left text-sm">Season</th>
                  <th className="px-4 py-3 text-right text-sm">Water Usage (L)</th>
                  <th className="px-4 py-3 text-right text-sm">Rainfall (mm)</th>
                  <th className="px-4 py-3 text-right text-sm">Avg Temp (°C)</th>
                  <th className="px-4 py-3 text-right text-sm">Avg Humidity (%)</th>
                  <th className="px-4 py-3 text-right text-sm">Irrigation Hours</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {monthlyData.map((data, idx) => {
                  const season = getSeason(data.month);
                  return (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{data.month}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${season.color}`}>
                          {season.name}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">{data.waterUsage}</td>
                      <td className="px-4 py-3 text-right">{data.rainfall}</td>
                      <td className="px-4 py-3 text-right">{data.avgTemp}</td>
                      <td className="px-4 py-3 text-right">{data.avgHumidity}</td>
                      <td className="px-4 py-3 text-right">{data.irrigationHours}</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className="bg-gray-100 font-bold">
                <tr>
                  <td className="px-4 py-3" colSpan={2}>Total / Average</td>
                  <td className="px-4 py-3 text-right">{totalWaterUsage.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right">{totalRainfall}</td>
                  <td className="px-4 py-3 text-right">{avgTemperature}</td>
                  <td className="px-4 py-3 text-right">{avgHumidity}</td>
                  <td className="px-4 py-3 text-right">
                    {monthlyData.reduce((sum, m) => sum + m.irrigationHours, 0)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>

      {/* Additional Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Temperature & Humidity Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="avgTemp" stroke="#f97316" strokeWidth={2} name="Temperature (°C)" />
              <Line type="monotone" dataKey="avgHumidity" stroke="#3b82f6" strokeWidth={2} name="Humidity (%)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Seasonal Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={seasonalData}
                cx="50%"
                cy="50%"
                labelLine={false}
                nameKey="season"
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {seasonalData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-lg border border-blue-200">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-600 rounded-lg">
            <TrendingUp className="text-white" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Key Insights & Recommendations</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>Peak water usage</strong> occurs in June (720L), coinciding with pre-rainy season heat.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">💧</span>
                <span><strong>Rainy season (Jul-Sep)</strong> provides average 220mm rainfall monthly. Reduce irrigation by 50%.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 font-bold">🔥</span>
                <span><strong>Dry season (Jan-Apr)</strong> requires increased monitoring. Water usage increases by 40%.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">💡</span>
                <span>Overall water efficiency improved by <strong>12% compared to last year</strong> through smart scheduling.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeasonalSummary;