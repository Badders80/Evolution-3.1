-- =====================================================
-- SUPABASE SECURITY: ROW LEVEL SECURITY POLICIES
-- =====================================================
-- Run this in Supabase SQL Editor after rotating keys
-- https://supabase.com/dashboard/project/coqtijrftaklcwgbnqef/sql/new
--
-- This file establishes proper RLS policies for all tables
-- =====================================================

-- =====================================================
-- 1. PROFILES TABLE (User Management)
-- =====================================================

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Admins can view all profiles
CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Admins can update any profile
CREATE POLICY "Admins can update any profile"
  ON profiles FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- =====================================================
-- 2. OWNERS TABLE (Syndicators)
-- =====================================================

-- Enable RLS
ALTER TABLE owners ENABLE ROW LEVEL SECURITY;

-- Public read access for marketplace browsing
CREATE POLICY "Anyone can view syndicators"
  ON owners FOR SELECT
  TO authenticated
  USING (true);

-- Syndicators can update their own profile
CREATE POLICY "Syndicators can update own profile"
  ON owners FOR UPDATE
  USING (
    auth.uid() IN (
      SELECT user_id FROM profiles
      WHERE id = auth.uid() AND role = 'syndicator'
    )
  );

-- Admins can do everything
CREATE POLICY "Admins can manage all syndicators"
  ON owners FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Admins can insert new syndicators
CREATE POLICY "Admins can create syndicators"
  ON owners FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- =====================================================
-- 3. HORSES TABLE
-- =====================================================

-- Enable RLS
ALTER TABLE horses ENABLE ROW LEVEL SECURITY;

-- Authenticated users can view all horses
CREATE POLICY "Authenticated users can view horses"
  ON horses FOR SELECT
  TO authenticated
  USING (true);

-- Trainers (syndicators) can update horses they train
CREATE POLICY "Trainers can update their horses"
  ON horses FOR UPDATE
  USING (
    trainer_id IN (
      SELECT id FROM owners
      WHERE id = trainer_id
    )
  );

-- Admins can do everything with horses
CREATE POLICY "Admins can manage all horses"
  ON horses FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Admins can insert horses
CREATE POLICY "Admins can create horses"
  ON horses FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- =====================================================
-- 4. TERM_SHEETS TABLE
-- =====================================================

-- Enable RLS
ALTER TABLE term_sheets ENABLE ROW LEVEL SECURITY;

-- Users can view term sheets for horses they're involved with
CREATE POLICY "Users can view relevant term sheets"
  ON term_sheets FOR SELECT
  TO authenticated
  USING (
    -- Admins can see all
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
    OR
    -- Syndicator can see their own term sheets
    owner_id IN (
      SELECT id FROM owners
      WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
    OR
    -- Future: investors can see term sheets they've invested in
    FALSE -- Placeholder for investor logic
  );

-- Admins can create term sheets
CREATE POLICY "Admins can create term sheets"
  ON term_sheets FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Admins can update term sheets
CREATE POLICY "Admins can update term sheets"
  ON term_sheets FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Admins can delete term sheets
CREATE POLICY "Admins can delete term sheets"
  ON term_sheets FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Syndicators can update their own term sheets (status, notes)
CREATE POLICY "Syndicators can update own term sheets"
  ON term_sheets FOR UPDATE
  USING (
    owner_id IN (
      SELECT id FROM owners
      WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );

-- =====================================================
-- 5. DRAFTS TABLE (When Added)
-- =====================================================
-- Uncomment when drafts table is created

-- ALTER TABLE drafts ENABLE ROW LEVEL SECURITY;

-- CREATE POLICY "Users can view own drafts"
--   ON drafts FOR SELECT
--   USING (auth.uid() = user_id);

-- CREATE POLICY "Users can create own drafts"
--   ON drafts FOR INSERT
--   WITH CHECK (auth.uid() = user_id);

-- CREATE POLICY "Users can update own drafts"
--   ON drafts FOR UPDATE
--   USING (auth.uid() = user_id);

-- CREATE POLICY "Users can delete own drafts"
--   ON drafts FOR DELETE
--   USING (auth.uid() = user_id);

-- CREATE POLICY "Admins can view all drafts"
--   ON drafts FOR SELECT
--   USING (
--     EXISTS (
--       SELECT 1 FROM profiles
--       WHERE id = auth.uid() AND role = 'admin'
--     )
--   );

-- =====================================================
-- 6. HELPER FUNCTIONS
-- =====================================================

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user owns a syndicator
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

-- =====================================================
-- 7. VERIFY RLS IS ENABLED
-- =====================================================

-- Check that RLS is enabled on all tables
SELECT
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN ('profiles', 'owners', 'horses', 'term_sheets')
ORDER BY tablename;

-- This should show rowsecurity = true for all tables

-- =====================================================
-- NOTES:
-- =====================================================
-- 1. After running this, test with different user roles
-- 2. Service role key bypasses RLS - use ONLY in server components
-- 3. Add more granular policies as features develop
-- 4. Consider adding policies for:
--    - Investment tracking
--    - Document uploads
--    - Payment records
-- =====================================================
