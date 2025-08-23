'use client';

import { useAuth } from '@/lib/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LoadingSpinner } from '@/components/ui/sidebar';
import {
  IconUsers,
  IconLungs,
  IconDeviceMobile,
  IconActivity,
  IconAlertTriangle,
  IconSettings,
  IconTrendingUp,
  IconMicrophone,
  IconDatabase,
  IconServer,
} from '@tabler/icons-react';
import {
  LineChart,
  Line,
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
  AreaChart,
  Area,
} from 'recharts';

export default function AdminDashboard() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [timeRange, setTimeRange] = useState('30d');

  // Mock data for charts - in real app, this would come from API
  const mockData = {
    userGrowth: [
      { month: 'Jan', users: 45, newUsers: 12, activeUsers: 38 },
      { month: 'Feb', users: 67, newUsers: 22, activeUsers: 58 },
      { month: 'Mar', users: 89, newUsers: 22, activeUsers: 76 },
      { month: 'Apr', users: 112, newUsers: 23, activeUsers: 98 },
      { month: 'May', users: 134, newUsers: 22, activeUsers: 118 },
      { month: 'Jun', users: 156, newUsers: 22, activeUsers: 142 },
      { month: 'Jul', users: 178, newUsers: 22, activeUsers: 162 },
      { month: 'Aug', users: 201, newUsers: 23, activeUsers: 185 },
      { month: 'Sep', users: 224, newUsers: 23, activeUsers: 208 },
      { month: 'Oct', users: 248, newUsers: 24, activeUsers: 232 },
      { month: 'Nov', users: 272, newUsers: 24, activeUsers: 256 },
      { month: 'Dec', users: 296, newUsers: 24, activeUsers: 280 },
    ],
    systemPerformance: [
      { time: '00:00', cpu: 15, memory: 45, responseTime: 120, uptime: 99.9 },
      { time: '04:00', cpu: 12, memory: 42, responseTime: 110, uptime: 99.9 },
      { time: '08:00', cpu: 35, memory: 58, responseTime: 180, uptime: 99.8 },
      { time: '12:00', cpu: 45, memory: 65, responseTime: 220, uptime: 99.7 },
      { time: '16:00', cpu: 38, memory: 62, responseTime: 190, uptime: 99.8 },
      { time: '20:00', cpu: 28, memory: 55, responseTime: 150, uptime: 99.9 },
    ],
    deviceUsage: [
      { device: 'Device A', recordings: 156, uptime: 98.5, battery: 85 },
      { device: 'Device B', recordings: 142, uptime: 97.2, battery: 92 },
      { device: 'Device C', recordings: 189, uptime: 99.1, battery: 78 },
      { device: 'Device D', recordings: 134, uptime: 96.8, battery: 88 },
      { device: 'Device E', recordings: 167, uptime: 98.9, battery: 91 },
    ],
    respiratoryTrends: [
      { week: 'Week 1', recordings: 89, abnormal: 12, quality: 94.2 },
      { week: 'Week 2', recordings: 92, abnormal: 15, quality: 93.8 },
      { week: 'Week 3', recordings: 87, abnormal: 11, quality: 95.1 },
      { week: 'Week 4', recordings: 95, abnormal: 18, quality: 92.9 },
      { week: 'Week 5', recordings: 91, abnormal: 14, quality: 94.5 },
      { week: 'Week 6', recordings: 88, abnormal: 13, quality: 94.8 },
    ],
    dataQuality: [
      { category: 'Excellent', value: 65, color: '#10b981' },
      { category: 'Good', value: 25, color: '#3b82f6' },
      { category: 'Fair', value: 8, color: '#f59e0b' },
      { category: 'Poor', value: 2, color: '#ef4444' },
    ],
    recentActivity: [
      { hour: '00:00', logins: 2, uploads: 5, errors: 0 },
      { hour: '04:00', logins: 1, uploads: 3, errors: 0 },
      { hour: '08:00', logins: 15, uploads: 28, errors: 2 },
      { hour: '12:00', logins: 23, uploads: 45, errors: 1 },
      { hour: '16:00', logins: 19, uploads: 38, errors: 1 },
      { hour: '20:00', logins: 12, uploads: 22, errors: 0 },
    ],
  };

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    } else if (!isLoading && user && user.role !== 'admin') {
      router.push('/dashboard');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="md" text="Loading admin dashboard..." />
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-neutral-900">Admin Dashboard</h1>
        <p className="text-neutral-600 mt-2">Welcome back, {user.firstName}! Here&apos;s an overview of your system.</p>
        
        {/* Time Range Selector */}
        <div className="flex items-center gap-4 mt-4">
          <span className="text-sm text-neutral-600">Time Range:</span>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="1y">Last Year</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Users Management Card */}
        <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-neutral-900">Users</h2>
            <IconUsers className="w-6 h-6 text-blue-600" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-600">Total Users</span>
              <span className="text-sm font-semibold text-neutral-900">124</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-600">New This Week</span>
              <span className="text-sm font-semibold text-neutral-900">12</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-600">Active Patients</span>
              <span className="text-sm font-semibold text-neutral-900">98</span>
            </div>
            <button 
              onClick={() => router.push('/dashboard/admin/users')}
              className="w-full mt-4 p-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium"
            >
              Manage Users
            </button>
          </div>
        </div>

        {/* Respiratory Data Card */}
        <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-neutral-900">Respiratory Data</h2>
            <IconLungs className="w-6 h-6 text-green-600" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-600">Total Recordings</span>
              <span className="text-sm font-semibold text-neutral-900">920</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-600">Patients</span>
              <span className="text-sm font-semibold text-neutral-900">126</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-600">Analysis Pending</span>
              <span className="text-sm font-semibold text-neutral-900">23</span>
            </div>
            <button 
              onClick={() => router.push('/dashboard/admin/analytics')}
              className="w-full mt-4 p-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors font-medium"
            >
              View Analytics
            </button>
          </div>
        </div>

        {/* Devices Card */}
        <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-neutral-900">Devices</h2>
            <IconDeviceMobile className="w-6 h-6 text-purple-600" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-600">Total Devices</span>
              <span className="text-sm font-semibold text-neutral-900">15</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-600">Active</span>
              <span className="text-sm font-semibold text-neutral-900">12</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-600">Maintenance Due</span>
              <span className="text-sm font-semibold text-neutral-900">3</span>
            </div>
            <button 
              onClick={() => router.push('/dashboard/admin/devices')}
              className="w-full mt-4 p-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium"
            >
              Manage Devices
            </button>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-neutral-900">System Status</h2>
            <IconActivity className="w-6 h-6 text-green-600" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-600">Server Status</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Online</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-600">Database</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Healthy</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-600">API Response Time</span>
              <span className="text-sm font-semibold text-neutral-900">120ms</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-600">Last Backup</span>
              <span className="text-sm font-semibold text-neutral-900">Today, 04:30 AM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row 1 - User Growth & System Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Trends */}
        <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-neutral-900">User Growth Trends</h2>
            <IconTrendingUp className="w-5 h-5 text-blue-600" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockData.userGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [value, 'Users']} />
              <Legend />
              <Line type="monotone" dataKey="users" stroke="#ef4444" strokeWidth={2} name="Total Users" />
              <Line type="monotone" dataKey="newUsers" stroke="#3b82f6" strokeWidth={2} name="New Users" />
              <Line type="monotone" dataKey="activeUsers" stroke="#10b981" strokeWidth={2} name="Active Users" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* System Performance */}
        <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-neutral-900">System Performance</h2>
            <IconServer className="w-5 h-5 text-green-600" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={mockData.systemPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip formatter={(value, name) => [
                name === 'responseTime' ? `${value}ms` : 
                name === 'uptime' ? `${value}%` : 
                name === 'cpu' || name === 'memory' ? `${value}%` : value,
                name === 'responseTime' ? 'Response Time' :
                name === 'uptime' ? 'Uptime' :
                name === 'cpu' ? 'CPU Usage' :
                name === 'memory' ? 'Memory Usage' : name
              ]} />
              <Legend />
              <Area type="monotone" dataKey="cpu" stackId="1" stroke="#ef4444" fill="#fecaca" name="CPU Usage" />
              <Area type="monotone" dataKey="memory" stackId="2" stroke="#3b82f6" fill="#dbeafe" name="Memory Usage" />
              <Area type="monotone" dataKey="uptime" stackId="3" stroke="#10b981" fill="#d1fae5" name="Uptime" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 - Device Usage & Respiratory Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Device Usage Statistics */}
        <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-neutral-900">Device Usage Statistics</h2>
            <IconDeviceMobile className="w-5 h-5 text-purple-600" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockData.deviceUsage}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="device" />
              <YAxis />
              <Tooltip formatter={(value, name) => [
                name === 'recordings' ? value :
                name === 'uptime' ? `${value}%` :
                name === 'battery' ? `${value}%` : value,
                name === 'recordings' ? 'Recordings' :
                name === 'uptime' ? 'Uptime' :
                name === 'battery' ? 'Battery' : name
              ]} />
              <Legend />
              <Bar dataKey="recordings" fill="#8b5cf6" name="Recordings" />
              <Bar dataKey="uptime" fill="#06b6d4" name="Uptime %" />
              <Bar dataKey="battery" fill="#10b981" name="Battery %" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Respiratory Data Trends */}
        <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-neutral-900">Respiratory Data Trends</h2>
            <IconMicrophone className="w-5 h-5 text-teal-600" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockData.respiratoryTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip formatter={(value, name) => [
                name === 'recordings' ? value :
                name === 'abnormal' ? value :
                name === 'quality' ? `${value}%` : value,
                name === 'recordings' ? 'Recordings' :
                name === 'abnormal' ? 'Abnormal Sounds' :
                name === 'quality' ? 'Data Quality' : name
              ]} />
              <Legend />
              <Line type="monotone" dataKey="recordings" stroke="#ef4444" strokeWidth={2} name="Recordings" />
              <Line type="monotone" dataKey="abnormal" stroke="#f59e0b" strokeWidth={2} name="Abnormal Sounds" />
              <Line type="monotone" dataKey="quality" stroke="#10b981" strokeWidth={2} name="Data Quality %" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 3 - Data Quality & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Data Quality Distribution */}
        <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-neutral-900">Data Quality Distribution</h2>
            <IconDatabase className="w-5 h-5 text-blue-600" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={mockData.dataQuality}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {mockData.dataQuality.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activity Trends */}
        <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-neutral-900">Recent Activity Trends</h2>
            <IconActivity className="w-5 h-5 text-green-600" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockData.recentActivity}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip formatter={(value, name) => [
                value,
                name === 'logins' ? 'Logins' :
                name === 'uploads' ? 'Data Uploads' :
                name === 'errors' ? 'Errors' : name
              ]} />
              <Legend />
              <Bar dataKey="logins" fill="#3b82f6" name="Logins" />
              <Bar dataKey="uploads" fill="#10b981" name="Data Uploads" />
              <Bar dataKey="errors" fill="#ef4444" name="Errors" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-lg">
        <h2 className="text-lg font-semibold text-neutral-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button 
            onClick={() => router.push('/dashboard/admin/users')}
            className="p-4 text-left rounded-xl bg-red-600 text-white hover:bg-red-700 transition-colors font-medium"
          >
            <IconUsers className="w-5 h-5 mb-2" />
            Add New User
          </button>
          <button 
            onClick={() => router.push('/dashboard/admin/analytics')}
            className="p-4 text-left rounded-xl bg-teal-600 text-white hover:bg-teal-700 transition-colors font-medium"
          >
            <IconActivity className="w-5 h-5 mb-2" />
            View Analytics
          </button>
          <button 
            onClick={() => router.push('/dashboard/admin/settings')}
            className="p-4 text-left rounded-xl bg-neutral-200 text-neutral-800 hover:bg-neutral-300 transition-colors font-medium"
          >
            <IconSettings className="w-5 h-5 mb-2" />
            System Settings
          </button>
          <button 
            onClick={() => router.push('/dashboard/admin/alerts')}
            className="p-4 text-left rounded-xl bg-red-100 text-red-800 hover:bg-red-200 transition-colors font-medium"
          >
            <IconAlertTriangle className="w-5 h-5 mb-2" />
            View Alerts
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-lg">
        <h2 className="text-lg font-semibold text-neutral-900 mb-6">Recent Activity</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b border-neutral-200">
              <tr>
                <th className="text-left p-3 text-sm font-medium text-neutral-600">User</th>
                <th className="text-left p-3 text-sm font-medium text-neutral-600">Action</th>
                <th className="text-left p-3 text-sm font-medium text-neutral-600">Date</th>
                <th className="text-left p-3 text-sm font-medium text-neutral-600">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                <td className="p-3 text-sm text-neutral-900 font-medium">John D.</td>
                <td className="p-3 text-sm text-neutral-700">Data Upload</td>
                <td className="p-3 text-sm text-neutral-700">Today, 9:41 AM</td>
                <td className="p-3">
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Completed</span>
                </td>
              </tr>
              <tr className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                <td className="p-3 text-sm text-neutral-900 font-medium">Sarah M.</td>
                <td className="p-3 text-sm text-neutral-700">Profile Update</td>
                <td className="p-3 text-sm text-neutral-700">Today, 8:23 AM</td>
                <td className="p-3">
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Completed</span>
                </td>
              </tr>
              <tr className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                <td className="p-3 text-sm text-neutral-900 font-medium">Robert T.</td>
                <td className="p-3 text-sm text-neutral-700">Device Connection</td>
                <td className="p-3 text-sm text-neutral-700">Yesterday, 7:52 PM</td>
                <td className="p-3">
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">Pending</span>
                </td>
              </tr>
              <tr className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                <td className="p-3 text-sm text-neutral-900 font-medium">Emma W.</td>
                <td className="p-3 text-sm text-neutral-700">Account Creation</td>
                <td className="p-3 text-sm text-neutral-700">Yesterday, 4:12 PM</td>
                <td className="p-3">
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Completed</span>
                </td>
              </tr>
              <tr className="hover:bg-neutral-50 transition-colors">
                <td className="p-3 text-sm text-neutral-900 font-medium">Michael B.</td>
                <td className="p-3 text-sm text-neutral-700">Password Reset</td>
                <td className="p-3 text-sm text-neutral-700">Yesterday, 2:34 PM</td>
                <td className="p-3">
                  <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Failed</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
