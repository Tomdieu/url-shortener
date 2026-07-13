'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { User } from 'lucide-react'

export default function SidebarSettings() {
  const path = usePathname()
  const _paths = path.split('/')
  _paths.push('')
  const routeName = _paths.join('/')

  const url = '/dashboard/settings/profile'

  return (
    <nav className="space-y-1">
      <Link href="/dashboard/settings/profile">
        <div
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
            routeName.includes(url)
              ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900'
              : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'
          }`}
        >
          <User className="h-4 w-4" />
          <span>Profile</span>
        </div>
      </Link>
    </nav>
  )
}
