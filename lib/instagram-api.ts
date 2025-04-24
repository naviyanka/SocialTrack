import { getSupabaseServerClient } from "./supabase"

// Instagram Graph API endpoints
const GRAPH_API_URL = "https://graph.instagram.com/v18.0"

// Default redirect URI if environment variable is not set
const DEFAULT_REDIRECT_URI = "https://socialspy-dashboard.vercel.app/api/auth/callback/instagram"

// Types
export type InstagramAccount = {
  id: string
  username: string
  name?: string
  profile_picture?: string
  access_token: string
  token_expires_at: Date
}

export type InstagramFollower = {
  id: string
  username: string
  full_name?: string
  profile_picture?: string
}

export type InstagramPost = {
  id: string
  caption?: string
  media_url: string
  permalink: string
  media_type: string
  timestamp: string
}

export type InstagramEngagement = {
  type: "like" | "comment"
  user_id: string
  username: string
  content?: string
  created_at: string
}

// Instagram API service
export const InstagramService = {
  // Authenticate with Instagram and get access token
  async authenticateWithInstagram(code: string) {
    try {
      // Get environment variables with fallbacks
      const clientId = process.env.INSTAGRAM_APP_ID || "1198721801751182"
      const clientSecret = process.env.INSTAGRAM_APP_SECRET || "4ff53f736b91095c8259db5503e2cc2b"
      const redirectUri = process.env.INSTAGRAM_REDIRECT_URI || DEFAULT_REDIRECT_URI

      const response = await fetch("https://api.instagram.com/oauth/access_token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: "authorization_code",
          redirect_uri: redirectUri,
          code,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to authenticate with Instagram")
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error("Error authenticating with Instagram:", error)
      throw error
    }
  },

  // Get long-lived access token
  async getLongLivedToken(shortLivedToken: string) {
    try {
      const clientSecret = process.env.INSTAGRAM_APP_SECRET || "4ff53f736b91095c8259db5503e2cc2b"

      const response = await fetch(
        `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${clientSecret}&access_token=${shortLivedToken}`,
      )

      if (!response.ok) {
        throw new Error("Failed to get long-lived token")
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error("Error getting long-lived token:", error)
      throw error
    }
  },

  // Get user profile
  async getUserProfile(accessToken: string) {
    try {
      const response = await fetch(`${GRAPH_API_URL}/me?fields=id,username,account_type&access_token=${accessToken}`)

      if (!response.ok) {
        throw new Error("Failed to get user profile")
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error("Error getting user profile:", error)
      throw error
    }
  },

  // Get user media
  async getUserMedia(accessToken: string, limit = 25) {
    try {
      const response = await fetch(
        `${GRAPH_API_URL}/me/media?fields=id,caption,media_url,permalink,media_type,timestamp,like_count,comments_count&limit=${limit}&access_token=${accessToken}`,
      )

      if (!response.ok) {
        throw new Error("Failed to get user media")
      }

      const data = await response.json()
      return data.data
    } catch (error) {
      console.error("Error getting user media:", error)
      throw error
    }
  },

  // Get media insights
  async getMediaInsights(mediaId: string, accessToken: string) {
    try {
      const response = await fetch(
        `${GRAPH_API_URL}/${mediaId}/insights?metric=engagement,impressions,reach,saved&access_token=${accessToken}`,
      )

      if (!response.ok) {
        throw new Error("Failed to get media insights")
      }

      const data = await response.json()
      return data.data
    } catch (error) {
      console.error("Error getting media insights:", error)
      throw error
    }
  },

  // Simulate getting followers (Instagram API doesn't provide this for basic display API)
  async simulateGetFollowers(accountId: string) {
    // In a real app, you would use Instagram Graph API with appropriate permissions
    // For this demo, we'll generate random followers
    const supabase = getSupabaseServerClient()

    // Check if we already have followers for this account
    const { data: existingFollowers } = await supabase.from("followers").select("*").eq("account_id", accountId)

    if (existingFollowers && existingFollowers.length > 0) {
      return existingFollowers
    }

    // Generate random followers
    const randomFollowers = Array.from({ length: 50 }, (_, i) => ({
      instagram_id: `${10000000 + i}`,
      username: `user_${i}`,
      full_name: `User ${i}`,
      profile_picture: `/placeholder.svg?height=32&width=32`,
      account_id: accountId,
      status: "active",
    }))

    return randomFollowers
  },
}
