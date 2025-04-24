import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { AccountsList } from "@/components/accounts-list"
import { AddAccountButton } from "@/components/add-account-button"
import { AccountSettings } from "@/components/account-settings"
import { getAccounts } from "@/app/actions/account-actions"
import { getSupabaseServerClient } from "@/lib/supabase"

export default async function AccountsPage() {
  // Fetch accounts
  const { accounts = [] } = await getAccounts()

  // Fetch notification settings for all accounts
  const supabase = getSupabaseServerClient()
  const { data: settings } = await supabase
    .from("notification_settings")
    .select("*")
    .in(
      "account_id",
      accounts.map((account) => account.id),
    )

  // Convert settings to a map for easier access
  const settingsMap =
    settings?.reduce(
      (acc, setting) => {
        acc[setting.account_id] = setting
        return acc
      },
      {} as Record<string, any>,
    ) || {}

  return (
    <DashboardShell>
      <DashboardHeader heading="Accounts" text="Manage your Instagram accounts." />
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight">Your Accounts</h2>
          <AddAccountButton />
        </div>
        <AccountsList accounts={accounts} notificationSettings={settingsMap} />
        {accounts.length > 0 && <AccountSettings accountId={accounts[0].id} settings={settingsMap[accounts[0].id]} />}
      </div>
    </DashboardShell>
  )
}
