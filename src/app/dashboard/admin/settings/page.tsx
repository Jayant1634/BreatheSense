'use client';

import { useAuth } from '@/lib/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LoadingSpinner } from '@/components/ui/sidebar';
import {
  IconSettings,
  IconUser,
  IconShield,
  IconBell,
  IconDatabase,
  IconDeviceMobile,
  IconMicrophone,
  IconLungs,
  IconActivity,
  IconDeviceFloppy,
  IconRefresh,
  IconCheck,
  IconX,
  IconEdit,
  IconEye,
  IconEyeOff,
} from '@tabler/icons-react';

export default function SettingsPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('general');
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    general: {
      siteName: 'BreatheSense',
      siteDescription: 'Respiratory Health Monitoring System',
      timezone: 'UTC',
      dateFormat: 'MM/DD/YYYY',
      language: 'English',
      maintenanceMode: false,
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      alertFrequency: 'immediate',
      quietHours: false,
      quietHoursStart: '22:00',
      quietHoursEnd: '07:00',
    },
    security: {
      twoFactorAuth: true,
      sessionTimeout: 30,
      passwordPolicy: 'strong',
      loginAttempts: 5,
      lockoutDuration: 15,
      requirePasswordChange: 90,
    },
    respiratory: {
      recordingQuality: 'high',
      analysisConfidence: 85,
      autoAnalysis: true,
      backupRecordings: true,
      retentionPeriod: 365,
      compressionEnabled: true,
    },
    devices: {
      autoConnect: true,
      firmwareUpdates: 'automatic',
      maintenanceReminders: true,
      batteryThreshold: 20,
      connectionTimeout: 30,
      maxConcurrentConnections: 10,
    },
  });

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
        <LoadingSpinner size="md" text="Loading settings..." />
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return null;
  }

  const handleSettingChange = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value,
      },
    }));
  };

  const handleSaveSettings = () => {
    console.log('Saving settings:', settings);
    // Implement save logic here
  };

  const tabs = [
    { id: 'general', label: 'General', icon: <IconSettings className="w-4 h-4" /> },
    { id: 'notifications', label: 'Notifications', icon: <IconBell className="w-4 h-4" /> },
    { id: 'security', label: 'Security', icon: <IconShield className="w-4 h-4" /> },
    { id: 'respiratory', label: 'Respiratory', icon: <IconLungs className="w-4 h-4" /> },
    { id: 'devices', label: 'Devices', icon: <IconDeviceMobile className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">System Settings</h1>
          <p className="text-neutral-600 mt-1">Configure system preferences and behavior</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleSaveSettings}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 text-sm"
          >
            <IconDeviceFloppy className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>

      {/* Settings Container */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
        {/* Tab Navigation */}
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
          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-neutral-900">General Configuration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Site Name</label>
                  <input
                    type="text"
                    value={settings.general.siteName}
                    onChange={(e) => handleSettingChange('general', 'siteName', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Site Description</label>
                  <input
                    type="text"
                    value={settings.general.siteDescription}
                    onChange={(e) => handleSettingChange('general', 'siteDescription', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Timezone</label>
                  <select
                    value={settings.general.timezone}
                    onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                  >
                    <option value="UTC">UTC</option>
                    <option value="EST">EST</option>
                    <option value="PST">PST</option>
                    <option value="GMT">GMT</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Date Format</label>
                  <select
                    value={settings.general.dateFormat}
                    onChange={(e) => handleSettingChange('general', 'dateFormat', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                  >
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={settings.general.maintenanceMode}
                      onChange={(e) => handleSettingChange('general', 'maintenanceMode', e.target.checked)}
                      className="rounded border-neutral-300 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-sm font-medium text-neutral-700">Maintenance Mode</span>
                  </label>
                  <p className="text-xs text-neutral-500 mt-1">Enable maintenance mode to restrict access</p>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Settings */}
          {activeTab === 'notifications' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-neutral-900">Notification Preferences</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={settings.notifications.emailNotifications}
                      onChange={(e) => handleSettingChange('notifications', 'emailNotifications', e.target.checked)}
                      className="rounded border-neutral-300 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-sm font-medium text-neutral-700">Email Notifications</span>
                  </label>
                </div>
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={settings.notifications.pushNotifications}
                      onChange={(e) => handleSettingChange('notifications', 'pushNotifications', e.target.checked)}
                      className="rounded border-neutral-300 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-sm font-medium text-neutral-700">Push Notifications</span>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Alert Frequency</label>
                  <select
                    value={settings.notifications.alertFrequency}
                    onChange={(e) => handleSettingChange('notifications', 'alertFrequency', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                  >
                    <option value="immediate">Immediate</option>
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                  </select>
                </div>
                <div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={settings.notifications.quietHours}
                      onChange={(e) => handleSettingChange('notifications', 'quietHours', e.target.checked)}
                      className="rounded border-neutral-300 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-sm font-medium text-neutral-700">Quiet Hours</span>
                  </label>
                </div>
                {settings.notifications.quietHours && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Start Time</label>
                      <input
                        type="time"
                        value={settings.notifications.quietHoursStart}
                        onChange={(e) => handleSettingChange('notifications', 'quietHoursStart', e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">End Time</label>
                      <input
                        type="time"
                        value={settings.notifications.quietHoursEnd}
                        onChange={(e) => handleSettingChange('notifications', 'quietHoursEnd', e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-neutral-900">Security Configuration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={settings.security.twoFactorAuth}
                      onChange={(e) => handleSettingChange('security', 'twoFactorAuth', e.target.checked)}
                      className="rounded border-neutral-300 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-sm font-medium text-neutral-700">Two-Factor Authentication</span>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Session Timeout (minutes)</label>
                  <input
                    type="number"
                    value={settings.security.sessionTimeout}
                    onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Password Policy</label>
                  <select
                    value={settings.security.passwordPolicy}
                    onChange={(e) => handleSettingChange('security', 'passwordPolicy', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                  >
                    <option value="basic">Basic</option>
                    <option value="strong">Strong</option>
                    <option value="very-strong">Very Strong</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Max Login Attempts</label>
                  <input
                    type="number"
                    value={settings.security.loginAttempts}
                    onChange={(e) => handleSettingChange('security', 'loginAttempts', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Lockout Duration (minutes)</label>
                  <input
                    type="number"
                    value={settings.security.lockoutDuration}
                    onChange={(e) => handleSettingChange('security', 'lockoutDuration', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Respiratory Settings */}
          {activeTab === 'respiratory' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-neutral-900">Respiratory Analysis Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Recording Quality</label>
                  <select
                    value={settings.respiratory.recordingQuality}
                    onChange={(e) => handleSettingChange('respiratory', 'recordingQuality', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Analysis Confidence (%)</label>
                  <input
                    type="number"
                    min="50"
                    max="100"
                    value={settings.respiratory.analysisConfidence}
                    onChange={(e) => handleSettingChange('respiratory', 'analysisConfidence', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={settings.respiratory.autoAnalysis}
                      onChange={(e) => handleSettingChange('respiratory', 'autoAnalysis', e.target.checked)}
                      className="rounded border-neutral-300 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-sm font-medium text-neutral-700">Automatic Analysis</span>
                  </label>
                </div>
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={settings.respiratory.backupRecordings}
                      onChange={(e) => handleSettingChange('respiratory', 'backupRecordings', e.target.checked)}
                      className="rounded border-neutral-300 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-sm font-medium text-neutral-700">Backup Recordings</span>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Retention Period (days)</label>
                  <input
                    type="number"
                    min="30"
                    max="1095"
                    value={settings.respiratory.retentionPeriod}
                    onChange={(e) => handleSettingChange('respiratory', 'retentionPeriod', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={settings.respiratory.compressionEnabled}
                      onChange={(e) => handleSettingChange('respiratory', 'compressionEnabled', e.target.checked)}
                      className="rounded border-neutral-300 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-sm font-medium text-neutral-700">Enable Audio Compression</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Device Settings */}
          {activeTab === 'devices' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-neutral-900">Device Management Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={settings.devices.autoConnect}
                      onChange={(e) => handleSettingChange('devices', 'autoConnect', e.target.checked)}
                      className="rounded border-neutral-300 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-sm font-medium text-neutral-700">Auto-connect Devices</span>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Firmware Updates</label>
                  <select
                    value={settings.devices.firmwareUpdates}
                    onChange={(e) => handleSettingChange('devices', 'firmwareUpdates', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                  >
                    <option value="manual">Manual</option>
                    <option value="automatic">Automatic</option>
                    <option value="scheduled">Scheduled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Battery Threshold (%)</label>
                  <input
                    type="number"
                    min="10"
                    max="50"
                    value={settings.devices.batteryThreshold}
                    onChange={(e) => handleSettingChange('devices', 'batteryThreshold', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Connection Timeout (seconds)</label>
                  <input
                    type="number"
                    min="10"
                    max="120"
                    value={settings.devices.connectionTimeout}
                    onChange={(e) => handleSettingChange('devices', 'connectionTimeout', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Max Concurrent Connections</label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={settings.devices.maxConcurrentConnections}
                    onChange={(e) => handleSettingChange('devices', 'maxConcurrentConnections', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={settings.devices.maintenanceReminders}
                      onChange={(e) => handleSettingChange('devices', 'maintenanceReminders', e.target.checked)}
                      className="rounded border-neutral-300 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-sm font-medium text-neutral-700">Maintenance Reminders</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
