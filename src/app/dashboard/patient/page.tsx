'use client';

import { useAuth } from '@/lib/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import {
  IconLungs,
  IconDeviceMobile,
  IconCalendar,
  IconUser,
  IconActivity,
  IconAlertTriangle,
  IconHeartbeat,
  IconTrendingUp,
} from '@tabler/icons-react';

export default function PatientDashboard() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

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
        <p className="text-neutral-600 text-sm">Welcome back, {user.firstName}! Here's an overview of your respiratory health.</p>
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
