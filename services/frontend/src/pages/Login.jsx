import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      setError('');
      await login(data.email, data.password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="glass-card p-10 w-full max-w-md flex flex-col gap-6 relative overflow-hidden">
        <div className="absolute top-[-50px] right-[-50px] w-[150px] h-[150px] bg-midnight-purple/20 blur-[60px] rounded-full pointer-events-none" />
        
        <div className="text-center z-10">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Welcome Back</h2>
          <p className="text-gray-400 text-sm mt-2">Log in to your Midnight Room account</p>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg text-sm text-center z-10">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 z-10">
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1 mb-1 block">Email</label>
            <input 
              {...register('email')} 
              className="input-field" 
              placeholder="name@example.com"
            />
            {errors.email && <p className="text-xs text-red-400 mt-1 ml-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1 mb-1 block">Password</label>
            <input 
              type="password"
              {...register('password')} 
              className="input-field" 
              placeholder="••••••••"
            />
            {errors.password && <p className="text-xs text-red-400 mt-1 ml-1">{errors.password.message}</p>}
          </div>

          <button type="submit" disabled={isSubmitting} className="btn-primary mt-4 py-4 opacity-90 hover:opacity-100">
            {isSubmitting ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
        
        <p className="text-center text-sm text-gray-400 z-10">
          Don't have an account? <Link to="/register" className="text-midnight-neon hover:text-white transition-colors border-b border-transparent hover:border-midnight-neon">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
