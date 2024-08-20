"use client"

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export type Directories = {
  id: string
  name: string,
  path: string,
  href: string,
  isDirectory: boolean
}

export const columns: ColumnDef<Directories>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {

      return (
        <Link className="flex w-full h-full p-4" href={row.original.href} >
          {row.getValue("name")}
        </Link>
      )
    }
  }
]
