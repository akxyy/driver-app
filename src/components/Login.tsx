import React, { useState } from 'react';
import { User, LogIn, Eye, EyeOff, Truck } from 'lucide-react';

interface LoginProps {
  onLogin: (username: string, password: string) => void;
  error?: string;
}

export default function Login({ onLogin, error }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate loading delay
    setTimeout(() => {
      onLogin(username, password);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-800 flex flex-col">
      {/* Status Bar Spacer */}
      <div className="h-12 bg-blue-600"></div>
      
      <div className="flex-1 flex flex-col justify-center px-6 pb-8">
        {/* Logo Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-6 shadow-lg">
            <Truck className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">DeliveryPro</h1>
          <p className="text-blue-100 text-lg">Driver App</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mx-2">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to start delivering</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-3">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-3">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-4 pr-14 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                >
                  {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4">
                <p className="text-red-600 text-sm font-medium">{error}</p>
              </div>
            )}

            <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4">
              <p className="text-blue-800 text-sm font-semibold mb-2">Demo Credentials:</p>
              <p className="text-blue-700 text-sm">Username: <span className="font-mono">driverdemo</span></p>
              <p className="text-blue-700 text-sm">Password: <span className="font-mono">123456</span></p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-4 px-6 rounded-2xl transition-all text-lg shadow-lg active:scale-95 flex items-center justify-center space-x-3"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn size={24} />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}