import React from 'react';

const Contact = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4">
      <h1 className="text-5xl font-bold mb-4 animate-fade-in-down">Contáctanos</h1>
      <p className="text-xl text-center mb-8 animate-fade-in-up">
        ¿Tienes alguna pregunta o sugerencia? ¡Nos encantaría escucharte!
      </p>
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-lg font-medium text-gray-700 dark:text-gray-300">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder="Tu nombre"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-700 dark:text-gray-300">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder="tu.correo@ejemplo.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-lg font-medium text-gray-700 dark:text-gray-300">Mensaje</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder="Escribe tu mensaje aquí..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 transform hover:scale-105 shadow-lg"
          >
            Enviar Mensaje
          </button>
        </form>
      </div>
      <div className="mt-8 text-center">
        <p className="text-lg">También puedes encontrarnos en:</p>
        <div className="flex justify-center space-x-6 mt-4">
          <a href="#" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600 transition duration-300">
            <i className="fab fa-twitter fa-2x"></i>
          </a>
          <a href="#" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600 transition duration-300">
            <i className="fab fa-facebook fa-2x"></i>
          </a>
          <a href="#" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600 transition duration-300">
            <i className="fab fa-instagram fa-2x"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;