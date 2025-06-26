
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useAuth } from '../App';
import { AlertType } from '../types';
import { MapPinIcon, CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';

const AddAlertForm: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [alertType, setAlertType] = useState<AlertType | string>(AlertType.Other);
  const [alertTimeStr, setAlertTimeStr] = useState('');
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Request location permission on component mount
  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Permission granted, no need to do anything specific here yet, just pre-emptively ask
          console.log("Geolocation permission granted.", position);
        },
        (error) => {
          console.warn("Geolocation permission denied or error:", error);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    }
  }, []);

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          setLocation(`Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}`);
          setError(null);
        },
        (error) => {
          console.error("Error getting location:", error);
          setError("No se pudo obtener la ubicación. Por favor, ingrésala manualmente.");
          setLatitude(null);
          setLongitude(null);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      setError("La geolocalización no es soportada por tu navegador.");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      setError("Debes iniciar sesión para agregar una alerta.");
      return;
    }
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    let iconName: string | null = null;
    switch (alertType) {
      case AlertType.Fire: iconName = 'FireIcon'; break;
      case AlertType.Flood: iconName = 'CloudRainIcon'; break;
      case AlertType.Medical: iconName = 'HeartIcon'; break;
      case AlertType.Crime: iconName = 'ExclamationTriangleIcon'; break;
      case AlertType.Traffic: iconName = 'CarIcon'; break;
      case AlertType.Weather: iconName = 'CloudIcon'; break;
      case AlertType.Current: iconName = 'WarningCircleIcon'; break;
      case AlertType.History: iconName = 'ArchiveBoxIcon'; break;
      default: iconName = 'InformationCircleIcon'; break;
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
        latitude,
        longitude,
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
      setAlertType(AlertType.Other);
      setAlertTimeStr('');
      setLatitude(null);
      setLongitude(null);
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
      <h1 className="text-3xl font-bold text-teal-600 dark:text-teal-400 mb-6">Agregar Nueva Alerta SafeAlert 🛑</h1>
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
          <div className="flex items-center mt-1">
            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-700 transition-colors duration-150"
              placeholder="Ej: Barrio Norte, Av. Central #123"
            />
            <button
              type="button"
              onClick={handleGetLocation}
              className="ml-2 p-2 rounded-md bg-teal-500 hover:bg-teal-600 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-800 focus:ring-teal-500 transition-colors duration-150"
              title="Obtener ubicación actual"
            >
              <MapPinIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div>
          <label htmlFor="alertTimeStr" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Hora / Fecha del Evento (Ej: "10:30 AM Hoy", "Ayer 3 PM")
          </label>
          <div className="flex items-center mt-1">
            <input
              id="alertTimeStr"
              type="text"
              value={alertTimeStr}
              onChange={(e) => setAlertTimeStr(e.target.value)}
              className="block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-700 transition-colors duration-150"
              placeholder="Fecha y hora del suceso"
            />
            <button
              type="button"
              onClick={() => setAlertTimeStr(new Date().toLocaleString())}
              className="ml-2 p-2 rounded-md bg-teal-500 hover:bg-teal-600 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-800 focus:ring-teal-500 transition-colors duration-150"
              title="Establecer hora y fecha actual"
            >
              <ClockIcon className="h-5 w-5" />
            </button>
          </div>
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
            <option value="" disabled>Selecciona un tipo de alerta</option>
            <option value={AlertType.Fire}>Incendio</option>
            <option value={AlertType.Flood}>Inundación</option>
            <option value={AlertType.Medical}>Emergencia Médica</option>
            <option value={AlertType.Crime}>Actividad Delictiva</option>
            <option value={AlertType.Traffic}>Accidente de Tráfico</option>
            <option value={AlertType.Weather}>Fenómeno Climático</option>
            <option value={AlertType.Other}>Otro</option>
            <option value={AlertType.Current}>Alerta General (Actual)</option>
            <option value={AlertType.History}>Historial (Interno)</option>
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
