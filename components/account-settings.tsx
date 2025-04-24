"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { updateNotificationSettings } from "@/app/actions/notification-actions"

interface NotificationSettings {
  id: string
  user_id: string
  account_id: string
  new_followers: boolean
  unfollowers: boolean
  engagement_drop: boolean
  suspicious_activity: boolean
  weekly_report: boolean
  monthly_report: boolean
}

interface AccountSettingsProps {
  accountId?: string
  settings?: NotificationSettings
}

export function AccountSettings({ accountId = "default", settings }: AccountSettingsProps) {
  const [formState, setFormState] = useState({
    new_followers: settings?.new_followers ?? true,
    unfollowers: settings?.unfollowers ?? true,
    engagement_drop: settings?.engagement_drop ?? true,
    suspicious_activity: settings?.suspicious_activity ?? true,
    weekly_report: settings?.weekly_report ?? true,
    monthly_report: settings?.monthly_report ?? true,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  function handleToggle(setting: keyof typeof formState, value: boolean) {
    setFormState((prev) => ({ ...prev, [setting]: value }))
  }

  async function handleSaveSettings() {
    setIsSubmitting(true)
    try {
      const result = await updateNotificationSettings(accountId, formState)

      if (result.success) {
        toast({
          title: "Settings saved",
          description: "Your notification settings have been updated successfully.",
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to save settings. Please try again.",
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
        <CardDescription>Configure how you want to be notified about account activity</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Follower Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="notify-new-followers" className="flex flex-col space-y-1">
                <span>New Followers</span>
                <span className="font-normal text-xs text-muted-foreground">
                  Get notified when someone follows your account
                </span>
              </Label>
              <Switch
                id="notify-new-followers"
                checked={formState.new_followers}
                onCheckedChange={(checked) => handleToggle("new_followers", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="notify-unfollowers" className="flex flex-col space-y-1">
                <span>Unfollowers</span>
                <span className="font-normal text-xs text-muted-foreground">
                  Get notified when someone unfollows your account
                </span>
              </Label>
              <Switch
                id="notify-unfollowers"
                checked={formState.unfollowers}
                onCheckedChange={(checked) => handleToggle("unfollowers", checked)}
              />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Engagement Alerts</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="notify-engagement-drop" className="flex flex-col space-y-1">
                <span>Engagement Drop</span>
                <span className="font-normal text-xs text-muted-foreground">
                  Alert when your engagement rate drops significantly
                </span>
              </Label>
              <Switch
                id="notify-engagement-drop"
                checked={formState.engagement_drop}
                onCheckedChange={(checked) => handleToggle("engagement_drop", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="notify-suspicious" className="flex flex-col space-y-1">
                <span>Suspicious Activity</span>
                <span className="font-normal text-xs text-muted-foreground">
                  Alert when unusual activity is detected
                </span>
              </Label>
              <Switch
                id="notify-suspicious"
                checked={formState.suspicious_activity}
                onCheckedChange={(checked) => handleToggle("suspicious_activity", checked)}
              />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Report Delivery</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="weekly-report" className="flex flex-col space-y-1">
                <span>Weekly Report</span>
                <span className="font-normal text-xs text-muted-foreground">
                  Receive a weekly summary of your account activity
                </span>
              </Label>
              <Switch
                id="weekly-report"
                checked={formState.weekly_report}
                onCheckedChange={(checked) => handleToggle("weekly_report", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="monthly-report" className="flex flex-col space-y-1">
                <span>Monthly Report</span>
                <span className="font-normal text-xs text-muted-foreground">
                  Receive a monthly detailed analytics report
                </span>
              </Label>
              <Switch
                id="monthly-report"
                checked={formState.monthly_report}
                onCheckedChange={(checked) => handleToggle("monthly_report", checked)}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSaveSettings} disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
