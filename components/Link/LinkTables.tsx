"use client"


import { Link as LinkType } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { DataTable } from "../DataTable"
import { Clipboard, InfoIcon, MoreHorizontal, RefreshCcw, Trash2 } from "lucide-react"
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
import { useState } from "react"
import { toast } from "react-hot-toast";
import {redirect} from "next/navigation"
import HoverLink from "@/components/Link/HoverLink";


const LinkComponent = ({ link }: { link: string }) => {

  return (
    <div
      className="flex items-center gap-2 relative overflow-hidden max-w-sm"
    >
      <Link target="_blank" href={link} className={"text-sm truncate overflow-hidden font-poppins"}>
        <HoverLink url={link} />
        {/*{link}*/}
      </Link>
    </div>
  );
}


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
    accessorKey: "id",
    header: "Id",
    cell: ({ row }) => <div>{row.getValue("id")}</div>
  },
  {
    accessorKey: "original",
    header: "Original Url",
    cell: ({ row }) => <LinkComponent link={row.getValue("original")} />,
    enableColumnFilter: true,
    enableSorting: true,
    enableHiding: true,

  },
  {
    accessorKey: "short",
    header: "Shorten Url",
    cell: ({ row }) => <LinkComponent link={`${process.env.NEXT_PUBLIC_URL}/${row.getValue("short")}`} />
  },
  {
    accessorKey: "clicks",
    header: "Numbers Of Clicks",
    cell: ({ row }) => <div>{(row.getValue("clicks") as []).length}</div>
  },
  {
    accessorKey: "createdAt",
    header: "Created On",
    cell: ({ row }) => <div className={"text-sm"}>{(new Date(row.getValue("createdAt"))).toDateString()}</div>,
    enableColumnFilter: true,
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.getValue('id');
      const short = row.getValue('short')
      const url = process.env.NEXT_PUBLIC_URL+ "/" + short;

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
              onClick={() => { navigator.clipboard.writeText(url).then(r => toast.success("Link Copied", { position: "top-center" })); }}
            >
              <Clipboard size={12} /> Copy
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex gap-2 cursor-pointer"
            >
              <Link href={`/dashboard/links/${short}/`} className={"flex items-center justify-between gap-2"} >
              <InfoIcon size={12} /> Detail
              </Link>

            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex gap-2 cursor-pointer"><RefreshCcw size={14} />Update</DropdownMenuItem>
            <DropdownMenuItem className="flex gap-2 bg-red-100 cursor-pointer dark:bg-transparent"><Trash2 size={14} color={"red"} />Delete</DropdownMenuItem>
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