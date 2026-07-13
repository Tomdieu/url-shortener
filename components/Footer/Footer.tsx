import Link from 'next/link'
import Image from 'next/image'
import { Github, Linkedin, Mail } from 'lucide-react'

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/Tomdieu/url-shortener',
    icon: Github,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/TomdieuIvan/',
    icon: Linkedin,
  },
  {
    label: 'Email',
    href: 'mailto:ivantom.python@gmail.com',
    icon: Mail,
  },
]

const Footer = () => {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800">
      <div className="landing-container py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <Image
                src="/icon.png"
                width={28}
                height={28}
                alt="Trix URL"
                className="w-7 h-7"
              />
              <span className="text-base font-bold tracking-tight">Trix URL</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm" style={{ color: 'var(--ink-muted)' }}>
              Fast, reliable URL shortening with real-time analytics. Built by
              Tomdieu Ivan.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Product</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="#features" className="text-sm hover:underline underline-offset-4" style={{ color: 'var(--ink-muted)' }}>
                  Features
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="text-sm hover:underline underline-offset-4" style={{ color: 'var(--ink-muted)' }}>
                  How it works
                </Link>
              </li>
              <li>
                <Link href="/auth/register" className="text-sm hover:underline underline-offset-4" style={{ color: 'var(--ink-muted)' }}>
                  Get started
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Legal</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="#" className="text-sm hover:underline underline-offset-4" style={{ color: 'var(--ink-muted)' }}>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:underline underline-offset-4" style={{ color: 'var(--ink-muted)' }}>
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-zinc-200 dark:border-zinc-800 gap-4">
          <p className="text-xs" style={{ color: 'var(--ink-muted)' }}>
            &copy; {new Date().getFullYear()} Trix URL. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {socialLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                aria-label={link.label}
                className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                style={{ color: 'var(--ink-muted)' }}
              >
                <link.icon className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
