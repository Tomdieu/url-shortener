"use client"


import { Link as LinkType } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { DataTable } from "../DataTable"
import { InfoIcon, MoreHorizontal, RefreshCcw, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
 

const columns: ColumnDef<LinkType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey:"id",
    header:"Id",
    cell:({row}) => <div>{row.getValue("id")}</div>
  },
  {
    accessorKey:"original",
    header:"Original Url",
    cell:({row})=><Link target="_blank" href={row.getValue("original")}>{row.getValue("original")}</Link>,
    enableColumnFilter:true,
    enableSorting: true,
    enableHiding: true,

  },
  {
    accessorKey:"short",
    header:"Shorten Url",
    cell:({row})=><Link target="_blank" href={`http://localhost:3000/${row.getValue("short")}`}>http://localhost:3000/{row.getValue("short")}</Link>
  },
  {
    accessorKey:"clicks",
    header:"Numbers Of Clicks",
    cell:({row})=><div>{(row.getValue("clicks") as []).length}</div>
  },
  {
    accessorKey:"createdAt",
    header:"Created On",
    cell:({row}) => <div>{(new Date(row.getValue("createdAt"))).toDateString()}</div>,
    enableColumnFilter:true,
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const short = row.getValue('short')
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
             className="flex gap-2 cursor-pointer"
            >
              <InfoIcon size={12}/> Detail
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex gap-2 cursor-pointer"><RefreshCcw size={14}/>Update</DropdownMenuItem>
            <DropdownMenuItem className="flex gap-2 bg-red-100 cursor-pointer"><Trash2 size={14} color="red"/>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }

]

type LinkTablesProps = {
  links: LinkType[]
}



export default function LinkTables({ links }: LinkTablesProps) {

  return <DataTable columns={columns} data={links} />
}