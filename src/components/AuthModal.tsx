import React, { useState } from 'react';
import { X, User, Mail, Lock, LogIn, UserPlus, AlertCircle } from 'lucide-react';
import { User as UserType } from '../types';
import { supabase } from '../lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: UserType) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (supabase) {
        if (mode === 'register') {
          const { data, error: signUpError } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
              data: {
                full_name: formData.name || formData.email.split('@')[0],
                role: formData.email.toLowerCase() === 'legaintcorporation@gmail.com' ? 'admin' : 'user'
              }
            }
          });

          if (signUpError) throw signUpError;

          const authUser = data.user;
          const userObj: UserType = {
            id: authUser?.id || `user-${Date.now()}`,
            name: formData.name || authUser?.user_metadata?.full_name || 'Cliente Viccell',
            email: formData.email,
            role: formData.email.toLowerCase() === 'legaintcorporation@gmail.com' ? 'admin' : 'user',
          };
          onLogin(userObj);
          onClose();
        } else {
          const { data, error: signInError } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
          });

          if (signInError) throw signInError;

          const authUser = data.user;
          const isAdmin = formData.email.toLowerCase() === 'legaintcorporation@gmail.com' || authUser?.user_metadata?.role === 'admin';
          const userObj: UserType = {
            id: authUser?.id || 'user-std',
            name: authUser?.user_metadata?.full_name || formData.email.split('@')[0] || 'Cliente',
            email: formData.email,
            role: isAdmin ? 'admin' : 'user',
          };
          onLogin(userObj);
          onClose();
        }
      } else {
        // Fallback simulation if Supabase is not configured yet
        const isAdmin = formData.email.toLowerCase() === 'legaintcorporation@gmail.com';
        const user: UserType = {
          id: mode === 'login' ? 'user-std' : `user-${Date.now()}`,
          name: mode === 'register' ? formData.name || 'Cliente Viccell' : (formData.email.split('@')[0] || 'Cliente'),
          email: formData.email,
          role: isAdmin ? 'admin' : 'user',
        };

        onLogin(user);
        onClose();
      }
    } catch (err: any) {
      setError(err.message || 'Error en la autenticación');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-fadeIn font-sans"
      onClick={onClose}
    >
      {/* Sleek Dark Glass Modal Container */}
      <div 
        className="relative w-full max-w-md bg-slate-900/90 text-white border border-slate-700/60 rounded-3xl shadow-2xl p-6 sm:p-8 backdrop-blur-2xl transition-all space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#20d8e2]/20 border border-[#20d8e2]/30 text-[#20d8e2] flex items-center justify-center mx-auto shadow-inner">
            {mode === 'login' ? <LogIn className="w-6 h-6" /> : <UserPlus className="w-6 h-6" />}
          </div>
          <h2 className="text-2xl font-black text-white">
            {mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </h2>
        </div>

        {/* Mode Selector */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-800/80 rounded-2xl border border-slate-700 text-xs font-bold">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`py-2.5 rounded-xl transition-all cursor-pointer ${
              mode === 'login' ? 'bg-[#20d8e2] text-slate-950 font-black shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Ingresar
          </button>
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`py-2.5 rounded-xl transition-all cursor-pointer ${
              mode === 'register' ? 'bg-[#20d8e2] text-slate-950 font-black shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Registrarse
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {mode === 'register' && (
            <div className="space-y-1">
              <label className="text-slate-300 font-bold block">Nombre Completo</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Carlos Mendoza"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 font-light focus:outline-none focus:border-[#20d8e2]"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-slate-300 font-bold block">Correo Electrónico</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="usuario@ejemplo.com"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 font-light focus:outline-none focus:border-[#20d8e2]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-slate-300 font-bold block">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 font-light focus:outline-none focus:border-[#20d8e2]"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span className="text-xs">{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-[#20d8e2] hover:bg-[#1bc6cf] text-slate-950 font-black text-sm shadow-lg hover:shadow-[#20d8e2]/30 transition-all cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Procesando...' : mode === 'login' ? 'Entrar a mi Cuenta' : 'Registrarme'}
          </button>
        </form>

      </div>
    </div>
  );
};
