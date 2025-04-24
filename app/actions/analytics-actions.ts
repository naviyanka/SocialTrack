"use server"

import { getSupabaseServerClient } from "@/lib/supabase"

// Get engagement data for an account
export async function getEngagementData(accountId: string) {
  try {
    const supabase = getSupabaseServerClient()

    // Get metrics for the last 30 days
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const { data, error } = await supabase
      .from("metrics")
      .select("*")
      .eq("account_id", accountId)
      .gte("date", thirtyDaysAgo.toISOString().split("T")[0])
      .order("date")

    if (error) throw error

    // Format data for charts
    const formattedData = data.map((item) => ({
      date: new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      likes: item.likes_received,
      comments: item.comments_received,
      followers: item.follower_count,
      gained: item.gained_followers,
      lost: item.lost_followers,
    }))

    return { success: true, data: formattedData }
  } catch (error) {
    console.error("Error getting engagement data:", error)
    return { success: false, data: [] }
  }
}

// Get post engagement data
export async function getPostEngagementData(accountId: string) {
  try {
    const supabase = getSupabaseServerClient()

    // Get posts with engagement counts
    const { data: posts, error } = await supabase
      .from("posts")
      .select(`
        id,
        instagram_id,
        caption,
        media_url,
        timestamp
      `)
      .eq("account_id", accountId)
      .order("timestamp", { ascending: false })
      .limit(10)

    if (error) throw error

    // For each post, get engagement counts
    const postsWithEngagement = await Promise.all(
      posts.map(async (post) => {
        // Get likes count
        const { count: likesCount, error: likesError } = await supabase
          .from("engagements")
          .select("*", { count: "exact", head: true })
          .eq("post_id", post.id)
          .eq("type", "like")

        if (likesError) throw likesError

        // Get comments count
        const { count: commentsCount, error: commentsError } = await supabase
          .from("engagements")
          .select("*", { count: "exact", head: true })
          .eq("post_id", post.id)
          .eq("type", "comment")

        if (commentsError) throw commentsError

        // Calculate engagement rate
        const engagementRate = (((likesCount + commentsCount) / 12543) * 100).toFixed(1)

        return {
          id: post.id,
          date: new Date(post.timestamp).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          likes: likesCount,
          comments: commentsCount,
          saves: Math.floor(likesCount * 0.1), // Simulated data
          shares: Math.floor(likesCount * 0.05), // Simulated data
          engagementRate,
        }
      }),
    )

    return { success: true, posts: postsWithEngagement }
  } catch (error) {
    console.error("Error getting post engagement data:", error)
    return { success: false, posts: [] }
  }
}

// Export data as CSV
export async function exportDataAsCSV(accountId: string, dataType: string) {
  try {
    // In a real app, this would generate a CSV file
    // For demo purposes, we'll just return a success message

    return {
      success: true,
      message: `Data export for ${dataType} initiated. You will receive an email when it's ready.`,
    }
  } catch (error) {
    console.error("Error exporting data:", error)
    return { success: false, error }
  }
}
