export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      "peers-reviews": {
        Row: {
          id: number
          created_at: string | null
          review: Json | null
          user_id: string | null
        }
        Insert: {
          id?: number
          created_at?: string | null
          review?: Json | null
          user_id?: string | null
        }
        Update: {
          id?: number
          created_at?: string | null
          review?: Json | null
          user_id?: string | null
        }
      }
      profiles: {
        Row: {
          id: string
          updated_at: string | null
          username: string | null
          full_name: string | null
          avatar_url: string | null
          website: string | null
          bio: string | null
        }
        Insert: {
          id: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
          bio?: string | null
        }
        Update: {
          id?: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
          bio?: string | null
        }
      }
      "user-images": {
        Row: {
          created_at: string | null
          imageSrc: string | null
          is_public: boolean | null
          user_id: string | null
          id: string
          description: string | null
        }
        Insert: {
          created_at?: string | null
          imageSrc?: string | null
          is_public?: boolean | null
          user_id?: string | null
          id?: string
          description?: string | null
        }
        Update: {
          created_at?: string | null
          imageSrc?: string | null
          is_public?: boolean | null
          user_id?: string | null
          id?: string
          description?: string | null
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
