import { createClient } from '@supabase/supabase-js';

// Вставьте вашу ссылку напрямую вместо process.env
const supabaseUrl = 'https://btxkdhxwswavfdpslnsv.supabase.co'; 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0eGtkaHh3c3dhdmZkcHNsbnN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQzNjAwNDksImV4cCI6MjA5OTkzNjA0OX0.Tw-7hdQX7rkz1_a5QaAEYXkJL167fEfjsqY7PqV5Vo0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
