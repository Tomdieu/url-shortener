'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function DashboardBreadCumb() {
  const path = usePathname()
  const sections = path.split('/').filter(Boolean)

  const buildUrl = (index: number) => {
    const _path = []
    for (let i = 0; i <= index; i++) {
      _path.push(sections[i])
    }
    return '/' + _path.join('/')
  }

  return (
    <nav className="mb-4 flex items-center gap-1.5 text-sm">
      {sections.map((section, index) => {
        const isLast = index === sections.length - 1
        return (
          <React.Fragment key={section}>
            {index > 0 && (
              <span style={{ color: 'var(--ink-muted)' }}>/</span>
            )}
            {isLast ? (
              <span className="font-medium capitalize">{section}</span>
            ) : (
              <Link
                href={buildUrl(index)}
                className="capitalize hover:underline underline-offset-4 transition-colors"
                style={{ color: 'var(--ink-muted)' }}
              >
                {section}
              </Link>
            )}
          </React.Fragment>
        )
      })}
    </nav>
  )
}
