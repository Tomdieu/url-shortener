'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { signOut } from 'next-auth/react'
import { sidebarDashboardLinks } from '@/constants'
import { LogOut, Sun, Moon } from 'lucide-react'

const Sidebar = () => {
  const { theme, setTheme } = useTheme()
  const path = usePathname()
  const _paths = path.split('/')
  _paths.push('')
  const routeName = _paths.join('/')

  return (
    <div className="flex flex-col h-full w-full bg-zinc-950 dark:bg-zinc-950 text-zinc-400">
      <div className="px-5 py-5 border-b border-zinc-800">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="text-lg font-bold tracking-tight text-white">
            Trix URL
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {sidebarDashboardLinks.map(({ url, label, icon }) => {
          const isActive =
            (path === '/dashboard' && url === path) ||
            (url !== '/dashboard' && routeName.includes(url))

          return (
            <Link
              key={label}
              href={url}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-white text-zinc-950'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {icon}
              <span>{label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="px-3 pb-4 space-y-1">
        <button
          onClick={() =>
            setTheme(theme === 'dark' ? 'light' : 'dark')
          }
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          {theme === 'dark' ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
          <span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
        </button>

        <button
          onClick={() => signOut({ redirect: true, callbackUrl: '/auth' })}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span>Log out</span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar
