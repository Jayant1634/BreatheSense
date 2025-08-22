'use client';

import { useAuth } from '@/lib/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  IconDeviceMobile,
  IconBluetooth,
  IconWifi,
  IconBattery,
  IconSignalH,
  IconSettings,
  IconPlus,
  IconTrash,
  IconRefresh,
  IconAlertTriangle,
  IconCheck,
  IconX,
  IconInfoCircle,
} from '@tabler/icons-react';

interface Device {
  id: string;
  name: string;
  type: 'Spirometer' | 'Pulse Oximeter' | 'Smart Watch' | 'Mobile App';
  status: 'Connected' | 'Disconnected' | 'Low Battery' | 'Error';
  battery: number;
  signal: number;
  lastSeen: string;
  firmware: string;
  serialNumber: string;
}

export default function DevicesPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [showAddDevice, setShowAddDevice] = useState(false);
  const [showDeviceModal, setShowDeviceModal] = useState(false);

  // Mock data - in real app, this would come from API
  const [devices, setDevices] = useState<Device[]>([
    {
      id: '1',
      name: 'BreatheSense Pro',
      type: 'Spirometer',
      status: 'Connected',
      battery: 85,
      signal: 95,
      lastSeen: '2 minutes ago',
      firmware: 'v2.1.4',
      serialNumber: 'BS-2024-001'
    },
    {
      id: '2',
      name: 'OxyTracker Plus',
      type: 'Pulse Oximeter',
      status: 'Low Battery',
      battery: 15,
      signal: 88,
      lastSeen: '1 hour ago',
      firmware: 'v1.8.2',
      serialNumber: 'OT-2024-015'
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Connected': return 'bg-green-100 text-green-800';
      case 'Disconnected': return 'bg-neutral-100 text-neutral-800';
      case 'Low Battery': return 'bg-yellow-100 text-yellow-800';
      case 'Error': return 'bg-red-100 text-red-800';
      default: return 'bg-neutral-100 text-neutral-800';
    }
  };

  const getBatteryColor = (battery: number) => {
    if (battery > 50) return 'text-green-600';
    if (battery > 20) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSignalColor = (signal: number) => {
    if (signal > 80) return 'text-green-600';
    if (signal > 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleDeviceClick = (device: Device) => {
    setSelectedDevice(device);
    setShowDeviceModal(true);
  };

  const handleAddDevice = () => {
    setShowAddDevice(true);
  };

  const handleRemoveDevice = (deviceId: string) => {
    setDevices(devices.filter(d => d.id !== deviceId));
  };

  const handleRefreshDevices = () => {
    // In real app, this would refresh device status from API
    alert('Refreshing device status...');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-neutral-900">Devices</h1>
        <p className="text-neutral-600 text-sm">Manage your connected respiratory monitoring devices.</p>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
        <div className="flex items-center gap-3">
          <button
            onClick={handleAddDevice}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-sm"
          >
            <IconPlus className="w-4 h-4" />
            Add Device
          </button>
          <button
            onClick={handleRefreshDevices}
            className="flex items-center gap-2 px-3 py-2 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 rounded-lg transition-colors text-sm"
          >
            <IconRefresh className="w-4 h-4" />
            Refresh
          </button>
        </div>
        <div className="flex items-center gap-2 text-xs text-neutral-600">
          <IconDeviceMobile className="w-3 h-3" />
          <span>{devices.length} devices connected</span>
        </div>
      </div>

      {/* Device Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-neutral-900">Total Devices</h3>
            <IconDeviceMobile className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-neutral-900">{devices.length}</div>
          <div className="text-xs text-neutral-600 mt-1">Connected devices</div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-neutral-900">Active</h3>
            <IconCheck className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-neutral-900">
            {devices.filter(d => d.status === 'Connected').length}
          </div>
          <div className="text-xs text-neutral-600 mt-1">Currently online</div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-neutral-900">Battery Low</h3>
            <IconBattery className="w-5 h-5 text-yellow-600" />
          </div>
          <div className="text-2xl font-bold text-neutral-900">
            {devices.filter(d => d.battery < 20).length}
          </div>
          <div className="text-xs text-neutral-600 mt-1">Need charging</div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-neutral-900">Issues</h3>
            <IconAlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <div className="text-2xl font-bold text-neutral-900">
            {devices.filter(d => d.status === 'Error').length}
          </div>
          <div className="text-xs text-neutral-600 mt-1">Require attention</div>
        </div>
      </div>

      {/* Devices List */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-neutral-200">
          <h3 className="text-sm font-semibold text-neutral-900">Connected Devices</h3>
        </div>
        <div className="p-4">
          {devices.length === 0 ? (
            <div className="text-center py-8">
              <IconDeviceMobile className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
              <h3 className="text-sm font-medium text-neutral-900 mb-2">No devices connected</h3>
              <p className="text-xs text-neutral-600 mb-4">Connect your first device to start monitoring your respiratory health.</p>
              <button
                onClick={handleAddDevice}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-sm"
              >
                Add Device
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {devices.map((device) => (
                <div
                  key={device.id}
                  className="border border-neutral-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleDeviceClick(device)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-sm font-semibold text-neutral-900">{device.name}</h3>
                      <p className="text-xs text-neutral-600">{device.type}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(device.status)}`}>
                      {device.status}
                    </span>
                  </div>

                  <div className="space-y-2 mb-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-neutral-600">Battery</span>
                      <div className="flex items-center gap-2">
                        <IconBattery className={`w-3 h-3 ${getBatteryColor(device.battery)}`} />
                        <span className={`text-xs font-medium ${getBatteryColor(device.battery)}`}>
                          {device.battery}%
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-neutral-600">Signal</span>
                      <div className="flex items-center gap-2">
                        <IconSignalH className={`w-3 h-3 ${getSignalColor(device.signal)}`} />
                        <span className={`text-xs font-medium ${getSignalColor(device.signal)}`}>
                          {device.signal}%
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-neutral-600">Last Seen</span>
                      <span className="text-xs text-neutral-900">{device.lastSeen}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-neutral-600">Firmware</span>
                      <span className="text-xs text-neutral-900">{device.firmware}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors text-xs font-medium">
                      <IconSettings className="w-3 h-3 inline mr-1" />
                      Settings
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveDevice(device.id);
                      }}
                      className="px-2 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded transition-colors text-xs font-medium"
                    >
                      <IconTrash className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Device Modal */}
      {showAddDevice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-4 max-w-sm w-full">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-neutral-900">Add New Device</h3>
              <button
                onClick={() => setShowAddDevice(false)}
                className="text-neutral-500 hover:text-neutral-700"
              >
                <IconX className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-neutral-600 mb-1">Device Type</label>
                <select className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                  <option>Spirometer</option>
                  <option>Pulse Oximeter</option>
                  <option>Smart Watch</option>
                  <option>Mobile App</option>
                </select>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-neutral-600 mb-1">Connection Method</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="connection" value="bluetooth" className="text-blue-600" />
                    <IconBluetooth className="w-3 h-3 text-blue-600" />
                    <span className="text-sm">Bluetooth</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="connection" value="wifi" className="text-blue-600" />
                    <IconWifi className="w-3 h-3 text-blue-600" />
                    <span className="text-sm">Wi-Fi</span>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2 mt-4">
              <button 
                onClick={() => setShowAddDevice(false)}
                className="flex-1 px-3 py-2 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 rounded-lg transition-colors text-sm"
              >
                Cancel
              </button>
              <button className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm">
                Add Device
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Device Detail Modal */}
      {showDeviceModal && selectedDevice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-4 max-w-sm w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-neutral-900">Device Details</h3>
              <button
                onClick={() => setShowDeviceModal(false)}
                className="text-neutral-500 hover:text-neutral-700"
              >
                <IconX className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-neutral-600">Device Name</label>
                <p className="text-xs text-neutral-900">{selectedDevice.name}</p>
              </div>
              
              <div>
                <label className="text-xs font-medium text-neutral-600">Type</label>
                <p className="text-xs text-neutral-900">{selectedDevice.type}</p>
              </div>
              
              <div>
                <label className="text-xs font-medium text-neutral-600">Status</label>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedDevice.status)}`}>
                  {selectedDevice.status}
                </span>
              </div>
              
              <div>
                <label className="text-xs font-medium text-neutral-600">Serial Number</label>
                <p className="text-xs text-neutral-900">{selectedDevice.serialNumber}</p>
              </div>
              
              <div>
                <label className="text-xs font-medium text-neutral-600">Firmware Version</label>
                <p className="text-xs text-neutral-900">{selectedDevice.firmware}</p>
              </div>
              
              <div>
                <label className="text-xs font-medium text-neutral-600">Last Connected</label>
                <p className="text-xs text-neutral-900">{selectedDevice.lastSeen}</p>
              </div>
            </div>
            
            <div className="flex gap-2 mt-4">
              <button className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-xs">
                Configure
              </button>
              <button className="flex-1 px-3 py-2 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 rounded-lg transition-colors text-xs">
                Update Firmware
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Connection Help */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <IconInfoCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-semibold text-blue-900 mb-1">Need Help Connecting?</h3>
            <p className="text-blue-800 mb-3 text-xs">
              Make sure your device is in pairing mode and within range. For Bluetooth devices, 
              ensure Bluetooth is enabled on your device.
            </p>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-xs font-medium">
                View Setup Guide
              </button>
              <button className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg transition-colors text-xs font-medium">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
