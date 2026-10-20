import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

const variants = {
  brand: 'bg-brand-purple text-white',
  dark: 'bg-brand-navy text-white',
  neutral: 'bg-neutral-100 text-neutral-900',
  sold: 'bg-neutral-900 text-white',
  light: 'bg-white/90 text-brand-navy backdrop-blur-sm',
} as const

export function Badge({
  variant = 'brand',
  className,
  children,
}: {
  variant?: keyof typeof variants
  className?: string
  children: ReactNode
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-sm px-2 py-1 text-caption uppercase',
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
