
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useAuth } from '../App';
import { AlertType } from '../types';

const AddAlertForm: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [alertType, setAlertType] = useState<AlertType | string>(AlertType.Current);
  const [alertTimeStr, setAlertTimeStr] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      setError("Debes iniciar sesión para agregar una alerta.");
      return;
    }
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    let iconName = null;
    if (alertType === AlertType.Current || alertType === 'Current') {
        iconName = 'WarningCircleIcon'; 
    } else if (alertType === AlertType.History || alertType === 'History') {
        iconName = 'CarIcon'; 
    }

    const { error: insertError } = await supabase
      .from('alerts')
      .insert({
        user_id: user.id,
        title,
        description,
        location,
        type: alertType, 
        alert_time_str: alertTimeStr,
        icon_name: iconName,
      });

    setLoading(false);
    if (insertError) {
      console.error("Error al insertar alerta:", insertError);
      const defaultMessage = "Ocurrió un error desconocido al agregar la alerta. Por favor, intente de nuevo.";
      setError(`Error al agregar alerta: ${insertError.message || defaultMessage}`);
    } else {
      setSuccessMessage("¡Alerta agregada exitosamente!");
      setTitle('');
      setDescription('');
      setLocation('');
      setAlertType(AlertType.Current);
      setAlertTimeStr('');
      setTimeout(() => {
        setSuccessMessage(null); 
        navigate('/');
      }, 1500);
    }
  };

  if (!user) {
    return (
        <div className="max-w-xl mx-auto p-6 text-center bg-white dark:bg-slate-800 shadow-lg rounded-lg my-8 border border-slate-300 dark:border-slate-700 transition-colors duration-300">
            <p className="text-xl text-teal-600 dark:text-teal-400">Por favor, inicia sesión para agregar una nueva alerta.</p>
            <button 
              onClick={() => navigate('/login')} 
              className="mt-4 px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 dark:from-teal-600 dark:to-teal-700 dark:hover:from-teal-700 dark:hover:to-teal-800 text-white rounded shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-800 focus:ring-teal-500 transition-all duration-150 transform hover:scale-105"
            >
                Ir a Iniciar Sesión
            </button>
        </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 sm:p-10 bg-white dark:bg-slate-800 shadow-lg rounded-lg my-8 border border-slate-300 dark:border-slate-700 transition-colors duration-300">
      <h1 className="text-3xl font-bold text-teal-600 dark:text-teal-400 mb-6">Agregar Nueva Alerta Comunitaria</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Título <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-700 transition-colors duration-150"
            placeholder="Ej: Fuga de gas en Calle Principal"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Descripción
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-700 transition-colors duration-150"
            placeholder="Detalles adicionales sobre la alerta..."
          />
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Ubicación
          </label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-700 transition-colors duration-150"
            placeholder="Ej: Barrio Norte, Av. Central #123"
          />
        </div>
        <div>
          <label htmlFor="alertTimeStr" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Hora / Fecha del Evento (Ej: "10:30 AM Hoy", "Ayer 3 PM")
          </label>
          <input
            id="alertTimeStr"
            type="text"
            value={alertTimeStr}
            onChange={(e) => setAlertTimeStr(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-700 transition-colors duration-150"
            placeholder="Fecha y hora del suceso"
          />
        </div>
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Tipo de Alerta <span className="text-red-500">*</span>
          </label>
          <select
            id="type"
            value={alertType}
            onChange={(e) => setAlertType(e.target.value as AlertType | string)}
            required
            className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors duration-150"
          >
            <option value={AlertType.Current}>Alerta Actual</option>
            <option value={AlertType.History}>Historial de Alertas</option>
          </select>
        </div>
        {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
        {successMessage && <p className="text-sm text-emerald-700 dark:text-emerald-400">{successMessage}</p>}
        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 dark:from-teal-600 dark:to-teal-700 dark:hover:from-teal-700 dark:hover:to-teal-800 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-800 focus:ring-teal-500 disabled:opacity-50 transition-all duration-150 transform hover:scale-105"
          >
            {loading ? 'Enviando...' : 'Agregar Alerta'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAlertForm;
