import { MockInstagramAPI } from "@/lib/mock-instagram-api"
import { getSupabaseServerClient } from "@/lib/supabase"

// Default redirect URI if environment variable is not set
const DEFAULT_REDIRECT_URI = "https://socialspy-dashboard.vercel.app/api/auth/callback/instagram"

// Instagram service that uses the mock API
export const InstagramService = {
  // Get Instagram OAuth URL
  getAuthUrl() {
    // Get environment variables with fallbacks
    const clientId = process.env.NEXT_PUBLIC_INSTAGRAM_APP_ID || "1704112970203489"
    const redirectUri = process.env.NEXT_PUBLIC_INSTAGRAM_REDIRECT_URI || DEFAULT_REDIRECT_URI

    // Construct Instagram OAuth URL
    return `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri,
    )}&scope=user_profile,user_media&response_type=code`
  },

  // Authenticate with Instagram
  async authenticate(code: string) {
    try {
      // In a real app, this would call the Instagram API
      // For now, we'll use our mock API
      const authResult = await MockInstagramAPI.authenticate(code)

      return {
        success: true,
        ...authResult,
      }
    } catch (error) {
      console.error("Error authenticating with Instagram:", error)
      return {
        success: false,
        error: "Failed to authenticate with Instagram",
      }
    }
  },

  // Get user profile
  async getUserProfile(userId: string) {
    try {
      // In a real app, this would use the access token from the database
      // For now, we'll use our mock API
      const profile = await MockInstagramAPI.getUserProfile()

      return {
        success: true,
        profile,
      }
    } catch (error) {
      console.error("Error getting user profile:", error)
      return {
        success: false,
        error: "Failed to get user profile",
      }
    }
  },

  // Get followers
  async getFollowers(accountId: string, limit = 50) {
    try {
      // In a real app, this would use the access token from the database
      // For now, we'll use our mock API
      const { data: followers, has_more, end_cursor } = await MockInstagramAPI.getFollowers(limit)

      // Store followers in the database
      const supabase = getSupabaseServerClient()

      // Batch insert followers
      const { error } = await supabase.from("followers").upsert(
        followers.map((follower) => ({
          account_id: accountId,
          instagram_id: follower.id,
          username: follower.username,
          full_name: follower.full_name,
          profile_picture: follower.profile_picture,
          status: "active",
        })),
        { onConflict: "account_id, instagram_id" },
      )

      if (error) {
        console.error("Error storing followers:", error)
      }

      return {
        success: true,
        followers,
        has_more,
        end_cursor,
      }
    } catch (error) {
      console.error("Error getting followers:", error)
      return {
        success: false,
        error: "Failed to get followers",
        followers: [],
      }
    }
  },

  // Get insights
  async getInsights(accountId: string, days = 30) {
    try {
      // In a real app, this would use the access token from the database
      // For now, we'll use our mock API
      const insights = await MockInstagramAPI.getInsights(days)

      // Store insights in the database
      const supabase = getSupabaseServerClient()

      // Batch insert metrics
      const { error } = await supabase.from("metrics").upsert(
        insights.map((insight) => ({
          account_id: accountId,
          date: insight.date,
          follower_count: insight.follower_count,
          following_count: insight.following_count,
          gained_followers: insight.gained_followers,
          lost_followers: insight.lost_followers,
          likes_received: insight.likes_received,
          comments_received: insight.comments_received,
          engagement_rate: insight.engagement_rate,
        })),
        { onConflict: "account_id, date" },
      )

      if (error) {
        console.error("Error storing metrics:", error)
      }

      return {
        success: true,
        insights,
      }
    } catch (error) {
      console.error("Error getting insights:", error)
      return {
        success: false,
        error: "Failed to get insights",
        insights: [],
      }
    }
  },

  // Get follower activity
  async getFollowerActivity(accountId: string, days = 7) {
    try {
      // In a real app, this would use the access token from the database
      // For now, we'll use our mock API
      const activities = await MockInstagramAPI.getFollowerActivity(days)

      // Store activities in the database
      const supabase = getSupabaseServerClient()

      // First, ensure all followers exist in the database
      const followerInserts = activities.map((activity) => ({
        account_id: accountId,
        instagram_id: activity.id,
        username: activity.username,
        full_name: activity.full_name,
        profile_picture: activity.profile_picture,
        status: "active",
      }))

      const { error: followerError } = await supabase
        .from("followers")
        .upsert(followerInserts, { onConflict: "account_id, instagram_id" })

      if (followerError) {
        console.error("Error storing followers:", followerError)
      }

      // Get the follower IDs from the database
      const { data: followers, error: fetchError } = await supabase
        .from("followers")
        .select("id, instagram_id")
        .eq("account_id", accountId)
        .in(
          "instagram_id",
          activities.map((a) => a.id),
        )

      if (fetchError) {
        console.error("Error fetching followers:", fetchError)
      }

      // Create a map of Instagram IDs to database IDs
      const followerMap = new Map(followers?.map((f) => [f.instagram_id, f.id]) || [])

      // Insert follower history
      const historyInserts = activities.map((activity) => ({
        account_id: accountId,
        follower_id: followerMap.get(activity.id),
        action: activity.action,
        created_at: activity.timestamp,
      }))

      const { error: historyError } = await supabase.from("follower_history").insert(historyInserts)

      if (historyError) {
        console.error("Error storing follower history:", historyError)
      }

      return {
        success: true,
        activities,
      }
    } catch (error) {
      console.error("Error getting follower activity:", error)
      return {
        success: false,
        error: "Failed to get follower activity",
        activities: [],
      }
    }
  },

  // Get suspicious activities
  async getSuspiciousActivities(accountId: string) {
    try {
      // In a real app, this would analyze data from the database
      // For now, we'll use our mock API
      const activities = await MockInstagramAPI.getSuspiciousActivities()

      // Store suspicious activities in the database
      const supabase = getSupabaseServerClient()

      // Insert suspicious activities
      if (activities.length > 0) {
        const { error } = await supabase.from("suspicious_activities").insert(
          activities.map((activity) => ({
            account_id: accountId,
            type: activity.type,
            description: activity.description,
            severity: activity.severity,
            created_at: activity.created_at,
          })),
        )

        if (error) {
          console.error("Error storing suspicious activities:", error)
        }
      }

      return {
        success: true,
        activities,
      }
    } catch (error) {
      console.error("Error getting suspicious activities:", error)
      return {
        success: false,
        error: "Failed to get suspicious activities",
        activities: [],
      }
    }
  },
}
