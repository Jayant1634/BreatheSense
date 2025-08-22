'use client';

import { useAuth } from '@/lib/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  IconSearch,
  IconFilter,
  IconBell,
  IconAlertTriangle,
  IconAlertCircle,
  IconInfoCircle,
  IconCheck,
  IconX,
  IconEye,
  IconTrash,
  IconUser,
  IconMicrophone,
  IconDeviceMobile,
  IconLungs,
  IconActivity,
  IconClock,
} from '@tabler/icons-react';

// Mock alerts data
const mockAlerts = [
  {
    id: 1,
    type: 'critical',
    title: 'High Severity Respiratory Sounds Detected',
    description: 'Patient P002 (Sarah Johnson) shows severe wheezing patterns requiring immediate attention.',
    category: 'patient_health',
    priority: 'high',
    status: 'active',
    timestamp: '2024-01-15 16:45:23',
    assignedTo: 'Dr. Lisa Rodriguez',
    patientId: 'P002',
    patientName: 'Sarah Johnson',
    deviceId: 'DS002',
    deviceName: 'AKG C417L Microphone',
    actions: ['acknowledge', 'assign', 'escalate'],
    metadata: {
      severity: 'severe',
      confidence: 92,
      recordingDuration: '52s',
      location: 'Posterior Right',
    },
  },
  {
    id: 2,
    type: 'warning',
    title: 'Device Battery Low',
    description: 'Littmann 3200 Electronic Stethoscope (DS001) battery level is at 15%. Please charge or replace.',
    category: 'device_maintenance',
    priority: 'medium',
    status: 'active',
    timestamp: '2024-01-15 15:30:12',
    assignedTo: 'Dr. Michael Chen',
    deviceId: 'DS001',
    deviceName: 'Littmann 3200 Electronic Stethoscope',
    actions: ['acknowledge', 'resolve', 'assign'],
    metadata: {
      batteryLevel: 15,
      location: 'Cardiology Ward',
      lastUsed: '2024-01-15 14:30',
    },
  },
  {
    id: 3,
    type: 'info',
    title: 'New Patient Recording Available',
    description: 'New respiratory sound recording from Patient P005 (Jennifer Lee) is ready for analysis.',
    category: 'recording_ready',
    priority: 'low',
    status: 'active',
    timestamp: '2024-01-15 14:20:45',
    assignedTo: 'Unassigned',
    patientId: 'P005',
    patientName: 'Jennifer Lee',
    deviceId: 'DS005',
    deviceName: 'Meditron Electronic Stethoscope',
    actions: ['acknowledge', 'assign', 'view'],
    metadata: {
      recordingDuration: '49s',
      location: 'Anterior Right',
      equipment: 'Littmann 3200',
    },
  },
  {
    id: 4,
    type: 'critical',
    title: 'Device Connection Lost',
    description: 'WelchAllyn Meditron Master Elite (DS003) has lost WiFi connection and may not be recording properly.',
    category: 'device_connectivity',
    priority: 'high',
    status: 'resolved',
    timestamp: '2024-01-15 13:15:30',
    assignedTo: 'Dr. David Kim',
    deviceId: 'DS003',
    deviceName: 'WelchAllyn Meditron Master Elite',
    actions: ['view', 'delete'],
    metadata: {
      wifiStatus: 'disconnected',
      location: 'Emergency Room',
      lastConnection: '2024-01-15 13:15',
    },
  },
  {
    id: 5,
    type: 'warning',
    title: 'Maintenance Due Soon',
    description: 'Littmann Classic II SE (DS004) requires maintenance within 5 days. Schedule maintenance appointment.',
    category: 'device_maintenance',
    priority: 'medium',
    status: 'active',
    timestamp: '2024-01-15 12:00:00',
    assignedTo: 'Maintenance Team',
    deviceId: 'DS004',
    deviceName: 'Littmann Classic II SE',
    actions: ['acknowledge', 'schedule', 'assign'],
    metadata: {
      daysUntilMaintenance: 5,
      lastMaintenance: '2023-11-20',
      nextMaintenance: '2024-01-20',
      location: 'Storage Room',
    },
  },
  {
    id: 6,
    type: 'info',
    title: 'System Update Available',
    description: 'New firmware version v2.2.0 is available for Littmann 3200 devices. Update recommended.',
    category: 'system_update',
    priority: 'low',
    status: 'active',
    timestamp: '2024-01-15 11:45:18',
    assignedTo: 'System Admin',
    deviceId: 'Multiple',
    deviceName: 'Littmann 3200 Series',
    actions: ['acknowledge', 'schedule', 'ignore'],
    metadata: {
      currentVersion: 'v2.1.4',
      newVersion: 'v2.2.0',
      affectedDevices: 3,
      updateSize: '15.2 MB',
    },
  },
];

