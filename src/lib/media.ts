import type { Media } from '@/payload-types'

type ImageSize = keyof NonNullable<Media['sizes']>

/** Relações do Payload podem vir como id (number) quando a profundidade não alcança; aqui só objetos importam. */
export const asMedia = (value: unknown): Media | null =>
  value && typeof value === 'object' && 'url' in value ? (value as Media) : null

/** Payload devolve URLs absolutas (serverURL); o next/image espera o caminho local /api/media/... */
const toLocalPath = (url: string) => url.replace(/^https?:\/\/[^/]+/, '')

export const mediaUrl = (media: Media | null | undefined, size?: ImageSize): string | null => {
  if (!media) return null
  const url = (size ? media.sizes?.[size]?.url : null) ?? media.url
  return url ? toLocalPath(url) : null
}
