
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://imviylxjncalgzqebxsf.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imltdml5bHhqbmNhbGd6cWVieHNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkyMjEyNzIsImV4cCI6MjA1NDc5NzI3Mn0.WKbTmscowbw5s4jJ0JqWhap8RSh2Ei7qUBp4cjaTiJk"
const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase;