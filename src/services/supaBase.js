import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://yjmfmkgyrhuweiblsnde.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqbWZta2d5cmh1d2VpYmxzbmRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk3NzU5NzksImV4cCI6MjAwNTM1MTk3OX0.PpyjMKygmnlEMHnLEEMplXQQ-7f17OMJvoOB4j7FTgk'
const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase;