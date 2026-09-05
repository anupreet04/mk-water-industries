/*
# Create inquiries table for contact form submissions

1. New Tables
- `inquiries`
  - `id` (uuid, primary key, auto-generated)
  - `name` (text, not null) — submitter's full name
  - `phone` (text, not null) — submitter's phone number
  - `email` (text, nullable) — submitter's email address
  - `company` (text, nullable) — submitter's company/organization
  - `city` (text, not null) — submitter's city
  - `state` (text, nullable) — submitter's state
  - `product` (text, nullable) — product interested in
  - `quantity` (text, nullable) — quantity required
  - `message` (text, not null) — inquiry message
  - `status` (text, default 'new') — inquiry status for admin tracking
  - `created_at` (timestamptz, default now()) — submission timestamp

2. Security
- Enable RLS on `inquiries`.
- Allow anon + authenticated INSERT only (public contact form, no sign-in).
- No SELECT/UPDATE/DELETE for anon or authenticated — only the service role
  (used server-side in the API route) can read inquiries. This prevents
  anyone from scraping submitted inquiries through the anon key.

3. Important Notes
- This is a single-tenant public contact form — no user accounts.
- The API route (app/api/contact/route.ts) uses the service role key
  server-side to insert rows, so RLS is effectively bypassed there.
- The anon INSERT policy is a safety net for any direct client inserts.
*/

CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  email text,
  company text,
  city text NOT NULL,
  state text,
  product text,
  quantity text,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_inquiries" ON inquiries;
CREATE POLICY "anon_insert_inquiries"
ON inquiries FOR INSERT
TO anon, authenticated WITH CHECK (true);

-- No SELECT/UPDATE/DELETE policies: only service role can read/manage inquiries.