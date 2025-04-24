"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, TrendingDown, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface SuspiciousActivity {
  id: string
  type: string
  description: string
  severity: string
  created_at: string
  account: {
    id: string
    name: string
    username: string
  }
}

interface SuspiciousActivityProps {
  activities?: SuspiciousActivity[]
}

export function SuspiciousActivity({ activities = [] }: SuspiciousActivityProps) {
  const [selectedActivity, setSelectedActivity] = useState<SuspiciousActivity | null>(null)
  const { toast } = useToast()

  // If no activities are provided, use default ones
  const displayActivities =
    activities.length > 0
      ? activities
      : [
          {
            id: "1",
            type: "mass_unfollow",
            description: "You lost 15 followers in the last hour, which is 300% above your normal rate.",
            severity: "high",
            created_at: new Date().toISOString(),
            account: {
              id: "1",
              name: "Personal",
              username: "@sarahconnor",
            },
          },
          {
            id: "2",
            type: "engagement_drop",
            description: "Your last 3 posts have 45% less engagement than your average.",
            severity: "medium",
            created_at: new Date().toISOString(),
            account: {
              id: "1",
              name: "Personal",
              username: "@sarahconnor",
            },
          },
          {
            id: "3",
            type: "ghost_followers",
            description: "You have 230 followers who haven't engaged with your content in 90+ days.",
            severity: "low",
            created_at: new Date().toISOString(),
            account: {
              id: "1",
              name: "Personal",
              username: "@sarahconnor",
            },
          },
        ]

  function handleViewDetails(activity: SuspiciousActivity) {
    setSelectedActivity(activity)
  }

  function handleResolve() {
    toast({
      title: "Activity marked as resolved",
      description: "This suspicious activity has been marked as resolved.",
    })
    setSelectedActivity(null)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Suspicious Activity</CardTitle>
          <CardDescription>Unusual patterns detected in your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {displayActivities.map((activity) => (
            <Alert key={activity.id} variant={activity.severity === "high" ? "destructive" : "default"}>
              {activity.type === "mass_unfollow" && <AlertTriangle className="h-4 w-4" />}
              {activity.type === "engagement_drop" && <TrendingDown className="h-4 w-4" />}
              {activity.type === "ghost_followers" && <Users className="h-4 w-4" />}
              <AlertTitle>
                {activity.type === "mass_unfollow" && "Mass Unfollow Detected"}
                {activity.type === "engagement_drop" && "Engagement Drop"}
                {activity.type === "ghost_followers" && "Ghost Followers Increase"}
              </AlertTitle>
              <AlertDescription>
                {activity.description}
                <Button variant="outline" size="sm" className="mt-2" onClick={() => handleViewDetails(activity)}>
                  View Details
                </Button>
              </AlertDescription>
            </Alert>
          ))}
        </CardContent>
      </Card>

      <Dialog open={!!selectedActivity} onOpenChange={(open) => !open && setSelectedActivity(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedActivity?.type === "mass_unfollow" && "Mass Unfollow Detected"}
              {selectedActivity?.type === "engagement_drop" && "Engagement Drop"}
              {selectedActivity?.type === "ghost_followers" && "Ghost Followers Increase"}
            </DialogTitle>
            <DialogDescription>Details about this suspicious activity</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium">Description</h3>
                <p className="text-sm text-muted-foreground mt-1">{selectedActivity?.description}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Account</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {selectedActivity?.account.name} ({selectedActivity?.account.username})
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Detected</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {selectedActivity && new Date(selectedActivity.created_at).toLocaleString()}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Severity</h3>
                <p className="text-sm mt-1">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      selectedActivity?.severity === "high"
                        ? "bg-destructive text-destructive-foreground"
                        : selectedActivity?.severity === "medium"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                          : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                    }`}
                  >
                    {selectedActivity?.severity.charAt(0).toUpperCase() + selectedActivity?.severity.slice(1)}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setSelectedActivity(null)}>
              Close
            </Button>
            <Button onClick={handleResolve}>Mark as Resolved</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
