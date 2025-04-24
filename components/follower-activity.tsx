"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ErrorBoundary } from "@/components/error-boundary"

interface FollowerActivityProps {
  history?: any[]
}

export function FollowerActivity({ history = [] }: FollowerActivityProps) {
  // Filter history to get new followers and unfollowers
  const newFollowers = history
    ? history
        .filter((item) => item.action === "follow")
        .map((item) => ({
          name: item.followers?.full_name || "Unknown User",
          username: item.followers?.username || "@unknown",
          avatar: item.followers?.profile_picture || "/placeholder.svg?height=32&width=32",
          initials: (item.followers?.full_name || "UN").substring(0, 2),
          timeAgo: formatTimeAgo(new Date(item.created_at)),
        }))
    : []

  const unfollowers = history
    ? history
        .filter((item) => item.action === "unfollow")
        .map((item) => ({
          name: item.followers?.full_name || "Unknown User",
          username: item.followers?.username || "@unknown",
          avatar: item.followers?.profile_picture || "/placeholder.svg?height=32&width=32",
          initials: (item.followers?.full_name || "UN").substring(0, 2),
          timeAgo: formatTimeAgo(new Date(item.created_at)),
        }))
    : []

  // If no history data is available, use mock data
  const displayNewFollowers = newFollowers.length > 0 ? newFollowers : mockNewFollowers
  const displayUnfollowers = unfollowers.length > 0 ? unfollowers : mockUnfollowers

  return (
    <ErrorBoundary>
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Follower Activity</CardTitle>
          <CardDescription>Track who followed and unfollowed your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="new" className="space-y-4">
            <TabsList>
              <TabsTrigger value="new">New Followers</TabsTrigger>
              <TabsTrigger value="unfollowed">Unfollowers</TabsTrigger>
            </TabsList>
            <TabsContent value="new" className="space-y-4">
              {displayNewFollowers.map((follower, index) => (
                <div key={`new-${index}`} className="flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={follower.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{follower.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">{follower.name}</p>
                      <p className="text-sm text-muted-foreground">{follower.username}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Badge variant="outline" className="mr-2">
                      {follower.timeAgo}
                    </Badge>
                  </div>
                </div>
              ))}
            </TabsContent>
            <TabsContent value="unfollowed" className="space-y-4">
              {displayUnfollowers.map((follower, index) => (
                <div key={`unfollow-${index}`} className="flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={follower.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{follower.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">{follower.name}</p>
                      <p className="text-sm text-muted-foreground">{follower.username}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Badge variant="outline" className="mr-2">
                      {follower.timeAgo}
                    </Badge>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </ErrorBoundary>
  )
}

// Helper function to format time ago
function formatTimeAgo(date: Date): string {
  try {
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (isNaN(diffInSeconds)) return "Unknown time"

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`

    return date.toLocaleDateString()
  } catch (error) {
    console.error("Error formatting time:", error)
    return "Unknown time"
  }
}

// Mock data for when real data is not available
const mockNewFollowers = [
  {
    name: "Alex Johnson",
    username: "@alexj",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "AJ",
    timeAgo: "2 hours ago",
  },
  {
    name: "Maria Garcia",
    username: "@mgarcia",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "MG",
    timeAgo: "5 hours ago",
  },
  {
    name: "James Wilson",
    username: "@jwilson",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "JW",
    timeAgo: "1 day ago",
  },
  {
    name: "Sophia Lee",
    username: "@sophialee",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "SL",
    timeAgo: "1 day ago",
  },
  {
    name: "David Kim",
    username: "@davidk",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "DK",
    timeAgo: "2 days ago",
  },
]

const mockUnfollowers = [
  {
    name: "Emma Thompson",
    username: "@emmathompson",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "ET",
    timeAgo: "3 hours ago",
  },
  {
    name: "Michael Brown",
    username: "@mbrown",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "MB",
    timeAgo: "1 day ago",
  },
  {
    name: "Olivia Davis",
    username: "@oliviad",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "OD",
    timeAgo: "2 days ago",
  },
  {
    name: "Robert Miller",
    username: "@rmiller",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "RM",
    timeAgo: "3 days ago",
  },
  {
    name: "Jennifer White",
    username: "@jwhite",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "JW",
    timeAgo: "4 days ago",
  },
]
