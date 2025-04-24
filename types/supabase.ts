export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          name: string
          email: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          created_at?: string
          updated_at?: string
        }
      }
      accounts: {
        Row: {
          id: string
          user_id: string
          name: string
          username: string
          instagram_id: string
          profile_picture: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          username: string
          instagram_id: string
          profile_picture: string
          status: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          username?: string
          instagram_id?: string
          profile_picture?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      followers: {
        Row: {
          id: string
          account_id: string
          username: string
          name: string
          profile_picture: string
          followed_at: string
          unfollowed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          account_id: string
          username: string
          name: string
          profile_picture: string
          followed_at: string
          unfollowed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          account_id?: string
          username?: string
          name?: string
          profile_picture?: string
          followed_at?: string
          unfollowed_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      metrics: {
        Row: {
          id: string
          account_id: string
          date: string
          follower_count: number
          following_count: number
          gained_followers: number
          lost_followers: number
          likes_received: number
          comments_received: number
          engagement_rate: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          account_id: string
          date: string
          follower_count: number
          following_count: number
          gained_followers: number
          lost_followers: number
          likes_received: number
          comments_received: number
          engagement_rate: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          account_id?: string
          date?: string
          follower_count?: number
          following_count?: number
          gained_followers?: number
          lost_followers?: number
          likes_received?: number
          comments_received?: number
          engagement_rate?: number
          created_at?: string
          updated_at?: string
        }
      }
      notification_settings: {
        Row: {
          id: string
          user_id: string
          account_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          account_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          account_id?: string
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