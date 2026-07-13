'use client'

import { User } from '@/lib/generated/prisma/client'
import UserNav from './user-nav'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import Sidebar from '../sidebar'
import { Menu } from 'lucide-react'

type NavBarProps = {
  user?: User | null
}

const NavBar: React.FC<NavBarProps> = ({ user }) => {
  return (
    <header
      className="sticky top-0 z-40 w-full border-b backdrop-blur-lg"
      style={{
        borderColor: 'var(--border)',
        background: 'color-mix(in srgb, var(--surface) 80%, transparent)',
      }}
    >
      <div className="flex h-14 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <Sheet>
            <SheetTrigger className="lg:hidden p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
              <Sidebar />
            </SheetContent>
          </Sheet>
          <span className="text-base font-bold tracking-tight lg:hidden">
            Trix URL
          </span>
        </div>

        <div className="flex items-center gap-3">
          {user && <UserNav user={user} />}
        </div>
      </div>
    </header>
  )
}

export default NavBar
