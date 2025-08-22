'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await login(email, password);
      if (result.success) {
        router.push('/dashboard');
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--secondary)] to-[var(--background)] flex items-center justify-center p-4 pt-24">
      <div className="w-full max-w-sm">
        {/* Logo and Header */}
        <div className="text-center mb-5">
          <div className="w-10 h-10 bg-[var(--primary)] rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-white text-lg">🫁</span>
          </div>
          <h1 className="text-xl font-bold text-[var(--foreground)] mb-1">Welcome Back</h1>
          <p className="text-xs text-[var(--foreground)] opacity-70">Sign in to your account</p>
        </div>

        {/* Login Form */}
        <div className="bg-[var(--card)] rounded-xl p-5 shadow-xl border border-[var(--muted)]">
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Email Field */}
            <div className="space-y-1">
              <label htmlFor="email" className="text-xs font-semibold text-[var(--foreground)] uppercase tracking-wide">
                Email
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-lg border border-[var(--muted)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] placeholder-[var(--foreground)]/50 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] transition-all duration-200"
                  placeholder="Enter your email"
                  disabled={isLoading}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <span className="text-[var(--foreground)]/40 text-sm">📧</span>
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label htmlFor="password" className="text-xs font-semibold text-[var(--foreground)] uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-lg border border-[var(--muted)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] placeholder-[var(--foreground)]/50 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] transition-all duration-200 pr-10"
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[var(--foreground)]/40 hover:text-[var(--foreground)] transition-colors"
                >
                  {showPassword ? '👁️' : '🙈'}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-2 text-red-600 text-xs">
                ⚠️ {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[var(--primary)] hover:bg-[var(--primary-light)] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 text-sm"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center mt-3 pt-3 border-t border-[var(--muted)]">
            <p className="text-xs text-[var(--foreground)]/70">
              Don&apos;t have an account?{' '}
              <Link 
                href="/signup" 
                className="text-[var(--primary)] hover:text-[var(--primary-light)] font-semibold hover:underline transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-3">
          <p className="text-xs text-[var(--foreground)]/50">
            By signing in, you agree to our{' '}
            <Link href="/terms" className="hover:text-[var(--primary)] transition-colors">
              Terms
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="hover:text-[var(--primary)] transition-colors">
              Privacy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}



