'use client';

import { useAuth } from '@/lib/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { LoadingSpinner } from '@/components/ui/sidebar';
import {
  IconUsers,
  IconLungs,
  IconDeviceMobile,
  IconActivity,
  IconAlertTriangle,
  IconSettings,
} from '@tabler/icons-react';

export default function AdminDashboard() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

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
        <p className="text-neutral-600 mt-2">Welcome back, {user.firstName}! Here's an overview of your system.</p>
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
