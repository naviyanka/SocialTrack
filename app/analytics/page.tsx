import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { AnalyticsCharts } from "@/components/analytics-charts"
import { AnalyticsFilters } from "@/components/analytics-filters"
import { EngagementHeatmap } from "@/components/engagement-heatmap"
import { FollowerGrowthChart } from "@/components/follower-growth-chart"
import { ExportReports } from "@/components/export-reports"

export default function AnalyticsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Analytics" text="Visualize your Instagram performance metrics and trends." />
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <AnalyticsFilters />
          <ExportReports />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <FollowerGrowthChart />
          <AnalyticsCharts />
        </div>
        <EngagementHeatmap />
      </div>
    </DashboardShell>
  )
}
