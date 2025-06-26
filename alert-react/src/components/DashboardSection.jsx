import React, { useState, useEffect } from 'react';
import { useConfirm } from './CustomConfirmModal';

interface Alert {
  id: string;
  type: string;
  description: string;
  location: string;
  requesterName?: string;
  timestamp: number;
}

interface DashboardSectionProps {
  userId: string;
}

const DashboardSection: React.FC<DashboardSectionProps> = ({ userId }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [alertType, setAlertType] = useState('');
  const [alertDescription, setAlertDescription] = useState('');
  const [alertLocation, setAlertLocation] = useState('');
  const [requesterName, setRequesterName] = useState('');
  const [message, setMessage] = useState<{ type: string; text: string } | null>(null);

  const { confirm, ConfirmModal } = useConfirm();

  useEffect(() => {
    // Simulate fetching alerts
    const storedAlerts = localStorage.getItem('alerts');
    if (storedAlerts) {
      setAlerts(JSON.parse(storedAlerts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('alerts', JSON.stringify(alerts));
  }, [alerts]);

  const handleSubmitAlert = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    const newAlert: Alert = {
      id: `alert_${Date.now()}`,
      type: alertType,
      description: alertDescription,
      location: alertLocation || 'Ubicación no especificada',
      requesterName: requesterName || 'Anónimo',
      timestamp: Date.now(),
    };

    setAlerts((prevAlerts) => [newAlert, ...prevAlerts]);
    setMessage({ type: 'success', text: '¡Alerta enviada con éxito! 🎉' });

    // Clear form
    setAlertType('');
    setAlertDescription('');
    setAlertLocation('');
    setRequesterName('');

    setTimeout(() => setMessage(null), 5000);
  };

  const handleDeleteAlert = async (id: string) => {
    const canDelete = await confirm('¿Estás seguro de que quieres eliminar esta alerta?');
    if (canDelete) {
      setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
      setMessage({ type: 'info', text: 'Alerta eliminada.' });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const handleLogout = async () => {
    const canLogout = await confirm('¿Estás seguro de que quieres cerrar sesión?');
    if (canLogout) {
      console.log('Simulating logout...');
      // In a real app, you would clear user session/token
      window.location.reload(); // Simple reload to go back to auth
    }
  };

  return (
    <div id="dashboardSection" className="w-full h-full max-w-6xl rounded-xl shadow-lg flex flex-col md:flex-row overflow-hidden transition-all duration-500 ease-in-out">
      <ConfirmModal />
      <aside className="w-full md:w-1/3 p-6 md:p-8 border-b md:border-r border-gray-200 flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-extrabold mb-6 flex items-center gradient-text">
            <i className="fas fa-bullhorn text-4xl mr-3"></i> AlertaAhora 📣
          </h1>
          <p className="text-gray-600 text-sm mb-6">Emite una alerta rápida para tu comunidad. Tu ID de usuario: <span id="displayUserId" className="font-bold text-gray-800 break-words">{userId}</span></p>

          <h3 className="text-2xl font-bold text-gray-800 mb-4">Emitir una Alerta 🚨</h3>
          <form id="alertForm" className="space-y-4" onSubmit={handleSubmitAlert}>
            <div>
              <label htmlFor="alertType" className="block text-sm font-medium text-gray-700">Tipo de Alerta</label>
              <select
                id="alertType"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                value={alertType}
                onChange={(e) => setAlertType(e.target.value)}
                required
              >
                <option value="">Selecciona un tipo</option>
                <option value="medica">Médica 🚑</option>
                <option value="incendio">Incendio 🔥</option>
                <option value="robo">Robo 💰</option>
                <option value="desastre_natural">Desastre Natural 🌪️</option>
                <option value="otro">Otro ℹ️</option>
              </select>
            </div>
            <div>
              <label htmlFor="alertDescription" className="block text-sm font-medium text-gray-700">Descripción Breve</label>
              <textarea
                id="alertDescription"
                rows={3}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                placeholder="Ej. Persona herida en la calle principal"
                value={alertDescription}
                onChange={(e) => setAlertDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <div>
              <label htmlFor="alertLocation" className="block text-sm font-medium text-gray-700">Ubicación</label>
              <input
                type="text"
                id="alertLocation"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                placeholder="Ej. Calle Principal #123 (automática por GPS si activado)"
                value={alertLocation}
                onChange={(e) => setAlertLocation(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Si el GPS está activo, la ubicación se rellenará automáticamente. 📍</p>
            </div>
            <div>
              <label htmlFor="requesterName" className="block text-sm font-medium text-gray-700">Nombre del Solicitante (opcional)</label>
              <input
                type="text"
                id="requesterName"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                placeholder="Ej. Juan Pérez"
                value={requesterName}
                onChange={(e) => setRequesterName(e.target.value)}
              />
            </div>
            <button type="submit" className="w-full text-white font-semibold py-3 px-4 rounded-lg btn-gradient" style={{ background: 'linear-gradient(to right, #10b981, #059669)' }}>
              <i className="fas fa-paper-plane mr-2"></i> Enviar Alerta 🚀
            </button>
          </form>
        </div>
        <button
          id="logoutButton"
          className="mt-8 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200 ease-in-out transform hover:scale-105"
          onClick={handleLogout}
        >
          Cerrar Sesión 🚪
        </button>
      </aside>

      <main className="flex-1 p-6 md:p-8 flex flex-col overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Panel Principal 📊</h2>
        </div>

        {message && (
          <div
            id="notificationMessageBox"
            className={`px-4 py-3 rounded-md mb-6 transition-all duration-300 ease-in-out opacity-100 translate-y-0 ${message.type === 'success' ? 'bg-green-100 text-green-700' : message.type === 'info' ? 'bg-sky-100 text-sky-700' : 'bg-red-100 text-red-700'}`}
          >
            <p id="notificationMessage" className="font-medium">{message.text}</p>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-8 flex-grow">
          <section id="recentAlertsSection" className="flex-1 mb-8 md:mb-0 flex flex-col">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Alertas Recientes ✨</h3>
            <div id="recentAlertsContainer" className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {alerts.length === 0 ? (
                <div id="noAlertsMessage" className="text-gray-500 text-center mt-4">No hay alertas activas. 🥳</div>
              ) : (
                alerts.map((alert) => (
                  <div key={alert.id} className="recent-alert-card p-4 rounded-lg shadow-md flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-lg">{alert.description}</p>
                      <p className="text-sm text-gray-600">Tipo: {alert.type}</p>
                      <p className="text-sm text-gray-600">Ubicación: {alert.location}</p>
                      <p className="text-sm text-gray-600">Solicitante: {alert.requesterName}</p>
                      <p className="text-xs text-gray-500">{formatTimestamp(alert.timestamp)}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteAlert(alert.id)}
                      className="ml-4 p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition duration-200"
                      title="Eliminar Alerta"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                ))
              )}
            </div>
          </section>

          <section id="mapExternalSection" className="flex-1 flex flex-col items-center justify-center min-h-0 bg-gray-200 rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Ver Alertas en Mapa Externo 🗺️</h3>
            <p className="text-gray-600 text-center mb-6">Haz clic en el botón para abrir Google Maps y ver las alertas. 👇</p>
            <button id="openExternalMapButton" className="flex items-center justify-center px-6 py-3 text-white font-semibold rounded-lg shadow-md btn-gradient" style={{ background: 'linear-gradient(to right, #3b82f6, #2563eb)' }}>
              <i className="fas fa-map-marked-alt text-2xl mr-3"></i> Abrir Google Maps
            </button>
          </section>
        </div>
      </main>
    </div>
  );
};

export default DashboardSection;