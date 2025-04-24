"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, UserPlus, UserMinus } from "lucide-react"

export function ActivityFeed() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-8">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-4">
              <Avatar>
                <AvatarImage src={activity.avatar || "/placeholder.svg"} />
                <AvatarFallback>{activity.initials}</AvatarFallback>
              </Avatar>
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium leading-none">{activity.username}</p>
                  {activity.type === "like" && <Heart className="h-4 w-4 text-rose-500" />}
                  {activity.type === "comment" && <MessageCircle className="h-4 w-4 text-blue-500" />}
                  {activity.type === "follow" && <UserPlus className="h-4 w-4 text-green-500" />}
                  {activity.type === "unfollow" && <UserMinus className="h-4 w-4 text-amber-500" />}
                </div>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
                {activity.content && <div className="mt-2 rounded-md bg-muted p-2 text-sm">{activity.content}</div>}
              </div>
              <div>
                <Badge variant="outline">{activity.timeAgo}</Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

const activities = [
  {
    id: 1,
    username: "@sophiac",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "SC",
    type: "like",
    description: "liked your post",
    timeAgo: "2m ago",
  },
  {
    id: 2,
    username: "@marcusj",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "MJ",
    type: "comment",
    description: "commented on your post",
    content: "This is such an amazing photo! Where was this taken?",
    timeAgo: "15m ago",
  },
  {
    id: 3,
    username: "@alexj",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "AJ",
    type: "follow",
    description: "started following you",
    timeAgo: "2h ago",
  },
  {
    id: 4,
    username: "@emmathompson",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "ET",
    type: "unfollow",
    description: "unfollowed you",
    timeAgo: "3h ago",
  },
  {
    id: 5,
    username: "@aishap",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "AP",
    type: "like",
    description: "liked your post",
    timeAgo: "5h ago",
  },
  {
    id: 6,
    username: "@carlosr",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "CR",
    type: "comment",
    description: "commented on your post",
    content: "Great content as always! Keep it up!",
    timeAgo: "1d ago",
  },
]
