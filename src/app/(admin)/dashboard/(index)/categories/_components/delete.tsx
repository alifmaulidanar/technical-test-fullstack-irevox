"use client"

import React from 'react'
import { Trash } from 'lucide-react'
import { ActionResult } from '@/types'
import { Button } from '@/components/ui/button'
import { deleteCategory } from '../lib/actions'
import { useFormState, useFormStatus } from 'react-dom'

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

export default function DeleteCategory({ id }: FormDeleteProps) {
  const deleteCategoryWithId = (_: unknown, formData: FormData) => deleteCategory(_, formData, id)
  const [state, formAction] = useFormState(deleteCategoryWithId, initialState)

  return (
    <form action={formAction}>
      <DeleteButton />
    </form>
  )
}
