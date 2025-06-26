import React from 'react';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4">
      <h1 className="text-5xl font-bold mb-4 animate-fade-in-down">¡Bienvenido a AlertaAhora!</h1>
      <p className="text-xl text-center mb-8 animate-fade-in-up">
        Tu plataforma para gestionar alertas de forma eficiente y sencilla.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105 animate-slide-in-left">
          <h2 className="text-2xl font-semibold mb-3">Alertas Personalizadas</h2>
          <p>Crea alertas adaptadas a tus necesidades, con opciones de notificación y priorización.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105 animate-fade-in">
          <h2 className="text-2xl font-semibold mb-3">Panel de Control Intuitivo</h2>
          <p>Visualiza y gestiona todas tus alertas desde un panel fácil de usar.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105 animate-slide-in-right">
          <h2 className="text-2xl font-semibold mb-3">Integración Sencilla</h2>
          <p>Conecta AlertaAhora con tus herramientas favoritas para una experiencia fluida.</p>
        </div>
      </div>
      <div className="mt-12 text-center">
        <p className="text-lg mb-4">¿Listo para empezar?</p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-110 shadow-lg">
          Registrarse Ahora
        </button>
      </div>
    </div>
  );
};

export default Home;