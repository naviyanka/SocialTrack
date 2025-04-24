"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Instagram } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { addInstagramAccount } from "@/app/actions/account-actions"
import { Separator } from "@/components/ui/separator"

// Default redirect URI if environment variable is not set
const DEFAULT_REDIRECT_URI = "https://socialspy-dashboard.vercel.app/api/auth/callback/instagram"

export function AddAccountButton() {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  // Handle form submission
  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    try {
      const result = await addInstagramAccount(formData)

      if (result.success) {
        toast({
          title: "Account added",
          description: "Your Instagram account has been added successfully.",
        })
        setOpen(false)
        router.refresh()
      } else {
        toast({
          title: "Error",
          description: "Failed to add Instagram account. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle Instagram OAuth
  function handleConnectWithInstagram() {
    // Get environment variables with fallbacks
    const clientId = process.env.NEXT_PUBLIC_INSTAGRAM_APP_ID || "1704112970203489"
    const redirectUri = process.env.NEXT_PUBLIC_INSTAGRAM_REDIRECT_URI || DEFAULT_REDIRECT_URI

    // Construct Instagram OAuth URL
    const instagramAuthUrl = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri,
    )}&scope=user_profile,user_media&response_type=code`

    // Open Instagram OAuth in a new window
    window.open(instagramAuthUrl, "_blank")

    // Close the dialog
    setOpen(false)

    toast({
      title: "Instagram Authentication",
      description: "Please complete the authentication process in the new window.",
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1">
          <Plus className="h-3.5 w-3.5" />
          <span>Add Account</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Instagram Account</DialogTitle>
          <DialogDescription>
            Add a new Instagram account to track. You can connect directly with Instagram or add manually.
          </DialogDescription>
        </DialogHeader>

        <Button variant="outline" className="w-full mt-2 gap-2" onClick={handleConnectWithInstagram}>
          <Instagram className="h-4 w-4" />
          Connect with Instagram
        </Button>

        <div className="relative my-4">
          <Separator />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-background px-2 text-xs text-muted-foreground">OR</span>
          </div>
        </div>

        <form action={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Account Name</Label>
              <Input id="name" name="name" placeholder="Personal, Business, etc." required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="username">Instagram Username</Label>
              <Input id="username" name="username" placeholder="@username" required />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button variant="outline" type="button" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Account"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
