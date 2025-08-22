'use client';

import { useAuth } from '@/lib/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  IconSearch,
  IconFilter,
  IconDownload,
  IconEye,
  IconMicrophone,
  IconLungs,
  IconAlertTriangle,
  IconCheck,
  IconX,
  IconClock,
  IconUser,
  IconCalendar,
  IconActivity,
} from '@tabler/icons-react';

// Mock patient report data
const mockReports = [
  {
    id: 1,
    patientId: 'P001',
    patientName: 'John Doe',
    age: 35,
    gender: 'Male',
    diagnosis: 'Asthma',
    medication: 'Inhaler',
    peakFlow: 175,
    recordingDate: '2024-01-15',
    recordingDuration: '45s',
    chestLocation: 'Anterior Left',
    equipment: 'Littmann 3200',
    soundAnalysis: {
      crackles: true,
      wheezes: false,
      severity: 'moderate',
      confidence: 87,
    },
    status: 'analyzed',
    doctorNotes: 'Patient shows moderate crackles. Continue current medication.',
    followUp: '2024-02-15',
  },
  {
    id: 2,
    patientId: 'P002',
    patientName: 'Sarah Johnson',
    age: 28,
    gender: 'Female',
    diagnosis: 'COPD',
    medication: 'Controller',
    peakFlow: 156,
    recordingDate: '2024-01-14',
    recordingDuration: '52s',
    chestLocation: 'Posterior Right',
    equipment: 'AKG C417L',
    soundAnalysis: {
      crackles: false,
      wheezes: true,
      severity: 'severe',
      confidence: 92,
    },
    status: 'analyzed',
    doctorNotes: 'Severe wheezing detected. Consider medication adjustment.',
    followUp: '2024-01-28',
  },
  {
    id: 3,
    patientId: 'P003',
    patientName: 'Emma Wilson',
    age: 31,
    gender: 'Female',
    diagnosis: 'Bronchitis',
    medication: 'None',
    peakFlow: 200,
    recordingDate: '2024-01-13',
    recordingDuration: '38s',
    chestLocation: 'Lateral Left',
    equipment: 'Meditron',
    soundAnalysis: {
      crackles: true,
      wheezes: true,
      severity: 'mild',
      confidence: 78,
    },
    status: 'pending',
    doctorNotes: '',
    followUp: '',
  },
  {
    id: 4,
    patientId: 'P004',
    patientName: 'Robert Thompson',
    age: 45,
    gender: 'Male',
    diagnosis: 'Asthma',
    medication: 'Controller',
    peakFlow: 267,
    recordingDate: '2024-01-12',
    recordingDuration: '41s',
    chestLocation: 'Trachea',
    equipment: 'Littmann Classic II',
    soundAnalysis: {
      crackles: false,
      wheezes: false,
      severity: 'normal',
      confidence: 95,
    },
    status: 'analyzed',
    doctorNotes: 'Normal respiratory sounds. Patient responding well to treatment.',
    followUp: '2024-03-12',
  },
  {
    id: 5,
    patientId: 'P005',
    patientName: 'Jennifer Lee',
    age: 29,
    gender: 'Female',
    diagnosis: 'Pending',
    medication: 'None',
    peakFlow: 234,
    recordingDate: '2024-01-11',
    recordingDuration: '49s',
    chestLocation: 'Anterior Right',
    equipment: 'Littmann 3200',
    soundAnalysis: {
      crackles: true,
      wheezes: false,
      severity: 'mild',
      confidence: 82,
    },
    status: 'pending',
    doctorNotes: '',
    followUp: '',
  },
];

