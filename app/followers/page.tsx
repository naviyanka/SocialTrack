import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { FollowersList } from "@/components/followers-list"
import { FollowerStats } from "@/components/follower-stats"
import { FollowerSearch } from "@/components/follower-search"
import { FollowerFilters } from "@/components/follower-filters"

export default function FollowersPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Followers" text="Track and analyze your Instagram followers." />
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <FollowerSearch />
          <FollowerFilters />
        </div>
        <FollowerStats />
        <FollowersList />
      </div>
    </DashboardShell>
  )
}
