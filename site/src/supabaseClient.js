import { createClient } from '@supabase/supabase-js';

// Вставьте вашу ссылку напрямую вместо process.env
const supabaseUrl = 'https://btxkdhxwswavfdpslnsv.supabase.co/rest/v1/'; 
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
