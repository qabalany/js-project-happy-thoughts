import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qoxtdfojwnokjnmuwazc.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFveHRkZm9qd25va2pubXV3YXpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU2MDM3ODUsImV4cCI6MjA4MTE3OTc4NX0.BrH7Sj5ALhX8ka2ZwUKEA--ey3gKtYImZjpI3i2a4wc'

export const supabase = createClient(supabaseUrl, supabaseKey)