export default function AlertsPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [alerts, setAlerts] = useState(mockAlerts);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

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
          <p className="text-neutral-600">Loading alerts...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return null;
  }

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.deviceName?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || alert.status === statusFilter;
    const matchesType = typeFilter === 'all' || alert.type === typeFilter;
    const matchesPriority = priorityFilter === 'all' || alert.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesType && matchesPriority;
  });

  const handleAlertAction = (action: string, alertId: number) => {
    console.log(`Action: ${action} for alert: ${alertId}`);
    // Implement action logic here
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <IconAlertTriangle className="w-5 h-5 text-red-600" />;
      case 'warning':
        return <IconAlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'info':
        return <IconInfoCircle className="w-5 h-5 text-blue-600" />;
      default:
        return <IconBell className="w-5 h-5 text-neutral-600" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'patient_health':
        return <IconLungs className="w-4 h-4 text-red-500" />;
      case 'device_maintenance':
        return <IconDeviceMobile className="w-4 h-4 text-blue-500" />;
      case 'recording_ready':
        return <IconMicrophone className="w-4 h-4 text-green-500" />;
      case 'device_connectivity':
        return <IconActivity className="w-4 h-4 text-purple-500" />;
      default:
        return <IconActivity className="w-4 h-4 text-neutral-500" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    const priorityClasses = {
      high: 'bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium',
      medium: 'bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium',
      low: 'bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium',
    };
    
    return (
      <span className={priorityClasses[priority as keyof typeof priorityClasses]}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      active: 'bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium',
      acknowledged: 'bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium',
      resolved: 'bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium',
      closed: 'bg-neutral-100 text-neutral-800 text-xs px-2 py-1 rounded-full font-medium',
    };
    
    return (
      <span className={statusClasses[status as keyof typeof statusClasses]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Alerts Management</h1>
          <p className="text-neutral-600 mt-1">Monitor and manage system alerts and notifications</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full">
            <IconBell className="w-4 h-4" />
            {filteredAlerts.length} Active Alerts
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search alerts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
            />
          </div>
          
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
          >
            <option value="all">All Types</option>
            <option value="critical">Critical</option>
            <option value="warning">Warning</option>
            <option value="info">Info</option>
          </select>
          
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
          >
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="acknowledged">Acknowledged</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>

          <button className="px-3 py-2 bg-neutral-200 text-neutral-800 rounded-lg hover:bg-neutral-300 transition-colors flex items-center gap-2 text-sm">
            <IconFilter className="w-4 h-4" />
            Advanced
          </button>
        </div>
      </div>

      {/* Alerts Table */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="text-left p-3 text-sm font-medium text-neutral-600">Alert</th>
                <th className="text-left p-3 text-sm font-medium text-neutral-600">Category & Priority</th>
                <th className="text-left p-3 text-sm font-medium text-neutral-600">Details</th>
                <th className="text-left p-3 text-sm font-medium text-neutral-600">Status & Assignment</th>
                <th className="text-left p-3 text-sm font-medium text-neutral-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAlerts.map((alert) => (
                <tr key={alert.id} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                  <td className="p-3">
                    <div className="flex items-start gap-3">
                      {getAlertIcon(alert.type)}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-neutral-900 text-sm truncate">{alert.title}</p>
                        <p className="text-xs text-neutral-600 mt-1 line-clamp-2">{alert.description}</p>
                        <div className="flex items-center gap-2 mt-2 text-xs text-neutral-500">
                          <IconClock className="w-3 h-3" />
                          {alert.timestamp}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(alert.category)}
                        <span className="text-xs text-neutral-700">
                          {alert.category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                      </div>
                      {getPriorityBadge(alert.priority)}
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="space-y-1">
                      {alert.patientName && (
                        <div className="flex items-center gap-2 text-xs">
                          <IconUser className="w-3 h-3 text-blue-600" />
                          <span className="text-neutral-700 truncate">{alert.patientName} ({alert.patientId})</span>
                        </div>
                      )}
                      {alert.deviceName && (
                        <div className="flex items-center gap-2 text-xs">
                          <IconDeviceMobile className="w-3 h-3 text-green-600" />
                          <span className="text-neutral-700 truncate">{alert.deviceName} ({alert.deviceId})</span>
                        </div>
                      )}
                      {alert.metadata && (
                        <div className="text-xs text-neutral-500 space-y-0.5">
                          {Object.entries(alert.metadata).slice(0, 2).map(([key, value]) => (
                            <div key={key} className="truncate">
                              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}: {value}
                            </div>
                          ))}
                          {Object.keys(alert.metadata).length > 2 && (
                            <div className="text-neutral-400">+{Object.keys(alert.metadata).length - 2} more</div>
                          )}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="space-y-2">
                      {getStatusBadge(alert.status)}
                      <p className="text-xs text-neutral-700 truncate">
                        Assigned to: {alert.assignedTo}
                      </p>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-1">
                      {alert.actions.includes('view') && (
                        <button
                          onClick={() => handleAlertAction('view', alert.id)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          title="View Details"
                        >
                          <IconEye className="w-4 h-4" />
                        </button>
                      )}
                      {alert.actions.includes('acknowledge') && alert.status === 'active' && (
                        <button
                          onClick={() => handleAlertAction('acknowledge', alert.id)}
                          className="p-1.5 text-yellow-600 hover:bg-yellow-50 rounded transition-colors"
                          title="Acknowledge"
                        >
                          <IconCheck className="w-4 h-4" />
                        </button>
                      )}
                      {alert.actions.includes('resolve') && alert.status !== 'resolved' && (
                        <button
                          onClick={() => handleAlertAction('resolve', alert.id)}
                          className="p-1.5 text-green-600 hover:bg-green-50 rounded transition-colors"
                          title="Resolve"
                        >
                          <IconCheck className="w-4 h-4" />
                        </button>
                      )}
                      {alert.actions.includes('assign') && (
                        <button
                          onClick={() => handleAlertAction('assign', alert.id)}
                          className="p-1.5 text-purple-600 hover:bg-purple-50 rounded transition-colors"
                          title="Assign"
                        >
                          <IconUser className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleAlertAction('delete', alert.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Delete Alert"
                      >
                        <IconTrash className="w-4 h-4" />
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
            Showing {filteredAlerts.length} of {alerts.length} alerts
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
