import React, { useState } from 'react';

interface AuthSectionProps {
  onAuthSuccess: (userId: string) => void;
}

const AuthSection: React.FC<AuthSectionProps> = ({ onAuthSuccess }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<{ type: string; text: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    // Simulate authentication/registration
    console.log(`${isRegistering ? 'Registering' : 'Logging in'} with:`, { email, password });

    // Simulate success after a short delay
    setTimeout(() => {
      const simulatedUserId = `user_${Math.random().toString(36).substr(2, 9)}`;
      setMessage({ type: 'success', text: `¡${isRegistering ? 'Registro' : 'Inicio de sesión'} exitoso! Bienvenido.` });
      onAuthSuccess(simulatedUserId);
    }, 1500);
  };

  const handleSocialSignIn = (provider: string) => {
    setMessage(null);
    console.log(`Signing in with ${provider}`);
    // Simulate success
    setTimeout(() => {
      const simulatedUserId = `user_${Math.random().toString(36).substr(2, 9)}`;
      setMessage({ type: 'success', text: `¡Inicio de sesión con ${provider} exitoso! Bienvenido.` });
      onAuthSuccess(simulatedUserId);
    }, 1500);
  };

  return (
    <div id="authSection" className="p-8 rounded-xl shadow-lg w-full max-w-md transition-all duration-500 ease-in-out">
      <h2 className="text-3xl font-bold mb-6 text-center gradient-text" id="authTitle">
        {isRegistering ? 'Registrarse 📝' : 'Iniciar Sesión 🔒'}
      </h2>
      <form id="authForm" className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
          <input
            type="password"
            id="password"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="w-full text-white font-semibold py-3 px-4 rounded-lg btn-gradient">
          {isRegistering ? 'Registrarse' : 'Iniciar Sesión'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">O {isRegistering ? 'regístrate' : 'inicia sesión'} con: 👇</p>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <button
            id="googleSignIn"
            className="flex items-center justify-center w-12 h-12 text-white rounded-full shadow-md transition duration-200 ease-in-out transform hover:scale-110 btn-social-google"
            title="Iniciar Sesión con Google"
            onClick={() => handleSocialSignIn('Google')}
          >
            <i className="fab fa-google text-xl"></i>
          </button>
          <button
            id="facebookSignIn"
            className="flex items-center justify-center w-12 h-12 text-white rounded-full shadow-md transition duration-200 ease-in-out transform hover:scale-110 btn-social-facebook"
            title="Iniciar Sesión con Facebook"
            onClick={() => handleSocialSignIn('Facebook')}
          >
            <i className="fab fa-facebook-f text-xl"></i>
          </button>
          <button
            id="microsoftSignIn"
            className="flex items-center justify-center w-12 h-12 text-white rounded-full shadow-md transition duration-200 ease-in-out transform hover:scale-110 btn-social-microsoft"
            title="Iniciar Sesión con Microsoft"
            onClick={() => handleSocialSignIn('Microsoft')}
          >
            <i className="fab fa-microsoft text-xl"></i>
          </button>
          <button
            id="anonymousSignIn"
            className="flex items-center justify-center w-auto px-4 py-2 text-white rounded-full shadow-md transition duration-200 ease-in-out transform hover:scale-105 btn-anonymous text-sm"
            title="Ingresar como Anónimo"
            onClick={() => handleSocialSignIn('Anonymous')}
          >
            <i className="fas fa-user-secret mr-2"></i> Anónimo
          </button>
        </div>
      </div>

      <div className="mt-6 text-center">
        <button
          id="toggleAuth"
          className="text-sky-600 hover:text-sky-800 text-sm font-medium"
          onClick={() => setIsRegistering((prev) => !prev)}
        >
          {isRegistering ? '¿Ya tienes cuenta? Inicia Sesión' : '¿No tienes cuenta? Regístrate'}
        </button>
      </div>

      {message && (
        <div
          id="authMessageBox"
          className={`mt-4 p-3 rounded-md text-sm text-center ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
};

export default AuthSection;