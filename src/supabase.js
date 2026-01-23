import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xklszouzpytdqynkrnxk.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhrbHN6b3V6cHl0ZHF5bmtybnhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxNzM4ODIsImV4cCI6MjA4NDc0OTg4Mn0.hGxdZzw__itqp8OMZnoSM91YE3bE5x5akc5LRpuy3L4'

export const supabase = createClient(supabaseUrl, supabaseKey)
