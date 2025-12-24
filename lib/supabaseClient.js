import { createClient } from '@supabase/supabase-js'

// This "Whiteline" explains: This pulls the keys you just saved in Vercel 
// and creates a connection to your specific database.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Create client with graceful handling for missing env vars
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null
