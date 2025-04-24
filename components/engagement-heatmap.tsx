"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function EngagementHeatmap() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Post Engagement Heatmap</CardTitle>
        <CardDescription>Compare engagement across your recent posts</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Post</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Likes</TableHead>
              <TableHead>Comments</TableHead>
              <TableHead>Saves</TableHead>
              <TableHead>Shares</TableHead>
              <TableHead className="text-right">Engagement Rate</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium">
                  <div className="w-[60px] h-[60px] bg-muted rounded-md"></div>
                </TableCell>
                <TableCell>{post.date}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className={`w-full h-2 rounded-full ${getHeatmapColor(post.likes, 1500)}`}></div>
                    {post.likes}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className={`w-full h-2 rounded-full ${getHeatmapColor(post.comments, 200)}`}></div>
                    {post.comments}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className={`w-full h-2 rounded-full ${getHeatmapColor(post.saves, 100)}`}></div>
                    {post.saves}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className={`w-full h-2 rounded-full ${getHeatmapColor(post.shares, 50)}`}></div>
                    {post.shares}
                  </div>
                </TableCell>
                <TableCell className="text-right">{post.engagementRate}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

function getHeatmapColor(value: number, max: number) {
  const percentage = value / max
  if (percentage >= 0.8) return "bg-green-500"
  if (percentage >= 0.6) return "bg-green-400"
  if (percentage >= 0.4) return "bg-yellow-400"
  if (percentage >= 0.2) return "bg-orange-400"
  return "bg-red-400"
}

const posts = [
  {
    id: 1,
    date: "Apr 15, 2023",
    likes: 1245,
    comments: 156,
    saves: 87,
    shares: 42,
    engagementRate: 5.8,
  },
  {
    id: 2,
    date: "Apr 10, 2023",
    likes: 987,
    comments: 98,
    saves: 54,
    shares: 31,
    engagementRate: 4.2,
  },
  {
    id: 3,
    date: "Apr 5, 2023",
    likes: 1532,
    comments: 187,
    saves: 112,
    shares: 65,
    engagementRate: 6.7,
  },
  {
    id: 4,
    date: "Mar 30, 2023",
    likes: 876,
    comments: 76,
    saves: 43,
    shares: 28,
    engagementRate: 3.9,
  },
  {
    id: 5,
    date: "Mar 25, 2023",
    likes: 1123,
    comments: 134,
    saves: 76,
    shares: 47,
    engagementRate: 5.1,
  },
]
