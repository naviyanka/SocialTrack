"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Users, Activity, LineChart, Settings, Home, Bell, Download, AlertTriangle } from "lucide-react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()

  const routes = [
    {
      label: "Dashboard",
      icon: Home,
      href: "/",
      variant: pathname === "/" ? "default" : "ghost",
    },
    {
      label: "Followers",
      icon: Users,
      href: "/followers",
      variant: pathname === "/followers" ? "default" : "ghost",
    },
    {
      label: "Activity",
      icon: Activity,
      href: "/activity",
      variant: pathname === "/activity" ? "default" : "ghost",
    },
    {
      label: "Analytics",
      icon: LineChart,
      href: "/analytics",
      variant: pathname === "/analytics" ? "default" : "ghost",
    },
    {
      label: "Accounts",
      icon: Settings,
      href: "/accounts",
      variant: pathname === "/accounts" ? "default" : "ghost",
    },
  ]

  return (
    <div className={cn("pb-12 border-r h-full", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-xl font-semibold tracking-tight">InstaTrack</h2>
          <div className="space-y-1">
            {routes.map((route) => (
              <Button
                key={route.href}
                variant={route.variant as "default" | "ghost"}
                size="sm"
                className="w-full justify-start"
                asChild
              >
                <Link href={route.href}>
                  <route.icon className="mr-2 h-4 w-4" />
                  {route.label}
                </Link>
              </Button>
            ))}
          </div>
        </div>
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">Tools</h2>
          <div className="space-y-1">
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Suspicious Activity
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <Download className="mr-2 h-4 w-4" />
              Export Reports
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
