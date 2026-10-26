-- ============================================================================
-- Seed Migration: Bhikshu Tattoo Studio (Viman Nagar, Pune)
-- Business #2 in TrueReview Registry
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
    'Bhikshu Tattoo Studio',
    'bhikshu-tattoo',
    'ChIJl4cbg-7BwjsRIZyUpe-bWzE',
    'https://www.google.com/maps/place/Bhikshu+Tattoo+Studio+%7C+Best+tattoo+studio+in+pune/@18.5654478,73.9105924,112m/data=!3m1!1e3!4m8!3m7!1s0x3bc2c15ecc1b8797:0x315b9b1fa5949c21!8m2!3d18.5654477!4d73.9109004!9m1!1b1!16s%2Fg%2F11qnttbv42?entry=ttu&g_ep=EgoyMDI2MTAyMC4wIKXMDSoASAFQAw%3D%3D',
    'Tattoo & Body Art Studio',
    '+91 96899 76453',
    '919689976453',
    'Lane No.12, Row House 3, Konark Nagar, CCD Chowk, opp. Udaan Bio-Diversity Park, Viman Nagar, Pune, Maharashtra 411014',
    'https://www.bhikshutattoostudio.com/',
    true,
    'software',
    '{
        "tagline": "Viman Nagar, Pune • Connecting Stories to Tattoo",
        "welcomeMessage": "Connecting your stories to your tattoo with peace & precision. Share your ink journey on Google.",
        "primaryColor": "#4A554D",
        "accentColor": "#FAF9F5",
        "rating": 5.0,
        "reviewCount": 403,
        "instagram1": "https://www.instagram.com/bhikshu_tattoo/",
        "instagram1Label": "@bhikshu_tattoo",
        "instagram2": "https://www.instagram.com/bhikshutattoo/",
        "instagram2Label": "@bhikshutattoo",
        "facebookUrl": "https://www.facebook.com/bhikshutattoo",
        "email": "bhikshutattoo.gmb@gmail.com",
        "logoPath": "/assets/bhikshu-logo.png"
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
