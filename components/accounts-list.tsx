"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Bell, Trash2, Settings } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { updateAccountStatus, deleteAccount } from "@/app/actions/account-actions"
import { updateNotificationSettings } from "@/app/actions/notification-actions"

interface Account {
  id: string
  name: string
  username: string
  profile_picture?: string
  status: string
}

interface AccountsListProps {
  accounts: Account[]
  notificationSettings: Record<string, any>
}

export function AccountsList({ accounts = [], notificationSettings = {} }: AccountsListProps) {
  const [isUpdating, setIsUpdating] = useState<Record<string, boolean>>({})
  const [accountToDelete, setAccountToDelete] = useState<string | null>(null)
  const { toast } = useToast()

  // Handle notification toggle
  async function handleNotificationToggle(accountId: string, enabled: boolean) {
    setIsUpdating({ ...isUpdating, [accountId]: true })
    try {
      const result = await updateNotificationSettings(accountId, {
        new_followers: enabled,
        unfollowers: enabled,
        engagement_drop: enabled,
        suspicious_activity: enabled,
      })

      if (result.success) {
        toast({
          title: enabled ? "Notifications enabled" : "Notifications disabled",
          description: `Notifications for this account have been ${enabled ? "enabled" : "disabled"}.`,
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to update notification settings. Please try again.",
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
      setIsUpdating({ ...isUpdating, [accountId]: false })
    }
  }

  // Handle status toggle
  async function handleStatusToggle(accountId: string, status: string) {
    setIsUpdating({ ...isUpdating, [accountId]: true })
    try {
      const result = await updateAccountStatus(accountId, status)

      if (result.success) {
        toast({
          title: "Status updated",
          description: `Account status has been ${status === "active" ? "activated" : "paused"}.`,
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to update account status. Please try again.",
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
      setIsUpdating({ ...isUpdating, [accountId]: false })
    }
  }

  // Handle account deletion
  async function handleDeleteAccount() {
    if (!accountToDelete) return

    try {
      const result = await deleteAccount(accountToDelete)

      if (result.success) {
        toast({
          title: "Account deleted",
          description: "Your Instagram account has been deleted successfully.",
        })
        setAccountToDelete(null)
      } else {
        toast({
          title: "Error",
          description: "Failed to delete account. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6">
          {accounts.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">
              No accounts added yet. Add an Instagram account to get started.
            </div>
          ) : (
            accounts.map((account) => (
              <div key={account.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={account.profile_picture || "/placeholder.svg"} />
                    <AvatarFallback>{account.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none">{account.name}</p>
                    <p className="text-sm text-muted-foreground">{account.username}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Bell className="h-4 w-4 text-muted-foreground" />
                    <Switch
                      id={`notifications-${account.id}`}
                      checked={notificationSettings[account.id]?.new_followers || false}
                      disabled={isUpdating[account.id]}
                      onCheckedChange={(checked) => handleNotificationToggle(account.id, checked)}
                    />
                  </div>
                  <Badge variant={account.status === "active" ? "default" : "secondary"}>
                    {account.status === "active" ? "Active" : "Paused"}
                  </Badge>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleStatusToggle(account.id, account.status === "active" ? "paused" : "active")}
                      disabled={isUpdating[account.id]}
                    >
                      {account.status === "active" ? "Pause" : "Activate"}
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <a href={`/accounts/${account.id}`}>
                        <Settings className="h-4 w-4 mr-1" />
                        Manage
                      </a>
                    </Button>
                    <AlertDialog
                      open={accountToDelete === account.id}
                      onOpenChange={(open) => !open && setAccountToDelete(null)}
                    >
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete the account and all associated data. This action cannot be
                            undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleDeleteAccount}
                            className="bg-destructive text-destructive-foreground"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
