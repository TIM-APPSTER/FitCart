import { createClient } from '@supabase/supabase-js'

// 1. Достаем ключи из нашего секретного файла .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// 2. Создаем "клиент" — объект, через который мы будем общаться с базой
export const supabase = createClient(supabaseUrl, supabaseAnonKey)