'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'patient',
    dateOfBirth: '',
    phoneNumber: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const { signup } = useAuth();
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all required fields');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setError('');
    setIsLoading(true);

    try {
      const signupData = {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        role: formData.role as 'patient' | 'admin',
        dateOfBirth: formData.dateOfBirth ? new Date(formData.dateOfBirth) : undefined,
        phoneNumber: formData.phoneNumber || undefined,
        address: formData.street ? {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country
        } : undefined
      };

      const result = await signup(signupData);
      if (result.success) {
        router.push('/dashboard');
      } else {
        setError(result.message);
      }
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--secondary)] to-[var(--background)] flex items-center justify-center px-4 py-6 pt-24">
      <div className="w-full max-w-6xl">
        {/* Logo and Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-[var(--primary)] rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-white text-lg">🫁</span>
          </div>
          <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">Join BreatheSense</h1>
          <p className="text-[var(--foreground)] opacity-70 text-sm">Create your account to get started</p>
        </div>

        {/* Signup Form */}
        <div className="bg-[var(--card)] rounded-2xl p-6 shadow-xl border border-[var(--muted)]">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Personal Information - Left Column */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-[var(--foreground)] border-b border-[var(--muted)] pb-2">Personal Information</h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label htmlFor="firstName" className="text-xs font-semibold text-[var(--foreground)]">
                      First Name *
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-lg border border-[var(--muted)] bg-[var(--background)] px-3 py-2 text-[var(--foreground)] placeholder-[var(--foreground)]/50 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 transition-all duration-200"
                      placeholder="First name"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="lastName" className="text-xs font-semibold text-[var(--foreground)]">
                      Last Name *
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-lg border border-[var(--muted)] bg-[var(--background)] px-3 py-2 text-[var(--foreground)] placeholder-[var(--foreground)]/50 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 transition-all duration-200"
                      placeholder="Last name"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="email" className="text-xs font-semibold text-[var(--foreground)]">
                    Email Address *
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-lg border border-[var(--muted)] bg-[var(--background)] px-3 py-2 text-[var(--foreground)] placeholder-[var(--foreground)]/50 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 transition-all duration-200"
                      placeholder="Enter your email"
                      disabled={isLoading}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <span className="text-[var(--foreground)]/50">📧</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="role" className="text-xs font-semibold text-[var(--foreground)]">
                    Account Type *
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-[var(--muted)] bg-[var(--background)] px-3 py-2 text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 transition-all duration-200"
                    disabled={isLoading}
                  >
                    <option value="patient">Patient</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label htmlFor="dateOfBirth" className="text-xs font-semibold text-[var(--foreground)]">
                      Date of Birth
                    </label>
                    <input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-[var(--muted)] bg-[var(--background)] px-3 py-2 text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 transition-all duration-200"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="phoneNumber" className="text-xs font-semibold text-[var(--foreground)]">
                      Phone Number
                    </label>
                    <input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-[var(--muted)] bg-[var(--background)] px-3 py-2 text-[var(--foreground)] placeholder-[var(--foreground)]/50 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 transition-all duration-200"
                      placeholder="+1 (555) 123-4567"
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>

              {/* Right Column - Security & Address */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-[var(--foreground)] border-b border-[var(--muted)] pb-2">Security & Address</h3>
                
                <div className="space-y-1">
                  <label htmlFor="password" className="text-xs font-semibold text-[var(--foreground)]">
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-lg border border-[var(--muted)] bg-[var(--background)] px-3 py-2 text-[var(--foreground)] placeholder-[var(--foreground)]/50 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 transition-all duration-200 pr-10"
                      placeholder="Create a password"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-[var(--foreground)]/50 hover:text-[var(--foreground)] transition-colors"
                    >
                      {showPassword ? '👁️' : '🙈'}
                    </button>
                  </div>
                  <p className="text-xs text-[var(--foreground)]/60">Must be at least 8 characters long</p>
                </div>

                <div className="space-y-1">
                  <label htmlFor="confirmPassword" className="text-xs font-semibold text-[var(--foreground)]">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-lg border border-[var(--muted)] bg-[var(--background)] px-3 py-2 text-[var(--foreground)] placeholder-[var(--foreground)]/50 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 transition-all duration-200 pr-10"
                      placeholder="Confirm your password"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-[var(--foreground)]/50 hover:text-[var(--foreground)] transition-colors"
                    >
                      {showConfirmPassword ? '👁️' : '🙈'}
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="street" className="text-xs font-semibold text-[var(--foreground)]">
                    Street Address
                  </label>
                  <input
                    id="street"
                    name="street"
                    type="text"
                    value={formData.street}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-[var(--muted)] bg-[var(--background)] px-3 py-2 text-[var(--foreground)] placeholder-[var(--foreground)]/50 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 transition-all duration-200"
                    placeholder="123 Main Street"
                    disabled={isLoading}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label htmlFor="city" className="text-xs font-semibold text-[var(--foreground)]">
                      City
                    </label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-[var(--muted)] bg-[var(--background)] px-3 py-2 text-[var(--foreground)] placeholder-[var(--foreground)]/50 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 transition-all duration-200"
                      placeholder="City"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="state" className="text-xs font-semibold text-[var(--foreground)]">
                      State
                    </label>
                    <input
                      id="state"
                      name="state"
                      type="text"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-[var(--muted)] bg-[var(--background)] px-3 py-2 text-[var(--foreground)] placeholder-[var(--foreground)]/50 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 transition-all duration-200"
                      placeholder="State"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label htmlFor="zipCode" className="text-xs font-semibold text-[var(--foreground)]">
                      ZIP Code
                    </label>
                    <input
                      id="zipCode"
                      name="zipCode"
                      type="text"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-[var(--muted)] bg-[var(--background)] px-3 py-2 text-[var(--foreground)] placeholder-[var(--foreground)]/50 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 transition-all duration-200"
                      placeholder="12345"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="country" className="text-xs font-semibold text-[var(--foreground)]">
                      Country
                    </label>
                    <input
                      id="country"
                      name="country"
                      type="text"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-[var(--muted)] bg-[var(--background)] px-3 py-2 text-[var(--foreground)] placeholder-[var(--foreground)]/50 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 transition-all duration-200"
                      placeholder="Country"
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-[var(--muted)]">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[var(--primary)] hover:bg-[var(--primary-light)] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating account...
                  </div>
                ) : (
                  'Create Account'
                )}
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-600 text-xs">
                ⚠️ {error}
              </div>
            )}

            {/* Sign In Link */}
            <div className="text-center pt-2">
              <p className="text-[var(--foreground)]/70 text-sm">
                Already have an account?{' '}
                <Link 
                  href="/login" 
                  className="text-[var(--primary)] hover:text-[var(--primary-light)] font-semibold hover:underline transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-4">
          <p className="text-xs text-[var(--foreground)]/50">
            By creating an account, you agree to our{' '}
            <Link href="/terms" className="hover:text-[var(--primary)] transition-colors">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="hover:text-[var(--primary)] transition-colors">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}



