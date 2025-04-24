"use client"

import * as React from "react"
import { CaretSortIcon, CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useToast } from "@/components/ui/use-toast"
import { addInstagramAccount } from "@/app/actions/account-actions"

type Account = {
  id: string
  label: string
  username: string
  icon: React.ReactNode
}

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface AccountSwitcherProps extends PopoverTriggerProps {
  accounts: Account[]
}

export function AccountSwitcher({ accounts = [], className }: AccountSwitcherProps) {
  const [open, setOpen] = React.useState(false)
  const [showNewAccountDialog, setShowNewAccountDialog] = React.useState(false)
  const [selectedAccount, setSelectedAccount] = React.useState<Account | null>(accounts[0] || null)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const router = useRouter()
  const { toast } = useToast()

  // Handle form submission
  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    try {
      const result = await addInstagramAccount(formData)

      if (result.success) {
        toast({
          title: "Account added",
          description: "Your Instagram account has been added successfully.",
        })
        setShowNewAccountDialog(false)
        router.refresh()
      } else {
        toast({
          title: "Error",
          description: "Failed to add Instagram account. Please try again.",
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
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={showNewAccountDialog} onOpenChange={setShowNewAccountDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select an account"
            className={cn("w-[200px] justify-between", className)}
          >
            {selectedAccount ? (
              <>
                {selectedAccount.icon}
                <span className="ml-2">{selectedAccount.label}</span>
              </>
            ) : (
              <span>Select account</span>
            )}
            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search accounts..." />
              <CommandEmpty>No accounts found.</CommandEmpty>
              {accounts.length > 0 ? (
                <CommandGroup heading="Accounts">
                  {accounts.map((account) => (
                    <CommandItem
                      key={account.username}
                      onSelect={() => {
                        setSelectedAccount(account)
                        setOpen(false)
                      }}
                      className="text-sm"
                    >
                      {account.icon}
                      <span className="ml-2">{account.label}</span>
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedAccount?.username === account.username ? "opacity-100" : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              ) : (
                <CommandGroup>
                  <CommandItem disabled className="text-sm">
                    No accounts found
                  </CommandItem>
                </CommandGroup>
              )}
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false)
                      setShowNewAccountDialog(true)
                    }}
                  >
                    <PlusCircledIcon className="mr-2 h-5 w-5" />
                    Add Account
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Instagram Account</DialogTitle>
          <DialogDescription>
            Add a new Instagram account to track. In a real app, this would connect via Instagram OAuth.
          </DialogDescription>
        </DialogHeader>
        <form action={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Account Name</Label>
              <Input id="name" name="name" placeholder="Personal, Business, etc." required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="username">Instagram Username</Label>
              <Input id="username" name="username" placeholder="@username" required />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => setShowNewAccountDialog(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Account"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
