'use client';

import { useAuth } from '@/lib/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  IconSearch,
  IconFilter,
  IconPlus,
  IconEdit,
  IconTrash,
  IconEye,
  IconDeviceMobile,
  IconWifi,
  IconBattery,
  IconSettings,
  IconActivity,
  IconCheck,
  IconX,
} from '@tabler/icons-react';

// Mock device data
const mockDevices = [
  {
    id: 1,
    deviceId: 'DS001',
    name: 'Littmann 3200 Electronic Stethoscope',
    type: 'Digital Stethoscope',
    status: 'active',
    location: 'Cardiology Ward',
    assignedTo: 'Dr. Michael Chen',
    lastUsed: '2024-01-15 14:30',
    batteryLevel: 85,
    wifiStatus: 'connected',
    firmwareVersion: 'v2.1.4',
    recordingCount: 156,
    lastMaintenance: '2024-01-01',
    nextMaintenance: '2024-04-01',
    specifications: {
      brand: '3M Littmann',
      model: '3200',
      frequency: '20Hz - 20kHz',
      connectivity: 'Bluetooth 5.0, WiFi',
      battery: 'Li-ion, 8 hours',
    },
  },
  {
    id: 2,
    deviceId: 'DS002',
    name: 'AKG C417L Microphone',
    type: 'Microphone',
    status: 'active',
    location: 'Pulmonology Lab',
    assignedTo: 'Dr. Lisa Rodriguez',
    lastUsed: '2024-01-15 16:45',
    batteryLevel: 92,
    wifiStatus: 'connected',
    firmwareVersion: 'v1.8.2',
    recordingCount: 89,
    lastMaintenance: '2023-12-15',
    nextMaintenance: '2024-03-15',
    specifications: {
      brand: 'AKG',
      model: 'C417L',
      frequency: '20Hz - 20kHz',
      connectivity: 'USB-C, WiFi',
      battery: 'Built-in, 12 hours',
    },
  },
  {
    id: 3,
    deviceId: 'DS003',
    name: 'WelchAllyn Meditron Master Elite',
    type: 'Digital Stethoscope',
    status: 'maintenance',
    location: 'Emergency Room',
    assignedTo: 'Dr. David Kim',
    lastUsed: '2024-01-10 09:15',
    batteryLevel: 23,
    wifiStatus: 'disconnected',
    firmwareVersion: 'v3.0.1',
    recordingCount: 234,
    lastMaintenance: '2024-01-10',
    nextMaintenance: '2024-01-25',
    specifications: {
      brand: 'WelchAllyn',
      model: 'Meditron Master Elite',
      frequency: '15Hz - 25kHz',
      connectivity: 'Bluetooth 4.2, WiFi',
      battery: 'Li-ion, 10 hours',
    },
  },
  {
    id: 4,
    deviceId: 'DS004',
    name: 'Littmann Classic II SE',
    type: 'Digital Stethoscope',
    status: 'inactive',
    location: 'Storage Room',
    assignedTo: 'Unassigned',
    lastUsed: '2023-12-20 11:30',
    batteryLevel: 0,
    wifiStatus: 'disconnected',
    firmwareVersion: 'v1.5.3',
    recordingCount: 67,
    lastMaintenance: '2023-11-20',
    nextMaintenance: '2024-02-20',
    specifications: {
      brand: '3M Littmann',
      model: 'Classic II SE',
      frequency: '18Hz - 18kHz',
      connectivity: 'Bluetooth 4.0',
      battery: 'AA Batteries, 6 hours',
    },
  },
  {
    id: 5,
    deviceId: 'DS005',
    name: 'Meditron Electronic Stethoscope',
    type: 'Digital Stethoscope',
    status: 'active',
    location: 'Pediatric Ward',
    assignedTo: 'Dr. Sarah Johnson',
    lastUsed: '2024-01-15 13:20',
    batteryLevel: 78,
    wifiStatus: 'connected',
    firmwareVersion: 'v2.0.7',
    recordingCount: 123,
    lastMaintenance: '2023-12-01',
    nextMaintenance: '2024-03-01',
    specifications: {
      brand: 'Meditron',
      model: 'Electronic',
      frequency: '20Hz - 20kHz',
      connectivity: 'Bluetooth 5.0, WiFi',
      battery: 'Li-ion, 9 hours',
    },
  },
];

