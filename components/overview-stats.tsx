"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Heart, TrendingUp, UserMinus } from "lucide-react"
import { ErrorBoundary } from "@/components/error-boundary"

interface OverviewStatsProps {
  metrics?: any[]
}

export function OverviewStats({ metrics = [] }: OverviewStatsProps) {
  // Get the most recent metrics or use default values
  const latestMetrics = metrics && metrics.length > 0 ? metrics[0] : null
  const previousMetrics = metrics && metrics.length > 1 ? metrics[1] : null

  // Calculate percentage changes
  const calculateChange = (current: number, previous: number) => {
    if (!previous) return 0
    return ((current - previous) / previous) * 100
  }

  const followerCount = latestMetrics?.follower_count || 12543
  const followerChange = previousMetrics
    ? calculateChange(latestMetrics?.follower_count || 0, previousMetrics?.follower_count || 0)
    : 2.5

  const newFollowers = latestMetrics?.gained_followers || 348
  const newFollowersChange = previousMetrics
    ? calculateChange(latestMetrics?.gained_followers || 0, previousMetrics?.gained_followers || 0)
    : 14.2

  const unfollowers = latestMetrics?.lost_followers || 42
  const unfollowersChange = previousMetrics
    ? calculateChange(latestMetrics?.lost_followers || 0, previousMetrics?.lost_followers || 0)
    : -18.7

  const engagementRate = latestMetrics?.engagement_rate || 4.3
  const engagementChange = previousMetrics
    ? calculateChange(latestMetrics?.engagement_rate || 0, previousMetrics?.engagement_rate || 0)
    : 0.8

  return (
    <ErrorBoundary>
      <>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Followers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{followerCount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {followerChange >= 0 ? "+" : ""}
              {followerChange.toFixed(1)}% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Followers</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{newFollowers}</div>
            <p className="text-xs text-muted-foreground">
              {newFollowersChange >= 0 ? "+" : ""}
              {newFollowersChange.toFixed(1)}% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unfollowers</CardTitle>
            <UserMinus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-{unfollowers}</div>
            <p className="text-xs text-muted-foreground">
              {unfollowersChange >= 0 ? "+" : ""}
              {unfollowersChange.toFixed(1)}% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{engagementRate}%</div>
            <p className="text-xs text-muted-foreground">
              {engagementChange >= 0 ? "+" : ""}
              {engagementChange.toFixed(1)}% from last month
            </p>
          </CardContent>
        </Card>
      </>
    </ErrorBoundary>
  )
}
