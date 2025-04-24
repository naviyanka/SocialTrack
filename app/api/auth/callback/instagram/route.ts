import { type NextRequest, NextResponse } from "next/server"
import { InstagramService } from "@/lib/instagram-service"
import { getSupabaseServerClient } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    // Get the code from the URL
    const searchParams = request.nextUrl.searchParams
    const code = searchParams.get("code")

    if (!code) {
      return NextResponse.json({ error: "No code provided" }, { status: 400 })
    }

    // Exchange code for access token
    const authResult = await InstagramService.authenticate(code)

    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 500 })
    }

    // Get user profile
    const profileResult = await InstagramService.getUserProfile(authResult.user_id)

    if (!profileResult.success) {
      return NextResponse.json({ error: profileResult.error }, { status: 500 })
    }

    // Store in database
    const supabase = getSupabaseServerClient()

    // Get the current authenticated user
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }

    // Check if account already exists
    const { data: existingAccount } = await supabase
      .from("accounts")
      .select("*")
      .eq("instagram_id", authResult.user_id)
      .single()

    if (existingAccount) {
      // Update existing account
      await supabase
        .from("accounts")
        .update({
          access_token: authResult.access_token,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existingAccount.id)

      // Redirect to dashboard
      return NextResponse.redirect(new URL("/", request.url))
    }

    // Create new account
    const { data: newAccount, error } = await supabase
      .from("accounts")
      .insert({
        user_id: user.id,
        name: profileResult.profile.full_name || "Instagram Account",
        username: `@${profileResult.profile.username}`,
        instagram_id: profileResult.profile.id,
        profile_picture: profileResult.profile.profile_picture,
        access_token: authResult.access_token,
        status: "active",
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: "Failed to create account" }, { status: 500 })
    }

    // Create notification settings
    await supabase.from("notification_settings").insert({
      user_id: user.id,
      account_id: newAccount.id,
    })

    // Fetch initial data
    await Promise.all([
      InstagramService.getFollowers(newAccount.id),
      InstagramService.getInsights(newAccount.id),
      InstagramService.getFollowerActivity(newAccount.id),
      InstagramService.getSuspiciousActivities(newAccount.id),
    ])

    // Redirect to dashboard
    return NextResponse.redirect(new URL("/", request.url))
  } catch (error) {
    console.error("Error in Instagram callback:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}
