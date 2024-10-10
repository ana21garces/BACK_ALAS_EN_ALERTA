// usuarios.js
const { createClient } = require('@supabase/supabase-js');

// Configuración de Supabase
const supabaseUrl = 'https://dkeowfiyycceswfopser.supabase.co'; // Reemplaza con la URL de tu proyecto en Supabase
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrZW93Zml5eWNjZXN3Zm9wc2VyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNzk3NDAzNiwiZXhwIjoyMDQzNTUwMDM2fQ.W8ZF3AT2srEc8sIocDSn73Ycb3ww1rNMwieLWPL6jJg'; // Reemplaza con tu clave anónima
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;



          



          
