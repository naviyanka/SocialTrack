import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { OverviewStats } from "@/components/overview-stats"
import { FollowerActivity } from "@/components/follower-activity"
import { EngagementChart } from "@/components/engagement-chart"
import { TopEngagers } from "@/components/top-engagers"
import { RecentActivity } from "@/components/recent-activity"
import { SuspiciousActivity } from "@/components/suspicious-activity"
import { getAccounts } from "@/app/actions/account-actions"
import { getFollowerHistory, getFollowerMetrics } from "@/app/actions/follower-actions"
import { getEngagementData } from "@/app/actions/analytics-actions"
import { getSuspiciousActivities } from "@/app/actions/notification-actions"
import { ErrorBoundary } from "@/components/error-boundary"

export default async function DashboardPage() {
  try {
    // Fetch accounts
    const { accounts = [] } = await getAccounts()

    // If no accounts, show empty state
    if (accounts.length === 0) {
      return (
        <DashboardShell>
          <DashboardHeader
            heading="Dashboard"
            text="Monitor your Instagram account performance and follower activity."
          />
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <h2 className="text-2xl font-bold tracking-tight">No Instagram accounts found</h2>
            <p className="text-muted-foreground mt-2">Add an Instagram account to start tracking your performance.</p>
            <a
              href="/accounts"
              className="mt-4 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Add Account
            </a>
          </div>
        </DashboardShell>
      )
    }

    // Use the first account for data
    const activeAccount = accounts[0]

    // Fetch data for the active account
    const [followerHistory, followerMetrics, engagementData, suspiciousActivities] = await Promise.all([
      getFollowerHistory(activeAccount.id),
      getFollowerMetrics(activeAccount.id),
      getEngagementData(activeAccount.id),
      getSuspiciousActivities(),
    ])

    return (
      <DashboardShell>
        <DashboardHeader heading="Dashboard" text="Monitor your Instagram account performance and follower activity." />
        <ErrorBoundary>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <OverviewStats metrics={followerMetrics.metrics} />
          </div>
        </ErrorBoundary>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="col-span-4">
            <ErrorBoundary>
              <FollowerActivity history={followerHistory.history} />
            </ErrorBoundary>
          </div>
          <div className="col-span-3">
            <ErrorBoundary>
              <EngagementChart data={engagementData.data} />
            </ErrorBoundary>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="col-span-3">
            <ErrorBoundary>
              <TopEngagers accountId={activeAccount.id} />
            </ErrorBoundary>
          </div>
          <div className="col-span-4">
            <ErrorBoundary>
              <RecentActivity history={followerHistory.history} />
            </ErrorBoundary>
          </div>
        </div>
        <div className="mt-4">
          <ErrorBoundary>
            <SuspiciousActivity activities={suspiciousActivities.activities} />
          </ErrorBoundary>
        </div>
      </DashboardShell>
    )
  } catch (error) {
    console.error("Error in dashboard page:", error)
    return (
      <DashboardShell>
        <DashboardHeader heading="Dashboard" text="Monitor your Instagram account performance and follower activity." />
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <h2 className="text-2xl font-bold tracking-tight">Something went wrong</h2>
          <p className="text-muted-foreground mt-2">
            We encountered an error while loading your dashboard. Please try again later.
          </p>
          <a
            href="/"
            className="mt-4 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Refresh
          </a>
        </div>
      </DashboardShell>
    )
  }
}
