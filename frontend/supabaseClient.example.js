import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'http://localhost:54321'  // This is the default local URL
const supabaseAnonKey = 'anon_key'  // You can find this in the output of `supabase status`

export const supabase = createClient(supabaseUrl, supabaseAnonKey)