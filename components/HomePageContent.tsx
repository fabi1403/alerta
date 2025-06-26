
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { AlertItem, AlertType } from '../types';
import { CRITICAL_ALERT_DATA, ICON_MAP, TrashIcon } from '../constants';
import { useAuth } from '../App'; 

interface AlertListItemProps {
  alert: AlertItem;
  onSoftDelete: (alertId: string) => Promise<void>;
  currentUserId?: string | null;
}

const AlertListItem: React.FC<AlertListItemProps> = ({ alert, onSoftDelete, currentUserId }) => {
  const iconToRender = alert.icon_name ? ICON_MAP[alert.icon_name] : <div className="size-6"></div>;
  const canSoftDelete = alert.user_id && currentUserId && alert.user_id === currentUserId && (alert.type === AlertType.Current || alert.type === 'Current');
  
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    let intervalId: number | undefined;

    if ((alert.type === AlertType.History || alert.type === 'History') && alert.scheduled_for_permanent_deletion_at) {
      const calculateTimeLeft = () => {
        const deletionTime = new Date(alert.scheduled_for_permanent_deletion_at!).getTime();
        const now = new Date().getTime();
        const difference = deletionTime - now;

        if (difference <= 0) {
          setTimeLeft("Programada para eliminación");
          if (intervalId) clearInterval(intervalId);
          return;
        }

        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        
        setTimeLeft(`Eliminación en: ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
      };

      calculateTimeLeft(); 
      intervalId = window.setInterval(calculateTimeLeft, 1000);
    } else {
      setTimeLeft(''); 
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [alert.type, alert.scheduled_for_permanent_deletion_at]);

  return (
    <div className="flex gap-4 bg-white dark:bg-slate-800 px-4 py-3 border-b border-slate-300 dark:border-slate-700 last:border-b-0 hover:bg-sky-50 dark:hover:bg-slate-700/50 transition-colors duration-150 items-start transform hover:scale-[1.01]">
      <div className="text-green-600 dark:text-green-400 flex items-center justify-center rounded-lg bg-green-100 dark:bg-green-700/30 shrink-0 size-12 mt-1">
        {iconToRender}
      </div>
      <div className="flex flex-1 flex-col justify-center">
        <p className="text-slate-800 dark:text-slate-200 text-base font-medium leading-normal">{alert.title}</p>
        {alert.location && <p className="text-teal-700 dark:text-teal-400 text-sm font-normal leading-normal">{alert.location}</p>}
        {alert.alert_time_str && <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">{alert.alert_time_str}</p>}
        {alert.description && alert.type !== AlertType.Critical && (
            <p className="text-slate-600 dark:text-slate-300 text-xs mt-1">{alert.description}</p>
        )}
        {timeLeft && (
          <p className="text-xs text-orange-700 dark:text-amber-500 mt-1 font-medium">{timeLeft}</p>
        )}
      </div>
      {canSoftDelete && (
        <button
          onClick={() => onSoftDelete(alert.id)}
          title="Mover a historial y programar para eliminación"
          className="p-2 text-orange-600 dark:text-amber-500 hover:text-orange-700 dark:hover:text-amber-400 hover:bg-orange-100 dark:hover:bg-amber-600/30 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-amber-500 focus:ring-opacity-50 transition-all duration-150 transform hover:scale-110"
          aria-label={`Mover al historial la alerta: ${alert.title}`}
        >
          <TrashIcon size="20px" />
        </button>
      )}
    </div>
  );
};

const HomePageContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('current');
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [loadingAlerts, setLoadingAlerts] = useState<boolean>(true);
  const [errorAlerts, setErrorAlerts] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const { user } = useAuth();

  const criticalAlert = CRITICAL_ALERT_DATA;

  const fetchAlerts = async () => {
    setLoadingAlerts(true);
    
    const { data, error } = await supabase
      .from('alerts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error al obtener alertas:', error);
      setErrorAlerts(`Error al cargar alertas: ${error.message}`);
    } else if (data) {
      const fetchedAlerts: AlertItem[] = data.map(item => ({
          ...item,
          type: item.type as AlertType, 
          scheduled_for_permanent_deletion_at: item.scheduled_for_permanent_deletion_at,
      }));
      setAlerts(fetchedAlerts);
      setErrorAlerts(null);
    }
    setLoadingAlerts(false);
  };

  useEffect(() => {
    fetchAlerts(); 

    const channel = supabase
      .channel('public:alerts')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'alerts' },
        (payload) => {
          console.log('Cambio recibido de Supabase!', payload);
          fetchAlerts(); 
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleSoftDeleteAlert = async (alertId: string) => {
    setActionMessage(null);
    const confirmed = window.confirm("¿Estás seguro de que quieres mover esta alerta al historial y programarla para su eliminación en 24 horas?");
    if (!confirmed) {
      return;
    }

    const deletionTime = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

    const { error } = await supabase
      .from('alerts')
      .update({ 
        type: AlertType.History, 
        scheduled_for_permanent_deletion_at: deletionTime 
      })
      .eq('id', alertId);

    if (error) {
      console.error("Error al programar para eliminación:", error);
      setActionMessage({ type: 'error', text: `Error al programar para eliminación: ${error.message}` });
    } else {
      setActionMessage({ type: 'success', text: "Alerta movida al historial y programada para eliminación en 24h." });
    }
    setTimeout(() => setActionMessage(null), 4000);
  };

  const currentAlerts = alerts.filter(alert => alert.type === AlertType.Current || alert.type === 'Current');
  const alertHistory = alerts.filter(alert => alert.type === AlertType.History || alert.type === 'History');

  const renderAlerts = (alertsToRender: AlertItem[], type: string) => {
    if (loadingAlerts && alertsToRender.length === 0) {
      return <p className="px-4 py-3 text-teal-700 dark:text-teal-400">Cargando alertas...</p>;
    }
    if (errorAlerts && alertsToRender.length === 0) {
        return <p className="px-4 py-3 text-red-600 dark:text-red-400">{errorAlerts}</p>;
    }
    if (alertsToRender.length === 0 && !loadingAlerts) {
      return <p className="px-4 py-3 text-slate-500 dark:text-slate-400">No hay alertas de tipo '{type === 'current' ? 'actuales' : 'historial'}' para mostrar.</p>;
    }
    return alertsToRender.map(alert => (
      <AlertListItem 
        key={alert.id} 
        alert={alert} 
        onSoftDelete={handleSoftDeleteAlert}
        currentUserId={user?.id}
      />
    ));
  };

  return (
    <div className="px-0 sm:px-10 md:px-40 flex flex-1 justify-center py-5 bg-sky-100 dark:bg-slate-900 transition-colors duration-300">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="@container mb-5">
          <div className="@[480px]:px-4 @[480px]:py-3">
            <div
              className="bg-cover bg-center flex flex-col justify-end overflow-hidden @[480px]:rounded-lg min-h-[218px] shadow-md border border-slate-200 dark:border-slate-700"
              style={{
                backgroundImage: `url("/Image_fx (1).jpg")`
              }}
              role="banner"
              aria-labelledby="critical-alert-title"
            >
              <div className="flex p-4">
                <p id="critical-alert-title" className="text-white tracking-light text-[28px] font-bold leading-tight">Alertas de Emergencias para Comunidades</p>
              </div>
            </div>
          </div>
        </div>
        
        {criticalAlert.description && (
             <div className="px-4 @[480px]:px-0">
                <p className="text-slate-700 dark:text-slate-300 text-base font-normal leading-normal pb-3 pt-3 px-4 bg-white dark:bg-slate-800 @[480px]:rounded-b-lg shadow-sm mb-5 border border-slate-200 dark:border-slate-700 transition-colors duration-300">
                    {criticalAlert.description}
                </p>
            </div>
        )}

        {actionMessage && (
          <div className={`p-3 mb-4 mx-4 @[480px]:mx-0 rounded-md text-sm transition-all duration-300
            ${actionMessage.type === 'success' 
              ? 'bg-emerald-100 dark:bg-emerald-700/30 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-600' 
              : 'bg-red-100 dark:bg-red-700/30 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-600'
            }`} 
            role="alert"
          >
            {actionMessage.text}
          </div>
        )}

        <div className="px-4 border-b border-slate-300 dark:border-slate-700 mt-5 bg-white dark:bg-slate-800 @[480px]:rounded-t-lg shadow-sm transition-colors duration-300">
          <nav className="flex space-x-4" aria-label="Pestañas de Alertas">
            <button
              onClick={() => setActiveTab('current')}
              aria-current={activeTab === 'current' ? 'page' : undefined}
              className={`
                ${activeTab === 'current' ? 'border-teal-600 dark:border-teal-400 text-teal-700 dark:text-teal-300' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600'}
                whitespace-nowrap py-3 px-1 border-b-2 font-medium text-lg focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:ring-opacity-50 rounded-t-md transition-all duration-150 transform hover:scale-105
              `}
            >
              Alertas Actuales
            </button>
            <button
              onClick={() => setActiveTab('history')}
              aria-current={activeTab === 'history' ? 'page' : undefined}
              className={`
                ${activeTab === 'history' ? 'border-teal-600 dark:border-teal-400 text-teal-700 dark:text-teal-300' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600'}
                whitespace-nowrap py-3 px-1 border-b-2 font-medium text-lg focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:ring-opacity-50 rounded-t-md transition-all duration-150 transform hover:scale-105
              `}
            >
              Historial de Alertas
            </button>
          </nav>
        </div>

        <div className="mt-0 bg-white dark:bg-slate-800 shadow-sm @[480px]:rounded-b-lg overflow-hidden transition-colors duration-300"> 
          {activeTab === 'current' && (
            <section aria-labelledby="current-alerts-heading">
              <h2 id="current-alerts-heading" className="sr-only">Alertas Actuales</h2>
              {renderAlerts(currentAlerts, 'current')}
            </section>
          )}
          {activeTab === 'history' && (
            <section aria-labelledby="alert-history-heading">
              <h2 id="alert-history-heading" className="sr-only">Historial de Alertas</h2>
              {renderAlerts(alertHistory, 'history')}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePageContent;
