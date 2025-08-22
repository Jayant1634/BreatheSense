'use client';

import { useAuth } from '@/lib/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
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
  LineChart,
  Line,
  AreaChart,
  Area,
} from 'recharts';
import {
  IconUsers,
  IconMicrophone,
  IconLungs,
  IconActivity,
  IconTrendingUp,
  IconAlertTriangle,
} from '@tabler/icons-react';

// Mock data for respiratory sounds
const respiratoryData = {
  totalRecordings: 920,
  totalPatients: 126,
  totalCycles: 6898,
  crackles: 1864,
  wheezes: 886,
  both: 506,
  clean: 6898 - 1864 - 886 - 506,
};

// Mock data for age distribution
const ageDistribution = [
  { range: '18-25', count: 38, percentage: 38 },
  { range: '26-35', count: 43, percentage: 43 },
  { range: '36-45', count: 34, percentage: 34 },
  { range: '46-55', count: 21, percentage: 21 },
  { range: '56-65', count: 26, percentage: 26 },
  { range: '65+', count: 35, percentage: 35 },
];

// Mock data for gender distribution
const genderData = [
  { name: 'Female', value: 53, color: '#FF6B6B' },
  { name: 'Male', value: 47, color: '#4ECDC4' },
];

// Mock data for smoking status
const smokingData = [
  { name: 'Non-Smoker', value: 36, color: '#45B7D1' },
  { name: 'Current Smoker', value: 33, color: '#96CEB4' },
  { name: 'Ex-Smoker', value: 31, color: '#FFEAA7' },
];

// Mock data for asthma diagnosis
const diagnosisData = [
  { name: 'Asthma', value: 52, color: '#DDA0DD' },
  { name: 'No Asthma', value: 48, color: '#98D8C8' },
];

// Mock data for medication usage
const medicationData = [
  { name: 'None', value: 48, color: '#F7DC6F' },
  { name: 'Controller', value: 28, color: '#BB8FCE' },
  { name: 'Inhaler', value: 24, color: '#85C1E9' },
];

// Mock data for peak flow over time
const peakFlowData = [
  { month: 'Jan', avg: 250, min: 150, max: 400 },
  { month: 'Feb', avg: 245, min: 145, max: 395 },
  { month: 'Mar', avg: 260, min: 160, max: 410 },
  { month: 'Apr', avg: 255, min: 155, max: 405 },
  { month: 'May', avg: 270, min: 170, max: 420 },
  { month: 'Jun', avg: 265, min: 165, max: 415 },
  { month: 'Jul', avg: 280, min: 180, max: 430 },
  { month: 'Aug', avg: 275, min: 175, max: 425 },
  { month: 'Sep', avg: 290, min: 190, max: 440 },
  { month: 'Oct', avg: 285, min: 185, max: 435 },
  { month: 'Nov', avg: 300, min: 200, max: 450 },
  { month: 'Dec', avg: 295, min: 195, max: 445 },
];

// Mock data for respiratory sound types
const soundTypeData = [
  { type: 'Clean', count: 3642, color: '#A8E6CF' },
  { type: 'Crackles', count: 1864, color: '#FFB3BA' },
  { type: 'Wheezes', count: 886, color: '#BAFFC9' },
  { type: 'Both', count: 506, color: '#FFE4B5' },
];

// Mock data for chest locations
const chestLocationData = [
  { location: 'Trachea', count: 120, color: '#FF6B6B' },
  { location: 'Anterior Left', count: 150, color: '#4ECDC4' },
  { location: 'Anterior Right', count: 150, color: '#45B7D1' },
  { location: 'Posterior Left', count: 150, color: '#96CEB4' },
  { location: 'Posterior Right', count: 150, color: '#FFEAA7' },
  { location: 'Lateral Left', count: 100, color: '#DDA0DD' },
  { location: 'Lateral Right', count: 100, color: '#98D8C8' },
];

export default function AnalyticsPage() {
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
        <div className="text-center">
          <div className="animate-spin rounded-full border-b-2 border-red-600 h-8 w-8 mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Analytics Dashboard</h1>
          <p className="text-neutral-600 mt-1">Comprehensive insights into respiratory health data</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
            <IconActivity className="w-4 h-4" />
            Real-time Data
          </span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Total Recordings</p>
              <p className="text-xl font-bold text-neutral-900">{respiratoryData.totalRecordings.toLocaleString()}</p>
            </div>
            <IconMicrophone className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Total Patients</p>
              <p className="text-xl font-bold text-neutral-900">{respiratoryData.totalPatients}</p>
            </div>
            <IconUsers className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Respiratory Cycles</p>
              <p className="text-xl font-bold text-neutral-900">{respiratoryData.totalCycles.toLocaleString()}</p>
            </div>
            <IconLungs className="w-8 h-8 text-red-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Abnormal Sounds</p>
              <p className="text-xl font-bold text-neutral-900">{respiratoryData.crackles + respiratoryData.wheezes + respiratoryData.both}</p>
            </div>
            <IconAlertTriangle className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Respiratory Sound Types */}
        <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-sm">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Respiratory Sound Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={soundTypeData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={2}
                dataKey="count"
              >
                {soundTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [value, 'Count']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Age Distribution */}
        <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-sm">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Age Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={ageDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip formatter={(value) => [value, 'Count']} />
              <Bar dataKey="count" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Gender Distribution */}
        <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-sm">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Gender Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={genderData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {genderData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Smoking Status */}
        <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-sm">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Smoking Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={smokingData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {smokingData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Diagnosis Distribution */}
        <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-sm">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Diagnosis Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={diagnosisData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {diagnosisData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Medication Usage */}
        <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-sm">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Medication Usage</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={medicationData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {medicationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Peak Flow Trend */}
      <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-sm">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Peak Flow Trends (Monthly)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={peakFlowData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => [value, 'L/min']} />
            <Legend />
            <Area type="monotone" dataKey="avg" stackId="1" stroke="#ef4444" fill="#fecaca" name="Average" />
            <Area type="monotone" dataKey="min" stackId="2" stroke="#3b82f6" fill="#dbeafe" name="Minimum" />
            <Area type="monotone" dataKey="max" stackId="3" stroke="#10b981" fill="#d1fae5" name="Maximum" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-sm">
          <h4 className="font-semibold text-neutral-900 mb-2">Sound Analysis</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-600">Crackles:</span>
              <span className="font-medium">{respiratoryData.crackles}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">Wheezes:</span>
              <span className="font-medium">{respiratoryData.wheezes}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">Both:</span>
              <span className="font-medium">{respiratoryData.both}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">Clean:</span>
              <span className="font-medium">{respiratoryData.clean}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-sm">
          <h4 className="font-semibold text-neutral-900 mb-2">Patient Demographics</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-600">Female:</span>
              <span className="font-medium">{genderData[0].value}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">Male:</span>
              <span className="font-medium">{genderData[1].value}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">Avg Age:</span>
              <span className="font-medium">42</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">Total:</span>
              <span className="font-medium">{respiratoryData.totalPatients}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-sm">
          <h4 className="font-semibold text-neutral-900 mb-2">System Health</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-600">Data Quality:</span>
              <span className="font-medium text-green-600">98.5%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">Processing Time:</span>
              <span className="font-medium">2.3s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">Uptime:</span>
              <span className="font-medium text-green-600">99.9%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">Last Update:</span>
              <span className="font-medium">2 min ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
