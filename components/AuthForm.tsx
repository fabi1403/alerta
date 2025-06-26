
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import { GoogleIcon, AppleIcon, MicrosoftIcon, FacebookIcon } from '../constants';

interface AuthFormProps {
  isRegister?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ isRegister = false }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // Only for registration
  const { login, register, signInWithProvider, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let authError = null;
    if (isRegister) {
      const { error: regError } = await register(email, password, name);
      authError = regError;
    } else {
      const { error: loginError } = await login(email, password);
      authError = loginError;
    }

    if (!authError) {
      navigate('/');
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'apple' | 'facebook' | 'azure') => {
    if (provider === 'azure') {
        console.warn("El inicio de sesión con Microsoft (Azure) requiere configuración adicional en Supabase y Azure AD.");
        alert("El inicio de sesión con Microsoft no está completamente configurado para esta demostración.");
        return;
    }
    await signInWithProvider(provider);
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-sky-100 dark:bg-slate-900 p-4 transition-colors duration-300">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-slate-800 shadow-xl rounded-lg border border-slate-300 dark:border-slate-700 transition-colors duration-300">
        <h2 className="text-3xl font-bold text-center text-slate-800 dark:text-slate-200">
          {isRegister ? 'Crear Cuenta' : 'Bienvenido de Nuevo'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {isRegister && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Nombre Completo
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required={isRegister}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-700 transition-colors duration-150"
                placeholder="Tu Nombre"
              />
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Correo Electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-700 transition-colors duration-150"
              placeholder="tu@ejemplo.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete={isRegister ? "new-password" : "current-password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-700 transition-colors duration-150"
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 dark:from-teal-600 dark:to-teal-700 dark:hover:from-teal-700 dark:hover:to-teal-800 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-800 focus:ring-teal-500 disabled:opacity-50 transition-all duration-150 transform hover:scale-105"
            >
              {loading ? 'Procesando...' : (isRegister ? 'Registrarse' : 'Iniciar Sesión')}
            </button>
          </div>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-slate-300 dark:border-slate-600" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400">O {isRegister ? 'regístrate' : 'inicia sesión'} con</span>
          </div>
        </div>

        <div className="space-y-3">
           <button
            type="button"
            onClick={() => handleSocialLogin('google')}
            className="w-full flex items-center justify-center py-2 px-4 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-800 focus:ring-teal-500 transition-all duration-150 transform hover:scale-105"
          >
            <GoogleIcon className="mr-2" />
            Continuar con Google
          </button>
           <button
            type="button"
            onClick={() => handleSocialLogin('apple')}
            className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-800 focus:ring-gray-500 transition-all duration-150 transform hover:scale-105"
          >
            <AppleIcon className="mr-2" color="white"/>
            Continuar con Apple
          </button>
          <button 
            type="button"
            onClick={() => handleSocialLogin('azure')}
            className="w-full flex items-center justify-center py-2 px-4 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-800 focus:ring-teal-500 transition-all duration-150 transform hover:scale-105"
          >
            <MicrosoftIcon className="mr-2" />
            Continuar con Microsoft
          </button>
          <button
            type="button"
            onClick={() => handleSocialLogin('facebook')}
            className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1877F2] hover:bg-[#166FE5] focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-800 focus:ring-[#1877F2] transition-all duration-150 transform hover:scale-105"
          >
            <FacebookIcon className="mr-2" color="white"/>
            Continuar con Facebook
          </button>
        </div>

        <p className="text-sm text-center text-slate-700 dark:text-slate-300 pt-4">
          {isRegister ? '¿Ya tienes una cuenta? ' : "¿No tienes una cuenta? "}
          <button
            onClick={() => navigate(isRegister ? '/login' : '/register')}
            className="font-medium text-teal-600 dark:text-teal-400 hover:text-teal-500 dark:hover:text-teal-300 transition-colors duration-150"
          >
            {isRegister ? 'Iniciar Sesión' : 'Regístrate'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
