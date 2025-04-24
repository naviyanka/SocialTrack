"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ErrorBoundary } from "@/components/error-boundary"

interface EngagementChartProps {
  data?: any[]
}

export function EngagementChart({ data = [] }: EngagementChartProps) {
  // Use provided data or fallback to mock data if empty
  const chartData = data && data.length > 0 ? data : mockData

  return (
    <ErrorBoundary>
      <Card>
        <CardHeader>
          <CardTitle>Engagement Trends</CardTitle>
          <CardDescription>Track likes and comments over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              likes: {
                label: "Likes",
                color: "hsl(var(--chart-1))",
              },
              comments: {
                label: "Comments",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">Date</span>
                              <span className="font-bold text-muted-foreground">
                                {payload[0]?.payload?.date || "Unknown"}
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">Likes</span>
                              <span className="font-bold text-muted-foreground">{payload[0]?.value || 0}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">Comments</span>
                              <span className="font-bold text-muted-foreground">{payload[1]?.value || 0}</span>
                            </div>
                          </div>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="likes"
                  stroke="var(--color-likes)"
                  strokeWidth={2}
                  isAnimationActive={false}
                />
                <Line
                  type="monotone"
                  dataKey="comments"
                  stroke="var(--color-comments)"
                  strokeWidth={2}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </ErrorBoundary>
  )
}

const mockData = [
  {
    date: "Jan 1",
    likes: 2500,
    comments: 450,
  },
  {
    date: "Jan 15",
    likes: 3200,
    comments: 620,
  },
  {
    date: "Feb 1",
    likes: 2800,
    comments: 510,
  },
  {
    date: "Feb 15",
    likes: 3500,
    comments: 780,
  },
  {
    date: "Mar 1",
    likes: 4000,
    comments: 850,
  },
  {
    date: "Mar 15",
    likes: 3800,
    comments: 720,
  },
  {
    date: "Apr 1",
    likes: 4200,
    comments: 950,
  },
]
