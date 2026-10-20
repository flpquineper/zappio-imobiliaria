'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/cn'

import { NAV_LINKS } from './nav'

export function NavLinks({ tone = 'light', onNavigate }: { tone?: 'light' | 'dark'; onNavigate?: () => void }) {
  const pathname = usePathname()
  const dark = tone === 'dark'

  return (
    <ul className={cn('flex', dark ? 'flex-col gap-1' : 'items-center gap-1')}>
      {NAV_LINKS.map(({ href, label }) => {
        const active = href === '/' ? pathname === '/' : pathname.startsWith(href) && !href.includes('#')
        return (
          <li key={href}>
            <Link
              href={href}
              onClick={onNavigate}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'relative inline-flex items-center rounded-md font-medium transition-colors duration-150',
                dark
                  ? 'w-full px-2 py-3 text-h3 font-normal text-white hover:text-neutral-100'
                  : 'h-10 px-3.5 text-body text-brand-navy hover:bg-neutral-50',
                active && !dark && 'text-brand-purple',
                active && dark && 'text-white underline decoration-brand-purple decoration-2 underline-offset-8',
              )}
            >
              {label}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
