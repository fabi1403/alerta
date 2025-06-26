

import React, { useState, createContext, useContext, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import { User, AuthContextType, NavLinkItem } from './types';
import { AppLogoIcon, BellIcon, NAV_LINKS, USER_AVATAR_URL, SunIcon, MoonIcon, FacebookIcon } from './constants';
import AuthForm from './components/AuthForm';
import HomePageContent from './components/HomePageContent';
import AddAlertForm from './components/AddAlertForm';
import { supabase } from './supabaseClient';
import { Session, AuthError } from '@supabase/supabase-js';
import { ThemeProvider, useTheme } from './ThemeContext'; // Import ThemeProvider and useTheme


// Auth Context
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [sessionLoading, setSessionLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sessionRefreshed, setSessionRefreshed] = useState<boolean>(false);


  useEffect(() => {
    setSessionLoading(true);
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user as User ?? null);
      setSessionLoading(false);
      setSessionRefreshed(true);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user as User ?? null);
      setSessionLoading(false); 
      setSessionRefreshed(true);
    });
    
    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, pass: string): Promise<{ error: AuthError | null }> => {
    setLoading(true);
    setError(null);
    const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password: pass });
    if (authError) {
      setError(authError.message);
    } else if (data.user) {
      setUser(data.user as User);
    }
    setLoading(false);
    return { error: authError };
  };

  const register = async (email: string, pass: string, name?: string): Promise<{ error: AuthError | null }> => {
    setLoading(true);
    setError(null);
    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password: pass,
      options: {
        data: {
          full_name: name, 
          avatar_url: USER_AVATAR_URL,
        }
      }
    });
    if (authError) {
      setError(authError.message);
    } else if (data.user) {
      if (data.session) { 
        setUser(data.user as User);
      } else {
        alert("¡Registro exitoso! Por favor, revisa tu correo electrónico para confirmar tu cuenta si es necesario.");
      }
    }
    setLoading(false);
    return { error: authError };
  };

  const logout = async (): Promise<{ error: AuthError | null }> => {
    setLoading(true);
    setError(null);
    const { error: authError } = await supabase.auth.signOut();
    if (authError) setError(authError.message);
    else setUser(null);
    setLoading(false);
    return { error: authError };
  };

  const signInWithProvider = async (provider: 'google' | 'apple' | 'facebook' | 'azure') => {
    setLoading(true);
    setError(null);
    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.origin + window.location.pathname, 
      },
    });
    if (authError) {
      setError(authError.message);
    }
    setLoading(false);
  };


  return (
    <AuthContext.Provider value={{ user, login, register, logout, signInWithProvider, loading: loading || sessionLoading, error, sessionRefreshed }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

// Header Component
interface HeaderProps {
  user: User | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const userName = user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email;
  const avatarUrl = user?.user_metadata?.avatar_url || USER_AVATAR_URL;

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-300 dark:border-slate-700 px-4 sm:px-10 py-3 bg-white dark:bg-slate-800 shadow-sm transition-colors duration-300">
      <Link to="/" className="flex items-center gap-2 sm:gap-4 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-md">
        <AppLogoIcon className="size-7 sm:size-8 text-teal-600 dark:text-teal-400" />
        <h2 className="text-slate-800 dark:text-slate-200 text-md sm:text-lg font-bold leading-tight tracking-[-0.015em]">SafeAlert 🛑</h2>
      </Link>
      <div className="flex flex-1 justify-end items-center gap-2 sm:gap-3">
        <nav className="hidden sm:flex items-center gap-5">
          {NAV_LINKS.map((link: NavLinkItem) => (
            <Link 
              key={link.label} 
              to={link.href} 
              className="text-slate-700 dark:text-slate-300 text-sm font-medium leading-normal hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-150"
            >
              {link.label}
            </Link>
          ))}
        </nav>
         <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-150"
            title={theme === 'light' ? 'Activar modo oscuro' : 'Activar modo claro'}
          >
            {theme === 'light' ? <MoonIcon size="20px" /> : <SunIcon size="20px" />}
        </button>
        {user ? (
          <>
            <Link 
                to="/add-alert"
                className="flex items-center gap-1 sm:gap-2 cursor-pointer rounded-lg h-10 bg-teal-100 dark:bg-teal-700/30 text-teal-700 dark:text-teal-300 text-sm font-bold leading-normal tracking-[0.015em] px-2.5 hover:bg-teal-200 dark:hover:bg-teal-600/40 transition-all duration-150 transform hover:scale-105"
                title="Agregar Nueva Alerta"
            >
                <img src="/Image_fx (1).jpg" alt="Nueva Alerta" className="size-7 sm:size-8 rounded-full" />
                <span className="hidden sm:inline">Nueva Alerta</span>
            </Link>
            <button
              className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 w-10 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-bold leading-normal min-w-0 hover:bg-slate-200 dark:hover:bg-slate-600 transition-all duration-150 transform hover:scale-105"
              title="Notificaciones"
            >
              <BellIcon />
            </button>
            <div className="flex items-center gap-2">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border border-slate-300 dark:border-slate-600"
                style={{ backgroundImage: `url("${avatarUrl}")` }}
                title={userName}
              ></div>
               <button 
                onClick={async () => {
                    await onLogout();
                    navigate('/login');
                }}
                className="text-teal-600 dark:text-teal-400 text-sm font-medium leading-normal hover:underline transition-colors duration-150"
                title="Cerrar Sesión"
              >
                Salir
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-2 sm:gap-4">
            <Link to="/login" className="text-slate-700 dark:text-slate-300 text-sm font-bold leading-normal hover:text-teal-600 dark:hover:text-teal-400 px-2 py-1 sm:px-0 sm:py-0 transition-colors duration-150">Ingresar</Link>
            <Link 
                to="/register" 
                className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-gradient-to-r from-teal-500 to-teal-600 text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-3 sm:px-4 hover:from-teal-600 hover:to-teal-700 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-150"
            >
              Registrarse
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

// Protected Route Component
const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, loading, sessionRefreshed } = useAuth();

  if (!sessionRefreshed || loading) {
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-sky-100 dark:bg-slate-900 transition-colors duration-300">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 dark:border-teal-400"></div>
          <p className="text-lg text-slate-700 dark:text-slate-300 ml-4 mt-3">Cargando aplicación...</p>
        </div>
      );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

// Pages
const AboutPage: React.FC = () => (
  <div className="max-w-4xl mx-auto p-6 sm:p-10 text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 shadow-lg rounded-lg my-8 border border-slate-300 dark:border-slate-700 transition-colors duration-300">
    <h1 className="text-3xl sm:text-4xl font-bold text-teal-600 dark:text-teal-400 mb-6">Sobre SafeAlert</h1>
    <div className="space-y-6 text-base sm:text-lg leading-relaxed">
      <section>
        <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-300 mb-2">Nuestra Misión</h2>
        <p>
          En SafeAlert, nuestra misión es empoderar a los residentes con información precisa, oportuna y accionable durante eventos críticos. Creemos que una comunidad informada es una comunidad resiliente, capaz de navegar los desafíos con mayor seguridad y preparación.
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-300 mb-2">Cómo Funciona</h2>
        <p>
          Nuestra plataforma agrega alertas de una variedad de fuentes confiables, incluyendo servicios oficiales de emergencia de la ciudad y el condado, oficinas meteorológicas nacionales e informes locales verificados. Esta información se procesa rápidamente y se difunde a través de nuestra aplicación web fácil de usar, asegurando que reciba actualizaciones críticas cuando más las necesite. Nos enfocamos en la claridad y accesibilidad, para que pueda comprender rápidamente la situación y tomar las medidas adecuadas.
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-300 mb-2">Nuestro Compromiso</h2>
        <p>
          Estamos comprometidos a entregar alertas con la máxima velocidad y precisión. Nuestro equipo trabaja continuamente para mejorar nuestros sistemas y verificar la información para mantener su confianza. Si bien nos esforzamos por una precisión y puntualidad del 100%, siempre recomendamos verificar la información con los canales gubernamentales oficiales durante emergencias graves. Su seguridad es nuestra principal prioridad.
        </p>
      </section>
    </div>
  </div>
);

const ContactPage: React.FC = () => (
 <div className="max-w-4xl mx-auto p-6 sm:p-10 text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 shadow-lg rounded-lg my-8 border border-slate-300 dark:border-slate-700 transition-colors duration-300">
    <h1 className="text-3xl sm:text-4xl font-bold text-teal-600 dark:text-teal-400 mb-6">Contáctanos</h1>
    <div className="space-y-8 text-base sm:text-lg leading-relaxed">
      <section>
        <p className="mb-4">
          ¿Tiene alguna pregunta, sugerencia o necesita reportar un problema? Estamos aquí para ayudar. No dude en comunicarse con nosotros utilizando uno de los métodos a continuación. Valoramos sus comentarios y siempre estamos buscando formas de mejorar nuestro servicio.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">Consultas Generales y Soporte</h2>
            <p><strong>Correo Electrónico:</strong> <a href="mailto:soporte@safealert.ejemplo.com" className="text-teal-600 dark:text-teal-400 hover:underline">soporte@safealert.ejemplo.com</a></p>
            <p><strong>Teléfono:</strong> <a href="tel:+15550102537" className="text-teal-600 dark:text-teal-400 hover:underline">(555) 010-SAFE (7233)</a></p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">(Lun-Vie, 9 AM - 5 PM Hora Local)</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">Dirección Postal</h2>
            <p>Sede de SafeAlert</p>
            <p>Avenida Alerta 123, Oficina 100</p>
            <p>Ciudad Comunidad, ST 54321</p>
            <p>Estados Unidos</p>
          </div>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-300 mb-3">Síguenos</h2>
        <p className="mb-4">Mantente conectado y obtén las últimas actualizaciones siguiéndonos en las redes sociales:</p>
        <div className="flex space-x-4">
          <a href="#" target="_blank" rel="noopener noreferrer" className="text-slate-500 dark:text-slate-400 hover:text-[#1877F2] dark:hover:text-[#4a9eff] transition-colors duration-150" title="Facebook">
            <FacebookIcon size="32px" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="text-slate-500 dark:text-slate-400 hover:text-[#1DA1F2] dark:hover:text-[#4ab3f2] transition-colors duration-150" title="Twitter / X">
            <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
            </svg>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="text-slate-500 dark:text-slate-400 hover:text-[#C13584] dark:hover:text-[#da539e] transition-colors duration-150" title="Instagram">
            <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 16c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6zm0-10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm6.5-3c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5z" clipRule="evenodd"/>
            </svg>
          </a>
        </div>
      </section>
    </div>
  </div>
);

const MainAppStructure: React.FC = () => {
  const { user, logout, sessionRefreshed, loading: authLoading } = useAuth();

  if (!sessionRefreshed && authLoading) { 
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-sky-100 dark:bg-slate-900 transition-colors duration-300">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-teal-600 dark:border-teal-400"></div>
        <p className="text-xl text-slate-700 dark:text-slate-300 mt-4">Iniciando SafeAlert...</p>
      </div>
    );
  }

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-sky-100 dark:bg-slate-900 group/design-root overflow-x-hidden transition-colors duration-300" style={{fontFamily: 'Lexend, "Noto Sans", sans-serif'}}>
      <Header user={user} onLogout={logout} />
      <div className="layout-container flex flex-col grow"> 
        <Routes>
          <Route path="/login" element={user ? <Navigate to="/" /> : <AuthForm />} />
          <Route path="/register" element={user ? <Navigate to="/" /> : <AuthForm isRegister />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route 
            path="/add-alert"
            element={
              <ProtectedRoute>
                <AddAlertForm />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <HomePageContent />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
       <footer className="w-full py-6 px-10 text-center border-t border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 mt-auto transition-colors duration-300">
        <p className="text-sm text-teal-600 dark:text-teal-400">
          &copy; 2025 FBN. Derechos Reservados.
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            <Link to="/about" className="hover:underline">Nosotros</Link> | <Link to="/contact" className="hover:underline">Contacto</Link>
        </p>
      </footer>
    </div>
  );
}

const App: React.FC = () => {
  return (
    <ThemeProvider> {/* Envuelve la aplicación con ThemeProvider */}
      <AuthProvider>
        <HashRouter>
          <MainAppStructure />
        </HashRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;