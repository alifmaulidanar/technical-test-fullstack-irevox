"use client"

import Image from "next/image"
import { StatusOrder } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { rupiahFormat } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

type TProduct = {
  name: string,
  image: string,
}

export type TColumn = {
  id: number,
  products: TProduct[],
  customer_name: string,
  price: number,
  status: StatusOrder
}

export const columns: ColumnDef<TColumn>[] = [
  {
    accessorKey: "products",
    header: "Products",
    cell: ({ row }) => {
      const order = row.original

      return (
        <div className="flex flex-col gap-4 justify-start">
          {order.products.map((product, i) => (
            <div key={`${product.name + i}`} className="inline-flex items-center gap-5">
              <Image
                src={product.image}
                alt={product.name}
                width={80}
                height={80}
                className="rounded-full"
              />
              <span>{product.name}</span>
            </div>
          ))}
        </div>
      )
    }
  },
  {
    accessorKey: "customer_name",
    header: "Customer Name",
  },
  {
    accessorKey: "price",
    header: "Total Price",
    cell: ({ row }) => rupiahFormat(row.original.price)
  },
  {
    accessorKey: "status",
    header: "Status Order",
    cell: ({ row }) => {
      return (
        <Badge variant={row.original.status === "failed" ? "destructive" : "default"}>
          {row.original.status}
        </Badge>
      )
    }
  },
]