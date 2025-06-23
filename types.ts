
import { ReactNode } from 'react';
import { User as SupabaseUser, AuthError } from '@supabase/supabase-js';

export interface NavLinkItem {
  label: string;
  href: string;
}

export interface User extends SupabaseUser {
  // Explicitly define properties we rely on from SupabaseUser
  // to ensure TypeScript recognizes them on our specific 'User' type.
  // This can help with type inference issues.
  id: string;
  email?: string; // email is optional in SupabaseUser
  user_metadata: {
    full_name?: string; // Often set during sign-up or via options
    name?: string;      // Supabase might also use 'name' in user_metadata
    avatar_url?: string; // Standard for avatar images
    [key: string]: any; // Allow other custom metadata
  };
  // Other properties like created_at, app_metadata, etc., are still inherited from SupabaseUser.
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => Promise<{ error: AuthError | null }>;
  register: (email: string, pass: string, name?: string) => Promise<{ error: AuthError | null }>;
  logout: () => Promise<{ error: AuthError | null }>;
  signInWithProvider: (provider: 'google' | 'apple' | 'facebook' | 'azure') => Promise<void>;
  loading: boolean;
  error: string | null; // For displaying UI errors
  sessionRefreshed: boolean; // To track initial session load
}

export enum AlertType {
  Critical = 'Critical', // System-level, likely static or admin-controlled
  Current = 'Current',   // User-added or dynamic
  History = 'History',   // User-added or dynamic
}

export interface AlertItem {
  id: string; // UUID from DB
  user_id?: string | null; // UUID of the user who created it, from DB
  created_at?: string; // Timestamp from DB
  type: AlertType | string; // Allow string for DB values
  icon_name?: string | null; // Name of the icon, e.g., "WarningCircleIcon"
  icon?: ReactNode; // Derived from icon_name for rendering
  title: string;
  location?: string | null;
  alert_time_str?: string | null; // User-provided time string (e.g., "10:30 AM", "Yesterday")
  description?: string | null;
  image_url?: string | null; // For critical alert primarily
  scheduled_for_permanent_deletion_at?: string | null; // Timestamp for soft delete
}