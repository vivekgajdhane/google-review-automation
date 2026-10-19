export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type AllowedAnalyticsEvent =
  | "public_page_view"
  | "private_feedback_started"
  | "private_feedback_submitted"
  | "ai_assist_requested"
  | "ai_assist_completed"
  | "google_review_link_clicked"
  | "qr_downloaded";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          display_name: string | null;
          email: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          display_name?: string | null;
          email?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          display_name?: string | null;
          email?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      businesses: {
        Row: {
          id: string;
          owner_user_id: string;
          name: string;
          slug: string;
          description: string | null;
          welcome_message: string | null;
          logo_path: string | null;
          primary_color: string;
          website_url: string | null;
          google_review_url: string | null;
          ai_assist_enabled: boolean;
          private_feedback_enabled: boolean;
          feedback_retention_days: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          owner_user_id: string;
          name: string;
          slug: string;
          description?: string | null;
          welcome_message?: string | null;
          logo_path?: string | null;
          primary_color?: string;
          website_url?: string | null;
          google_review_url?: string | null;
          ai_assist_enabled?: boolean;
          private_feedback_enabled?: boolean;
          feedback_retention_days?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          owner_user_id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          welcome_message?: string | null;
          logo_path?: string | null;
          primary_color?: string;
          website_url?: string | null;
          google_review_url?: string | null;
          ai_assist_enabled?: boolean;
          private_feedback_enabled?: boolean;
          feedback_retention_days?: number;
          updated_at?: string;
        };
        Relationships: [];
      };
      feedback_submissions: {
        Row: {
          id: string;
          business_id: string;
          message: string;
          customer_name: string | null;
          customer_phone: string | null;
          consent_to_store: boolean;
          source: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          business_id: string;
          message: string;
          customer_name?: string | null;
          customer_phone?: string | null;
          consent_to_store?: boolean;
          source?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          business_id?: string;
          message?: string;
          customer_name?: string | null;
          customer_phone?: string | null;
          consent_to_store?: boolean;
          source?: string;
        };
        Relationships: [];
      };
      analytics_events: {
        Row: {
          id: string;
          business_id: string;
          event_name: AllowedAnalyticsEvent;
          anonymous_session_id: string | null;
          metadata: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          business_id: string;
          event_name: AllowedAnalyticsEvent;
          anonymous_session_id?: string | null;
          metadata?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          business_id?: string;
          event_name?: AllowedAnalyticsEvent;
          anonymous_session_id?: string | null;
          metadata?: Json;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      business_role: "owner" | "manager" | "staff";
    };
    CompositeTypes: Record<string, never>;
  };
}
