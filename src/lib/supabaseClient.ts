import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uqyffsofkuxugghaajds.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxeWZmc29ma3V4dWdnaGFhamRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkyNzcwMTYsImV4cCI6MjAxNDg1MzAxNn0.bg5rI9BSs2X7PEja99G5ywoG1NHuRKpIZ3CNiVwX9sU';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;