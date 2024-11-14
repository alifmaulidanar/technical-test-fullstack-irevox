"use client"

import Link from "next/link"
import { Edit } from "lucide-react"
import { Location } from "@prisma/client"
import { Button } from "@/components/ui/button"
import DeleteLocation from "./_components/delete"
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<Location>[] = [
  {
    accessorKey: "name",
    header: "Location",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const location = row.original

      return (
        <div className="space-x-4 inline-flex">
          <Button size="sm" asChild>
            <Link href={`/dashboard/locations/edit/${location.id}`}>
              <Edit className="w-4 h-4 mr-2" />Edit
            </Link>
          </Button>
          <DeleteLocation id={location.id} />
        </div>
      )
    },
  },
]