import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = 'light',
  align = 'left',
  action,
  as: Heading = 'h2',
  id,
  className,
}: {
  eyebrow?: string | null
  title: string
  description?: string | null
  tone?: 'light' | 'dark'
  align?: 'left' | 'center'
  action?: ReactNode
  as?: 'h1' | 'h2'
  id?: string
  className?: string
}) {
  const dark = tone === 'dark'
  return (
    <div
      className={cn(
        'flex flex-col gap-6 md:flex-row md:items-end md:justify-between',
        align === 'center' && 'items-center text-center md:flex-col md:items-center',
        className,
      )}
    >
      <div className={cn('max-w-2xl', align === 'center' && 'mx-auto')}>
        {eyebrow && (
          <p
            className={cn(
              'mb-3 text-caption uppercase',
              dark ? 'text-neutral-300' : 'text-brand-purple',
            )}
          >
            {eyebrow}
          </p>
        )}
        <Heading id={id} className={cn(Heading === 'h1' ? 'text-h1' : 'text-h2', dark ? 'text-white' : 'text-brand-navy')}>
          {title}
        </Heading>
        {description && (
          <p className={cn('mt-4 text-body-lg', dark ? 'text-neutral-100' : 'text-neutral-700')}>
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  )
}
