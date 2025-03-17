/*
  # Roles and Permissions System

  1. New Tables
    - `roles`
      - Store user roles (admin, parent, driver, cook, teacher)
    - `permissions`
      - Store available permissions
    - `role_permissions`
      - Junction table for role-permission relationships
    - Add role_id to auth.users

  2. Security
    - Enable RLS on all tables
    - Only admins can manage roles and permissions
    - Users can view their own role and permissions
*/

-- Create roles table
CREATE TABLE IF NOT EXISTS roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create permissions table
CREATE TABLE IF NOT EXISTS permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Create role_permissions junction table
CREATE TABLE IF NOT EXISTS role_permissions (
  role_id uuid REFERENCES roles(id) ON DELETE CASCADE,
  permission_id uuid REFERENCES permissions(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (role_id, permission_id)
);

-- Add role_id to auth.users
ALTER TABLE auth.users 
ADD COLUMN IF NOT EXISTS role_id uuid REFERENCES roles(id);

-- Enable RLS
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_permissions ENABLE ROW LEVEL SECURITY;

-- Policies for roles table
CREATE POLICY "Allow read access to all authenticated users"
  ON roles
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only admins can insert roles"
  ON roles
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.role_id IN (
        SELECT id FROM roles WHERE name = 'admin'
      )
    )
  );

-- Policies for permissions table
CREATE POLICY "Allow read access to all authenticated users"
  ON permissions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only admins can insert permissions"
  ON permissions
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.role_id IN (
        SELECT id FROM roles WHERE name = 'admin'
      )
    )
  );

-- Policies for role_permissions table
CREATE POLICY "Allow read access to all authenticated users"
  ON role_permissions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only admins can manage role permissions"
  ON role_permissions
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.role_id IN (
        SELECT id FROM roles WHERE name = 'admin'
      )
    )
  );

-- Insert default roles
INSERT INTO roles (name, description) VALUES
  ('admin', 'Administrator with full access'),
  ('parent', 'Parent with access to their children''s information'),
  ('driver', 'Bus driver with access to route information'),
  ('cook', 'Kitchen staff with access to meal management'),
  ('teacher', 'Teacher with access to class information')
ON CONFLICT (name) DO NOTHING;

-- Insert default permissions
INSERT INTO permissions (name, description) VALUES
  ('manage_users', 'Can manage users'),
  ('manage_roles', 'Can manage roles and permissions'),
  ('view_dashboard', 'Can view dashboard'),
  ('manage_routes', 'Can manage bus routes'),
  ('manage_meals', 'Can manage meals'),
  ('view_reports', 'Can view reports'),
  ('manage_students', 'Can manage students'),
  ('view_own_children', 'Can view own children''s information'),
  ('manage_attendance', 'Can manage attendance'),
  ('manage_chat', 'Can use chat system')
ON CONFLICT (name) DO NOTHING;

-- Assign default permissions to roles
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
CROSS JOIN permissions p
WHERE 
  (r.name = 'admin') OR
  (r.name = 'parent' AND p.name IN ('view_dashboard', 'view_own_children', 'manage_chat')) OR
  (r.name = 'driver' AND p.name IN ('view_dashboard', 'manage_routes', 'manage_attendance')) OR
  (r.name = 'cook' AND p.name IN ('view_dashboard', 'manage_meals')) OR
  (r.name = 'teacher' AND p.name IN ('view_dashboard', 'manage_attendance', 'manage_students'))
ON CONFLICT (role_id, permission_id) DO NOTHING;