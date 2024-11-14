"use client"

import React from 'react'
import { Trash } from 'lucide-react'
import { ActionResult } from '@/types'
import { deleteProduct } from '../lib/actions'
import { Button } from '@/components/ui/button'
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

export default function DeleteProduct({ id }: FormDeleteProps) {
  const deleteProductWithId = (_: unknown, formData: FormData) => deleteProduct(_, formData, id)
  const [state, formAction] = useFormState(deleteProductWithId, initialState)

  return (
    <form action={formAction}>
      <DeleteButton />
    </form>
  )
}
