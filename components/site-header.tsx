"use client"

import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"
import { UserNav } from "@/components/user-nav"
import { AccountSwitcher } from "@/components/account-switcher"
import { MainNav } from "@/components/main-nav"
import { useEffect, useState } from "react"
import { getCurrentUser } from "@/lib/auth"
import type { ReactNode } from "react"

export function SiteHeader() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      const user = await getCurrentUser()
      setIsAuthenticated(!!user)
    }
    checkAuth()
  }, [])

  const emptyAccounts: Array<{
    id: string
    label: string
    username: string
    icon: ReactNode
  }> = []

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center space-x-2 mr-6">
          <span className="font-bold text-xl">InstaTrack</span>
        </Link>
        {isAuthenticated && (
          <>
            <AccountSwitcher accounts={emptyAccounts} />
            <MainNav className="mx-6" />
          </>
        )}
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
          {isAuthenticated && <UserNav />}
        </div>
      </div>
    </header>
  )
}
