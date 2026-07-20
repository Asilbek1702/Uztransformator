import { createClient } from '@supabase/supabase-js';

// Вставьте вашу ссылку напрямую вместо process.env
const supabaseUrl = 'https://ваша-ссылка-из-supabase.supabase.co'; 
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
