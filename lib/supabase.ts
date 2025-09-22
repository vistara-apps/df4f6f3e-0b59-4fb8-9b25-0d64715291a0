import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          farcaster_id: string;
          username: string;
          bio: string;
          skills: string[];
          interests: string[];
          wallet_address: string | null;
          avatar: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          farcaster_id: string;
          username: string;
          bio: string;
          skills: string[];
          interests: string[];
          wallet_address?: string | null;
          avatar?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          farcaster_id?: string;
          username?: string;
          bio?: string;
          skills?: string[];
          interests?: string[];
          wallet_address?: string | null;
          avatar?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          project_name: string;
          description: string;
          required_skills: string[];
          desired_outcomes: string[];
          creator_id: string;
          category: string | null;
          tags: string[] | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          project_name: string;
          description: string;
          required_skills: string[];
          desired_outcomes: string[];
          creator_id: string;
          category?: string | null;
          tags?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          project_name?: string;
          description?: string;
          required_skills?: string[];
          desired_outcomes?: string[];
          creator_id?: string;
          category?: string | null;
          tags?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      swipes: {
        Row: {
          id: string;
          swiper_id: string;
          project_id: string;
          direction: 'left' | 'right';
          created_at: string;
        };
        Insert: {
          id?: string;
          swiper_id: string;
          project_id: string;
          direction: 'left' | 'right';
          created_at?: string;
        };
        Update: {
          id?: string;
          swiper_id?: string;
          project_id?: string;
          direction?: 'left' | 'right';
          created_at?: string;
        };
      };
      matches: {
        Row: {
          id: string;
          user_id_1: string;
          user_id_2: string;
          project_id: string;
          matched_at: string;
        };
        Insert: {
          id?: string;
          user_id_1: string;
          user_id_2: string;
          project_id: string;
          matched_at?: string;
        };
        Update: {
          id?: string;
          user_id_1?: string;
          user_id_2?: string;
          project_id?: string;
          matched_at?: string;
        };
      };
      chat_messages: {
        Row: {
          id: string;
          match_id: string;
          sender_id: string;
          message: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          match_id: string;
          sender_id: string;
          message: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          match_id?: string;
          sender_id?: string;
          message?: string;
          created_at?: string;
        };
      };
    };
  };
}

