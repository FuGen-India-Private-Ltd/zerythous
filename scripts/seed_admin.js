
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

async function seedAdmin() {
  const email = 'admin@zerythous.com';
  const password = 'Password123!';

  // Create user
  const { data: userData, error: userError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (userError) {
    if (userError.message.includes('already been registered')) {
      console.log('User already exists, updating password...');
      
      // Get the user ID
      const { data: usersData, error: listError } = await supabase.auth.admin.listUsers();
      if (listError) throw listError;
      
      const user = usersData.users.find(u => u.email === email);
      if (user) {
        await supabase.auth.admin.updateUserById(user.id, { password });
        console.log('Password updated.');
        
        // Ensure profile exists
        const { error: profileError } = await supabase.from('admin_profiles').upsert({
          user_id: user.id,
          email: user.email,
          role: 'super_admin'
        });
        if (profileError) console.error('Profile error:', profileError);
      }
    } else {
      console.error('Error creating user:', userError);
    }
  } else if (userData?.user) {
    console.log('Created user:', userData.user.id);
    
    // Create admin profile
    const { error: profileError } = await supabase.from('admin_profiles').insert({
      user_id: userData.user.id,
      email: userData.user.email,
      role: 'super_admin'
    });
    
    if (profileError) {
      console.error('Error creating admin profile:', profileError);
    } else {
      console.log('Admin profile created.');
    }
  }

  console.log('Finished.');
}

seedAdmin();
