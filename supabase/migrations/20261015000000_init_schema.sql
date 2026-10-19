-- Migration: Initial Schema & Multi-Tenant Row Level Security (RLS) Policies
-- Date: 2026-10-15
-- Product: TrueReview Multi-Business MVP

-- ============================================================================
-- 1. Helper Functions & Custom Types
-- ============================================================================

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$ BEGIN
    CREATE TYPE public.business_role AS ENUM ('owner', 'manager', 'staff');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ============================================================================
-- 2. Tables Creation (in foreign key dependency order)
-- ============================================================================

-- 2.1 Profiles Table (Extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    display_name TEXT,
    email TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2.2 Businesses Table (Multi-Tenant Entity)
CREATE TABLE IF NOT EXISTS public.businesses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE RESTRICT,
    name TEXT NOT NULL CHECK (char_length(name) >= 2 AND char_length(name) <= 100),
    slug TEXT NOT NULL UNIQUE CHECK (slug ~* '^[a-z0-9]+(-[a-z0-9]+)*$' AND char_length(slug) >= 3 AND char_length(slug) <= 50),
    description TEXT,
    welcome_message TEXT DEFAULT 'Thank you for visiting us! We value your authentic feedback.',
    logo_path TEXT,
    primary_color TEXT DEFAULT '#2563eb' CHECK (primary_color ~* '^#[0-9a-fA-F]{6}$'),
    website_url TEXT,
    google_review_url TEXT,
    ai_assist_enabled BOOLEAN NOT NULL DEFAULT false,
    private_feedback_enabled BOOLEAN NOT NULL DEFAULT true,
    feedback_retention_days INTEGER NOT NULL DEFAULT 90 CHECK (feedback_retention_days >= 7 AND feedback_retention_days <= 365),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2.3 Business Memberships Table (Multi-User & Multi-Business Support)
CREATE TABLE IF NOT EXISTS public.business_memberships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role public.business_role NOT NULL DEFAULT 'manager',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    UNIQUE(business_id, user_id)
);

-- 2.4 Feedback Submissions Table (Private Customer Feedback)
CREATE TABLE IF NOT EXISTS public.feedback_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
    message TEXT NOT NULL CHECK (char_length(message) >= 2 AND char_length(message) <= 2000),
    customer_name TEXT CHECK (char_length(customer_name) <= 100),
    customer_phone TEXT CHECK (char_length(customer_phone) <= 20),
    consent_to_store BOOLEAN NOT NULL DEFAULT true,
    source TEXT NOT NULL DEFAULT 'qr_public_page',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2.5 Analytics Events Table (Truthful Metrics)
