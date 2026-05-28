export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          venue_name: string
          sport_types: string[]
          location: string
          phone: string
          avatar_url: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          venue_name?: string
          sport_types?: string[]
          location?: string
          phone?: string
          avatar_url?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          venue_name?: string
          sport_types?: string[]
          location?: string
          phone?: string
          avatar_url?: string
          created_at?: string
          updated_at?: string
        }
      }
      captions: {
        Row: {
          id: string
          user_id: string
          venue_name: string
          sport_type: string
          tournament_name: string
          offer_details: string
          date_time: string
          prize_pool: string
          available_slots: number
          location: string
          audience_type: string
          tone: string
          instagram_caption: string
          whatsapp_message: string
          facebook_post: string
          hashtags: string[]
          headline: string
          story_idea: string
          ad_copy: string
          is_favorite: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          venue_name?: string
          sport_type?: string
          tournament_name?: string
          offer_details?: string
          date_time?: string
          prize_pool?: string
          available_slots?: number
          location?: string
          audience_type?: string
          tone?: string
          instagram_caption?: string
          whatsapp_message?: string
          facebook_post?: string
          hashtags?: string[]
          headline?: string
          story_idea?: string
          ad_copy?: string
          is_favorite?: boolean
          created_at?: string
        }
        Update: {
          venue_name?: string
          sport_type?: string
          tournament_name?: string
          offer_details?: string
          date_time?: string
          prize_pool?: string
          available_slots?: number
          location?: string
          audience_type?: string
          tone?: string
          instagram_caption?: string
          whatsapp_message?: string
          facebook_post?: string
          hashtags?: string[]
          headline?: string
          story_idea?: string
          ad_copy?: string
          is_favorite?: boolean
          created_at?: string
        }
      }
      templates: {
        Row: {
          id: string
          name: string
          category: string
          sport_type: string
          template_content: string
          preview_text: string
          is_premium: boolean
          usage_count: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          category: string
          sport_type?: string
          template_content: string
          preview_text?: string
          is_premium?: boolean
          usage_count?: number
          created_at?: string
        }
        Update: {
          name?: string
          category?: string
          sport_type?: string
          template_content?: string
          preview_text?: string
          is_premium?: boolean
          usage_count?: number
          created_at?: string
        }
      }
      user_analytics: {
        Row: {
          id: string
          user_id: string
          captions_generated: number
          hashtags_generated: number
          templates_used: number
          top_sport: string
          top_tone: string
          last_generated_at: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          captions_generated?: number
          hashtags_generated?: number
          templates_used?: number
          top_sport?: string
          top_tone?: string
          last_generated_at?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          captions_generated?: number
          hashtags_generated?: number
          templates_used?: number
          top_sport?: string
          top_tone?: string
          last_generated_at?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
