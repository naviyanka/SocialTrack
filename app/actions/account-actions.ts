"use server"

import { revalidatePath } from "next/cache"
import { getSupabaseServerClient } from "@/lib/supabase"
import { InstagramService } from "@/lib/instagram-api"

// Demo user UUID - using a fixed UUID for demo purposes
const DEMO_USER_ID = "00000000-0000-0000-0000-000000000000"

// Add a new Instagram account
export async function addInstagramAccount(formData: FormData) {
  try {
    const supabase = getSupabaseServerClient()
    const name = formData.get("name") as string
    const username = formData.get("username") as string

    // In a real app, this would be part of an OAuth flow
    // For demo purposes, we're creating a mock account

    // Create account in database
    const { data: account, error } = await supabase
      .from("accounts")
      .insert({
        user_id: DEMO_USER_ID,
        name,
        username,
        instagram_id: `${Math.floor(Math.random() * 1000000)}`,
        profile_picture: "/placeholder.svg?height=32&width=32",
        status: "active",
      })
      .select()
      .single()

    if (error) throw error

    // Generate mock followers for the account
    const mockFollowers = await InstagramService.simulateGetFollowers(account.id)

    // Insert followers into database
    const { error: followersError } = await supabase.from("followers").insert(mockFollowers)

    if (followersError) throw followersError

    // Generate mock metrics
    const today = new Date()
    const mockMetrics = Array.from({ length: 30 }, (_, i) => {
      const date = new Date()
      date.setDate(today.getDate() - i)

      return {
        account_id: account.id,
        date: date.toISOString().split("T")[0],
        follower_count: 10000 + Math.floor(Math.random() * 500),
        following_count: 500 + Math.floor(Math.random() * 100),
        gained_followers: Math.floor(Math.random() * 50),
        lost_followers: Math.floor(Math.random() * 10),
        likes_received: Math.floor(Math.random() * 1000),
        comments_received: Math.floor(Math.random() * 200),
        engagement_rate: (Math.random() * 5).toFixed(2),
      }
    })

    // Insert metrics into database
    const { error: metricsError } = await supabase.from("metrics").insert(mockMetrics)

    if (metricsError) throw metricsError

    // Create notification settings
    const { error: settingsError } = await supabase.from("notification_settings").insert({
      user_id: DEMO_USER_ID,
      account_id: account.id,
    })

    if (settingsError) throw settingsError

    revalidatePath("/accounts")
    revalidatePath("/")

    return { success: true, account }
  } catch (error) {
    console.error("Error adding Instagram account:", error)
    return { success: false, error }
  }
}

// Get all accounts for the current user
export async function getAccounts() {
  try {
    const supabase = getSupabaseServerClient()

    // Try to get accounts, if table doesn't exist, return empty array
    const { data, error } = await supabase.from("accounts").select("*").eq("user_id", DEMO_USER_ID)

    if (error) {
      if (error.code === "42P01") {
        // Table doesn't exist yet, return empty array
        return { success: true, accounts: [] }
      }
      throw error
    }

    return { success: true, accounts: data }
  } catch (error) {
    console.error("Error getting accounts:", error)
    return { success: true, accounts: [] }
  }
}

// Update account status
export async function updateAccountStatus(accountId: string, status: string) {
  try {
    const supabase = getSupabaseServerClient()

    const { error } = await supabase.from("accounts").update({ status }).eq("id", accountId)

    if (error) throw error

    revalidatePath("/accounts")

    return { success: true }
  } catch (error) {
    console.error("Error updating account status:", error)
    return { success: false, error }
  }
}

// Delete an account
export async function deleteAccount(accountId: string) {
  try {
    const supabase = getSupabaseServerClient()

    const { error } = await supabase.from("accounts").delete().eq("id", accountId)

    if (error) throw error

    revalidatePath("/accounts")
    revalidatePath("/")

    return { success: true }
  } catch (error) {
    console.error("Error deleting account:", error)
    return { success: false, error }
  }
}
