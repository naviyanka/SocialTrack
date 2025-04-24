"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Heart, MessageCircle, UserPlus, UserMinus } from "lucide-react"

export function ActivityStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-2">
            <UserPlus className="h-4 w-4 text-green-500" />
            <h3 className="text-sm font-medium">New Followers</h3>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-bold">+348</p>
            <p className="text-xs text-muted-foreground">+14.2% from last month</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-2">
            <UserMinus className="h-4 w-4 text-amber-500" />
            <h3 className="text-sm font-medium">Unfollowers</h3>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-bold">-42</p>
            <p className="text-xs text-muted-foreground">-18.7% from last month</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-2">
            <Heart className="h-4 w-4 text-rose-500" />
            <h3 className="text-sm font-medium">Likes Received</h3>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-bold">12.5K</p>
            <p className="text-xs text-muted-foreground">+5.3% from last month</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-2">
            <MessageCircle className="h-4 w-4 text-blue-500" />
            <h3 className="text-sm font-medium">Comments</h3>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-bold">1.8K</p>
            <p className="text-xs text-muted-foreground">+2.1% from last month</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
