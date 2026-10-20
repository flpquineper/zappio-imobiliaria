import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'

import { cn } from '@/lib/cn'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'on-dark' | 'whatsapp'
export type ButtonSize = 'sm' | 'md' | 'lg'

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-brand-purple text-white hover:bg-brand-violet hover:shadow-brand',
  secondary: 'bg-brand-navy text-white hover:bg-brand-blue',
  outline:
    'border-[1.5px] border-brand-purple text-brand-purple hover:bg-brand-purple/8 active:bg-brand-purple/12',
  ghost: 'text-brand-navy hover:bg-neutral-50',
  'on-dark': 'bg-white text-brand-navy hover:bg-neutral-50',
  whatsapp: 'bg-brand-purple text-white hover:bg-brand-violet hover:shadow-brand',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-3.5 text-body-sm font-semibold gap-1.5',
  md: 'h-11 px-5 text-button gap-2',
  lg: 'h-13 px-7 text-button gap-2.5',
}

export const buttonClasses = (
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  className?: string,
) =>
  cn(
    'inline-flex shrink-0 items-center justify-center rounded-md whitespace-nowrap select-none',
    'transition-[background-color,box-shadow,color,transform] duration-200 ease-brand active:translate-y-px',
    'disabled:pointer-events-none disabled:opacity-50',
    variants[variant],
    sizes[size],
    className,
  )

type CommonProps = { variant?: ButtonVariant; size?: ButtonSize; icon?: ReactNode; children: ReactNode }

export function Button({
  variant,
  size,
  icon,
  className,
  children,
  type = 'button',
  ...props
}: CommonProps & ComponentProps<'button'>) {
  return (
    <button type={type} className={buttonClasses(variant, size, className)} {...props}>
      {icon}
      {children}
    </button>
  )
}

export function ButtonLink({
  variant,
  size,
  icon,
  className,
  children,
  ...props
}: CommonProps & ComponentProps<typeof Link>) {
  return (
    <Link className={buttonClasses(variant, size, className)} {...props}>
      {icon}
      {children}
    </Link>
  )
}
