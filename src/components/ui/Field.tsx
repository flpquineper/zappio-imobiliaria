import type { ComponentProps, ReactNode } from 'react'

import { cn } from '@/lib/cn'

export const inputClasses =
  'h-11 w-full rounded-md border border-neutral-300 bg-white px-3.5 text-body text-brand-navy placeholder:text-neutral-500 transition-colors duration-150 focus:border-brand-purple focus:outline-2 focus:outline-offset-0 focus:outline-brand-purple/25 aria-invalid:border-error'

export function Field({
  label,
  htmlFor,
  error,
  hint,
  className,
  children,
}: {
  label: string
  htmlFor: string
  error?: string
  hint?: string
  className?: string
  children: ReactNode
}) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={htmlFor} className="text-body-sm font-medium text-brand-navy">
        {label}
      </label>
      {children}
      {hint && !error && <p className="text-body-sm text-neutral-500">{hint}</p>}
      {error && (
        <p id={`${htmlFor}-error`} className="text-body-sm text-error">
          {error}
        </p>
      )}
    </div>
  )
}

export function Select({ className, children, ...props }: ComponentProps<'select'>) {
  return (
    <div className="relative">
      <select className={cn(inputClasses, 'appearance-none pr-10', className)} {...props}>
        {children}
      </select>
      <svg
        aria-hidden
        viewBox="0 0 20 20"
        className="pointer-events-none absolute top-1/2 right-3 size-5 -translate-y-1/2 text-neutral-500"
      >
        <path d="M5 7.5 10 12.5 15 7.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}
