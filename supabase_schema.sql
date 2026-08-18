-- =========================================================
-- DECIDE - A Transparent Decision Model for Shopping
-- Supabase / PostgreSQL Database Schema
-- =========================================================

-- 1. Product Catalog
CREATE TABLE IF NOT EXISTS products (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  brand TEXT NOT NULL,
  category TEXT NOT NULL,
  price NUMERIC NOT NULL,
  rating NUMERIC NOT NULL,
  thumbnail TEXT,
  attributes JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Shopping Missions (Captured User Intent & Constraints)
CREATE TABLE IF NOT EXISTS missions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  query TEXT NOT NULL,
  category TEXT NOT NULL,
  budget_max NUMERIC NOT NULL,
  priorities JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Saved Decisions (Persisted Trade-off Choices)
CREATE TABLE IF NOT EXISTS decisions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mission_id UUID REFERENCES missions(id) ON DELETE CASCADE,
  product_id BIGINT REFERENCES products(id) ON DELETE CASCADE,
  match_score NUMERIC NOT NULL,
  saved BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (Public Read/Write for Hackathon Demo)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE missions ENABLE ROW LEVEL SECURITY;
ALTER TABLE decisions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on products" ON products FOR SELECT USING (true);
CREATE POLICY "Allow public insert on missions" ON missions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select on missions" ON missions FOR SELECT USING (true);
CREATE POLICY "Allow public insert on decisions" ON decisions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select on decisions" ON decisions FOR SELECT USING (true);
