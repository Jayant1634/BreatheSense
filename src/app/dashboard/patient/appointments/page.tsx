'use client';

import { useAuth } from '@/lib/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  IconCalendar,
  IconPlus,
  IconClock,
  IconMapPin,
  IconPhone,
  IconVideo,
  IconMapPinOff,
  IconCheck,
  IconX,
  IconInfoCircle,
} from '@tabler/icons-react';

interface Appointment {
  id: string;
  date: string;
  time: string;
  type: 'In-Person' | 'Video Call' | 'Phone Call';
  status: 'Scheduled' | 'Confirmed' | 'Completed' | 'Cancelled' | 'Rescheduled';
  doctor: {
    name: string;
    specialty: string;
    phone: string;
  };
  location?: string;
  notes?: string;
  duration: number;
}

export default function AppointmentsPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showNewAppointment, setShowNewAppointment] = useState(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Mock data - in real app, this would come from API
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      date: '2024-01-20',
      time: '10:00',
      type: 'In-Person',
      status: 'Confirmed',
      doctor: {
        name: 'Dr. Sarah Johnson',
        specialty: 'Pulmonologist',
        phone: '+1 (555) 123-4567'
      },
      location: 'Medical Center Building A, Suite 301',
      notes: 'Follow-up appointment for respiratory assessment',
      duration: 30
    },
    {
      id: '2',
      date: '2024-01-25',
      time: '14:30',
      type: 'Video Call',
      status: 'Scheduled',
      doctor: {
        name: 'Dr. Michael Chen',
        specialty: 'Respiratory Therapist',
        phone: '+1 (555) 987-6543'
      },
      notes: 'Monthly check-in and breathing exercise review',
      duration: 45
    },
    {
      id: '3',
      date: '2024-01-15',
      time: '09:15',
      type: 'In-Person',
      status: 'Completed',
      doctor: {
        name: 'Dr. Sarah Johnson',
        specialty: 'Pulmonologist',
        phone: '+1 (555) 123-4567'
      },
      location: 'Medical Center Building A, Suite 301',
      notes: 'Initial consultation and spirometry test',
      duration: 60
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
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'Confirmed': return 'bg-green-100 text-green-800';
      case 'Completed': return 'bg-neutral-100 text-neutral-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      case 'Rescheduled': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-neutral-100 text-neutral-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'In-Person': return <IconMapPin className="w-3 h-3" />;
      case 'Video Call': return <IconVideo className="w-3 h-3" />;
      case 'Phone Call': return <IconPhone className="w-3 h-3" />;
      default: return <IconMapPin className="w-3 h-3" />;
    }
  };

  const filteredAppointments = filterStatus === 'all' 
    ? appointments 
    : appointments.filter(apt => apt.status === filterStatus);

  const handleAppointmentClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setShowAppointmentModal(true);
  };

  const handleNewAppointment = () => {
    setShowNewAppointment(true);
  };

  const handleCancelAppointment = (appointmentId: string) => {
    setAppointments(appointments.map(apt => 
      apt.id === appointmentId 
        ? { ...apt, status: 'Cancelled' as const }
        : apt
    ));
  };

  const handleRescheduleAppointment = (appointmentId: string) => {
    setAppointments(appointments.map(apt => 
      apt.id === appointmentId 
        ? { ...apt, status: 'Rescheduled' as const }
        : apt
    ));
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-neutral-900">Appointments</h1>
        <p className="text-neutral-600 text-sm">Schedule and manage your healthcare appointments.</p>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
        <div className="flex items-center gap-3">
          <button
            onClick={handleNewAppointment}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-sm"
          >
            <IconPlus className="w-4 h-4" />
            Schedule Appointment
          </button>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="all">All Appointments</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Rescheduled">Rescheduled</option>
          </select>
        </div>
      </div>

      {/* Appointment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-neutral-900">Total</h3>
            <IconCalendar className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-neutral-900">{appointments.length}</div>
          <div className="text-xs text-neutral-600 mt-1">All appointments</div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-neutral-900">Upcoming</h3>
            <IconClock className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-neutral-900">
            {appointments.filter(apt => ['Scheduled', 'Confirmed'].includes(apt.status)).length}
          </div>
          <div className="text-xs text-neutral-600 mt-1">Next appointments</div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-neutral-900">This Week</h3>
            <IconCalendar className="w-5 h-5 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-neutral-900">
            {appointments.filter(apt => {
              const aptDate = new Date(apt.date);
              const today = new Date();
              const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
              return aptDate >= today && aptDate <= weekFromNow;
            }).length}
          </div>
          <div className="text-xs text-neutral-600 mt-1">Within 7 days</div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-neutral-900">Completed</h3>
            <IconCheck className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-neutral-900">
            {appointments.filter(apt => apt.status === 'Completed').length}
          </div>
          <div className="text-xs text-neutral-600 mt-1">Past appointments</div>
        </div>
      </div>

      {/* Appointments List */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-neutral-200">
          <h3 className="text-sm font-semibold text-neutral-900">Your Appointments</h3>
        </div>
        <div className="p-4">
          {filteredAppointments.length === 0 ? (
            <div className="text-center py-8">
              <IconCalendar className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
              <h3 className="text-sm font-medium text-neutral-900 mb-2">No appointments found</h3>
              <p className="text-xs text-neutral-600 mb-4">
                {filterStatus === 'all' 
                  ? "You don't have any appointments scheduled yet."
                  : `No ${filterStatus.toLowerCase()} appointments found.`
                }
              </p>
              {filterStatus === 'all' && (
                <button
                  onClick={handleNewAppointment}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-sm"
                >
                  Schedule Your First Appointment
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="border border-neutral-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleAppointmentClick(appointment)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(appointment.type)}
                      <div>
                        <h3 className="text-sm font-semibold text-neutral-900">
                          {appointment.doctor.name}
                        </h3>
                        <p className="text-xs text-neutral-600">{appointment.doctor.specialty}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <IconCalendar className="w-3 h-3 text-neutral-500" />
                      <span className="text-xs text-neutral-900">{appointment.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <IconClock className="w-3 h-3 text-neutral-500" />
                      <span className="text-xs text-neutral-900">{appointment.time} ({appointment.duration} min)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {appointment.location ? (
                        <>
                          <IconMapPin className="w-3 h-3 text-neutral-500" />
                          <span className="text-xs text-neutral-900">{appointment.location}</span>
                        </>
                      ) : (
                        <>
                          <IconMapPinOff className="w-3 h-3 text-neutral-500" />
                          <span className="text-xs text-neutral-600">Remote appointment</span>
                        </>
                      )}
                    </div>
                  </div>

                  {appointment.notes && (
                    <p className="text-xs text-neutral-700 mb-3">{appointment.notes}</p>
                  )}

                  <div className="flex gap-2">
                    {appointment.status === 'Scheduled' && (
                      <>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRescheduleAppointment(appointment.id);
                          }}
                          className="px-2 py-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 rounded transition-colors text-xs font-medium"
                        >
                          Reschedule
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCancelAppointment(appointment.id);
                          }}
                          className="px-2 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded transition-colors text-xs font-medium"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {appointment.status === 'Confirmed' && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCancelAppointment(appointment.id);
                        }}
                        className="px-2 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded transition-colors text-xs font-medium"
                      >
                        Cancel
                      </button>
                    )}
                    <button className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors text-xs font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* New Appointment Modal */}
      {showNewAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-4 max-w-sm w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-neutral-900">Schedule New Appointment</h3>
              <button
                onClick={() => setShowNewAppointment(false)}
                className="text-neutral-500 hover:text-neutral-700"
              >
                <IconX className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-neutral-600 mb-1">Appointment Type</label>
                <select className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                  <option>General Consultation</option>
                  <option>Follow-up</option>
                  <option>Emergency</option>
                  <option>Routine Check</option>
                </select>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-neutral-600 mb-1">Preferred Date</label>
                <input 
                  type="date" 
                  className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-neutral-600 mb-1">Preferred Time</label>
                <select className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                  <option>09:00 AM</option>
                  <option>10:00 AM</option>
                  <option>11:00 AM</option>
                  <option>02:00 PM</option>
                  <option>03:00 PM</option>
                  <option>04:00 PM</option>
                </select>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-neutral-600 mb-1">Appointment Method</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="method" value="in-person" className="text-blue-600" />
                    <IconMapPin className="w-3 h-3 text-blue-600" />
                    <span className="text-sm">In-Person</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="method" value="video" className="text-blue-600" />
                    <IconVideo className="w-3 h-3 text-blue-600" />
                    <span className="text-sm">Video Call</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="method" value="phone" className="text-blue-600" />
                    <IconPhone className="w-3 h-3 text-blue-600" />
                    <span className="text-sm">Phone Call</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-neutral-600 mb-1">Notes (Optional)</label>
                <textarea 
                  rows={3}
                  className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="Any specific concerns or questions..."
                />
              </div>
            </div>
            
            <div className="flex gap-2 mt-4">
              <button 
                onClick={() => setShowNewAppointment(false)}
                className="flex-1 px-3 py-2 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 rounded-lg transition-colors text-sm"
              >
                Cancel
              </button>
              <button className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm">
                Schedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Appointment Detail Modal */}
      {showAppointmentModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-4 max-w-sm w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-neutral-900">Appointment Details</h3>
              <button
                onClick={() => setShowAppointmentModal(false)}
                className="text-neutral-500 hover:text-neutral-700"
              >
                <IconX className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-neutral-600">Doctor</label>
                <p className="text-xs text-neutral-900">{selectedAppointment.doctor.name}</p>
                <p className="text-xs text-neutral-600">{selectedAppointment.doctor.specialty}</p>
              </div>
              
              <div>
                <label className="text-xs font-medium text-neutral-600">Date & Time</label>
                <p className="text-xs text-neutral-900">{selectedAppointment.date} at {selectedAppointment.time}</p>
                <p className="text-xs text-neutral-600">Duration: {selectedAppointment.duration} minutes</p>
              </div>
              
              <div>
                <label className="text-xs font-medium text-neutral-600">Type</label>
                <div className="flex items-center gap-2">
                  {getTypeIcon(selectedAppointment.type)}
                  <span className="text-xs text-neutral-900">{selectedAppointment.type}</span>
                </div>
              </div>
              
              <div>
                <label className="text-xs font-medium text-neutral-600">Status</label>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedAppointment.status)}`}>
                  {selectedAppointment.status}
                </span>
              </div>
              
              {selectedAppointment.location && (
                <div>
                  <label className="text-xs font-medium text-neutral-600">Location</label>
                  <p className="text-xs text-neutral-900">{selectedAppointment.location}</p>
                </div>
              )}
              
              {selectedAppointment.notes && (
                <div>
                  <label className="text-xs font-medium text-neutral-600">Notes</label>
                  <p className="text-xs text-neutral-900">{selectedAppointment.notes}</p>
                </div>
              )}
              
              <div>
                <label className="text-xs font-medium text-neutral-600">Contact</label>
                <p className="text-xs text-neutral-900">{selectedAppointment.doctor.phone}</p>
              </div>
            </div>
            
            <div className="flex gap-2 mt-4">
              {selectedAppointment.status === 'Scheduled' && (
                <>
                  <button className="flex-1 px-3 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors text-xs">
                    Reschedule
                  </button>
                  <button className="flex-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-xs">
                    Cancel
                  </button>
                </>
              )}
              {selectedAppointment.status === 'Confirmed' && (
                <button className="flex-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-xs">
                  Cancel
                </button>
              )}
              <button className="flex-1 px-3 py-2 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 rounded-lg transition-colors text-xs">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Help Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <IconInfoCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-semibold text-blue-900 mb-1">Need to Change Your Appointment?</h3>
            <p className="text-blue-800 mb-3 text-xs">
              You can reschedule or cancel appointments up to 24 hours before the scheduled time. 
              For urgent changes, please contact your healthcare provider directly.
            </p>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-xs font-medium">
                View Cancellation Policy
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
