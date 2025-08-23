'use client';

import { useAuth, User } from '@/lib/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  IconEdit,
  IconCheck,
  IconX,
  IconInfoCircle,
  IconShield,
  IconBell,
  IconLock,
} from '@tabler/icons-react';

interface HealthProfile {
  height: string;
  weight: string;
  bloodType: string;
  allergies: string[];
  medications: string[];
  conditions: string[];
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
}

export default function ProfilePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingHealth, setIsEditingHealth] = useState(false);
  const [editedUser, setEditedUser] = useState<User | null>(null);
  const [editedHealth, setEditedHealth] = useState<HealthProfile | null>(null);

  // Mock health profile data - in real app, this would come from API
  const [healthProfile] = useState<HealthProfile>({
    height: '5\'8&quot;',
    weight: '150 lbs',
    bloodType: 'O+',
    allergies: ['Pollen', 'Dust'],
    medications: ['Albuterol', 'Fluticasone'],
    conditions: ['Asthma', 'Seasonal Allergies'],
    emergencyContact: {
      name: 'Jane Smith',
      relationship: 'Spouse',
      phone: '+1 (555) 987-6543'
    }
  });

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    } else if (!isLoading && user && user.role === 'admin') {
      router.push('/dashboard/admin');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user) {
      setEditedUser({ ...user });
      setEditedHealth({ ...healthProfile });
    }
  }, [user, healthProfile]);

  if (!user || user.role === 'admin') {
    return null;
  }

  const handleSaveProfile = () => {
    // In real app, this would save to API
    console.log('Saving profile:', editedUser);
    setIsEditing(false);
  };

  const handleSaveHealth = () => {
    // In real app, this would save to API
    console.log('Saving health profile:', editedHealth);
    setIsEditingHealth(false);
  };

  const handleCancelEdit = () => {
    setEditedUser({ ...user });
    setIsEditing(false);
  };

  const handleCancelHealthEdit = () => {
    setEditedHealth({ ...healthProfile });
    setIsEditingHealth(false);
  };

  const addAllergy = () => {
    if (editedHealth) {
      setEditedHealth({
        ...editedHealth,
        allergies: [...editedHealth.allergies, '']
      });
    }
  };

  const removeAllergy = (index: number) => {
    if (editedHealth) {
      setEditedHealth({
        ...editedHealth,
        allergies: editedHealth.allergies.filter((_, i) => i !== index)
      });
    }
  };

  const updateAllergy = (index: number, value: string) => {
    if (editedHealth) {
      const newAllergies = [...editedHealth.allergies];
      newAllergies[index] = value;
      setEditedHealth({
        ...editedHealth,
        allergies: newAllergies
      });
    }
  };

  const addMedication = () => {
    if (editedHealth) {
      setEditedHealth({
        ...editedHealth,
        medications: [...editedHealth.medications, '']
      });
    }
  };

  const removeMedication = (index: number) => {
    if (editedHealth) {
      setEditedHealth({
        ...editedHealth,
        medications: editedHealth.medications.filter((_, i) => i !== index)
      });
    }
  };

  const updateMedication = (index: number, value: string) => {
    if (editedHealth) {
      const newMedications = [...editedHealth.medications];
      newMedications[index] = value;
      setEditedHealth({
        ...editedHealth,
        medications: newMedications
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-neutral-900">Profile</h1>
        <p className="text-neutral-600 text-sm">Manage your personal information and health profile.</p>
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-neutral-200 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-neutral-900">Personal Information</h3>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-xs"
            >
              <IconEdit className="w-3 h-3" />
              Edit
            </button>
          ) : (
            <div className="flex gap-2">
                             <button
                 onClick={handleSaveProfile}
                 className="flex items-center gap-2 px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-xs"
               >
                 <IconCheck className="w-3 h-3" />
                 Save
               </button>
              <button
                onClick={handleCancelEdit}
                className="flex items-center gap-2 px-3 py-1 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 rounded-lg transition-colors text-xs"
              >
                <IconX className="w-3 h-3" />
                Cancel
              </button>
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1">First Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedUser?.firstName || ''}
                  onChange={(e) => setEditedUser(prev => prev ? { ...prev, firstName: e.target.value } : null)}
                  className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              ) : (
                <p className="text-sm text-neutral-900 font-medium">{user.firstName}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1">Last Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedUser?.lastName || ''}
                  onChange={(e) => setEditedUser(prev => prev ? { ...prev, lastName: e.target.value } : null)}
                  className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              ) : (
                <p className="text-sm text-neutral-900 font-medium">{user.lastName}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={editedUser?.email || ''}
                  onChange={(e) => setEditedUser(prev => prev ? { ...prev, email: e.target.value } : null)}
                  className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              ) : (
                <p className="text-sm text-neutral-900 font-medium">{user.email}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1">Phone Number</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={editedUser?.phoneNumber || ''}
                  onChange={(e) => setEditedUser(prev => prev ? { ...prev, phoneNumber: e.target.value } : null)}
                  className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="+1 (555) 123-4567"
                />
              ) : (
                <p className="text-sm text-neutral-900 font-medium">{user.phoneNumber || 'Not provided'}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1">Date of Birth</label>
              {isEditing ? (
                <input
                  type="date"
                  value={editedUser?.dateOfBirth ? (editedUser.dateOfBirth instanceof Date ? editedUser.dateOfBirth.toISOString().split('T')[0] : editedUser.dateOfBirth) : ''}
                  onChange={(e) => setEditedUser(prev => prev ? { ...prev, dateOfBirth: new Date(e.target.value) } : null)}
                  className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              ) : (
                <p className="text-sm text-neutral-900 font-medium">{user.dateOfBirth ? (user.dateOfBirth instanceof Date ? user.dateOfBirth.toLocaleDateString() : user.dateOfBirth) : 'Not provided'}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1">Address</label>
              {isEditing ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editedUser?.address?.street || ''}
                    onChange={(e) => setEditedUser(prev => prev ? { 
                      ...prev, 
                      address: { 
                        street: '',
                        city: '',
                        state: '',
                        zipCode: '',
                        country: '',
                        ...prev.address, 
                        street: e.target.value 
                      } 
                    } : null)}
                    className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="Street Address"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={editedUser?.address?.city || ''}
                      onChange={(e) => setEditedUser(prev => prev ? { 
                        ...prev, 
                        address: { 
                          street: '',
                        city: '',
                        state: '',
                        zipCode: '',
                        country: '',
                        ...prev.address, 
                          city: e.target.value 
                        } 
                      } : null)}
                      className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="City"
                    />
                    <input
                      type="text"
                      value={editedUser?.address?.state || ''}
                      onChange={(e) => setEditedUser(prev => prev ? { 
                        ...prev, 
                        address: { 
                          street: '',
                        city: '',
                        state: '',
                        zipCode: '',
                        country: '',
                        ...prev.address, 
                          state: e.target.value 
                        } 
                      } : null)}
                      className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="State"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={editedUser?.address?.zipCode || ''}
                      onChange={(e) => setEditedUser(prev => prev ? { 
                        ...prev, 
                        address: { 
                          street: '',
                        city: '',
                        state: '',
                        zipCode: '',
                        country: '',
                        ...prev.address, 
                          zipCode: e.target.value 
                        } 
                      } : null)}
                      className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="ZIP Code"
                    />
                    <input
                      type="text"
                      value={editedUser?.address?.country || ''}
                      onChange={(e) => setEditedUser(prev => prev ? { 
                        ...prev, 
                        address: { 
                          street: '',
                        city: '',
                        state: '',
                        zipCode: '',
                        country: '',
                        ...prev.address, 
                          country: e.target.value 
                        } 
                      } : null)}
                      className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="Country"
                    />
                  </div>
                </div>
              ) : (
                <p className="text-sm text-neutral-900 font-medium">
                  {user.address ? 
                    `${user.address.street || ''}${user.address.street && user.address.city ? ', ' : ''}${user.address.city || ''}${user.address.city && user.address.state ? ', ' : ''}${user.address.state || ''}${user.address.state && user.address.zipCode ? ' ' : ''}${user.address.zipCode || ''}${user.address.zipCode && user.address.country ? ', ' : ''}${user.address.country || ''}`.trim() || 'Not provided'
                    : 'Not provided'
                  }
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Health Profile */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-neutral-200 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-neutral-900">Health Profile</h3>
          {!isEditingHealth ? (
            <button
              onClick={() => setIsEditingHealth(true)}
              className="flex items-center gap-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-xs"
            >
              <IconEdit className="w-3 h-3" />
              Edit
            </button>
          ) : (
            <div className="flex gap-2">
                             <button
                 onClick={handleSaveHealth}
                 className="flex items-center gap-2 px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-xs"
               >
                 <IconCheck className="w-3 h-3" />
                 Save
               </button>
              <button
                onClick={handleCancelHealthEdit}
                className="flex items-center gap-2 px-3 py-1 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 rounded-lg transition-colors text-xs"
              >
                <IconX className="w-3 h-3" />
                Cancel
              </button>
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1">Height</label>
              {isEditingHealth ? (
                <input
                  type="text"
                  value={editedHealth?.height || ''}
                  onChange={(e) => setEditedHealth(prev => prev ? { ...prev, height: e.target.value } : null)}
                  className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="e.g., 5'8&quot;"
                />
              ) : (
                <p className="text-sm text-neutral-900 font-medium">{healthProfile.height}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1">Weight</label>
              {isEditingHealth ? (
                <input
                  type="text"
                  value={editedHealth?.weight || ''}
                  onChange={(e) => setEditedHealth(prev => prev ? { ...prev, weight: e.target.value } : null)}
                  className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="e.g., 150 lbs"
                />
              ) : (
                <p className="text-sm text-neutral-900 font-medium">{healthProfile.weight}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1">Blood Type</label>
              {isEditingHealth ? (
                <select
                  value={editedHealth?.bloodType || ''}
                  onChange={(e) => setEditedHealth(prev => prev ? { ...prev, bloodType: e.target.value } : null)}
                  className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="">Select blood type</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              ) : (
                <p className="text-sm text-neutral-900 font-medium">{healthProfile.bloodType}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1">Emergency Contact</label>
              {isEditingHealth ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editedHealth?.emergencyContact?.name || ''}
                    onChange={(e) => setEditedHealth(prev => prev ? {
                      ...prev,
                      emergencyContact: { ...prev.emergencyContact, name: e.target.value }
                    } : null)}
                    className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="Contact name"
                  />
                  <input
                    type="text"
                    value={editedHealth?.emergencyContact?.relationship || ''}
                    onChange={(e) => setEditedHealth(prev => prev ? {
                      ...prev,
                      emergencyContact: { ...prev.emergencyContact, relationship: e.target.value }
                    } : null)}
                    className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="Relationship"
                  />
                  <input
                    type="tel"
                    value={editedHealth?.emergencyContact?.phone || ''}
                    onChange={(e) => setEditedHealth(prev => prev ? {
                      ...prev,
                      emergencyContact: { ...prev.emergencyContact, phone: e.target.value }
                    } : null)}
                    className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="Phone number"
                  />
                </div>
              ) : (
                <div>
                  <p className="text-sm text-neutral-900 font-medium">{healthProfile.emergencyContact.name}</p>
                  <p className="text-xs text-neutral-600">{healthProfile.emergencyContact.relationship}</p>
                  <p className="text-xs text-neutral-600">{healthProfile.emergencyContact.phone}</p>
                </div>
              )}
            </div>
          </div>

          {/* Allergies */}
          <div className="mt-4">
            <label className="block text-xs font-medium text-neutral-600 mb-2">Allergies</label>
            {isEditingHealth ? (
              <div className="space-y-2">
                {editedHealth?.allergies.map((allergy, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={allergy}
                      onChange={(e) => updateAllergy(index, e.target.value)}
                      className="flex-1 p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="Allergy"
                    />
                    <button
                      onClick={() => removeAllergy(index)}
                      className="px-2 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded transition-colors"
                    >
                      <IconX className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={addAllergy}
                  className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded transition-colors text-xs font-medium"
                >
                  + Add Allergy
                </button>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {healthProfile.allergies.map((allergy, index) => (
                  <span key={index} className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                    {allergy}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Medications */}
          <div className="mt-4">
            <label className="block text-xs font-medium text-neutral-600 mb-2">Current Medications</label>
            {isEditingHealth ? (
              <div className="space-y-2">
                {editedHealth?.medications.map((medication, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={medication}
                      onChange={(e) => updateMedication(index, e.target.value)}
                      className="flex-1 p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="Medication name"
                    />
                    <button
                      onClick={() => removeMedication(index)}
                      className="px-2 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded transition-colors"
                    >
                      <IconX className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={addMedication}
                  className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded transition-colors text-xs font-medium"
                >
                  + Add Medication
                </button>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {healthProfile.medications.map((medication, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                    {medication}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Medical Conditions */}
          <div className="mt-4">
            <label className="block text-xs font-medium text-neutral-600 mb-2">Medical Conditions</label>
            <div className="flex flex-wrap gap-2">
              {healthProfile.conditions.map((condition, index) => (
                <span key={index} className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                  {condition}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Account Settings */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-neutral-200">
          <h3 className="text-sm font-semibold text-neutral-900">Account Settings</h3>
        </div>
        <div className="p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg">
              <div className="flex items-center gap-3">
                <IconLock className="w-4 h-4 text-neutral-500" />
                <div>
                  <h4 className="text-sm font-medium text-neutral-900">Change Password</h4>
                  <p className="text-xs text-neutral-600">Update your account password</p>
                </div>
              </div>
              <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-xs">
                Change
              </button>
            </div>

            <div className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg">
              <div className="flex items-center gap-3">
                <IconBell className="w-4 h-4 text-neutral-500" />
                <div>
                  <h4 className="text-sm font-medium text-neutral-900">Notification Preferences</h4>
                  <p className="text-xs text-neutral-600">Manage your notification settings</p>
                </div>
              </div>
              <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-xs">
                Configure
              </button>
            </div>

            <div className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg">
              <div className="flex items-center gap-3">
                <IconShield className="w-4 h-4 text-neutral-500" />
                <div>
                  <h4 className="text-sm font-medium text-neutral-900">Privacy Settings</h4>
                  <p className="text-xs text-neutral-600">Control your data privacy</p>
                </div>
              </div>
              <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-xs">
                Manage
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Health Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <IconInfoCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-semibold text-blue-900 mb-1">Keep Your Profile Updated</h3>
            <p className="text-blue-800 mb-3 text-xs">
              Keeping your health profile current helps healthcare providers provide better care. 
              Update your medications, allergies, and conditions whenever there are changes.
            </p>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-xs font-medium">
                View Privacy Policy
              </button>
              <button className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg transition-colors text-xs font-medium">
                Data Usage Guide
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
