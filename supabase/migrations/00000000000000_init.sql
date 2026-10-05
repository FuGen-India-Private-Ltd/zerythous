-- Create custom types for ENUMs
CREATE TYPE inquiry_status AS ENUM ('new', 'reviewing', 'contacted', 'proposal', 'in_progress', 'completed', 'rejected', 'closed');
CREATE TYPE inquiry_priority AS ENUM ('low', 'normal', 'high', 'urgent');
CREATE TYPE contact_status AS ENUM ('new', 'read', 'replied', 'archived');
CREATE TYPE project_brief_status AS ENUM ('draft', 'submitted', 'reviewing', 'contacted', 'closed');
CREATE TYPE admin_role AS ENUM ('admin', 'super_admin');

-- 1. project_inquiries
CREATE TABLE project_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  
  project_type TEXT,
  services_required TEXT[],
  
  timeline TEXT,
  budget TEXT,
  
  description TEXT,
  
  status inquiry_status NOT NULL DEFAULT 'new',
  priority inquiry_priority NOT NULL DEFAULT 'normal',
  
  source TEXT,
  assigned_to UUID,
  notes TEXT
);

-- 2. contact_messages
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  
  subject TEXT,
  message TEXT NOT NULL,
  
  status contact_status NOT NULL DEFAULT 'new'
);

-- 3. project_briefs
CREATE TABLE project_briefs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  
  project_type TEXT NOT NULL,
  requirements TEXT,
  services TEXT[],
  timeline TEXT NOT NULL,
  budget TEXT NOT NULL,
  additional_information TEXT,
  
  status project_brief_status NOT NULL DEFAULT 'submitted'
);

-- 4. admin_profiles
CREATE TABLE admin_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  name TEXT,
  email TEXT NOT NULL,
  
  role admin_role NOT NULL DEFAULT 'admin',
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. audit_logs
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  admin_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  metadata JSONB
);

-- Set up Row Level Security (RLS)
ALTER TABLE project_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_briefs ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_project_inquiries_updated_at
  BEFORE UPDATE ON project_inquiries
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER set_project_briefs_updated_at
  BEFORE UPDATE ON project_briefs
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER set_admin_profiles_updated_at
  BEFORE UPDATE ON admin_profiles
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();


-- RLS Policies

-- Public users can insert (submit)
CREATE POLICY "Public can submit project inquiries" ON project_inquiries FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Public can submit contact messages" ON contact_messages FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Public can submit project briefs" ON project_briefs FOR INSERT TO public WITH CHECK (true);

-- Admins can view/edit everything based on admin_profiles
-- We use a helper function to check admin role to avoid infinite recursion
CREATE OR REPLACE FUNCTION get_admin_role()
RETURNS admin_role AS $$
  SELECT role FROM admin_profiles WHERE user_id = auth.uid() LIMIT 1;
$$ LANGUAGE sql SECURITY DEFINER;

-- project_inquiries policies
CREATE POLICY "Admins can view inquiries" ON project_inquiries FOR SELECT TO authenticated USING (get_admin_role() IS NOT NULL);
CREATE POLICY "Admins can update inquiries" ON project_inquiries FOR UPDATE TO authenticated USING (get_admin_role() IS NOT NULL);
CREATE POLICY "Super admins can delete inquiries" ON project_inquiries FOR DELETE TO authenticated USING (get_admin_role() = 'super_admin');

-- contact_messages policies
CREATE POLICY "Admins can view contacts" ON contact_messages FOR SELECT TO authenticated USING (get_admin_role() IS NOT NULL);
CREATE POLICY "Admins can update contacts" ON contact_messages FOR UPDATE TO authenticated USING (get_admin_role() IS NOT NULL);
CREATE POLICY "Super admins can delete contacts" ON contact_messages FOR DELETE TO authenticated USING (get_admin_role() = 'super_admin');

-- project_briefs policies
CREATE POLICY "Admins can view project briefs" ON project_briefs FOR SELECT TO authenticated USING (get_admin_role() IS NOT NULL);
CREATE POLICY "Admins can update project briefs" ON project_briefs FOR UPDATE TO authenticated USING (get_admin_role() IS NOT NULL);
CREATE POLICY "Super admins can delete project briefs" ON project_briefs FOR DELETE TO authenticated USING (get_admin_role() = 'super_admin');

-- admin_profiles policies
CREATE POLICY "Admins can view admin profiles" ON admin_profiles FOR SELECT TO authenticated USING (get_admin_role() IS NOT NULL);
CREATE POLICY "Admins can update their own profile" ON admin_profiles FOR UPDATE TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Super admins can update any admin profile" ON admin_profiles FOR UPDATE TO authenticated USING (get_admin_role() = 'super_admin');
CREATE POLICY "Super admins can insert admin profile" ON admin_profiles FOR INSERT TO authenticated WITH CHECK (get_admin_role() = 'super_admin');
CREATE POLICY "Super admins can delete admin profile" ON admin_profiles FOR DELETE TO authenticated USING (get_admin_role() = 'super_admin');

-- audit_logs policies
CREATE POLICY "Admins can view audit logs" ON audit_logs FOR SELECT TO authenticated USING (get_admin_role() IS NOT NULL);
CREATE POLICY "Admins can insert audit logs" ON audit_logs FOR INSERT TO authenticated WITH CHECK (get_admin_role() IS NOT NULL);

-- Indexes for performance
CREATE INDEX idx_project_inquiries_created_at ON project_inquiries(created_at DESC);
CREATE INDEX idx_project_inquiries_status ON project_inquiries(status);
CREATE INDEX idx_project_inquiries_project_type ON project_inquiries(project_type);

CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX idx_contact_messages_status ON contact_messages(status);
CREATE INDEX idx_contact_messages_email ON contact_messages(email);

CREATE INDEX idx_project_briefs_created_at ON project_briefs(created_at DESC);
CREATE INDEX idx_project_briefs_status ON project_briefs(status);

CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at DESC);