CREATE TABLE IF NOT EXISTS public.analytics_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
    event_name TEXT NOT NULL CHECK (
        event_name IN (
            'public_page_view',
            'private_feedback_started',
            'private_feedback_submitted',
            'ai_assist_requested',
            'ai_assist_completed',
            'google_review_link_clicked',
            'qr_downloaded'
        )
    ),
    anonymous_session_id TEXT CHECK (char_length(anonymous_session_id) <= 64),
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ============================================================================
-- 3. Indexes & Triggers
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_businesses_slug ON public.businesses (slug);
CREATE INDEX IF NOT EXISTS idx_businesses_owner ON public.businesses (owner_user_id);
CREATE INDEX IF NOT EXISTS idx_memberships_user ON public.business_memberships (user_id);
CREATE INDEX IF NOT EXISTS idx_memberships_business ON public.business_memberships (business_id);
CREATE INDEX IF NOT EXISTS idx_feedback_business_created ON public.feedback_submissions (business_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_business_event_created ON public.analytics_events (business_id, event_name, created_at DESC);

DROP TRIGGER IF EXISTS set_profiles_updated_at ON public.profiles;
CREATE TRIGGER set_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_businesses_updated_at ON public.businesses;
CREATE TRIGGER set_businesses_updated_at
    BEFORE UPDATE ON public.businesses
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================================
-- 4. Enable Row Level Security (RLS) on all tables
-- ============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- 5. RLS Policies
-- ============================================================================

-- 5.1 Profiles Policies
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
CREATE POLICY "Users can view their own profile"
    ON public.profiles FOR SELECT
    TO authenticated
    USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile"
    ON public.profiles FOR UPDATE
    TO authenticated
    USING (auth.uid() = id);

-- 5.2 Businesses Policies
DROP POLICY IF EXISTS "Public can view active business profiles" ON public.businesses;
CREATE POLICY "Public can view active business profiles"
    ON public.businesses FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Owners can insert their own businesses" ON public.businesses;
CREATE POLICY "Owners can insert their own businesses"
    ON public.businesses FOR INSERT
    TO authenticated
    WITH CHECK (owner_user_id = auth.uid());

DROP POLICY IF EXISTS "Members and owners can view their businesses" ON public.businesses;
CREATE POLICY "Members and owners can view their businesses"
    ON public.businesses FOR SELECT
    TO authenticated
    USING (
        owner_user_id = auth.uid()
        OR EXISTS (
            SELECT 1 FROM public.business_memberships bm
            WHERE bm.business_id = businesses.id AND bm.user_id = auth.uid()
        )
    );

DROP POLICY IF EXISTS "Owners and managers can update their business" ON public.businesses;
CREATE POLICY "Owners and managers can update their business"
    ON public.businesses FOR UPDATE
    TO authenticated
    USING (
        owner_user_id = auth.uid()
        OR EXISTS (
            SELECT 1 FROM public.business_memberships bm
            WHERE bm.business_id = businesses.id 
              AND bm.user_id = auth.uid() 
              AND bm.role IN ('owner', 'manager')
        )
    );

DROP POLICY IF EXISTS "Owners can delete their business" ON public.businesses;
CREATE POLICY "Owners can delete their business"
    ON public.businesses FOR DELETE
    TO authenticated
    USING (owner_user_id = auth.uid());

-- 5.3 Business Memberships Policies
DROP POLICY IF EXISTS "Members can view their own memberships" ON public.business_memberships;
CREATE POLICY "Members can view their own memberships"
    ON public.business_memberships FOR SELECT
    TO authenticated
    USING (user_id = auth.uid());

-- 5.4 Feedback Submissions Policies
DROP POLICY IF EXISTS "Public can submit private feedback" ON public.feedback_submissions;
CREATE POLICY "Public can submit private feedback"
    ON public.feedback_submissions FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.businesses b 
            WHERE b.id = business_id AND b.private_feedback_enabled = true
        )
    );

DROP POLICY IF EXISTS "Authorized members can view feedback for their business" ON public.feedback_submissions;
CREATE POLICY "Authorized members can view feedback for their business"
    ON public.feedback_submissions FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.businesses b
            WHERE b.id = feedback_submissions.business_id AND b.owner_user_id = auth.uid()
        )
        OR EXISTS (
            SELECT 1 FROM public.business_memberships bm
            WHERE bm.business_id = feedback_submissions.business_id AND bm.user_id = auth.uid()
        )
    );

DROP POLICY IF EXISTS "Owners and managers can delete feedback" ON public.feedback_submissions;
CREATE POLICY "Owners and managers can delete feedback"
    ON public.feedback_submissions FOR DELETE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.businesses b
            WHERE b.id = feedback_submissions.business_id AND b.owner_user_id = auth.uid()
        )
        OR EXISTS (
            SELECT 1 FROM public.business_memberships bm
            WHERE bm.business_id = feedback_submissions.business_id 
              AND bm.user_id = auth.uid() 
              AND bm.role IN ('owner', 'manager')
        )
    );

-- 5.5 Analytics Events Policies
DROP POLICY IF EXISTS "Public can log permitted analytics events" ON public.analytics_events;
CREATE POLICY "Public can log permitted analytics events"
    ON public.analytics_events FOR INSERT
    WITH CHECK (
        EXISTS (SELECT 1 FROM public.businesses b WHERE b.id = business_id)
    );

DROP POLICY IF EXISTS "Authorized members can query analytics for their business" ON public.analytics_events;
CREATE POLICY "Authorized members can query analytics for their business"
    ON public.analytics_events FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.businesses b
            WHERE b.id = analytics_events.business_id AND b.owner_user_id = auth.uid()
        )
        OR EXISTS (
            SELECT 1 FROM public.business_memberships bm
            WHERE bm.business_id = analytics_events.business_id AND bm.user_id = auth.uid()
        )
    );
