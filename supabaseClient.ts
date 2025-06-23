
import { createClient } from '@supabase/supabase-js';

// These should ideally be environment variables, but using provided values for now.
const supabaseUrl = 'https://wsibpwyhljgtcdlhiqyw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndzaWJwd3lobGpndGNkbGhpcXl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyOTUxMDUsImV4cCI6MjA2NTg3MTEwNX0.02GGh2pG1iZ8_rWtXvRxJYqrZG4OEEPNjm_0b1PtE_8';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key are required.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
