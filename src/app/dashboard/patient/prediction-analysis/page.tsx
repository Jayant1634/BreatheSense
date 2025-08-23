'use client';

import { useAuth } from '@/lib/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LoadingSpinner } from '@/components/ui/sidebar';
import {
  IconTrendingUp,
  IconTrendingDown,
  IconActivity,
  IconLungs,
  IconHeart,
  IconBrain,
  IconClock,
  IconAlertTriangle,
  IconCircleCheck,
  IconInfoCircle,
  IconDevices,
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

// Mock data for demonstration - in real app, this would come from API
const mockData = {
  breathingRate: {
    current: 16,
    average: 15.2,
    trend: 'stable',
    history: [
      { date: '2024-01-01', value: 15, prediction: 15.2 },
      { date: '2024-01-02', value: 16, prediction: 15.8 },
      { date: '2024-01-03', value: 14, prediction: 15.5 },
      { date: '2024-01-04', value: 17, prediction: 16.1 },
      { date: '2024-01-05', value: 15, prediction: 15.9 },
      { date: '2024-01-06', value: 16, prediction: 16.2 },
      { date: '2024-01-07', value: 18, prediction: 16.8 },
    ],
    predictions: [
      { date: '2024-01-08', value: 16.5 },
      { date: '2024-01-09', value: 16.8 },
      { date: '2024-01-10', value: 17.1 },
      { date: '2024-01-11', value: 17.3 },
      { date: '2024-01-12', value: 17.5 },
    ]
  },
  oxygenLevel: {
    current: 98,
    average: 97.8,
    trend: 'improving',
    history: [
      { date: '2024-01-01', value: 97, prediction: 97.2 },
      { date: '2024-01-02', value: 98, prediction: 97.5 },
      { date: '2024-01-03', value: 96, prediction: 97.1 },
      { date: '2024-01-04', value: 98, prediction: 97.8 },
      { date: '2024-01-05', value: 99, prediction: 98.2 },
      { date: '2024-01-06', value: 98, prediction: 98.5 },
      { date: '2024-01-07', value: 98, prediction: 98.8 },
    ],
    predictions: [
      { date: '2024-01-08', value: 98.5 },
      { date: '2024-01-09', value: 98.7 },
      { date: '2024-01-10', value: 98.9 },
      { date: '2024-01-11', value: 99.0 },
      { date: '2024-01-12', value: 99.1 },
    ]
  },
  coughFrequency: {
    current: 3,
    average: 4.2,
    trend: 'decreasing',
    history: [
      { date: '2024-01-01', value: 5, prediction: 4.8 },
      { date: '2024-01-02', value: 4, prediction: 4.5 },
      { date: '2024-01-03', value: 6, prediction: 4.9 },
      { date: '2024-01-04', value: 3, prediction: 4.2 },
      { date: '2024-01-05', value: 4, prediction: 3.8 },
      { date: '2024-01-06', value: 2, prediction: 3.5 },
      { date: '2024-01-07', value: 3, prediction: 3.2 },
    ],
    predictions: [
      { date: '2024-01-08', value: 3.0 },
      { date: '2024-01-09', value: 2.8 },
      { date: '2024-01-10', value: 2.5 },
      { date: '2024-01-11', value: 2.3 },
      { date: '2024-01-12', value: 2.0 },
    ]
  },
  respiratoryHealth: {
    overall: 'good',
    score: 85,
    factors: [
      { name: 'Breathing Rate', score: 90, weight: 0.3 },
      { name: 'Oxygen Level', score: 95, weight: 0.4 },
      { name: 'Cough Frequency', score: 80, weight: 0.2 },
      { name: 'Sleep Quality', score: 75, weight: 0.1 },
    ],
    predictions: {
      nextWeek: 'stable',
      nextMonth: 'improving',
      nextQuarter: 'good',
      riskFactors: ['seasonal allergies', 'stress'],
      recommendations: [
        'Continue current breathing exercises',
        'Monitor pollen levels',
        'Practice stress management techniques',
        'Maintain regular sleep schedule'
      ]
    }
  }
};

export default function PredictionAnalysisPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('7d');
  const [data] = useState(mockData);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    } else if (!isLoading && user && user.role !== 'patient') {
      router.push('/dashboard');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="md" text="Loading predictions..." />
      </div>
    );
  }

  if (!user || user.role !== 'patient') {
    return null;
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving':
        return <IconTrendingUp className="w-5 h-5 text-green-600" />;
      case 'decreasing':
        return <IconTrendingDown className="w-5 h-5 text-red-600" />;
      default:
        return <IconActivity className="w-5 h-5 text-blue-600" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'improving':
        return 'text-green-600';
      case 'decreasing':
        return 'text-red-600';
      default:
        return 'text-blue-600';
    }
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <IconActivity className="w-4 h-4" /> },
    { id: 'breathing', label: 'Breathing Rate', icon: <IconLungs className="w-4 h-4" /> },
    { id: 'oxygen', label: 'Oxygen Level', icon: <IconHeart className="w-4 h-4" /> },
    { id: 'cough', label: 'Cough Analysis', icon: <IconBrain className="w-4 h-4" /> },
    { id: 'device', label: 'Device Monitor', icon: <IconDevices className="w-4 h-4" /> },
    { id: 'predictions', label: 'Future Predictions', icon: <IconTrendingUp className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Prediction Analysis</h1>
          <p className="text-neutral-600 mt-1">AI-powered respiratory health insights and predictions</p>
        </div>
        <div className="flex items-center gap-2">
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

      {/* Device Status Section */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-neutral-900">Connected Device Status</h3>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-600 font-medium">Connected</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Sound Level */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-blue-900">Sound Level</h4>
              <IconActivity className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-blue-900">-32 dB</div>
            <div className="text-xs text-blue-600">Normal Range</div>
            <div className="mt-2 w-full bg-blue-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
            </div>
          </div>

          {/* Peak Flow */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-green-900">Peak Flow</h4>
              <IconLungs className="w-4 h-4 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-green-900">450 L/min</div>
            <div className="text-xs text-green-600">Good</div>
            <div className="mt-2 w-full bg-green-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>

          {/* SpO2 Level */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-purple-900">SpO2 Level</h4>
              <IconHeart className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-purple-900">98%</div>
            <div className="text-xs text-purple-600">Excellent</div>
            <div className="mt-2 w-full bg-purple-200 rounded-full h-2">
              <div className="bg-purple-600 h-2 rounded-full" style={{ width: '98%' }}></div>
            </div>
          </div>

          {/* Respiratory Rate */}
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-4 border border-orange-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-orange-900">Respiratory Rate</h4>
              <IconActivity className="w-4 h-4 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-orange-900">16 bpm</div>
            <div className="text-xs text-orange-600">Normal</div>
            <div className="mt-2 w-full bg-orange-200 rounded-full h-2">
              <div className="bg-orange-600 h-2 rounded-full" style={{ width: '60%' }}></div>
            </div>
          </div>
        </div>

        {/* Additional Parameters */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Temperature */}
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Body Temperature</span>
              <span className="text-sm font-semibold text-gray-900">36.8°C</span>
            </div>
          </div>

          {/* Humidity */}
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Ambient Humidity</span>
              <span className="text-sm font-semibold text-gray-900">45%</span>
            </div>
          </div>

          {/* Battery Level */}
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Device Battery</span>
              <span className="text-sm font-semibold text-green-600">87%</span>
            </div>
          </div>
        </div>

        {/* Real-time Data Stream */}
        <div className="mt-6">
          <h4 className="text-sm font-medium text-neutral-700 mb-3">Real-time Data Stream</h4>
          <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs text-green-400">
            <div className="space-y-1">
              <div>2024-01-07 14:32:15 | Sound: -32dB | Flow: 450L/min | SpO2: 98% | RR: 16bpm</div>
              <div>2024-01-07 14:32:16 | Sound: -31dB | Flow: 448L/min | SpO2: 98% | RR: 16bpm</div>
              <div>2024-01-07 14:32:17 | Sound: -33dB | Flow: 452L/min | SpO2: 98% | RR: 16bpm</div>
              <div>2024-01-07 14:32:18 | Sound: -32dB | Flow: 449L/min | SpO2: 98% | RR: 16bpm</div>
              <div className="text-green-300">...</div>
            </div>
          </div>
        </div>
      </div>

      {/* Health Score Card */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-blue-900">Overall Respiratory Health Score</h3>
            <p className="text-blue-600 text-sm">Based on multiple factors and AI analysis</p>
          </div>
          <div className="text-right">
            <div className={`text-4xl font-bold ${getHealthScoreColor(data.respiratoryHealth.score)}`}>
              {data.respiratoryHealth.score}
            </div>
            <div className="text-blue-600 text-sm">out of 100</div>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.respiratoryHealth.factors.map((factor, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-semibold text-blue-900">{factor.score}</div>
                <div className="text-xs text-blue-600">{factor.name}</div>
                <div className="text-xs text-blue-500">Weight: {factor.weight * 100}%</div>
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie
                  data={data.respiratoryHealth.factors}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  paddingAngle={5}
                  dataKey="score"
                >
                  {data.respiratoryHealth.factors.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#ef4444', '#3b82f6', '#10b981', '#f59e0b'][index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
        <div className="border-b border-neutral-200">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-red-600 text-red-600 bg-red-50'
                    : 'border-transparent text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Breathing Rate Card */}
                <div className="bg-white border border-neutral-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-neutral-900">Breathing Rate</h4>
                    {getTrendIcon(data.breathingRate.trend)}
                  </div>
                  <div className="text-2xl font-bold text-neutral-900">{data.breathingRate.current}</div>
                  <div className="text-sm text-neutral-600">breaths/min</div>
                  <div className={`text-xs ${getTrendColor(data.breathingRate.trend)} mt-1`}>
                    {data.breathingRate.trend} trend
                  </div>
                </div>

                {/* Oxygen Level Card */}
                <div className="bg-white border border-neutral-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-neutral-900">Oxygen Level</h4>
                    {getTrendIcon(data.oxygenLevel.trend)}
                  </div>
                  <div className="text-2xl font-bold text-neutral-900">{data.oxygenLevel.current}%</div>
                  <div className="text-sm text-neutral-600">SpO2</div>
                  <div className={`text-xs ${getTrendColor(data.oxygenLevel.trend)} mt-1`}>
                    {data.oxygenLevel.trend} trend
                  </div>
                </div>

                {/* Cough Frequency Card */}
                <div className="bg-white border border-neutral-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-neutral-900">Cough Frequency</h4>
                    {getTrendIcon(data.coughFrequency.trend)}
                  </div>
                  <div className="text-2xl font-bold text-neutral-900">{data.coughFrequency.current}</div>
                  <div className="text-sm text-neutral-600">per hour</div>
                  <div className={`text-xs ${getTrendColor(data.coughFrequency.trend)} mt-1`}>
                    {data.coughFrequency.trend} trend
                  </div>
                </div>
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Breathing Rate Chart */}
                <div className="bg-white border border-neutral-200 rounded-lg p-4">
                  <h4 className="font-semibold text-neutral-900 mb-4">Breathing Rate Trends (7 Days)</h4>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={data.breathingRate.history}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#ef4444" 
                        strokeWidth={2}
                        name="Actual Rate"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="prediction" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        name="Predicted Rate"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Oxygen Level Chart */}
                <div className="bg-white border border-neutral-200 rounded-lg p-4">
                  <h4 className="font-semibold text-neutral-900 mb-4">Oxygen Level Trends (7 Days)</h4>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={data.oxygenLevel.history}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[90, 100]} />
                      <Tooltip />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#10b981" 
                        fill="#10b981"
                        fillOpacity={0.3}
                        name="Actual Level"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="prediction" 
                        stroke="#3b82f6" 
                        fill="#3b82f6"
                        fillOpacity={0.1}
                        name="Predicted Level"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Cough Frequency Chart */}
                <div className="bg-white border border-neutral-200 rounded-lg p-4">
                  <h4 className="font-semibold text-neutral-900 mb-4">Cough Frequency Trends (7 Days)</h4>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={data.coughFrequency.history}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar 
                        dataKey="value" 
                        fill="#f59e0b" 
                        name="Actual Frequency"
                      />
                      <Bar 
                        dataKey="prediction" 
                        fill="#8b5cf6" 
                        name="Predicted Frequency"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Quick Predictions */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 p-4">
                <h4 className="font-semibold text-green-900 mb-3">Quick Predictions</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-sm text-green-600">Next Week</div>
                    <div className="text-lg font-semibold text-green-900 capitalize">{data.respiratoryHealth.predictions.nextWeek}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-green-600">Next Month</div>
                    <div className="text-lg font-semibold text-green-900 capitalize">{data.respiratoryHealth.predictions.nextMonth}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-green-600">Next Quarter</div>
                    <div className="text-lg font-semibold text-green-900 capitalize">{data.respiratoryHealth.predictions.nextQuarter}</div>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-4">
                <h4 className="font-semibold text-blue-900 mb-3">AI Recommendations</h4>
                <div className="space-y-2">
                  {data.respiratoryHealth.predictions.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <IconCircleCheck className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-blue-800">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Risk Factors */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200 p-4">
                <h4 className="font-semibold text-yellow-900 mb-3">Risk Factors to Monitor</h4>
                <div className="space-y-2">
                  {data.respiratoryHealth.predictions.riskFactors.map((factor, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <IconAlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-yellow-800 capitalize">{factor}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Breathing Rate Tab */}
          {activeTab === 'breathing' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-neutral-900">Breathing Rate Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-neutral-200 rounded-lg p-4">
                  <h4 className="font-semibold text-neutral-900 mb-3">Current Status</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Current Rate:</span>
                      <span className="font-semibold">{data.breathingRate.current} breaths/min</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">7-Day Average:</span>
                      <span className="font-semibold">{data.breathingRate.average} breaths/min</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Trend:</span>
                      <span className={`font-semibold ${getTrendColor(data.breathingRate.trend)}`}>
                        {data.breathingRate.trend}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white border border-neutral-200 rounded-lg p-4">
                  <h4 className="font-semibold text-neutral-900 mb-3">Historical Data</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {data.breathingRate.history.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-neutral-600">{item.date}</span>
                        <span className="font-semibold">{item.value} bpm</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Oxygen Level Tab */}
          {activeTab === 'oxygen' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-neutral-900">Oxygen Level Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-neutral-200 rounded-lg p-4">
                  <h4 className="font-semibold text-neutral-900 mb-3">Current Status</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Current Level:</span>
                      <span className="font-semibold">{data.oxygenLevel.current}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">7-Day Average:</span>
                      <span className="font-semibold">{data.oxygenLevel.average}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Trend:</span>
                      <span className={`font-semibold ${getTrendColor(data.oxygenLevel.trend)}`}>
                        {data.oxygenLevel.trend}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white border border-neutral-200 rounded-lg p-4">
                  <h4 className="font-semibold text-neutral-900 mb-3">Historical Data</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {data.oxygenLevel.history.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-neutral-600">{item.date}</span>
                        <span className="font-semibold">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

                     {/* Cough Analysis Tab */}
           {activeTab === 'cough' && (
             <div className="space-y-4">
               <h3 className="text-lg font-semibold text-neutral-900">Cough Frequency Analysis</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="bg-white border border-neutral-200 rounded-lg p-4">
                   <h4 className="font-semibold text-neutral-900 mb-3">Current Status</h4>
                   <div className="space-y-3">
                     <div className="flex justify-between">
                       <span className="text-neutral-600">Current Frequency:</span>
                       <span className="font-semibold">{data.coughFrequency.current} per hour</span>
                     </div>
                     <div className="flex justify-between">
                       <span className="text-neutral-600">7-Day Average:</span>
                       <span className="font-semibold">{data.coughFrequency.average} per hour</span>
                     </div>
                     <div className="flex justify-between">
                       <span className="text-neutral-600">Trend:</span>
                       <span className={`font-semibold ${getTrendColor(data.coughFrequency.trend)}`}>
                         {data.coughFrequency.trend}
                       </span>
                     </div>
                   </div>
                 </div>
                 
                 <div className="bg-white border border-neutral-200 rounded-lg p-4">
                   <h4 className="font-semibold text-neutral-900 mb-3">Historical Data</h4>
                   <div className="space-y-2 max-h-48 overflow-y-auto">
                     {data.coughFrequency.history.map((item, index) => (
                       <div key={index} className="flex justify-between text-sm">
                         <span className="text-neutral-600">{item.date}</span>
                         <span className="font-semibold">{item.value} per hour</span>
                       </div>
                     ))}
                   </div>
                 </div>
               </div>
             </div>
           )}

           {/* Device Monitor Tab */}
           {activeTab === 'device' && (
             <div className="space-y-6">
               <h3 className="text-lg font-semibold text-neutral-900">Device Monitoring & Real-time Data</h3>
               
               {/* Device Connection Status */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                   <div className="flex items-center gap-3">
                     <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                     <div>
                       <h4 className="font-semibold text-green-900">Device Status</h4>
                       <p className="text-sm text-green-700">Connected & Active</p>
                     </div>
                   </div>
                 </div>
                 
                 <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                   <div className="flex items-center gap-3">
                     <IconActivity className="w-5 h-5 text-blue-600" />
                     <div>
                       <h4 className="font-semibold text-blue-900">Data Quality</h4>
                       <p className="text-sm text-blue-700">Excellent (98%)</p>
                     </div>
                   </div>
                 </div>
                 
                 <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                   <div className="flex items-center gap-3">
                     <IconClock className="w-5 h-5 text-purple-600" />
                     <div>
                       <h4 className="font-semibold text-purple-900">Last Update</h4>
                       <p className="text-sm text-purple-700">2 seconds ago</p>
                     </div>
                   </div>
                 </div>
               </div>

               {/* Real-time Sensor Data */}
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 {/* Live Sound Waveform */}
                 <div className="bg-white border border-neutral-200 rounded-lg p-4">
                   <h4 className="font-semibold text-neutral-900 mb-4">Live Sound Waveform</h4>
                   <div className="bg-gray-900 rounded-lg p-4 h-32 flex items-end justify-center gap-1">
                     {Array.from({ length: 50 }, (_, i) => (
                       <div
                         key={i}
                         className="bg-green-400 rounded-sm"
                         style={{
                           width: '3px',
                           height: `${Math.random() * 60 + 20}px`,
                           animationDelay: `${i * 0.1}s`
                         }}
                       ></div>
                     ))}
                   </div>
                   <div className="mt-3 text-center text-sm text-neutral-600">
                     Real-time audio analysis for breathing patterns
                   </div>
                 </div>

                 {/* Peak Flow Meter */}
                 <div className="bg-white border border-neutral-200 rounded-lg p-4">
                   <h4 className="font-semibold text-neutral-900 mb-4">Peak Flow Meter</h4>
                   <div className="bg-gradient-to-b from-green-100 to-green-200 rounded-lg p-6 text-center">
                     <div className="text-4xl font-bold text-green-800 mb-2">450</div>
                     <div className="text-lg text-green-700 mb-1">L/min</div>
                     <div className="text-sm text-green-600">Peak Expiratory Flow</div>
                     <div className="mt-3 w-full bg-green-300 rounded-full h-3">
                       <div className="bg-green-600 h-3 rounded-full" style={{ width: '75%' }}></div>
                     </div>
                   </div>
                 </div>
               </div>

               {/* Sensor Calibration & Health */}
               <div className="bg-white border border-neutral-200 rounded-lg p-4">
                 <h4 className="font-semibold text-neutral-900 mb-4">Sensor Health & Calibration</h4>
                 <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                   <div className="text-center">
                     <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                       <IconLungs className="w-8 h-8 text-green-600" />
                     </div>
                     <div className="text-sm font-medium text-neutral-900">Flow Sensor</div>
                     <div className="text-xs text-green-600">Calibrated</div>
                   </div>
                   
                   <div className="text-center">
                     <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                       <IconActivity className="w-8 h-8 text-blue-600" />
                     </div>
                     <div className="text-sm font-medium text-neutral-900">Audio Sensor</div>
                     <div className="text-xs text-green-600">Optimal</div>
                   </div>
                   
                   <div className="text-center">
                     <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                       <IconHeart className="w-8 h-8 text-purple-600" />
                     </div>
                     <div className="text-sm font-medium text-neutral-900">SpO2 Sensor</div>
                     <div className="text-xs text-green-600">Accurate</div>
                   </div>
                   
                   <div className="text-center">
                     <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                       <IconDevices className="w-8 h-8 text-orange-600" />
                     </div>
                     <div className="text-sm font-medium text-neutral-900">Temperature</div>
                     <div className="text-xs text-green-600">Stable</div>
                   </div>
                 </div>
               </div>

               {/* Data Transmission Log */}
               <div className="bg-white border border-neutral-200 rounded-lg p-4">
                 <h4 className="font-semibold text-neutral-900 mb-4">Data Transmission Log</h4>
                 <div className="bg-gray-50 rounded-lg p-3 max-h-48 overflow-y-auto">
                   <div className="space-y-2 text-sm">
                     <div className="flex justify-between text-green-700">
                       <span>14:32:18 - Data packet sent successfully</span>
                       <span className="text-xs">2s ago</span>
                     </div>
                     <div className="flex justify-between text-green-700">
                       <span>14:32:17 - Data packet sent successfully</span>
                       <span className="text-xs">3s ago</span>
                     </div>
                     <div className="flex justify-between text-green-700">
                       <span>14:32:16 - Data packet sent successfully</span>
                       <span className="text-xs">4s ago</span>
                     </div>
                     <div className="flex justify-between text-green-700">
                       <span>14:32:15 - Data packet sent successfully</span>
                       <span className="text-xs">5s ago</span>
                     </div>
                     <div className="flex justify-between text-blue-700">
                       <span>14:32:14 - Calibration check completed</span>
                       <span className="text-xs">6s ago</span>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           )}

          {/* Future Predictions Tab */}
          {activeTab === 'predictions' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-neutral-900">Future Predictions</h3>
              
              {/* Prediction Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Combined Predictions Chart */}
                <div className="bg-white border border-neutral-200 rounded-lg p-4">
                  <h4 className="font-semibold text-neutral-900 mb-4">5-Day Forecast Comparison</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data.breathingRate.predictions.map((pred, index) => ({
                      date: pred.date,
                      breathingRate: pred.value,
                      oxygenLevel: data.oxygenLevel.predictions[index]?.value,
                      coughFrequency: data.coughFrequency.predictions[index]?.value,
                    }))}>
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
                        yAxisId="left"
                        type="monotone" 
                        dataKey="oxygenLevel" 
                        stroke="#10b981" 
                        strokeWidth={2}
                        name="Oxygen Level (%)"
                      />
                      <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="coughFrequency" 
                        stroke="#f59e0b" 
                        strokeWidth={2}
                        name="Cough Frequency (/hr)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Prediction Summary */}
                <div className="bg-white border border-neutral-200 rounded-lg p-4">
                  <h4 className="font-semibold text-neutral-900 mb-4">Prediction Summary</h4>
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-medium text-neutral-700 mb-2">Breathing Rate Forecast</h5>
                      <div className="space-y-2">
                        {data.breathingRate.predictions.map((pred, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span className="text-neutral-600">{pred.date}</span>
                            <span className="font-semibold">{pred.value} bpm</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-neutral-700 mb-2">Oxygen Level Forecast</h5>
                      <div className="space-y-2">
                        {data.oxygenLevel.predictions.map((pred, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span className="text-neutral-600">{pred.date}</span>
                            <span className="font-semibold">{pred.value}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-neutral-700 mb-2">Cough Frequency Forecast</h5>
                      <div className="space-y-2">
                        {data.coughFrequency.predictions.map((pred, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span className="text-neutral-600">{pred.date}</span>
                            <span className="font-semibold">{pred.value} per hour</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Insights */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200 p-4">
                <h4 className="font-semibold text-purple-900 mb-3">AI Insights & Analysis</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <IconInfoCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-purple-900">Pattern Recognition</div>
                      <div className="text-sm text-purple-700">AI has identified seasonal patterns in your respiratory data</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <IconTrendingUp className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-purple-900">Positive Trends</div>
                      <div className="text-sm text-purple-700">Your oxygen levels are showing consistent improvement</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <IconClock className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-purple-900">Timing Analysis</div>
                      <div className="text-sm text-purple-700">Best respiratory function observed during morning hours</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
