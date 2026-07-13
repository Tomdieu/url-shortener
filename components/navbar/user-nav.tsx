'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { signOut } from 'next-auth/react'
import { User } from '@/lib/generated/prisma/client'
import { useRouter } from 'next/navigation'
import { LogOut, Settings, Link2, Link as LinkIcon } from 'lucide-react'

type UserNavProps = {
  user?: User | null
}

export default function UserNav({ user }: UserNavProps) {
  const router = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative h-8 w-8 rounded-full outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
        <Avatar className="h-8 w-8">
          <AvatarImage src={user?.image as string} alt={user?.name as string} />
          <AvatarFallback className="text-xs font-semibold">
            {user?.name?.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs leading-none" style={{ color: 'var(--ink-muted)' }}>
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => router.push('/dashboard/links')}
            className="flex gap-2 cursor-pointer"
          >
            <Link2 size={16} />
            Links
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push('/dashboard/shorten')}
            className="flex gap-2 cursor-pointer"
          >
            <LinkIcon size={16} />
            Shorten URL
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push('/dashboard/settings/profile')}
            className="flex gap-2 cursor-pointer"
          >
            <Settings size={16} />
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex gap-2 cursor-pointer text-red-600 dark:text-red-400"
          onClick={() => signOut({ redirect: true, callbackUrl: '/auth' })}
        >
          <LogOut size={16} />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
