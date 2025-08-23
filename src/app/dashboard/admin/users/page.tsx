'use client';

import { useAuth } from '@/lib/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LoadingSpinner } from '@/components/ui/sidebar';
import {
  IconSearch,
  IconFilter,
  IconPlus,
  IconEdit,
  IconTrash,
  IconEye,
  IconUser,
  IconShield,
} from '@tabler/icons-react';

// Mock user data
const mockUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'patient',
    status: 'active',
    lastActive: '2024-01-15',
    joinDate: '2023-06-15',
    phone: '+1-555-0123',
    age: 35,
    gender: 'Male',
    diagnosis: 'Asthma',
    medication: 'Inhaler',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    role: 'patient',
    status: 'active',
    lastActive: '2024-01-14',
    joinDate: '2023-08-22',
    phone: '+1-555-0124',
    age: 28,
    gender: 'Female',
    diagnosis: 'COPD',
    medication: 'Controller',
  },
  {
    id: 3,
    name: 'Dr. Michael Chen',
    email: 'm.chen@hospital.com',
    role: 'doctor',
    status: 'active',
    lastActive: '2024-01-15',
    joinDate: '2022-03-10',
    phone: '+1-555-0125',
    age: 42,
    gender: 'Male',
    specialization: 'Pulmonology',
    license: 'MD12345',
  },
  {
    id: 4,
    name: 'Emma Wilson',
    email: 'emma.w@example.com',
    role: 'patient',
    status: 'inactive',
    lastActive: '2023-12-20',
    joinDate: '2023-09-05',
    phone: '+1-555-0126',
    age: 31,
    gender: 'Female',
    diagnosis: 'Bronchitis',
    medication: 'None',
  },
  {
    id: 5,
    name: 'Dr. Lisa Rodriguez',
    email: 'l.rodriguez@clinic.com',
    role: 'doctor',
    status: 'active',
    lastActive: '2024-01-15',
    joinDate: '2021-11-18',
    phone: '+1-555-0127',
    age: 38,
    gender: 'Female',
    specialization: 'Respiratory Medicine',
    license: 'MD67890',
  },
  {
    id: 6,
    name: 'Robert Thompson',
    email: 'r.thompson@example.com',
    role: 'patient',
    status: 'active',
    lastActive: '2024-01-13',
    joinDate: '2023-07-12',
    phone: '+1-555-0128',
    age: 45,
    gender: 'Male',
    diagnosis: 'Asthma',
    medication: 'Controller',
  },
  {
    id: 7,
    name: 'Jennifer Lee',
    email: 'j.lee@example.com',
    role: 'patient',
    status: 'pending',
    lastActive: '2024-01-10',
    joinDate: '2024-01-10',
    phone: '+1-555-0129',
    age: 29,
    gender: 'Female',
    diagnosis: 'Pending',
    medication: 'None',
  },
  {
    id: 8,
    name: 'Dr. David Kim',
    email: 'd.kim@medical.com',
    role: 'doctor',
    status: 'active',
    lastActive: '2024-01-15',
    joinDate: '2020-05-20',
    phone: '+1-555-0130',
    age: 47,
    gender: 'Male',
    specialization: 'Internal Medicine',
    license: 'MD11111',
  },
];

export default function UsersPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

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
        <LoadingSpinner size="md" text="Loading users..." />
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return null;
  }

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleUserAction = (action: string, userId: number) => {
    console.log(`Action: ${action} for user: ${userId}`);
    // Implement action logic here
  };

  const getRoleBadge = (role: string) => {
    const roleClasses = {
      admin: 'bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium',
      doctor: 'bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium',
      patient: 'bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium',
    };
    
    return (
      <span className={roleClasses[role as keyof typeof roleClasses]}>
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      active: 'bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium',
      inactive: 'bg-neutral-100 text-neutral-800 text-xs px-2 py-1 rounded-full font-medium',
      suspended: 'bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium',
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
          <h1 className="text-2xl font-bold text-neutral-900">User Management</h1>
          <p className="text-neutral-600 mt-1">Manage system users, roles, and permissions</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
            <IconUser className="w-4 h-4" />
            {filteredUsers.filter(u => u.status === 'active').length} Active Users
          </span>
          <button className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 text-sm">
            <IconPlus className="w-4 h-4" />
            Add User
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Total Users</p>
              <p className="text-xl font-bold text-neutral-900">{mockUsers.length}</p>
            </div>
            <IconUser className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Patients</p>
              <p className="text-xl font-bold text-neutral-900">{mockUsers.filter(u => u.role === 'patient').length}</p>
            </div>
            <IconUser className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Doctors</p>
              <p className="text-xl font-bold text-neutral-900">{mockUsers.filter(u => u.role === 'doctor').length}</p>
            </div>
            <IconShield className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Active</p>
              <p className="text-xl font-bold text-neutral-900">{mockUsers.filter(u => u.status === 'active').length}</p>
            </div>
            <IconUser className="w-8 h-8 text-green-600" />
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
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
            />
          </div>
          
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="doctor">Doctor</option>
            <option value="patient">Patient</option>
          </select>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>

          <button className="px-3 py-2 bg-neutral-200 text-neutral-800 rounded-lg hover:bg-neutral-300 transition-colors flex items-center gap-2 text-sm">
            <IconFilter className="w-4 h-4" />
            Advanced
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="text-left p-3 text-sm font-medium text-neutral-600">User</th>
                <th className="text-left p-3 text-sm font-medium text-neutral-600">Contact & Role</th>
                <th className="text-left p-3 text-sm font-medium text-neutral-600">Health Info</th>
                <th className="text-left p-3 text-sm font-medium text-neutral-600">Status & Activity</th>
                <th className="text-left p-3 text-sm font-medium text-neutral-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                  <td className="p-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconUser className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-neutral-900 text-sm truncate">{user.name}</p>
                        <p className="text-xs text-neutral-600 mt-1">{user.email}</p>
                        <p className="text-xs text-neutral-500 mt-1">{user.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="space-y-2">
                      {getRoleBadge(user.role)}
                      {user.role === 'doctor' && user.specialization && (
                        <div className="text-xs text-neutral-700">
                          {user.specialization}
                        </div>
                      )}
                      {user.role === 'doctor' && user.license && (
                        <div className="text-xs text-neutral-500">
                          License: {user.license}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="space-y-1">
                      {user.age && (
                        <div className="text-xs text-neutral-700">
                          Age: {user.age}
                        </div>
                      )}
                      {user.gender && (
                        <div className="text-xs text-neutral-700">
                          Gender: {user.gender}
                        </div>
                      )}
                      {user.diagnosis && (
                        <div className="text-xs text-neutral-500">
                          Diagnosis: {user.diagnosis}
                        </div>
                      )}
                      {user.medication && (
                        <div className="text-xs text-neutral-500">
                          Medication: {user.medication}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="space-y-2">
                      {getStatusBadge(user.status)}
                      <div className="text-xs text-neutral-500">
                        Last active: {user.lastActive}
                      </div>
                      <div className="text-xs text-neutral-500">
                        Joined: {user.joinDate}
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleUserAction('view', user.id)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="View User"
                      >
                        <IconEye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleUserAction('edit', user.id)}
                        className="p-1.5 text-yellow-600 hover:bg-yellow-50 rounded transition-colors"
                        title="Edit User"
                      >
                        <IconEdit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleUserAction('delete', user.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Delete User"
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
            Showing {filteredUsers.length} of {mockUsers.length} users
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
