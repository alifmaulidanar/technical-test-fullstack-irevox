"use client"

import React from 'react'
import { ActionResult } from '@/types'
import { Logout } from '../lib/actions'
import { useFormState } from 'react-dom'
import { LogOutIcon } from "lucide-react"
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'

const initialState: ActionResult = { error: "" }

export default function LogOut() {
  const [state, formAction] = useFormState(Logout, initialState)

  return (
    <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
      {/* Settings */}
      {/* <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip> */}

      {/* Log Out */}
      <Tooltip>
        <TooltipTrigger asChild>
          <form action={formAction}>
            <button
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <LogOutIcon className="h-5 w-5" />
              <span className="sr-only">Log Out</span>
            </button>
          </form>
        </TooltipTrigger>
        <TooltipContent side="right">Log Out</TooltipContent>
      </Tooltip>
    </nav>
  )
}
