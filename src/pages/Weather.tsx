import React, { useState } from 'react';
import { Cloud, CloudRain, Sun, Wind, Droplets, Eye, Gauge, Calendar, MapPin } from 'lucide-react';

interface HourlyForecast {
  time: string;
  temp: string;
  icon: 'sun' | 'cloud' | 'rain';
  precipitation: number;
}

interface DailyForecast {
  day: string;
  high: number;
  low: number;
  condition: string;
  icon: 'sun' | 'cloud' | 'rain';
}

const Weather: React.FC = () => {
  const [location, setLocation] = useState('Dagupan, Pangasinan');

  const hourlyForecast: HourlyForecast[] = [
    { time: '1 PM', temp: '33°', icon: 'cloud', precipitation: 10 },
    { time: '2 PM', temp: '33°', icon: 'cloud', precipitation: 15 },
    { time: '3 PM', temp: '33°', icon: 'cloud', precipitation: 20 },
    { time: '4 PM', temp: '32°', icon: 'rain', precipitation: 60 },
    { time: '5 PM', temp: '30°', icon: 'rain', precipitation: 80 },
    { time: '6 PM', temp: '28°', icon: 'rain', precipitation: 70 },
    { time: '7 PM', temp: '27°', icon: 'rain', precipitation: 50 },
    { time: '8 PM', temp: '26°', icon: 'cloud', precipitation: 30 }
  ];

  const dailyForecast: DailyForecast[] = [
    { day: 'Today', high: 33, low: 25, condition: 'Thunderstorms', icon: 'rain' },
    { day: 'Tomorrow', high: 32, low: 24, condition: 'Partly Cloudy', icon: 'cloud' },
    { day: 'Wednesday', high: 34, low: 26, condition: 'Sunny', icon: 'sun' },
    { day: 'Thursday', high: 33, low: 25, condition: 'Scattered Showers', icon: 'rain' },
    { day: 'Friday', high: 31, low: 24, condition: 'Cloudy', icon: 'cloud' },
    { day: 'Saturday', high: 32, low: 25, condition: 'Partly Cloudy', icon: 'cloud' },
    { day: 'Sunday', high: 33, low: 26, condition: 'Sunny', icon: 'sun' }
  ];

  const getWeatherIcon = (icon: string, size: number = 24) => {
    switch (icon) {
      case 'sun':
        return <Sun size={size} className="text-yellow-500" />;
      case 'cloud':
        return <Cloud size={size} className="text-gray-400" />;
      case 'rain':
        return <CloudRain size={size} className="text-blue-500" />;
      default:
        return <Cloud size={size} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Weather Update</h1>
          <p className="text-gray-600 text-sm mt-1">Current conditions and forecast</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow border border-gray-200">
          <MapPin size={18} className="text-blue-600" />
          <span className="font-medium text-gray-700">{location}</span>
        </div>
      </div>

      {/* Current Weather - Large Card */}
      <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 rounded-2xl shadow-2xl p-8 text-white">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-4">
              <MapPin size={20} />
              <h2 className="text-2xl font-semibold">Dagupan</h2>
            </div>
            <div className="text-7xl font-bold mb-2">33°</div>
            <div className="text-2xl mb-2">Mostly Cloudy</div>
            <div className="text-lg opacity-90">Feels like 41°</div>
            <div className="text-sm opacity-80 mt-2">H: 33° / L: 25°</div>
          </div>
          <div className="text-right">
            <Sun size={80} className="text-yellow-300 mb-4" />
            <div className="text-sm opacity-90">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
            <div className="text-xs opacity-75 mt-1">
              Last updated: {new Date().toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-6 mb-6">
          <p className="text-sm mb-4 opacity-90">
            Thunderstorms developing in the afternoon. Highs 32 to 34°. Chance of rain 80%. 
            Winds SW at 10 to 20 km/h.
          </p>
        </div>

        {/* Hourly Forecast */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Hourly Forecast</h3>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {hourlyForecast.map((hour, idx) => (
              <div 
                key={idx}
                className="flex flex-col items-center gap-2 min-w-max bg-white/10 backdrop-blur-sm rounded-lg p-3 hover:bg-white/20 transition-colors"
              >
                <div className="text-sm font-medium">{hour.time}</div>
                {getWeatherIcon(hour.icon, 32)}
                <div className="text-lg font-bold">{hour.temp}</div>
                <div className="flex items-center gap-1 text-xs">
                  <Droplets size={12} />
                  <span>{hour.precipitation}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weather Details Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/20">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center gap-2 text-sm opacity-80 mb-2">
              <Droplets size={18} />
              <span>Precipitation</span>
            </div>
            <div className="text-2xl font-bold">14mm</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center gap-2 text-sm opacity-80 mb-2">
              <Wind size={18} />
              <span>Wind Speed</span>
            </div>
            <div className="text-2xl font-bold">15 km/h</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center gap-2 text-sm opacity-80 mb-2">
              <Eye size={18} />
              <span>UV Index</span>
            </div>
            <div className="text-2xl font-bold">Extreme</div>
            <div className="text-xs opacity-75 mt-1">Use protection</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center gap-2 text-sm opacity-80 mb-2">
              <Gauge size={18} />
              <span>Humidity</span>
            </div>
            <div className="text-2xl font-bold">66%</div>
          </div>
        </div>
      </div>

      {/* 7-Day Forecast */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">7-Day Forecast</h2>
          <Calendar className="text-gray-600" size={24} />
        </div>
        
        <div className="space-y-3">
          {dailyForecast.map((day, idx) => (
            <div 
              key={idx}
              className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="w-24 font-medium text-gray-700">{day.day}</div>
                <div className="flex items-center gap-3">
                  {getWeatherIcon(day.icon, 32)}
                  <span className="text-gray-600">{day.condition}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 text-sm">High</span>
                  <span className="text-xl font-bold text-red-600">{day.high}°</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 text-sm">Low</span>
                  <span className="text-xl font-bold text-blue-600">{day.low}°</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weather Alerts */}
      <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border-l-4 border-orange-500">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-orange-500 rounded-lg">
            <CloudRain className="text-white" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Weather Alert</h3>
            <p className="text-sm text-gray-700 mb-3">
              <strong>Thunderstorm Watch</strong> in effect from 3:00 PM to 8:00 PM today.
            </p>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• Heavy rainfall expected in the afternoon</li>
              <li>• Strong winds up to 40 km/h possible</li>
              <li>• Consider delaying outdoor irrigation activities</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Agricultural Recommendations */}
      <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-green-600 rounded-lg">
            <Droplets className="text-white" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Irrigation Recommendations</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Expected rainfall of 14mm should provide adequate moisture. Consider reducing irrigation by 30%.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">ℹ️</span>
                <span>High humidity (66%) may increase disease risk. Monitor for fungal growth.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 font-bold">⚠️</span>
                <span>Extreme UV index. Plants may require additional shade during peak hours (12-3 PM).</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;