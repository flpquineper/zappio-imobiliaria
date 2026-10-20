import { cn } from '@/lib/cn'

/**
 * Forma de apoio da marca (manual, p. 15): triângulo extraído do "a",
 * sempre ascendente da esquerda para a direita, com o canto reto arredondado.
 */
export function BrandTriangle({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1000 774.29"
      preserveAspectRatio="none"
      className={cn('pointer-events-none fill-current', className)}
    >
      <path d="M977.79 31.16l-.02 360.07v199.19s-.01 98.67-.01 98.67c0 34.36-27.86 62.22-62.22 62.22h-183.23s-379.07 0-379.07 0H9.93S977.79 31.16 977.79 31.16Z" />
    </svg>
  )
}
