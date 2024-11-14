"use client"

import Image from "next/image"
import { getImageUrl } from "@/lib/supabase"
import { ProductStock } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { dateFormat, rupiahFormat } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit } from "lucide-react"
import Link from "next/link"
import DeleteProduct from "../products/_components/delete"

export type TColumn = {
  id: number
  name: string
  image_url: string
  category_name: string
  brand_name: string
  price: number
  total_sales: number
  stock: ProductStock
  created_at: Date
}

export const columns: ColumnDef<TColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const product = row.original
      return (
        <div className="inline-flex items-center gap-5">
          <Image
            src={getImageUrl(product.image_url, "products")}
            alt={product.name}
            width={80}
            height={80}
            className="rounded-full"
          />
          <span>{product.name}</span>
        </div>
      )
    }
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => {
      const product = row.original
      return rupiahFormat(product.price)
    }
  },
  {
    accessorKey: 'stock',
    header: 'Status',
    cell: ({ row }) => {
      const product = row.original
      return <Badge variant={"outline"}>{product.stock}</Badge>
    }
  },
  {
    accessorKey: 'total_sales',
    header: 'Total sales',
  },
  {
    accessorKey: 'created_at',
    header: 'Created at',
    cell: ({ row }) => {
      const product = row.original
      return dateFormat(product.created_at)
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original

      return (
        <div className="space-x-4 inline-flex">
          <Button size="sm" asChild>
            <Link href={`/dashboard/products/edit/${product.id}`}>
              <Edit className="w-4 h-4 mr-2" />Edit
            </Link>
          </Button>
          <DeleteProduct id={product.id} />
        </div>
      )
    },
  },
]