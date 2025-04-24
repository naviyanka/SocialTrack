"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function TopEngagers() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Engagers</CardTitle>
        <CardDescription>Users who interact with your content the most</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {topEngagers.map((engager, index) => (
            <div key={engager.username} className="flex items-center">
              <div className="flex items-center gap-4">
                <div className="font-bold text-muted-foreground w-4">{index + 1}</div>
                <Avatar>
                  <AvatarImage src={engager.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{engager.initials}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">{engager.name}</p>
                  <p className="text-sm text-muted-foreground">{engager.username}</p>
                </div>
              </div>
              <div className="ml-auto font-medium">
                <Badge variant="secondary">{engager.engagementRate}%</Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

const topEngagers = [
  {
    name: "Sophia Chen",
    username: "@sophiac",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "SC",
    engagementRate: 92,
  },
  {
    name: "Marcus Johnson",
    username: "@marcusj",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "MJ",
    engagementRate: 87,
  },
  {
    name: "Aisha Patel",
    username: "@aishap",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "AP",
    engagementRate: 85,
  },
  {
    name: "Carlos Rodriguez",
    username: "@carlosr",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "CR",
    engagementRate: 82,
  },
  {
    name: "Emma Wilson",
    username: "@emmaw",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "EW",
    engagementRate: 78,
  },
]
