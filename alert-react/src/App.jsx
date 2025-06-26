import React, { useState, useEffect } from 'react';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider, useTheme } from './components/ThemeContext.jsx';
import AuthSection from './components/AuthSection.jsx';
import DashboardSection from './components/DashboardSection.jsx';
import LoadingOverlay from './components/LoadingOverlay.jsx';
import { useConfirm, CustomConfirmModal } from './components/CustomConfirmModal.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { confirm, ConfirmModal } = useConfirm();

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsAuthenticated(true);
      setIsLoading(false);
    }, 1500);
  };

  const handleLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsAuthenticated(false);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <ThemeProvider>
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
        <LoadingOverlay isLoading={isLoading} />
        <ConfirmModal />
        <Router>
          <header className="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center">
            <div className="flex items-center">
              <img src="/vite.svg" alt="Logo" className="h-8 w-8 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AlertaAhora</h1>
            </div>
            <nav>
              <ul className="flex space-x-4">
                <li><Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Inicio</Link></li>
                <li><Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Nosotros</Link></li>
                <li><Link to="/contact" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Contacto</Link></li>
                {isAuthenticated ? (
                  <li><Link to="/dashboard" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Dashboard</Link></li>
                ) : (
                  <li><Link to="/auth" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Login</Link></li>
                )}
              </ul>
            </nav>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </header>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/auth" element={<AuthSection onLogin={handleLogin} />} />
            <Route path="/dashboard" element={isAuthenticated ? (
              <DashboardSection onLogout={handleLogout} confirm={confirm} />
            ) : (
              <AuthSection onLogin={handleLogin} />
            )} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
};

export default App;
