import { getSupabaseBrowserClient } from "@/lib/supabase"

// Types
interface SignUpParams {
  name: string
  email: string
  password: string
}

interface SignInParams {
  email: string
  password: string
}

interface AuthResult {
  success: boolean
  error?: string
  user?: any
  session?: any
}

// Sign up a new user
export async function signUp({ name, email, password }: SignUpParams): Promise<AuthResult> {
  try {
    const supabase = getSupabaseBrowserClient()

    // Create a new user in Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    })

    if (error) {
      return {
        success: false,
        error: error.message,
      }
    }

    // Create a user profile in the database
    if (data.user) {
      const { error: profileError } = await supabase.from("users").insert({
        id: data.user.id,
        name,
        email,
        created_at: new Date().toISOString(),
      })

      if (profileError) {
        console.error("Error creating user profile:", profileError)
      }
    }

    return {
      success: true,
      user: data.user,
      session: data.session,
    }
  } catch (error) {
    console.error("Sign up error:", error)
    return {
      success: false,
      error: "An unexpected error occurred",
    }
  }
}

// Sign in an existing user
export async function signIn({ email, password }: SignInParams): Promise<AuthResult> {
  try {
    const supabase = getSupabaseBrowserClient()

    const { data: { user, session }, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error("Sign in error:", error)
      return {
        success: false,
        error: error.message,
      }
    }

    if (!session) {
      return {
        success: false,
        error: "No session established",
      }
    }

    return {
      success: true,
      user,
      session,
    }
  } catch (error) {
    console.error("Sign in error:", error)
    return {
      success: false,
      error: "An unexpected error occurred",
    }
  }
}

// Sign out the current user
export async function signOut(): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = getSupabaseBrowserClient()

    const { error } = await supabase.auth.signOut()

    if (error) {
      return {
        success: false,
        error: error.message,
      }
    }

    return {
      success: true,
    }
  } catch (error) {
    console.error("Sign out error:", error)
    return {
      success: false,
      error: "An unexpected error occurred",
    }
  }
}

// Get the current user
export async function getCurrentUser() {
  try {
    const supabase = getSupabaseBrowserClient()

    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
      return null
    }

    return user
  } catch (error) {
    console.error("Get current user error:", error)
    return null
  }
}
