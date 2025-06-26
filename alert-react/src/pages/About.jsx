import React from 'react';

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4">
      <h1 className="text-5xl font-bold mb-4 animate-fade-in-down">Sobre Nosotros</h1>
      <p className="text-xl text-center mb-8 animate-fade-in-up">
        AlertaAhora es una aplicación diseñada para simplificar la gestión de tus alertas y notificaciones.
      </p>
      <div className="max-w-2xl text-center">
        <p className="text-lg mb-4">
          Nuestra misión es proporcionarte una herramienta intuitiva y potente que te ayude a mantenerte organizado y al tanto de lo que realmente importa.
        </p>
        <p className="text-lg mb-4">
          Creemos que la gestión de alertas no tiene por qué ser complicada. Por eso, hemos desarrollado una plataforma que combina facilidad de uso con funcionalidades avanzadas.
        </p>
        <p className="text-lg">
          Desde alertas personalizadas hasta un panel de control centralizado, AlertaAhora está aquí para hacer tu vida más fácil.
        </p>
      </div>
      <div className="mt-12">
        <h2 className="text-3xl font-semibold mb-4">Nuestro Equipo</h2>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="flex flex-col items-center">
            <img src="https://via.placeholder.com/150" alt="Team Member 1" className="rounded-full w-32 h-32 object-cover mb-2 shadow-lg" />
            <p className="text-xl font-medium">Juan Pérez</p>
            <p className="text-gray-600 dark:text-gray-400">CEO & Fundador</p>
          </div>
          <div className="flex flex-col items-center">
            <img src="https://via.placeholder.com/150" alt="Team Member 2" className="rounded-full w-32 h-32 object-cover mb-2 shadow-lg" />
            <p className="text-xl font-medium">María García</p>
            <p className="text-gray-600 dark:text-gray-400">Jefa de Desarrollo</p>
          </div>
          <div className="flex flex-col items-center">
            <img src="https://via.placeholder.com/150" alt="Team Member 3" className="rounded-full w-32 h-32 object-cover mb-2 shadow-lg" />
            <p className="text-xl font-medium">Carlos Ruiz</p>
            <p className="text-gray-600 dark:text-gray-400">Diseñador Principal</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;