export default function ReportsPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [diagnosisFilter, setDiagnosisFilter] = useState('all');
  const [selectedReport, setSelectedReport] = useState<any>(null);

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
          <p className="text-neutral-600">Loading reports...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return null;
  }

  const filteredReports = mockReports.filter(report => {
    const matchesSearch = report.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.diagnosis.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    const matchesDiagnosis = diagnosisFilter === 'all' || report.diagnosis === diagnosisFilter;
    
    return matchesSearch && matchesStatus && matchesDiagnosis;
  });

  const handleReportAction = (action: string, reportId: number) => {
    console.log(`Action: ${action} for report: ${reportId}`);
    // Implement action logic here
  };

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      analyzed: 'bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium',
      pending: 'bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium',
      processing: 'bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium',
      error: 'bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium',
    };
    
    return (
      <span className={statusClasses[status as keyof typeof statusClasses]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getSoundAnalysisIcon = (hasCrackles: boolean, hasWheezes: boolean) => {
    if (hasCrackles && hasWheezes) {
      return <IconAlertTriangle className="w-4 h-4 text-red-600" />;
    } else if (hasCrackles || hasWheezes) {
      return <IconLungs className="w-4 h-4 text-yellow-600" />;
    } else {
      return <IconCheck className="w-4 h-4 text-green-600" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Patient Reports</h1>
          <p className="text-neutral-600 mt-1">Review and manage patient respiratory health reports</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
            <IconMicrophone className="w-4 h-4" />
            {filteredReports.filter(r => r.status === 'analyzed').length} Analyzed
          </span>
          <button className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 text-sm">
            <IconDownload className="w-4 h-4" />
            Export All
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Total Reports</p>
              <p className="text-xl font-bold text-neutral-900">{mockReports.length}</p>
            </div>
            <IconMicrophone className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Analyzed</p>
              <p className="text-xl font-bold text-neutral-900">{mockReports.filter(r => r.status === 'analyzed').length}</p>
            </div>
            <IconCheck className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Pending</p>
              <p className="text-xl font-bold text-neutral-900">{mockReports.filter(r => r.status === 'pending').length}</p>
            </div>
            <IconClock className="w-8 h-8 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Abnormal</p>
              <p className="text-xl font-bold text-neutral-900">{mockReports.filter(r => r.soundAnalysis.crackles || r.soundAnalysis.wheezes).length}</p>
            </div>
            <IconAlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
          >
            <option value="all">All Status</option>
            <option value="analyzed">Analyzed</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="error">Error</option>
          </select>
          
          <select
            value={diagnosisFilter}
            onChange={(e) => setDiagnosisFilter(e.target.value)}
            className="px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
          >
            <option value="all">All Diagnoses</option>
            <option value="Asthma">Asthma</option>
            <option value="COPD">COPD</option>
            <option value="Bronchitis">Bronchitis</option>
          </select>

          <button className="px-3 py-2 bg-neutral-200 text-neutral-800 rounded-lg hover:bg-neutral-300 transition-colors flex items-center gap-2 text-sm">
            <IconFilter className="w-4 h-4" />
            Advanced
          </button>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="text-left p-3 text-sm font-medium text-neutral-600">Patient</th>
                <th className="text-left p-3 text-sm font-medium text-neutral-600">Recording Details</th>
                <th className="text-left p-3 text-sm font-medium text-neutral-600">Sound Analysis</th>
                <th className="text-left p-3 text-sm font-medium text-neutral-600">Status & Follow-up</th>
                <th className="text-left p-3 text-sm font-medium text-neutral-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((report) => (
                <tr key={report.id} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                  <td className="p-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconUser className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-neutral-900 text-sm truncate">{report.patientName}</p>
                        <p className="text-xs text-neutral-600 mt-1">{report.patientId} • {report.age} • {report.gender}</p>
                        <p className="text-xs text-neutral-500 mt-1">{report.diagnosis} • {report.medication}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs">
                        <IconCalendar className="w-3 h-3 text-neutral-500" />
                        <span className="text-neutral-700">{report.recordingDate}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <IconMicrophone className="w-3 h-3 text-green-600" />
                        <span className="text-neutral-700">{report.recordingDuration}</span>
                      </div>
                      <div className="text-xs text-neutral-500">
                        {report.chestLocation} • {report.equipment}
                      </div>
                      <div className="text-xs text-neutral-500">
                        Peak Flow: {report.peakFlow} L/min
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {getSoundAnalysisIcon(report.soundAnalysis.crackles, report.soundAnalysis.wheezes)}
                        <span className="text-xs text-neutral-700">
                          {report.soundAnalysis.severity.charAt(0).toUpperCase() + report.soundAnalysis.severity.slice(1)}
                        </span>
                      </div>
                      <div className="text-xs text-neutral-500">
                        Confidence: {report.soundAnalysis.confidence}%
                      </div>
                      <div className="text-xs text-neutral-500">
                        {report.soundAnalysis.crackles ? 'Crackles' : ''}
                        {report.soundAnalysis.crackles && report.soundAnalysis.wheezes ? ' + ' : ''}
                        {report.soundAnalysis.wheezes ? 'Wheezes' : ''}
                        {!report.soundAnalysis.crackles && !report.soundAnalysis.wheezes ? 'Clean' : ''}
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="space-y-2">
                      {getStatusBadge(report.status)}
                      {report.followUp && (
                        <div className="text-xs text-neutral-500">
                          Follow-up: {report.followUp}
                        </div>
                      )}
                      {report.doctorNotes && (
                        <div className="text-xs text-neutral-500 truncate max-w-[150px]" title={report.doctorNotes}>
                          Notes: {report.doctorNotes}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleReportAction('view', report.id)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="View Report"
                      >
                        <IconEye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleReportAction('download', report.id)}
                        className="p-1.5 text-green-600 hover:bg-green-50 rounded transition-colors"
                        title="Download Report"
                      >
                        <IconDownload className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleReportAction('edit', report.id)}
                        className="p-1.5 text-yellow-600 hover:bg-yellow-50 rounded transition-colors"
                        title="Edit Report"
                      >
                        <IconActivity className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-sm text-neutral-600">
            Showing {filteredReports.length} of {mockReports.length} reports
          </p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors text-sm">
              Previous
            </button>
            <button className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-sm">1</button>
            <button className="px-3 py-1.5 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors text-sm">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
