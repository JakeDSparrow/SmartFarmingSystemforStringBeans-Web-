import React from 'react';
import { 
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import ProgressRing from '../components/common/ProgressRing';
// Assuming ChartData is not defined, we can define it here
type ChartData = { name?: string; value?: number; x?: string; line1?: number; line2?: number; line3?: number; };

const Dashboard: React.FC = () => {
  const dashboardBarData: ChartData[] = [
    { name: 'A', value: 7500 },
    { name: 'B', value: 6000 },
    { name: 'C', value: 5200 },
    { name: 'D', value: 4800 },
    { name: 'E', value: 4200 }
  ];

  const dashboardLineData: ChartData[] = [
    { x: 'A', line1: 3000, line2: 6000, line3: 1000 },
    { x: 'B', line1: 3200, line2: 7500, line3: 2500 },
    { x: 'C', line1: 2800, line2: 6200, line3: 3500 },
    { x: 'D', line1: 4000, line2: 3500, line3: 4500 },
    { x: 'E', line1: 3500, line2: 4500, line3: 4800 },
    { x: 'F', line1: 2000, line2: 3000, line3: 3500 },
    { x: 'G', line1: 2500, line2: 4200, line3: 2800 },
    { x: 'H', line1: 6500, line2: 2000, line3: 1500 }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Soil Moisture Overview</h3>
          <div className="flex justify-center">
            <ProgressRing percentage={70} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Multi-Line Chart</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dashboardLineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="line1" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="line2" stroke="#10b981" strokeWidth={2} />
              <Line type="monotone" dataKey="line3" stroke="#f59e0b" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Water Usage Statistics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dashboardBarData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Area Chart</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={dashboardLineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="line1" fill="#93c5fd" stroke="#3b82f6" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;