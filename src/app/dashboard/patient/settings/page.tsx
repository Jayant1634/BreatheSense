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
  IconLungs,
  IconDeviceFloppy,
  IconHeart,
} from '@tabler/icons-react';

export default function PatientSettingsPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState({
    profile: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: '',
      dateOfBirth: '',
      emergencyContact: '',
      emergencyPhone: '',
      medicalConditions: '',
      allergies: '',
      medications: '',
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      appointmentReminders: true,
      healthAlerts: true,
      medicationReminders: false,
      quietHours: false,
      quietHoursStart: '22:00',
      quietHoursEnd: '07:00',
    },
    privacy: {
      shareHealthData: false,
      shareWithDoctors: true,
      shareWithResearchers: false,
      dataRetention: 'indefinite',
      exportData: true,
      deleteAccount: false,
    },
    respiratory: {
      recordingQuality: 'high',
      autoAnalysis: true,
      backupRecordings: true,
      retentionPeriod: 365,
      compressionEnabled: true,
      analysisFrequency: 'daily',
      alertThresholds: {
        breathingRate: { min: 12, max: 20 },
        oxygenLevel: { min: 95, max: 100 },
        coughFrequency: { max: 10 },
      },
    },
    health: {
      weight: '',
      height: '',
      bloodType: '',
      smokingStatus: 'never',
      exerciseFrequency: 'moderate',
      sleepHours: 8,
      stressLevel: 'low',
    },
  });

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    } else if (!isLoading && user && user.role !== 'patient') {
      router.push('/dashboard');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user) {
      setSettings(prev => ({
        ...prev,
        profile: {
          ...prev.profile,
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          email: user.email || '',
        },
      }));
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="md" text="Loading settings..." />
      </div>
    );
  }

  if (!user || user.role !== 'patient') {
    return null;
  }

  const handleSettingChange = (category: string, key: string, value: unknown) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value,
      },
    }));
  };

  const handleNestedSettingChange = (category: string, parentKey: string, childKey: string, value: unknown) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [parentKey]: {
          ...prev[category as keyof typeof prev][parentKey as keyof unknown],
          [childKey]: value,
        },
      },
    }));
  };

  const handleSaveSettings = () => {
    console.log('Saving patient settings:', settings);
    // Implement save logic here
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <IconUser className="w-4 h-4" /> },
    { id: 'notifications', label: 'Notifications', icon: <IconBell className="w-4 h-4" /> },
    { id: 'privacy', label: 'Privacy', icon: <IconShield className="w-4 h-4" /> },
    { id: 'respiratory', label: 'Respiratory', icon: <IconLungs className="w-4 h-4" /> },
    { id: 'health', label: 'Health', icon: <IconHeart className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Personal Settings</h1>
          <p className="text-neutral-600 mt-1">Manage your profile and preferences</p>
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
          {/* Profile Settings */}
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-neutral-900">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">First Name</label>
                  <input
                    type="text"
                    value={settings.profile.firstName}
                    onChange={(e) => handleSettingChange('profile', 'firstName', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    value={settings.profile.lastName}
                    onChange={(e) => handleSettingChange('profile', 'lastName', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={settings.profile.email}
                    onChange={(e) => handleSettingChange('profile', 'email', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={settings.profile.phone}
                    onChange={(e) => handleSettingChange('profile', 'phone', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Date of Birth</label>
                  <input
                    type="date"
                    value={settings.profile.dateOfBirth}
                    onChange={(e) => handleSettingChange('profile', 'dateOfBirth', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Emergency Contact</label>
                  <input
                    type="text"
                    value={settings.profile.emergencyContact}
                    onChange={(e) => handleSettingChange('profile', 'emergencyContact', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Emergency Phone</label>
                  <input
                    type="tel"
                    value={settings.profile.emergencyPhone}
                    onChange={(e) => handleSettingChange('profile', 'emergencyPhone', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Medical Conditions</label>
                  <textarea
                    value={settings.profile.medicalConditions}
                    onChange={(e) => handleSettingChange('profile', 'medicalConditions', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                    placeholder="List any medical conditions..."
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Allergies</label>
                  <textarea
                    value={settings.profile.allergies}
                    onChange={(e) => handleSettingChange('profile', 'allergies', e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                    placeholder="List any allergies..."
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Current Medications</label>
                  <textarea
                    value={settings.profile.medications}
                    onChange={(e) => handleSettingChange('profile', 'medications', e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                    placeholder="List current medications..."
                  />
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
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={settings.notifications.appointmentReminders}
                      onChange={(e) => handleSettingChange('notifications', 'appointmentReminders', e.target.checked)}
                      className="rounded border-neutral-300 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-sm font-medium text-neutral-700">Appointment Reminders</span>
                  </label>
                </div>
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={settings.notifications.healthAlerts}
                      onChange={(e) => handleSettingChange('notifications', 'healthAlerts', e.target.checked)}
                      className="rounded border-neutral-300 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-sm font-medium text-neutral-700">Health Alerts</span>
                  </label>
                </div>
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={settings.notifications.medicationReminders}
                      onChange={(e) => handleSettingChange('notifications', 'medicationReminders', e.target.checked)}
                      className="rounded border-neutral-300 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-sm font-medium text-neutral-700">Medication Reminders</span>
                  </label>
                </div>
                <div className="md:col-span-2">
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

          {/* Privacy Settings */}
          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-neutral-900">Privacy & Data Sharing</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={settings.privacy.shareHealthData}
                      onChange={(e) => handleSettingChange('privacy', 'shareHealthData', e.target.checked)}
                      className="rounded border-neutral-300 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-sm font-medium text-neutral-700">Share Health Data for Research</span>
                  </label>
                  <p className="text-xs text-neutral-500 mt-1">Allow anonymized data to be used for medical research</p>
                </div>
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={settings.privacy.shareWithDoctors}
                      onChange={(e) => handleSettingChange('privacy', 'shareWithDoctors', e.target.checked)}
                      className="rounded border-neutral-300 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-sm font-medium text-neutral-700">Share with Healthcare Providers</span>
                  </label>
                  <p className="text-xs text-neutral-500 mt-1">Allow your doctors to access your health data</p>
                </div>
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={settings.privacy.shareWithResearchers}
                      onChange={(e) => handleSettingChange('privacy', 'shareWithResearchers', e.target.checked)}
                      className="rounded border-neutral-300 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-sm font-medium text-neutral-700">Share with Researchers</span>
                  </label>
                  <p className="text-xs text-neutral-500 mt-1">Allow data to be used for academic research</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Data Retention</label>
                  <select
                    value={settings.privacy.dataRetention}
                    onChange={(e) => handleSettingChange('privacy', 'dataRetention', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                  >
                    <option value="1year">1 Year</option>
                    <option value="5years">5 Years</option>
                    <option value="10years">10 Years</option>
                    <option value="indefinite">Indefinite</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={settings.privacy.exportData}
                      onChange={(e) => handleSettingChange('privacy', 'exportData', e.target.checked)}
                      className="rounded border-neutral-300 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-sm font-medium text-neutral-700">Allow Data Export</span>
                  </label>
                  <p className="text-xs text-neutral-500 mt-1">Enable downloading your health data</p>
                </div>
              </div>
            </div>
          )}

          {/* Respiratory Settings */}
          {activeTab === 'respiratory' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-neutral-900">Respiratory Monitoring Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Recording Quality</label>
                  <select
                    value={settings.respiratory.recordingQuality}
                    onChange={(e) => handleSettingChange('respiratory', 'recordingQuality', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                  >
                    <option value="low">Low (Faster)</option>
                    <option value="medium">Medium (Balanced)</option>
                    <option value="high">High (Best Quality)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Analysis Frequency</label>
                  <select
                    value={settings.respiratory.analysisFrequency}
                    onChange={(e) => handleSettingChange('respiratory', 'analysisFrequency', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                  >
                    <option value="realtime">Real-time</option>
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                  </select>
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

              {/* Alert Thresholds */}
              <div className="mt-6">
                <h4 className="text-md font-semibold text-neutral-900 mb-3">Alert Thresholds</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Breathing Rate (breaths/min)</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        min="8"
                        max="30"
                        value={settings.respiratory.alertThresholds.breathingRate.min}
                        onChange={(e) => handleNestedSettingChange('respiratory', 'alertThresholds', 'breathingRate', { ...settings.respiratory.alertThresholds.breathingRate, min: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                        placeholder="Min"
                      />
                      <input
                        type="number"
                        min="8"
                        max="30"
                        value={settings.respiratory.alertThresholds.breathingRate.max}
                        onChange={(e) => handleNestedSettingChange('respiratory', 'alertThresholds', 'breathingRate', { ...settings.respiratory.alertThresholds.breathingRate, max: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                        placeholder="Max"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Oxygen Level (%)</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        min="90"
                        max="100"
                        value={settings.respiratory.alertThresholds.oxygenLevel.min}
                        onChange={(e) => handleNestedSettingChange('respiratory', 'alertThresholds', 'oxygenLevel', { ...settings.respiratory.alertThresholds.oxygenLevel, min: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                        placeholder="Min"
                      />
                      <input
                        type="number"
                        min="90"
                        max="100"
                        value={settings.respiratory.alertThresholds.oxygenLevel.max}
                        onChange={(e) => handleNestedSettingChange('respiratory', 'alertThresholds', 'oxygenLevel', { ...settings.respiratory.alertThresholds.oxygenLevel, max: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                        placeholder="Max"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Max Cough Frequency (per hour)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={settings.respiratory.alertThresholds.coughFrequency.max}
                      onChange={(e) => handleNestedSettingChange('respiratory', 'alertThresholds', 'coughFrequency', { max: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Health Settings */}
          {activeTab === 'health' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-neutral-900">Health Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Weight (kg)</label>
                  <input
                    type="number"
                    min="20"
                    max="300"
                    step="0.1"
                    value={settings.health.weight}
                    onChange={(e) => handleSettingChange('health', 'weight', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Height (cm)</label>
                  <input
                    type="number"
                    min="100"
                    max="250"
                    value={settings.health.height}
                    onChange={(e) => handleSettingChange('health', 'height', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Blood Type</label>
                  <select
                    value={settings.health.bloodType}
                    onChange={(e) => handleSettingChange('health', 'bloodType', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                  >
                    <option value="">Select Blood Type</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Smoking Status</label>
                  <select
                    value={settings.health.smokingStatus}
                    onChange={(e) => handleSettingChange('health', 'smokingStatus', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                  >
                    <option value="never">Never Smoked</option>
                    <option value="former">Former Smoker</option>
                    <option value="current">Current Smoker</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Exercise Frequency</label>
                  <select
                    value={settings.health.exerciseFrequency}
                    onChange={(e) => handleSettingChange('health', 'exerciseFrequency', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                  >
                    <option value="sedentary">Sedentary</option>
                    <option value="light">Light</option>
                    <option value="moderate">Moderate</option>
                    <option value="active">Active</option>
                    <option value="very-active">Very Active</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Sleep Hours</label>
                  <input
                    type="number"
                    min="4"
                    max="12"
                    step="0.5"
                    value={settings.health.sleepHours}
                    onChange={(e) => handleSettingChange('health', 'sleepHours', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Stress Level</label>
                  <select
                    value={settings.health.stressLevel}
                    onChange={(e) => handleSettingChange('health', 'stressLevel', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                  >
                    <option value="low">Low</option>
                    <option value="moderate">Moderate</option>
                    <option value="high">High</option>
                    <option value="very-high">Very High</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
