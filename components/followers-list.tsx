"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, MessageCircle, Calendar } from "lucide-react"

export function FollowersList() {
  const [selectedFollower, setSelectedFollower] = useState<any>(null)

  return (
    <>
      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            {followers.map((follower) => (
              <div key={follower.username} className="flex items-center justify-between">
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
                <div className="flex items-center space-x-2">
                  <Badge variant={follower.status === "active" ? "default" : "secondary"}>
                    {follower.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedFollower(follower)}>
                    View Profile
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedFollower} onOpenChange={() => setSelectedFollower(null)}>
        {selectedFollower && (
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Follower Profile</DialogTitle>
              <DialogDescription>Detailed information about this follower</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center py-4">
              <Avatar className="h-20 w-20 mb-4">
                <AvatarImage src={selectedFollower.avatar || "/placeholder.svg"} />
                <AvatarFallback>{selectedFollower.initials}</AvatarFallback>
              </Avatar>
              <h3 className="text-lg font-semibold">{selectedFollower.name}</h3>
              <p className="text-sm text-muted-foreground">{selectedFollower.username}</p>

              <div className="flex justify-between w-full mt-6 mb-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">{selectedFollower.metrics.likes}</p>
                  <p className="text-xs text-muted-foreground">Likes</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{selectedFollower.metrics.comments}</p>
                  <p className="text-xs text-muted-foreground">Comments</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{selectedFollower.metrics.followDays}</p>
                  <p className="text-xs text-muted-foreground">Days Following</p>
                </div>
              </div>

              <Tabs defaultValue="activity" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                  <TabsTrigger value="posts">Liked Posts</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>
                <TabsContent value="activity" className="space-y-4 mt-4">
                  <div className="flex items-center">
                    <Heart className="h-4 w-4 mr-2 text-rose-500" />
                    <span className="text-sm">Last liked your post 2 days ago</span>
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="h-4 w-4 mr-2 text-blue-500" />
                    <span className="text-sm">Last commented 5 days ago</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">Following since Jan 15, 2023</span>
                  </div>
                </TabsContent>
                <TabsContent value="posts">
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="aspect-square bg-muted rounded-md"></div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="history">
                  <div className="space-y-4 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Started following</span>
                      <span className="text-sm text-muted-foreground">Jan 15, 2023</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Most active month</span>
                      <span className="text-sm text-muted-foreground">March 2023</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Engagement rate</span>
                      <span className="text-sm text-muted-foreground">8.2%</span>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  )
}

const followers = [
  {
    name: "Sophia Chen",
    username: "@sophiac",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "SC",
    status: "active",
    metrics: {
      likes: 87,
      comments: 23,
      followDays: 145,
    },
  },
  {
    name: "Marcus Johnson",
    username: "@marcusj",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "MJ",
    status: "active",
    metrics: {
      likes: 64,
      comments: 18,
      followDays: 92,
    },
  },
  {
    name: "Aisha Patel",
    username: "@aishap",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "AP",
    status: "active",
    metrics: {
      likes: 52,
      comments: 14,
      followDays: 78,
    },
  },
  {
    name: "Carlos Rodriguez",
    username: "@carlosr",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "CR",
    status: "inactive",
    metrics: {
      likes: 31,
      comments: 5,
      followDays: 210,
    },
  },
  {
    name: "Emma Wilson",
    username: "@emmaw",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "EW",
    status: "active",
    metrics: {
      likes: 45,
      comments: 12,
      followDays: 65,
    },
  },
]
