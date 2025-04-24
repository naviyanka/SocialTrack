"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Filter } from "lucide-react"

export function ActivityFilters() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-1">
          <Filter className="h-3.5 w-3.5" />
          <span>Filter</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuLabel>Activity Type</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked>Follows</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked>Unfollows</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked>Likes</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked>Comments</DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Time Period</DropdownMenuLabel>
        <DropdownMenuCheckboxItem checked>Today</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked>This week</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>This month</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>All time</DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
