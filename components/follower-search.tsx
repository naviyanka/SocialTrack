"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function FollowerSearch() {
  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input type="search" placeholder="Search followers..." className="w-full pl-8" />
    </div>
  )
}
