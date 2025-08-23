'use client';

import { useAuth } from '@/lib/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  IconLungs,
  IconDownload,
  IconShare,
  IconTrash,
  IconPlus,
  IconTrendingUp,
  IconMinus,
  IconCalendar,
  IconClock,
  IconChartLine,
  IconActivity,
} from '@tabler/icons-react';

interface HealthRecord {
  id: string;
  date: string;
  time: string;
  duration: number;
  quality: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  status: 'Analyzed' | 'Processing' | 'Review Needed';
  respiratoryRate: number;
  oxygenSaturation: number;
  notes?: string;
}

export default function HealthDataPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [selectedRecord, setSelectedRecord] = useState<HealthRecord | null>(null);
  const [showRecordModal, setShowRecordModal] = useState(false);

  // Mock data - in real app, this would come from API
  const [healthRecords] = useState<HealthRecord[]>([
    {
      id: '1',
      date: '2024-01-15',
      time: '09:41',
      duration: 5,
      quality: 'Good',
      status: 'Analyzed',
      respiratoryRate: 16,
      oxygenSaturation: 98,
      notes: 'Feeling slightly congested today'
    },
    {
      id: '2',
      date: '2024-01-14',
      time: '20:23',
      duration: 4,
      quality: 'Fair',
      status: 'Analyzed',
      respiratoryRate: 18,
      oxygenSaturation: 96,
      notes: 'Evening recording, feeling tired'
    },
    {
      id: '3',
      date: '2024-01-13',
      time: '19:52',
      duration: 6,
      quality: 'Excellent',
      status: 'Analyzed',
      respiratoryRate: 15,
      oxygenSaturation: 99,
      notes: 'Great breathing pattern today'
    },
    {
      id: '4',
      date: '2024-01-12',
      time: '16:12',
      duration: 3,
      quality: 'Poor',
      status: 'Review Needed',
      respiratoryRate: 22,
      oxygenSaturation: 94,
      notes: 'Short recording, may need to retake'
    },
    {
      id: '5',
      date: '2024-01-11',
      time: '14:34',
      duration: 5,
      quality: 'Good',
      status: 'Analyzed',
      respiratoryRate: 17,
      oxygenSaturation: 97,
      notes: 'Afternoon session, feeling well'
    }
  ]);

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

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'Excellent': return 'bg-green-100 text-green-800';
      case 'Good': return 'bg-blue-100 text-blue-800';
      case 'Fair': return 'bg-yellow-100 text-yellow-800';
      case 'Poor': return 'bg-red-100 text-red-800';
      default: return 'bg-neutral-100 text-neutral-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Analyzed': return 'bg-green-100 text-green-800';
      case 'Processing': return 'bg-blue-100 text-blue-800';
      case 'Review Needed': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-neutral-100 text-neutral-800';
    }
  };

  const handleRecordClick = (record: HealthRecord) => {
    setSelectedRecord(record);
    setShowRecordModal(true);
  };

  const handleNewRecording = () => {
    // In real app, this would open recording interface
    alert('Starting new breathing recording...');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-neutral-900">Health Data</h1>
        <p className="text-neutral-600 text-sm">Monitor and manage your respiratory health recordings.</p>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
        <div className="flex items-center gap-3">
          <button
            onClick={handleNewRecording}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-sm"
          >
            <IconPlus className="w-4 h-4" />
            New Recording
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 rounded-lg transition-colors text-sm">
            <IconDownload className="w-4 h-4" />
            Export Data
          </button>
        </div>
        <div className="flex items-center gap-2 text-xs text-neutral-600">
          <IconCalendar className="w-3 h-3" />
          <span>Last 30 days</span>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-neutral-900">Total Recordings</h3>
            <IconLungs className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-neutral-900">{healthRecords.length}</div>
          <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
            <IconTrendingUp className="w-3 h-3" />
            <span>+12% this week</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-neutral-900">Avg. Quality</h3>
            <IconActivity className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-neutral-900">Good</div>
          <div className="flex items-center gap-1 text-xs text-blue-600 mt-1">
            <IconTrendingUp className="w-3 h-3" />
            <span>Improving</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-neutral-900">Respiratory Rate</h3>
            <IconChartLine className="w-5 h-5 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-neutral-900">17</div>
          <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
            <IconMinus className="w-3 h-3" />
            <span>Normal range</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-neutral-900">Oxygen Level</h3>
            <IconTrendingUp className="w-5 h-5 text-red-600" />
          </div>
          <div className="text-2xl font-bold text-neutral-900">97%</div>
          <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
            <IconTrendingUp className="w-3 h-3" />
            <span>Excellent</span>
          </div>
        </div>
      </div>

      {/* Health Records Table */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-neutral-200">
          <h3 className="text-sm font-semibold text-neutral-900">Recent Recordings</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-neutral-50">
              <tr>
                <th className="text-left p-3 text-xs font-medium text-neutral-600">Date & Time</th>
                <th className="text-left p-3 text-xs font-medium text-neutral-600">Duration</th>
                <th className="text-left p-3 text-xs font-medium text-neutral-600">Quality</th>
                <th className="text-left p-3 text-xs font-medium text-neutral-600">Status</th>
                <th className="text-left p-3 text-xs font-medium text-neutral-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {healthRecords.map((record) => (
                <tr 
                  key={record.id} 
                  className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors cursor-pointer"
                  onClick={() => handleRecordClick(record)}
                >
                  <td className="p-3">
                    <div>
                      <div className="text-xs font-medium text-neutral-900">{record.date}</div>
                      <div className="text-xs text-neutral-600">{record.time}</div>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <IconClock className="w-3 h-3 text-neutral-500" />
                      <span className="text-xs text-neutral-900">{record.duration} min</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getQualityColor(record.quality)}`}>
                      {record.quality}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-1">
                      <button className="p-1 text-neutral-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                        <IconDownload className="w-3 h-3" />
                      </button>
                      <button className="p-1 text-neutral-600 hover:text-green-600 hover:bg-green-50 rounded transition-colors">
                        <IconShare className="w-3 h-3" />
                      </button>
                      <button className="p-1 text-neutral-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                        <IconTrash className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Detail Modal */}
      {showRecordModal && selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-4 max-w-sm w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-neutral-900">Recording Details</h3>
              <button
                onClick={() => setShowRecordModal(false)}
                className="text-neutral-500 hover:text-neutral-700"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-neutral-600">Date & Time</label>
                <p className="text-xs text-neutral-900">{selectedRecord.date} at {selectedRecord.time}</p>
              </div>
              
              <div>
                <label className="text-xs font-medium text-neutral-600">Duration</label>
                <p className="text-xs text-neutral-900">{selectedRecord.duration} minutes</p>
              </div>
              
              <div>
                <label className="text-xs font-medium text-neutral-600">Quality</label>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getQualityColor(selectedRecord.quality)}`}>
                  {selectedRecord.quality}
                </span>
              </div>
              
              <div>
                <label className="text-xs font-medium text-neutral-600">Status</label>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedRecord.status)}`}>
                  {selectedRecord.status}
                </span>
              </div>
              
              <div>
                <label className="text-xs font-medium text-neutral-600">Respiratory Rate</label>
                <p className="text-xs text-neutral-900">{selectedRecord.respiratoryRate} breaths/min</p>
              </div>
              
              <div>
                <label className="text-xs font-medium text-neutral-600">Oxygen Saturation</label>
                <p className="text-xs text-neutral-900">{selectedRecord.oxygenSaturation}%</p>
              </div>
              
              {selectedRecord.notes && (
                <div>
                  <label className="text-xs font-medium text-neutral-600">Notes</label>
                  <p className="text-xs text-neutral-900">{selectedRecord.notes}</p>
                </div>
              )}
            </div>
            
            <div className="flex gap-2 mt-4">
              <button className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-xs">
                Download
              </button>
              <button className="flex-1 px-3 py-2 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 rounded-lg transition-colors text-xs">
                Share
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
