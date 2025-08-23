'use client';

import { useAuth } from '@/lib/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  IconLungs,
  IconDeviceMobile,
  IconCalendar,
  IconUser,
  IconHeartbeat,
  IconChartLine,
  IconChartBar,
  IconChartPie,
} from '@tabler/icons-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export default function PatientDashboard() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [timeRange, setTimeRange] = useState('7d');

  // Mock data for charts - in real app, this would come from API
  const mockData = {
    breathingTrends: [
      { date: 'Mon', breathingRate: 16, oxygenLevel: 98, quality: 85 },
      { date: 'Tue', breathingRate: 15, oxygenLevel: 97, quality: 88 },
      { date: 'Wed', breathingRate: 17, oxygenLevel: 96, quality: 82 },
      { date: 'Thu', breathingRate: 16, oxygenLevel: 98, quality: 90 },
      { date: 'Fri', breathingRate: 15, oxygenLevel: 99, quality: 92 },
      { date: 'Sat', breathingRate: 16, oxygenLevel: 98, quality: 87 },
      { date: 'Sun', breathingRate: 16, oxygenLevel: 98, quality: 89 },
    ],
    weeklyActivity: [
      { day: 'Mon', recordings: 3, duration: 15, quality: 85 },
      { day: 'Tue', recordings: 2, duration: 12, quality: 88 },
      { day: 'Wed', recordings: 4, duration: 20, quality: 82 },
      { day: 'Thu', recordings: 3, duration: 18, quality: 90 },
      { day: 'Fri', recordings: 2, duration: 10, quality: 92 },
      { day: 'Sat', recordings: 1, duration: 8, quality: 87 },
      { day: 'Sun', recordings: 2, duration: 14, quality: 89 },
    ],
    healthMetrics: [
      { metric: 'Breathing Rate', value: 16, target: 15, status: 'good' },
      { metric: 'Oxygen Level', value: 98, target: 95, status: 'excellent' },
      { metric: 'Peak Flow', value: 450, target: 400, status: 'good' },
      { metric: 'Cough Frequency', value: 3, target: 5, status: 'excellent' },
    ],
    devicePerformance: [
      { time: '00:00', battery: 100, signal: 95, temperature: 36.5 },
      { time: '04:00', battery: 95, signal: 92, temperature: 36.3 },
      { time: '08:00', battery: 90, signal: 98, temperature: 36.8 },
      { time: '12:00', battery: 85, signal: 94, temperature: 37.1 },
      { time: '16:00', battery: 80, signal: 96, temperature: 36.9 },
      { time: '20:00', battery: 75, signal: 93, temperature: 36.6 },
    ]
  };

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    } else if (!isLoading && user && user.role === 'admin') {
      router.push('/dashboard/admin');
    }
  }, [user, isLoading, router]);

  if (!user || user.role === 'admin') {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-neutral-900">Patient Dashboard</h1>
        <p className="text-neutral-600 text-sm">Welcome back, {user.firstName}! Here&apos;s an overview of your respiratory health.</p>
      </div>

      {/* Time Range Selector */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-neutral-900">Health Analytics</h2>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
        >
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="90d">Last 90 Days</option>
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Health Data Card */}
        <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-neutral-900">Health Data</h3>
            <IconLungs className="w-5 h-5 text-blue-600" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-600">Total Recordings</span>
              <span className="text-sm font-semibold text-neutral-900">24</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-600">This Week</span>
              <span className="text-sm font-semibold text-neutral-900">5</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-600">Last Recording</span>
              <span className="text-sm font-semibold text-neutral-900">2h ago</span>
            </div>
            <button 
              onClick={() => router.push('/dashboard/patient/health-data')}
              className="w-full mt-3 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-xs font-medium"
            >
              View Data
            </button>
          </div>
        </div>

        {/* Devices Card */}
        <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-neutral-900">Devices</h3>
            <IconDeviceMobile className="w-5 h-5 text-green-600" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-600">Connected</span>
              <span className="text-sm font-semibold text-neutral-900">1</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-600">Battery</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">85%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-600">Status</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Active</span>
            </div>
            <button 
              onClick={() => router.push('/dashboard/patient/devices')}
              className="w-full mt-3 p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-xs font-medium"
            >
              Manage Devices
            </button>
          </div>
        </div>

        {/* Appointments Card */}
        <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-neutral-900">Appointments</h3>
            <IconCalendar className="w-5 h-5 text-purple-600" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-600">Upcoming</span>
              <span className="text-sm font-semibold text-neutral-900">2</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-600">Next</span>
              <span className="text-sm font-semibold text-neutral-900">Tomorrow</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-600">Last Visit</span>
              <span className="text-sm font-semibold text-neutral-900">1 week ago</span>
            </div>
            <button 
              onClick={() => router.push('/dashboard/patient/appointments')}
              className="w-full mt-3 p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-xs font-medium"
            >
              Schedule
            </button>
          </div>
        </div>

        {/* Health Status */}
        <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-neutral-900">Health Status</h3>
            <IconHeartbeat className="w-5 h-5 text-red-600" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-600">Overall</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Good</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-600">Trend</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">Improving</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-600">Risk Level</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Low</span>
            </div>
            <button 
              onClick={() => router.push('/dashboard/patient/profile')}
              className="w-full mt-3 p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-xs font-medium"
            >
              View Profile
            </button>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Breathing Trends Chart */}
        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-neutral-900">Breathing Trends</h3>
            <IconChartLine className="w-5 h-5 text-blue-600" />
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={mockData.breathingTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="breathingRate" 
                stroke="#ef4444" 
                strokeWidth={2}
                name="Breathing Rate (bpm)"
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="oxygenLevel" 
                stroke="#10b981" 
                strokeWidth={2}
                name="Oxygen Level (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Activity Chart */}
        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-neutral-900">Weekly Activity</h3>
            <IconChartBar className="w-5 h-5 text-green-600" />
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={mockData.weeklyActivity}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="recordings" fill="#3b82f6" name="Recordings" />
              <Bar dataKey="duration" fill="#10b981" name="Duration (min)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Additional Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Health Metrics Overview */}
        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-neutral-900">Health Metrics</h3>
            <IconChartPie className="w-5 h-5 text-purple-600" />
          </div>
          <div className="space-y-4">
            {mockData.healthMetrics.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-neutral-600">{item.metric}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-neutral-900">{item.value}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.status === 'excellent' ? 'bg-green-100 text-green-800' :
                    item.status === 'good' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Device Performance */}
        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-neutral-900">Device Performance</h3>
            <IconDeviceMobile className="w-5 h-5 text-orange-600" />
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={mockData.devicePerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="battery" 
                stroke="#f59e0b" 
                fill="#f59e0b"
                fillOpacity={0.3}
                name="Battery (%)"
              />
              <Area 
                type="monotone" 
                dataKey="signal" 
                stroke="#10b981" 
                fill="#10b981"
                fillOpacity={0.3}
                name="Signal (%)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Quality Score Distribution */}
        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-neutral-900">Quality Score</h3>
            <IconChartPie className="w-5 h-5 text-indigo-600" />
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Excellent', value: 35, color: '#10b981' },
                  { name: 'Good', value: 45, color: '#3b82f6' },
                  { name: 'Fair', value: 15, color: '#f59e0b' },
                  { name: 'Poor', value: 5, color: '#ef4444' },
                ]}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {[
                  { name: 'Excellent', value: 35, color: '#10b981' },
                  { name: 'Good', value: 45, color: '#3b82f6' },
                  { name: 'Fair', value: 15, color: '#f59e0b' },
                  { name: 'Poor', value: 5, color: '#ef4444' },
                ].map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-sm">
        <h3 className="text-sm font-semibold text-neutral-900 mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button 
            onClick={() => router.push('/dashboard/patient/health-data')}
            className="p-3 text-left rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors text-xs font-medium"
          >
            <IconLungs className="w-4 h-4 mb-1" />
            Record Breathing
          </button>
          <button 
            onClick={() => router.push('/dashboard/patient/appointments')}
            className="p-3 text-left rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors text-xs font-medium"
          >
            <IconCalendar className="w-4 h-4 mb-1" />
            Book Appointment
          </button>
          <button 
            onClick={() => router.push('/dashboard/patient/devices')}
            className="p-3 text-left rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors text-xs font-medium"
          >
            <IconDeviceMobile className="w-4 h-4 mb-1" />
            Device Settings
          </button>
          <button 
            onClick={() => router.push('/dashboard/patient/profile')}
            className="p-3 text-left rounded-lg bg-neutral-200 text-neutral-800 hover:bg-neutral-300 transition-colors text-xs font-medium"
          >
            <IconUser className="w-4 h-4 mb-1" />
            Update Profile
          </button>
        </div>
      </div>

      {/* Recent Health Data */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-neutral-200">
          <h3 className="text-sm font-semibold text-neutral-900">Recent Health Data</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-neutral-50">
              <tr>
                <th className="text-left p-3 text-xs font-medium text-neutral-600">Date</th>
                <th className="text-left p-3 text-xs font-medium text-neutral-600">Time</th>
                <th className="text-left p-3 text-xs font-medium text-neutral-600">Duration</th>
                <th className="text-left p-3 text-xs font-medium text-neutral-600">Quality</th>
                <th className="text-left p-3 text-xs font-medium text-neutral-600">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                <td className="p-3 text-xs text-neutral-900 font-medium">Today</td>
                <td className="p-3 text-xs text-neutral-700">9:41 AM</td>
                <td className="p-3 text-xs text-neutral-700">5 min</td>
                <td className="p-3 text-xs text-neutral-700">Good</td>
                <td className="p-3">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Analyzed</span>
                </td>
              </tr>
              <tr className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                <td className="p-3 text-xs text-neutral-900 font-medium">Yesterday</td>
                <td className="p-3 text-xs text-neutral-700">8:23 PM</td>
                <td className="p-3 text-xs text-neutral-700">4 min</td>
                <td className="p-3 text-xs text-neutral-700">Fair</td>
                <td className="p-3">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Analyzed</span>
                </td>
              </tr>
              <tr className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                <td className="p-3 text-xs text-neutral-900 font-medium">2 days ago</td>
                <td className="p-3 text-xs text-neutral-700">7:52 PM</td>
                <td className="p-3 text-xs text-neutral-700">6 min</td>
                <td className="p-3 text-xs text-neutral-700">Excellent</td>
                <td className="p-3">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Analyzed</span>
                </td>
              </tr>
              <tr className="hover:bg-neutral-50 transition-colors">
                <td className="p-3 text-xs text-neutral-900 font-medium">3 days ago</td>
                <td className="p-3 text-xs text-neutral-700">4:12 PM</td>
                <td className="p-3 text-xs text-neutral-700">3 min</td>
                <td className="p-3 text-xs text-neutral-700">Poor</td>
                <td className="p-3">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">Review Needed</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Health Tips */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white shadow-sm">
        <h3 className="text-lg font-bold mb-2">Health Tips</h3>
        <p className="text-sm opacity-90 mb-4">
          Remember to record your breathing data regularly for better health monitoring. 
          Consistent data collection helps our AI provide more accurate insights.
        </p>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-sm text-sm">
            Record Now
          </button>
          <button className="px-4 py-2 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors text-sm">
            View Tips
          </button>
        </div>
      </div>
    </div>
  );
}
