"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Download } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { exportDataAsCSV } from "@/app/actions/analytics-actions"

interface ExportReportsProps {
  accountId?: string
}

export function ExportReports({ accountId = "default" }: ExportReportsProps) {
  const [isExporting, setIsExporting] = useState(false)
  const { toast } = useToast()

  async function handleExport(dataType: string) {
    setIsExporting(true)
    try {
      const result = await exportDataAsCSV(accountId, dataType)

      if (result.success) {
        toast({
          title: "Export initiated",
          description: result.message,
        })
      } else {
        toast({
          title: "Export failed",
          description: "Failed to export data. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-1" disabled={isExporting}>
          <Download className="h-3.5 w-3.5" />
          <span>{isExporting ? "Exporting..." : "Export"}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleExport("followers")}>Export Followers as CSV</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport("engagement")}>Export Engagement as CSV</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport("activity")}>Export Activity as PDF</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport("all")}>Export All Data</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
