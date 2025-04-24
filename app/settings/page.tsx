"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { getCurrentUser } from "@/lib/auth"

interface UserSettings {
  emailNotifications?: boolean
  pushNotifications?: boolean
  weeklyDigest?: boolean
  marketingEmails?: boolean
}

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState<UserSettings>({
    emailNotifications: true,
    pushNotifications: true,
    weeklyDigest: true,
    marketingEmails: false,
  })
  const { toast } = useToast()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const loadSettings = async () => {
      const user = await getCurrentUser()
      if (user && user.user_metadata?.settings) {
        setSettings(user.user_metadata.settings)
      }
    }
    loadSettings()
  }, [])

  const handleUpdateSettings = async (key: keyof UserSettings, value: boolean) => {
    setIsLoading(true)
    const newSettings = { ...settings, [key]: value }

    try {
      const { error } = await supabase.auth.updateUser({
        data: { settings: newSettings }
      })

      if (error) {
        throw error
      }

      setSettings(newSettings)
      toast({
        title: "Settings updated",
        description: "Your settings have been updated successfully.",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update settings. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container max-w-2xl py-6">
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>
            Manage your account settings and preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="notifications" className="space-y-4">
            <TabsList>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
            </TabsList>
            <TabsContent value="notifications" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="email-notifications" className="flex flex-col space-y-1">
                    <span>Email Notifications</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      Receive email notifications about your account activity
                    </span>
                  </Label>
                  <Switch
                    id="email-notifications"
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => handleUpdateSettings("emailNotifications", checked)}
                    disabled={isLoading}
                  />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="push-notifications" className="flex flex-col space-y-1">
                    <span>Push Notifications</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      Receive push notifications about your account activity
                    </span>
                  </Label>
                  <Switch
                    id="push-notifications"
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => handleUpdateSettings("pushNotifications", checked)}
                    disabled={isLoading}
                  />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="weekly-digest" className="flex flex-col space-y-1">
                    <span>Weekly Digest</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      Receive a weekly summary of your account activity
                    </span>
                  </Label>
                  <Switch
                    id="weekly-digest"
                    checked={settings.weeklyDigest}
                    onCheckedChange={(checked) => handleUpdateSettings("weeklyDigest", checked)}
                    disabled={isLoading}
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="privacy" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="marketing-emails" className="flex flex-col space-y-1">
                    <span>Marketing Emails</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      Receive emails about new features and updates
                    </span>
                  </Label>
                  <Switch
                    id="marketing-emails"
                    checked={settings.marketingEmails}
                    onCheckedChange={(checked) => handleUpdateSettings("marketingEmails", checked)}
                    disabled={isLoading}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
} 