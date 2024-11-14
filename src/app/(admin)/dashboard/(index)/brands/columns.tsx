"use client"

import Link from "next/link"
import { Edit } from "lucide-react"
import { Brand } from "@prisma/client"
import { Button } from "@/components/ui/button"
import DeleteBrand from "./_components/delete"
import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image"
import { getImageUrl } from "@/lib/supabase"

export const columns: ColumnDef<Brand>[] = [
  {
    accessorKey: "name",
    header: "Brand",
    cell: ({ row }) => {
      const brand = row.original

      return (
        <div className="inline-flex items-center gap-5">
          <Image
            src={getImageUrl(brand.logo, "brands")}
            alt={brand.name}
            width={80}
            height={80}
            className="rounded-full"
          />
          <span>{brand.name}</span>
        </div>
      )
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const brand = row.original

      return (
        <div className="space-x-4 inline-flex">
          <Button size="sm" asChild>
            <Link href={`/dashboard/brands/edit/${brand.id}`}>
              <Edit className="w-4 h-4 mr-2" />Edit
            </Link>
          </Button>
          <DeleteBrand id={brand.id} />
        </div>
      )
    },
  },
]