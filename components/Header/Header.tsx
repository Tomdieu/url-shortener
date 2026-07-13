import Link from "next/link"
import Image from 'next/image'
import { User } from '@/lib/generated/prisma/client'
import UserNav from '../navbar/user-nav'
import { Button } from "@/components/ui/button"
import ThemeButton from "@/components/ThemeButton"

type HeaderProps = {
  user?: User | null
}

const Header = async ({ user }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-lg">
      <div className="landing-container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/icon.png"
            width={32}
            height={32}
            alt="Trix URL"
            className="w-8 h-8"
          />
          <span className="text-lg font-bold tracking-tight">Trix URL</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors">
            Features
          </Link>
          <Link href="#how-it-works" className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors">
            How it works
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeButton />
          {user ? (
            <div className="flex items-center gap-2">
              <Link href="/dashboard">
                <Button variant="ghost" className="rounded-full text-sm font-medium">
                  Dashboard
                </Button>
              </Link>
              <UserNav user={user} />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/auth/login">
                <Button variant="ghost" className="rounded-full text-sm font-medium">
                  Log in
                </Button>
              </Link>
              <Link href="/auth/register">
                <span className="btn-primary !px-5 !py-2 !text-sm !rounded-full cursor-pointer">
                  Get started
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
