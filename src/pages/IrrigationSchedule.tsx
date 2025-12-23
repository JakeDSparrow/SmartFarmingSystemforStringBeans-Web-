import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Plus, Clock, Droplets, Edit, Trash2, Check } from 'lucide-react';

interface Schedule {
  id: string;
  title: string;
  area: string;
  time: string;
  duration: number;
  days: number[];
  isActive: boolean;
  color: string;
}

interface CalendarDay {
  date: number;
  month: number;
  isCurrentMonth: boolean;
  schedules: Schedule[];
}

const IrrigationSchedule: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showAddModal, setShowAddModal] = useState(false);

  const [schedules, setSchedules] = useState<Schedule[]>([
    {
      id: '1',
      title: 'Morning Irrigation - Area 1',
      area: 'Area 1',
      time: '08:00',
      duration: 30,
      days: [1, 3, 5],
      isActive: true,
      color: 'bg-blue-500'
    },
    {
      id: '2',
      title: 'Evening Watering - Area 2',
      area: 'Area 2',
      time: '18:00',
      duration: 45,
      days: [0, 2, 4, 6],
      isActive: true,
      color: 'bg-green-500'
    },
    {
      id: '3',
      title: 'Midday Spray - Area 3',
      area: 'Area 3',
      time: '12:00',
      duration: 20,
      days: [1, 2, 3, 4, 5],
      isActive: false,
      color: 'bg-purple-500'
    }
  ]);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (month: number, year: number): CalendarDay[] => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days: CalendarDay[] = [];
    
    // Previous month days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: prevMonthLastDay - i,
        month: month - 1,
        isCurrentMonth: false,
        schedules: []
      });
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const dayOfWeek = new Date(year, month, i).getDay();
      const daySchedules = schedules.filter(s => s.isActive && s.days.includes(dayOfWeek));
      days.push({
        date: i,
        month: month,
        isCurrentMonth: true,
        schedules: daySchedules
      });
    }
    
    // Next month days
    const remainingDays = 42 - days.length; // 6 rows * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: i,
        month: month + 1,
        isCurrentMonth: false,
        schedules: []
      });
    }
    
    return days;
  };

  const previousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const toggleSchedule = (id: string) => {
    setSchedules(schedules.map(s => 
      s.id === id ? { ...s, isActive: !s.isActive } : s
    ));
  };

  const deleteSchedule = (id: string) => {
    setSchedules(schedules.filter(s => s.id !== id));
  };

  const calendarDays = getDaysInMonth(currentMonth, currentYear);
  const today = new Date();
  const isToday = (day: CalendarDay) => 
    day.date === today.getDate() && 
    day.month === today.getMonth() && 
    day.isCurrentMonth;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Irrigation Schedule</h1>
          <p className="text-gray-600 text-sm mt-1">Plan and manage your watering schedules</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Add Schedule
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Active Schedules</span>
            <Calendar className="text-blue-600" size={20} />
          </div>
          <div className="text-3xl font-bold text-gray-800">
            {schedules.filter(s => s.isActive).length}
          </div>
          <div className="text-sm text-gray-600 mt-2">Currently running</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Today's Tasks</span>
            <Clock className="text-green-600" size={20} />
          </div>
          <div className="text-3xl font-bold text-gray-800">
            {schedules.filter(s => s.isActive && s.days.includes(today.getDay())).length}
          </div>
          <div className="text-sm text-gray-600 mt-2">Scheduled for today</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Total Duration</span>
            <Droplets className="text-purple-600" size={20} />
          </div>
          <div className="text-3xl font-bold text-gray-800">
            {schedules.reduce((sum, s) => s.isActive ? sum + s.duration : sum, 0)}
          </div>
          <div className="text-sm text-gray-600 mt-2">Minutes per cycle</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Next Schedule</span>
            <Clock className="text-orange-600" size={20} />
          </div>
          <div className="text-2xl font-bold text-gray-800">08:00</div>
          <div className="text-sm text-gray-600 mt-2">Area 1 - Tomorrow</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Time Schedules List */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Clock size={20} />
            Time Schedules
          </h3>
          
          <div className="space-y-3">
            {schedules.map((schedule) => (
              <div
                key={schedule.id}
                className={`border-2 rounded-lg p-4 transition-all ${
                  schedule.isActive ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${schedule.color}`}></div>
                    <span className="font-semibold text-gray-800">{schedule.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => toggleSchedule(schedule.id)}
                      className={`p-1 rounded ${
                        schedule.isActive
                          ? 'text-green-600 hover:bg-green-100'
                          : 'text-gray-400 hover:bg-gray-100'
                      }`}
                      title={schedule.isActive ? 'Active' : 'Inactive'}
                    >
                      <Check size={16} />
                    </button>
                    <button
                      className="p-1 hover:bg-blue-100 rounded text-blue-600"
                      title="Edit schedule"
                      aria-label="Edit schedule"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => deleteSchedule(schedule.id)}
                      className="p-1 hover:bg-red-100 rounded text-red-600"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="text-sm text-gray-600 mb-1">{schedule.title}</div>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>{schedule.duration} min</span>
                  <span>{schedule.days.length} days/week</span>
                </div>
              </div>
            ))}
          </div>

          {schedules.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Calendar size={48} className="mx-auto mb-2 opacity-50" />
              <p>No schedules yet</p>
              <p className="text-xs mt-1">Click "Add Schedule" to create one</p>
            </div>
          )}
        </div>

        {/* Calendar */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={previousMonth}
              title='Previous Month'
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <h3 className="text-xl font-bold text-gray-800">
              {monthNames[currentMonth]} {currentYear}
            </h3>
            <button
              onClick={nextMonth}
              title='Next Month'
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {dayNames.map((day) => (
              <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((day, index) => (
              <div
                key={index}
                className={`aspect-square border rounded-lg p-2 transition-all cursor-pointer hover:bg-gray-50 ${
                  !day.isCurrentMonth ? 'bg-gray-50 opacity-50' : 'bg-white'
                } ${
                  isToday(day) ? 'border-blue-500 bg-blue-50 font-bold' : 'border-gray-200'
                }`}
                onClick={() => setSelectedDate(new Date(currentYear, day.month, day.date))}
              >
                <div className={`text-sm ${isToday(day) ? 'text-blue-600' : 'text-gray-700'}`}>
                  {day.date}
                </div>
                <div className="mt-1 space-y-1">
                  {day.schedules.slice(0, 2).map((schedule) => (
                    <div
                      key={schedule.id}
                      className={`w-full h-1 rounded ${schedule.color}`}
                      title={schedule.title}
                    ></div>
                  ))}
                  {day.schedules.length > 2 && (
                    <div className="text-xs text-gray-500">+{day.schedules.length - 2}</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-6 pt-4 border-t">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Schedule Legend</h4>
            <div className="flex flex-wrap gap-4">
              {schedules.filter(s => s.isActive).map((schedule) => (
                <div key={schedule.id} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${schedule.color}`}></div>
                  <span className="text-xs text-gray-600">{schedule.area}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Notes Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Schedule Notes</h3>
        <textarea
          className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Add notes about irrigation schedules, maintenance reminders, or special instructions..."
        ></textarea>
        <div className="flex justify-end mt-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Save Notes
          </button>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-green-600 rounded-lg">
            <Calendar className="text-white" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Smart Scheduling Tips</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Best watering times are early morning (6-10 AM) or evening (6-8 PM) to minimize evaporation.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">ℹ️</span>
                <span>Consider weather forecasts - skip scheduled irrigation when rain is expected.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">💡</span>
                <span>Rotate irrigation times weekly to ensure even water distribution across all areas.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IrrigationSchedule;