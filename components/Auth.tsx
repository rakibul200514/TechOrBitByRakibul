
import React, { useState } from 'react';
import { Lock, Mail, User as UserIcon, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { Card, CardBody } from './ui/Card.tsx';
import { Button } from './ui/Button.tsx';
import { User, Page } from '../types.ts';

interface AuthProps {
  type: 'login' | 'register';
  onAuth: (user: User) => void;
  setCurrentPage: (page: Page) => void;
}

export const Auth: React.FC<AuthProps> = ({ type, onAuth, setCurrentPage }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name || 'User',
      email: formData.email,
      role: formData.email === 'techorbitbyrakibul@gmail.com' ? 'ADMIN' : 'STUDENT'
    };
    onAuth(user);
    setCurrentPage('home');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md shadow-2xl border-none">
        <CardBody className="p-8">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 font-bold text-2xl">TO</div>
            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
              {type === 'login' ? 'Welcome Back!' : 'Create Account'}
            </h2>
            <p className="text-gray-500 mt-2">
              {type === 'login' ? 'Login to access your learning dashboard' : 'Join TechOrBit and start learning today'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {type === 'register' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    required
                    type="text" 
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  required
                  type="email" 
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                />
              </div>
              {type === 'login' && <p className="text-[10px] text-gray-400 mt-1 italic">Use techorbitbyrakibul@gmail.com for admin access</p>}
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Password</label>
                {type === 'login' && <a href="#" className="text-xs text-blue-600 hover:underline">Forgot?</a>}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  required
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={e => setFormData({...formData, password: e.target.value})}
                  className="w-full pl-10 pr-12 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button type="submit" fullWidth size="lg" className="gap-2">
              {type === 'login' ? 'Sign In' : 'Sign Up'} <ArrowRight size={20} />
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-500">
            {type === 'login' ? (
              <p>Don't have an account? <button onClick={() => setCurrentPage('register')} className="text-blue-600 font-bold hover:underline">Register now</button></p>
            ) : (
              <p>Already have an account? <button onClick={() => setCurrentPage('login')} className="text-blue-600 font-bold hover:underline">Sign in</button></p>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
