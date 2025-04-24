import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { ActivityFeed } from "@/components/activity-feed"
import { ActivityFilters } from "@/components/activity-filters"
import { ActivityStats } from "@/components/activity-stats"

export default function ActivityPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Activity" text="Monitor follows, unfollows, and engagement activity." />
      <div className="flex flex-col gap-4">
        <ActivityStats />
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Recent Activity</h2>
          <ActivityFilters />
        </div>
        <ActivityFeed />
      </div>
    </DashboardShell>
  )
}
