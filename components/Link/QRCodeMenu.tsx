'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import QRCode from "./QRCode"
import { QrCode } from "lucide-react"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"

type QRCodeDialogProps = {
  url: string
}

export default function QRCodeDialog({ url }: QRCodeDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem
          className="flex gap-2 cursor-pointer"
          onSelect={(e) => e.preventDefault()}
        >
          <QrCode size={12} /> QR Code
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share QR Code</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center py-2">
          <QRCode url={url} size={220} />
        </div>
        <p className="text-xs text-center text-muted-foreground truncate">{url}</p>
      </DialogContent>
    </Dialog>
  )
}
