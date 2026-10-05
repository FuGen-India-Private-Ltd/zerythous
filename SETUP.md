# Zerythous Admin Setup & Supabase Integration

This document explains how to configure Supabase and set up the private admin system.

## 1. Create a Supabase Project
1. Go to [Supabase](https://supabase.com) and sign in.
2. Create a new project.
3. Wait for the database to provision.

## 2. Environment Variables
In the root of the project, duplicate `.env.example` to `.env.local` and fill in the values:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

- **URL and Anon Key**: Found in **Project Settings > API**.
- **Service Role Key**: Found in the same section. **NEVER** expose this key to the browser. It should only live in the server environment.

## 3. Run Database Migrations
We need to run the SQL migration to create tables, enums, RLS policies, and triggers.

1. Go to the **SQL Editor** in your Supabase dashboard.
2. Click **New Query**.
3. Copy the contents of `supabase/migrations/00000000000000_init.sql` and paste it into the SQL Editor.
4. Run the query.

## 4. Create the First Admin Account
You must create the admin account manually through Supabase Auth, as there is no public registration page.

1. Go to **Authentication > Users** in the Supabase dashboard.
2. Click **Add user > Create new user**.
3. Enter your administrator email and a strong password. (Disable "Auto Confirm User" if you haven't set up SMTP, or just choose to auto confirm for now).

## 5. Assign the Super Admin Role
Now link this user to an `admin_profile`.

1. Go to the **SQL Editor**.
2. Run the following query to insert the profile (replace the email with the one you just created):

```sql
INSERT INTO admin_profiles (user_id, email, role)
SELECT id, email, 'super_admin'
FROM auth.users
WHERE email = 'your-admin@email.com';
```

## 6. Run the Application
Start the development server:

```bash
npm run dev
```

Navigate to `http://localhost:3000/admin` to access the admin system.

## 7. Deploying to Vercel
1. Push your code to GitHub.
2. Import the project in Vercel.
3. Go to **Settings > Environment Variables** in your Vercel project.
4. Add all three Supabase variables: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY`.
5. Deploy.

The `.env.local` file is already added to `.gitignore` to prevent leaking secrets.
