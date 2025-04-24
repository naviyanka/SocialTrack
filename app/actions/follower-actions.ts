"use server"
import { getSupabaseServerClient } from "@/lib/supabase"

// Get followers for an account
export async function getFollowers(accountId: string) {
  try {
    const supabase = getSupabaseServerClient()

    const { data, error } = await supabase.from("followers").select("*").eq("account_id", accountId).order("username")

    if (error) throw error

    return { success: true, followers: data }
  } catch (error) {
    console.error("Error getting followers:", error)
    return { success: false, followers: [] }
  }
}

// Get follower history (follows/unfollows)
export async function getFollowerHistory(accountId: string) {
  try {
    const supabase = getSupabaseServerClient()

    const { data, error } = await supabase
      .from("follower_history")
      .select(`
        id,
        action,
        created_at,
        followers (
          id,
          username,
          full_name,
          profile_picture
        )
      `)
      .eq("account_id", accountId)
      .order("created_at", { ascending: false })
      .limit(50)

    if (error) throw error

    return { success: true, history: data }
  } catch (error) {
    console.error("Error getting follower history:", error)
    return { success: false, history: [] }
  }
}

// Get follower metrics
export async function getFollowerMetrics(accountId: string) {
  try {
    const supabase = getSupabaseServerClient()

    const { data, error } = await supabase
      .from("metrics")
      .select("*")
      .eq("account_id", accountId)
      .order("date", { ascending: false })
      .limit(30)

    if (error) throw error

    return { success: true, metrics: data }
  } catch (error) {
    console.error("Error getting follower metrics:", error)
    return { success: false, metrics: [] }
  }
}
