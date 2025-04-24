"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ErrorBoundary } from "@/components/error-boundary"

interface FollowerStatsProps {
  metrics?: any[]
}

export function FollowerStats({ metrics = [] }: FollowerStatsProps) {
  // Process metrics data or use mock data if not available
  const chartData =
    metrics && metrics.length > 0
      ? metrics
          .map((item) => ({
            name: new Date(item.date).toLocaleDateString("en-US", { month: "short" }),
            gained: item.gained_followers || 0,
            lost: item.lost_followers || 0,
          }))
          .slice(0, 6)
          .reverse()
      : mockData

  return (
    <ErrorBoundary>
      <Card>
        <CardHeader>
          <CardTitle>Follower Growth</CardTitle>
          <CardDescription>Monthly follower gains and losses</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              gained: {
                label: "Gained",
                color: "hsl(var(--chart-1))",
              },
              lost: {
                label: "Lost",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">Month</span>
                              <span className="font-bold text-muted-foreground">
                                {payload[0]?.payload?.name || "Unknown"}
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">Gained</span>
                              <span className="font-bold text-muted-foreground">{payload[0]?.value || 0}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">Lost</span>
                              <span className="font-bold text-muted-foreground">{payload[1]?.value || 0}</span>
                            </div>
                          </div>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Bar dataKey="gained" fill="var(--color-gained)" radius={[4, 4, 0, 0]} isAnimationActive={false} />
                <Bar dataKey="lost" fill="var(--color-lost)" radius={[4, 4, 0, 0]} isAnimationActive={false} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </ErrorBoundary>
  )
}

const mockData = [
  {
    name: "Jan",
    gained: 120,
    lost: 30,
  },
  {
    name: "Feb",
    gained: 150,
    lost: 45,
  },
  {
    name: "Mar",
    gained: 200,
    lost: 60,
  },
  {
    name: "Apr",
    gained: 180,
    lost: 40,
  },
  {
    name: "May",
    gained: 250,
    lost: 70,
  },
  {
    name: "Jun",
    gained: 300,
    lost: 90,
  },
]
