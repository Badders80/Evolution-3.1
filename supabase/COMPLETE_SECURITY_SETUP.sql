-- =====================================================
-- COMPLETE SECURITY SETUP - RUN ALL AT ONCE
-- =====================================================
-- Copy this ENTIRE file and run in Supabase SQL Editor
-- https://supabase.com/dashboard/project/coqtijrftaklcwgbnqef/sql/new
-- =====================================================

BEGIN;

-- =====================================================
-- STEP 1: CREATE PROFILES TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin', 'syndicator', 'investor')),
  full_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    'user',
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- STEP 2: ADD is_favorite COLUMN TO OWNERS
-- =====================================================

ALTER TABLE owners ADD COLUMN IF NOT EXISTS is_favorite BOOLEAN DEFAULT false;
CREATE INDEX IF NOT EXISTS idx_owners_is_favorite ON owners(is_favorite);

-- =====================================================
-- STEP 3: ENABLE RLS ON ALL TABLES
-- =====================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE owners ENABLE ROW LEVEL SECURITY;
ALTER TABLE horses ENABLE ROW LEVEL SECURITY;
ALTER TABLE term_sheets ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- STEP 4: PROFILES TABLE POLICIES
-- =====================================================

DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Admins can update any profile" ON profiles;
CREATE POLICY "Admins can update any profile"
  ON profiles FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- =====================================================
-- STEP 5: OWNERS TABLE POLICIES
-- =====================================================

DROP POLICY IF EXISTS "Anyone can view syndicators" ON owners;
CREATE POLICY "Anyone can view syndicators"
  ON owners FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Syndicators can update own profile" ON owners;
CREATE POLICY "Syndicators can update own profile"
  ON owners FOR UPDATE
  USING (
    auth.uid() IN (
      SELECT user_id FROM profiles
      WHERE id = auth.uid() AND role = 'syndicator'
    )
  );

DROP POLICY IF EXISTS "Admins can manage all syndicators" ON owners;
CREATE POLICY "Admins can manage all syndicators"
  ON owners FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Admins can create syndicators" ON owners;
CREATE POLICY "Admins can create syndicators"
  ON owners FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- =====================================================
-- STEP 6: HORSES TABLE POLICIES
-- =====================================================

DROP POLICY IF EXISTS "Authenticated users can view horses" ON horses;
CREATE POLICY "Authenticated users can view horses"
  ON horses FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Trainers can update their horses" ON horses;
CREATE POLICY "Trainers can update their horses"
  ON horses FOR UPDATE
  USING (
    trainer_id IN (
      SELECT id FROM owners
      WHERE id = trainer_id
    )
  );

DROP POLICY IF EXISTS "Admins can manage all horses" ON horses;
CREATE POLICY "Admins can manage all horses"
  ON horses FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Admins can create horses" ON horses;
CREATE POLICY "Admins can create horses"
  ON horses FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- =====================================================
-- STEP 7: TERM_SHEETS TABLE POLICIES
-- =====================================================

DROP POLICY IF EXISTS "Users can view relevant term sheets" ON term_sheets;
CREATE POLICY "Users can view relevant term sheets"
  ON term_sheets FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
    OR
    owner_id IN (
      SELECT id FROM owners
      WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );

DROP POLICY IF EXISTS "Admins can create term sheets" ON term_sheets;
CREATE POLICY "Admins can create term sheets"
  ON term_sheets FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Admins can update term sheets" ON term_sheets;
CREATE POLICY "Admins can update term sheets"
  ON term_sheets FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Admins can delete term sheets" ON term_sheets;
CREATE POLICY "Admins can delete term sheets"
  ON term_sheets FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Syndicators can update own term sheets" ON term_sheets;
CREATE POLICY "Syndicators can update own term sheets"
  ON term_sheets FOR UPDATE
  USING (
    owner_id IN (
      SELECT id FROM owners
      WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );

-- =====================================================
-- STEP 8: HELPER FUNCTIONS
-- =====================================================

CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION owns_syndicator(syndicator_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM owners
    WHERE id = syndicator_id
    AND email = (SELECT email FROM auth.users WHERE id = auth.uid())
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMIT;

-- =====================================================
-- VERIFY SETUP
-- =====================================================

-- Check RLS is enabled
SELECT
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN ('profiles', 'owners', 'horses', 'term_sheets')
ORDER BY tablename;

-- Count policies per table
SELECT
  schemaname,
  tablename,
  COUNT(*) as policy_count
FROM pg_policies
WHERE schemaname = 'public'
GROUP BY schemaname, tablename
ORDER BY tablename;

-- =====================================================
-- ✅ SUCCESS!
-- =====================================================
-- All tables should show rowsecurity = true
-- Each table should have multiple policies
--
-- NEXT: Make yourself admin by running:
-- UPDATE profiles SET role = 'admin' WHERE email = 'YOUR_EMAIL@example.com';
-- =====================================================
