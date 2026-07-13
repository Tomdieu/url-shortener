'use client'

import { useEffect, useState } from 'react'
import QRCodeLib from 'qrcode'
import { Download } from 'lucide-react'

type QRCodeProps = {
  url: string
  size?: number
}

export default function QRCode({ url, size = 200 }: QRCodeProps) {
  const [src, setSrc] = useState('')

  useEffect(() => {
    QRCodeLib.toDataURL(url, { width: size, margin: 2 }, (err, dataUrl) => {
      if (!err) setSrc(dataUrl)
    })
  }, [url, size])

  const handleDownload = () => {
    const link = document.createElement('a')
    link.download = `qrcode-${Date.now()}.png`
    link.href = src
    link.click()
  }

  if (!src) return null

  return (
    <div className="flex flex-col items-center gap-3">
      <img src={src} alt="QR Code" className="rounded-lg border" style={{ width: size, height: size }} />
      <button
        onClick={handleDownload}
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        <Download size={14} />
        Download QR Code
      </button>
    </div>
  )
}
