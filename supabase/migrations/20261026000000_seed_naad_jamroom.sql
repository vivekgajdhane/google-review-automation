-- ============================================================================
-- Seed Migration: Naad Jamroom and studio (Kharadi, Pune)
-- Business #3 in TrueReview Registry
-- ============================================================================

INSERT INTO public.businesses (
    name,
    slug,
    google_place_id,
    google_review_url,
    category,
    phone,
    whatsapp,
    address,
    website_url,
    private_feedback_enabled,
    qr_mode_default,
    metadata
) VALUES (
    'Naad Jamroom and studio',
    'naadjamroom',
    'ChQIq5-yg-LssOE7EIC03_jdt8OoZQ',
    'https://www.google.com/maps/place/Naad+Jamroom+and+studio/@18.5607059,73.9393504,892m/data=!3m1!1e3!4m18!1m9!3m8!1s0x3bc2c366206c8fab:0x65510dbddf17da00!2sNaad+Jamroom+and+studio!8m2!3d18.5607008!4d73.9419307!9m1!1b1!16s%2Fg%2F11qgyk6z4x!3m7!1s0x3bc2c366206c8fab:0x65510dbddf17da00!8m2!3d18.5607008!4d73.9419307!9m1!1b1!16s%2Fg%2F11qgyk6z4x?entry=ttu&g_ep=EgoyMDI2MTAyMC4wIKXMDSoASAFQAw%3D%3D',
    'Jam Room & Audio Recording Studio',
    '+91 73852 60556',
    '917385260556',
    'Lane no 6, Parashar Housing Society, Pathare Thube Nagar Kharadi, Pune, Maharashtra 411014',
    '',
    true,
    'software',
    '{
        "tagline": "Kharadi, Pune • Jam Room & Music Recording Studio",
        "welcomeMessage": "Where music finds its rhythm! Share your jamming & recording experience on Google.",
        "primaryColor": "#143736",
        "accentColor": "#E89C3B",
        "rating": 4.9,
        "reviewCount": 125,
        "instagram1": "https://www.instagram.com/naad_jamroom/",
        "instagram1Label": "@naad_jamroom",
        "googleMapsUrl": "https://maps.app.goo.gl/ckY5Jtm92VDcsosd6",
        "logoPath": "/assets/naad-logo.png"
    }'::jsonb
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    google_review_url = EXCLUDED.google_review_url,
    category = EXCLUDED.category,
    phone = EXCLUDED.phone,
    whatsapp = EXCLUDED.whatsapp,
    address = EXCLUDED.address,
    website_url = EXCLUDED.website_url,
    metadata = EXCLUDED.metadata;
