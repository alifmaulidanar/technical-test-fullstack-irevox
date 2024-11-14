"use client"

import Link from 'next/link'
import { ActionResult } from '@/types'
import React, { ReactNode } from 'react'
import { Product } from '@prisma/client'
import UploadImages from './upload-images'
import { storeProduct, updateProduct } from '../lib/actions'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { AlertCircle, ChevronLeft } from 'lucide-react'
import { useFormState, useFormStatus } from 'react-dom'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

// const initialState: ActionResult = { error: "" }

// interface FormBrandProps {
//   type?: "ADD" | "EDIT",
//   data?: Brand | null
// }

interface FormProductProps {
  children: ReactNode
  type: 'ADD' | 'EDIT'
  data?: Product | null
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" size="sm" disabled={pending}>
      {pending ? "Saving..." : "Save Brand"}
    </Button>
  )
}

const initialFormState: ActionResult = { error: "" }

export default function FormProduct({ children, type, data }: FormProductProps) {
  const updateProductWithId = (_: unknown, formData: FormData) => updateProduct(_, formData, data?.id ?? 0)
  const [state, formAction] = useFormState(type === "ADD" ? storeProduct : updateProductWithId, initialFormState)

  return (
    <form action={formAction}>
      <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="h-7 w-7" asChild>
              <Link href="/dashboard/products">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              Product Controller
            </h1>
            <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <Button variant="outline" size="sm">
                Discard
              </Button>
              <SubmitButton />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card x-chunk="A card with a form to edit the product details"
              // className='w-[500px]'
              >
                <CardHeader>
                  <CardTitle>Product Details</CardTitle>
                  <CardDescription>
                    Lipsum dolor sit amet, consectetur adipiscing elit
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {state.error !== "" && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>
                        {state.error}
                      </AlertDescription>
                    </Alert>
                  )}
                  <div className="grid gap-6 mt-4">
                    <div className="grid gap-3">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        className="w-full"
                        defaultValue={data?.name}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="price">Price</Label>
                      <Input
                        id="price"
                        type="number"
                        name="price"
                        className="w-full"
                        defaultValue={Number(data?.price ?? 0)}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="name">Description</Label>
                      <Textarea
                        id="description"
                        name='description'
                        className="min-h-32"
                        defaultValue={data?.description}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card x-chunk="A card with a form to edit the product category and subcategory">
                <CardHeader>
                  <CardTitle>Product Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 sm:grid-cols-3">
                    {children}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
              <Card x-chunk="A card with a form to edit the product status">
                <CardHeader>
                  <CardTitle>Product Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="status">Status</Label>
                      <Select name='stock' defaultValue={data?.stock}>
                        <SelectTrigger id="status" aria-label="Select status">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ready">Ready</SelectItem>
                          <SelectItem value="preorder">Preorder</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <UploadImages defaultImages={data?.images} />
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 md:hidden">
            <Button variant="outline" size="sm">
              Discard
            </Button>
            <Button size="sm">Save Product</Button>
          </div>
        </div>
      </div>
    </form>
  )
}
