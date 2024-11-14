"use client"

import Link from "next/link"
import { Edit } from "lucide-react"
import { Category } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import DeleteCategory from "./_components/delete"

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: "Category Name",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const category = row.original

      return (
        <div className="space-x-4 inline-flex">
          <Button size="sm" asChild>
            <Link href={`/dashboard/categories/edit/${category.id}`}>
              <Edit className="w-4 h-4 mr-2" />Edit
            </Link>
          </Button>
          <DeleteCategory id={category.id} />
        </div>
      )
    },
  },
]