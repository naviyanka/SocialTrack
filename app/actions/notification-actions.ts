"use server"

import { revalidatePath } from "next/cache"
import { getSupabaseServerClient } from "@/lib/supabase"

// Demo user UUID - using a fixed UUID for demo purposes
const DEMO_USER_ID = "00000000-0000-0000-0000-000000000000"

// Get notifications for a user
export async function getNotifications() {
  try {
    const supabase = getSupabaseServerClient()

    const { data, error } = await supabase
      .from("notifications")
      .select(`
        *,
        accounts (
          id,
          name,
          username
        )
      `)
      .eq("user_id", DEMO_USER_ID)
      .order("created_at", { ascending: false })
      .limit(20)

    if (error) throw error

    return { success: true, notifications: data }
  } catch (error) {
    console.error("Error getting notifications:", error)
    return { success: false, notifications: [] }
  }
}

// Mark notification as read
export async function markNotificationAsRead(notificationId: string) {
  try {
    const supabase = getSupabaseServerClient()

    const { error } = await supabase.from("notifications").update({ is_read: true }).eq("id", notificationId)

    if (error) throw error

    revalidatePath("/")

    return { success: true }
  } catch (error) {
    console.error("Error marking notification as read:", error)
    return { success: false, error }
  }
}

// Update notification settings
export async function updateNotificationSettings(accountId: string, settings: any) {
  try {
    const supabase = getSupabaseServerClient()

    const { error } = await supabase
      .from("notification_settings")
      .update(settings)
      .eq("user_id", DEMO_USER_ID)
      .eq("account_id", accountId)

    if (error) throw error

    revalidatePath("/accounts")

    return { success: true }
  } catch (error) {
    console.error("Error updating notification settings:", error)
    return { success: false, error }
  }
}

// Get suspicious activities
export async function getSuspiciousActivities() {
  try {
    const supabase = getSupabaseServerClient()

    const { data, error } = await supabase
      .from("suspicious_activities")
      .select(`
        *,
        accounts (
          id,
          name,
          username
        )
      `)
      .order("created_at", { ascending: false })
      .limit(10)

    if (error) throw error

    return { success: true, activities: data }
  } catch (error) {
    console.error("Error getting suspicious activities:", error)
    return { success: false, activities: [] }
  }
}
