import { createClient } from '@supabase/supabase-js';

// Environment variables with active cloud fallback
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://lnhaglhktsfsvvzkmjiv.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_dKNPap7dy53cGj-XMOH_KA_dMNQLz0E';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-project-id.supabase.co' &&
  !supabaseUrl.includes('placeholder')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
