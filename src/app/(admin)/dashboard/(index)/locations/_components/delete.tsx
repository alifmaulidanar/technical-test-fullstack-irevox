"use client"

import React from 'react'
import { Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ActionResult } from '@/types'
import { useFormState, useFormStatus } from 'react-dom'
import { deleteLocation } from '../lib/actions'

const initialState: ActionResult = { error: "" }

interface FormDeleteProps {
  id: number
}

function DeleteButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" variant="destructive" size="sm" disabled={pending}>
      <Trash className="w-4 h-4 mr-2" />{pending ? "Deleting..." : "Delete"}
    </Button>
  )
}

export default function DeleteLocation({ id }: FormDeleteProps) {
  const deleteLocationWithId = (_: unknown, formData: FormData) => deleteLocation(_, formData, id)
  const [state, formAction] = useFormState(deleteLocationWithId, initialState)

  return (
    <form action={formAction}>
      <DeleteButton />
    </form>
  )
}
