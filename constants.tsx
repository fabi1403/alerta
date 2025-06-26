
import React from 'react';
import { AlertItem, AlertType, NavLinkItem } from './types';

// Palette Reference (Landscape Inspired - Applied in components)
// Modo Claro:
// Fondo Principal Página: bg-sky-100 (azul cielo claro)
// Fondo Contenedores/Tarjetas: bg-white o bg-slate-50
// Texto Principal: text-slate-800 (gris oscuro)
// Acento Primario (Botones, Logo): text-teal-600, bg-teal-600 (verde azulado)
// Acento Secundario (Iconos Alerta): text-green-600, bg-green-100 (verde prado)
// "Mover a Historial" Button: text-orange-600 (ámbar/tierra)
// Modo Oscuro:
// Fondo Principal Página: dark:bg-slate-900
// Fondo Contenedores/Tarjetas: dark:bg-slate-800
// Texto Principal: dark:text-slate-200
// Acento Primario: dark:text-teal-400, dark:bg-teal-700
// Acento Secundario: dark:text-green-400, dark:bg-green-700/20
// "Mover a Historial" Button: dark:text-amber-500

export const AppLogoIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z"
      fill="currentColor"
    ></path>
  </svg>
);

export const BellIcon: React.FC<{ className?: string, size?: string }> = ({ className, size = "20px" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 256 256" className={className}>
    <path
      d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"
    ></path>
  </svg>
);

export const WarningCircleIcon: React.FC<{ className?: string, size?: string }> = ({ className, size = "24px" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 256 256" className={className}>
    <path
      d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm-8-80V80a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,172Z"
    ></path>
  </svg>
);

export const PowerIcon: React.FC<{ className?: string, size?: string }> = ({ className, size = "24px" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 256 256" className={className}>
    <path
      d="M120,128V48a8,8,0,0,1,16,0v80a8,8,0,0,1-16,0Zm60.37-78.7a8,8,0,0,0-8.74,13.4C194.74,77.77,208,101.57,208,128a80,80,0,0,1-160,0c0-26.43,13.26-50.23,36.37-65.3a8,8,0,0,0-8.74-13.4C47.9,67.38,32,96.06,32,128a96,96,0,0,0,192,0C224,96.06,208.1,67.38,180.37,49.3Z"
    ></path>
  </svg>
);

export const CarIcon: React.FC<{ className?: string, size?: string }> = ({ className, size = "24px" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 256 256" className={className}>
    <path
      d="M240,112H229.2L201.42,49.5A16,16,0,0,0,186.8,40H69.2a16,16,0,0,0-14.62,9.5L26.8,112H16a8,8,0,0,0,0,16h8v80a16,16,0,0,0,16,16H64a16,16,0,0,0,16-16V192h96v16a16,16,0,0,0,16,16h24a16,16,0,0,0,16-16V128h8a8,8,0,0,0,0-16ZM69.2,56H186.8l24.89,56H44.31ZM64,208H40V192H64Zm128,0V192h24v16Zm24-32H40V128H216ZM56,152a8,8,0,0,1,8-8H80a8,8,0,0,1,0,16H64A8,8,0,0,1,56,152Zm112,0a8,8,0,0,1,8-8h16a8,8,0,0,1,0,16H176A8,8,0,0,1,168,152Z"
    ></path>
  </svg>
);

export const DropIcon: React.FC<{ className?: string, size?: string }> = ({ className, size = "24px" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 256 256" className={className}>
    <path
      d="M174,47.75a254.19,254.19,0,0,0-41.45-38.3,8,8,0,0,0-9.18,0A254.19,254.19,0,0,0,82,47.75C54.51,79.32,40,112.6,40,144a88,88,0,0,0,176,0C216,112.6,201.49,79.32,174,47.75ZM128,216a72.08,72.08,0,0,1-72-72c0-57.23,55.47-105,72-118,16.53,13,72,60.75,72,118A72.08,72.08,0,0,1,128,216Zm55.89-62.66a57.6,57.6,0,0,1-46.56,46.55A8.75,8.75,0,0,1,136,200a8,8,0,0,1-1.32-15.89c16.57-2.79,30.63-16.85,33.44-33.45a8,8,0,0,1,15.78,2.68Z"
    ></path>
  </svg>
);

export const PlusCircleIcon: React.FC<{ className?: string, size?: string }> = ({ className, size = "24px" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 256 256" className={className}>
        <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm40-88h-32V96a8,8,0,0,0-16,0v32H88a8,8,0,0,0,0,16h32v32a8,8,0,0,0,16,0V144h32a8,8,0,0,0,0-16Z"></path>
    </svg>
);

export const TrashIcon: React.FC<{ className?: string, size?: string }> = ({ className, size = "20px" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 256 256" className={className}>
    <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path>
  </svg>
);


export const GoogleIcon: React.FC<{ className?: string, size?: string }> = ({ className, size = "20px" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.51H17.96C17.73 15.93 17.06 17.15 15.95 17.91V20.45H19.82C21.66 18.78 22.56 16.03 22.56 12.25Z" fill="#4285F4"/>
    <path d="M12 23C15.24 23 17.95 21.92 19.82 20.45L15.95 17.91C14.88 18.61 13.56 19.08 12 19.08C9.17 19.08 6.79 17.26 5.86 14.77H1.84V17.34C3.76 20.73 7.55 23 12 23Z" fill="#34A853"/>
    <path d="M5.86 14.77C5.63 14.07 5.5 13.3 5.5 12.5C5.5 11.7 5.63 10.93 5.86 10.23V7.66H1.84C0.66 9.94 0 12.36 0 15C0 17.64 0.66 20.06 1.84 22.34L5.86 19.77V14.77Z" fill="#FBBC05"/>
    <path d="M12 5.92C13.73 5.92 15.07 6.54 16.09 7.49L19.89 3.7C17.95 1.86 15.24 0.75 12 0.75C7.55 0.75 3.76 3.27 1.84 7.66L5.86 10.23C6.79 7.74 9.17 5.92 12 5.92Z" fill="#EA4335"/>
  </svg>
);

export const AppleIcon: React.FC<{ className?: string, size?: string, color?: string }> = ({ className, size = "20px", color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M18.35,16.14a3.39,3.39,0,0,1-1.09,2.43,3.75,3.75,0,0,1-2.58.93,3.39,3.39,0,0,1-1.89-.59,3.22,3.22,0,0,1-1.21-1.45,11.3,11.3,0,0,1-.53-2.61A6.29,6.29,0,0,1,12,12.7a6.68,6.68,0,0,1,.8-3.26,3.48,3.48,0,0,1,2.83-2A3.36,3.36,0,0,1,18,8.23a4.73,4.73,0,0,0-1.54,2.84,9.27,9.27,0,0,0,.08,1.47A3.07,3.07,0,0,1,18.35,16.14ZM15.4,6.76A3.8,3.8,0,0,0,13.7,4.88,4.22,4.22,0,0,0,11,4.55a4.5,4.5,0,0,0-3.32,1.8,9.75,9.75,0,0,0-1.72,5.2,6.58,6.58,0,0,0,1.93,4.68,3.89,3.89,0,0,0,2.83,1.25,3.71,3.71,0,0,0,2.65-1,3.52,3.52,0,0,0,1.15-2.26,8.71,8.71,0,0,0-.24-2.58A4.32,4.32,0,0,0,15.4,6.76Z"/>
  </svg>
);

export const MicrosoftIcon: React.FC<{ className?: string, size?: string }> = ({ className, size = "20px" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.4 11.4H3V3H11.4V11.4ZM21 11.4H12.6V3H21V11.4ZM11.4 21H3V12.6H11.4V21ZM21 21H12.6V12.6H21V21Z">
      <rect x="3" y="3" width="8.4" height="8.4" fill="#F25022"/>
      <rect x="12.6" y="3" width="8.4" height="8.4" fill="#7FBA00"/>
      <rect x="3" y="12.6" width="8.4" height="8.4" fill="#00A4EF"/>
      <rect x="12.6" y="12.6" width="8.4" height="8.4" fill="#FFB900"/>
    </path>
  </svg>
);

export const FacebookIcon: React.FC<{ className?: string, size?: string, color?: string }> = ({ className, size = "20px", color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M22 12C22 6.48 17.52 2 12 2S2 6.48 2 12C2 16.84 5.44 20.87 10 21.8V14H7V12H10V9.5C10 7.02 11.42 5.66 13.62 5.66C14.62 5.66 15.54 5.84 15.54 5.84V7.65H14.5C13.25 7.65 13 8.22 13 9.11V12H15.5L15 14H13V21.8C18.56 20.87 22 16.84 22 12Z"/>
  </svg>
);

export const SunIcon: React.FC<{ className?: string, size?: string }> = ({ className, size = "24px" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 256 256" className={className}>
    <path d="M128,56a72,72,0,1,0,72,72A72.08,72.08,0,0,0,128,56Zm0,128a56,56,0,1,1,56-56A56.06,56.06,0,0,1,128,184ZM128,32a8,8,0,0,1,8,8V56a8,8,0,0,1-16,0V40A8,8,0,0,1,128,32ZM56,120H40a8,8,0,0,0,0,16H56a8,8,0,0,0,0-16Zm160,8H200a8,8,0,0,0,0,16h16a8,8,0,0,0,0-16ZM195.92,195.92a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM60.08,60.08l-16-16A8,8,0,0,0,32.76,55.4l16,16A8,8,0,0,0,56.08,71.4A8,8,0,0,0,60.08,60.08ZM195.92,60.08a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,1,0,180.52,76ZM60.08,195.92l-16,16a8,8,0,1,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM128,200a8,8,0,0,1-8,8v16a8,8,0,0,1,0-16V208A8,8,0,0,1,128,200Z"></path>
  </svg>
);

export const MoonIcon: React.FC<{ className?: string, size?: string }> = ({ className, size = "24px" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 256 256" className={className}>
    <path d="M216.7,152.61A95.83,95.83,0,0,1,103.39,39.3,96,96,0,0,0,0,135.3a96,96,0,0,0,152.61,113.3A95.83,95.83,0,0,1,216.7,152.61Z"></path>
  </svg>
);


export const ICON_MAP: { [key: string]: React.ReactNode } = {
  WarningCircleIcon: <WarningCircleIcon />,
  PowerIcon: <PowerIcon />,
  CarIcon: <CarIcon />,
  DropIcon: <DropIcon />,
  TrashIcon: <TrashIcon />, 
};


export const NAV_LINKS: NavLinkItem[] = [
  { label: 'Inicio', href: '/' },
  { label: 'Nosotros', href: '/about' },
  { label: 'Contacto', href: '/contact' },
];

export const CRITICAL_ALERT_DATA: AlertItem = {
  id: 'critical-1',
  type: AlertType.Critical,
  title: 'SafeAlert 🛑',
  description: 'Un espacio donde los miembros de la comunidad pueden publicar y visualizar alertas sobre emergencias, incidentes o sucesos importantes que afecten a su localidad. Mantente informado y contribuye a la seguridad de todos.',
  image_url: '/paisaje-fondo-alertas.jpg', // Usar la imagen local
};

export const USER_AVATAR_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuDncpSll2_5h4Qrz6cyqfVW-rEAgsolmYEtKtv3qazK2Z43d9ecn-5nstQQvJ7Dvi6_4mRYcZzIobf3BvzIjIwTQdHG7uQLHolA4S9HGl_7EcbK0D3Nzl-j6Lvze0ebyJz0WE_MrG08fRqGBNQfLHOmZ5Dn8cqGy1aDUhTDdkd6yhNXOgF_no7wMIGqkjoBK8NKu0jddekBgOnfLy7fqtCvUPsFf7rnsjvwvOdAllPl8kA3UG6TT49gzF2nXqTUWXdPIPOJJI3Q5jwi";

// Mock data is no longer primary source, data comes from Supabase.
// Kept for reference or quick testing if Supabase is down.
export const MOCK_CURRENT_ALERTS_DATA: AlertItem[] = [
  {
    id: 'current-1',
    type: AlertType.Current,
    icon_name: 'WarningCircleIcon',
    title: 'Advertencia de Inundación Repentina',
    location: 'Área Céntrica',
    alert_time_str: '10:30 AM',
  },
];

export const MOCK_ALERT_HISTORY_DATA: AlertItem[] = [
  {
    id: 'history-1',
    type: AlertType.History,
    icon_name: 'CarIcon',
    title: 'Accidente de Tráfico',
    location: 'Zona Este',
    alert_time_str: 'Ayer, 4:00 PM',
  },
];
