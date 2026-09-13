require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrate() {
  console.log("Fetching users...");
  const { data: users, error } = await supabase.from('app_users').select('*');
  
  if (error) {
    console.error("Error fetching users:", error);
    return;
  }

  for (const user of users) {
    if (user.plain_password && !user.password_hash) {
      console.log(`Hashing password for user: ${user.username}`);
      const hash = await bcrypt.hash(user.plain_password, 10);
      
      const { error: updateError } = await supabase
        .from('app_users')
        .update({ password_hash: hash })
        .eq('id', user.id);
        
      if (updateError) {
        console.error(`Error updating user ${user.username}:`, updateError);
      } else {
        console.log(`Success for user: ${user.username}`);
      }
    } else {
      console.log(`Skipping user: ${user.username} (already migrated or no password)`);
    }
  }

  console.log("Migration complete!");
}

migrate();