export default function DevicesPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);

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
          <p className="text-neutral-600">Loading devices...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return null;
  }

  const filteredDevices = mockDevices.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.deviceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || device.status === statusFilter;
    const matchesType = typeFilter === 'all' || device.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleDeviceAction = (action: string, deviceId: number) => {
    console.log(`Action: ${action} for device: ${deviceId}`);
    // Implement action logic here
  };

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      active: 'bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium',
      maintenance: 'bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium',
      inactive: 'bg-neutral-100 text-neutral-800 text-xs px-2 py-1 rounded-full font-medium',
      error: 'bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium',
    };
    
    return (
      <span className={statusClasses[status as keyof typeof statusClasses]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getBatteryColor = (level: number) => {
    if (level > 60) return 'text-green-600';
    if (level > 20) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getWifiStatus = (status: string) => {
    return status === 'connected' ? (
      <IconWifi className="w-4 h-4 text-green-600" />
    ) : (
      <IconX className="w-4 h-4 text-red-600" />
    );
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Device Management</h1>
          <p className="text-neutral-600 mt-1">Monitor and manage all connected medical devices</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
            <IconDeviceMobile className="w-4 h-4" />
            {filteredDevices.filter(d => d.status === 'active').length} Active Devices
          </span>
          <button className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 text-sm">
            <IconPlus className="w-4 h-4" />
            Add Device
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Total Devices</p>
              <p className="text-xl font-bold text-neutral-900">{mockDevices.length}</p>
            </div>
            <IconDeviceMobile className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Active</p>
              <p className="text-xl font-bold text-neutral-900">{mockDevices.filter(d => d.status === 'active').length}</p>
            </div>
            <IconCheck className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Maintenance</p>
              <p className="text-xl font-bold text-neutral-900">{mockDevices.filter(d => d.status === 'maintenance').length}</p>
            </div>
            <IconSettings className="w-8 h-8 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Inactive</p>
              <p className="text-xl font-bold text-neutral-900">{mockDevices.filter(d => d.status === 'inactive').length}</p>
            </div>
            <IconX className="w-8 h-8 text-neutral-600" />
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
              placeholder="Search devices..."
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
            <option value="Digital Stethoscope">Digital Stethoscope</option>
            <option value="Microphone">Microphone</option>
          </select>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="maintenance">Maintenance</option>
            <option value="inactive">Inactive</option>
            <option value="error">Error</option>
          </select>

          <button className="px-3 py-2 bg-neutral-200 text-neutral-800 rounded-lg hover:bg-neutral-300 transition-colors flex items-center gap-2 text-sm">
            <IconFilter className="w-4 h-4" />
            Advanced
          </button>
        </div>
      </div>

      {/* Devices Table */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="text-left p-3 text-sm font-medium text-neutral-600">Device</th>
                <th className="text-left p-3 text-sm font-medium text-neutral-600">Status & Location</th>
                <th className="text-left p-3 text-sm font-medium text-neutral-600">Assignment & Usage</th>
                <th className="text-left p-3 text-sm font-medium text-neutral-600">System Info</th>
                <th className="text-left p-3 text-sm font-medium text-neutral-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDevices.map((device) => (
                <tr key={device.id} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                  <td className="p-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconDeviceMobile className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-neutral-900 text-sm truncate">{device.name}</p>
                        <p className="text-xs text-neutral-600 mt-1">{device.deviceId}</p>
                        <p className="text-xs text-neutral-500 mt-1">{device.type}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="space-y-2">
                      {getStatusBadge(device.status)}
                      <div className="flex items-center gap-2 text-xs">
                        <IconActivity className="w-3 h-3 text-neutral-500" />
                        <span className="text-neutral-700">{device.location}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs">
                        <IconActivity className="w-3 h-3 text-blue-600" />
                        <span className="text-neutral-700 truncate">{device.assignedTo}</span>
                      </div>
                      <div className="text-xs text-neutral-500">
                        Last used: {device.lastUsed}
                      </div>
                      <div className="text-xs text-neutral-500">
                        Recordings: {device.recordingCount}
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs">
                        <IconBattery className={`w-3 h-3 ${getBatteryColor(device.batteryLevel)}`} />
                        <span className="text-neutral-700">{device.batteryLevel}%</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        {getWifiStatus(device.wifiStatus)}
                        <span className="text-neutral-700">{device.wifiStatus}</span>
                      </div>
                      <div className="text-xs text-neutral-500">
                        v{device.firmwareVersion}
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleDeviceAction('view', device.id)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="View Details"
                      >
                        <IconEye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeviceAction('edit', device.id)}
                        className="p-1.5 text-yellow-600 hover:bg-yellow-50 rounded transition-colors"
                        title="Edit Device"
                      >
                        <IconEdit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeviceAction('settings', device.id)}
                        className="p-1.5 text-purple-600 hover:bg-purple-50 rounded transition-colors"
                        title="Device Settings"
                      >
                        <IconSettings className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeviceAction('delete', device.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Delete Device"
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
            Showing {filteredDevices.length} of {mockDevices.length} devices
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
