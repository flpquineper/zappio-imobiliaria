import type { MetadataRoute } from 'next'

import { getPropertySlugsForSitemap } from '@/lib/queries'
import { absoluteUrl } from '@/lib/site'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const properties = await getPropertySlugsForSitemap()
  return [
    { url: absoluteUrl('/'), changeFrequency: 'daily', priority: 1 },
    { url: absoluteUrl('/imoveis'), changeFrequency: 'daily', priority: 0.9 },
    { url: absoluteUrl('/sobre'), changeFrequency: 'monthly', priority: 0.6 },
    { url: absoluteUrl('/politica-de-privacidade'), changeFrequency: 'yearly', priority: 0.2 },
    ...properties.map((p) => ({
      url: absoluteUrl(`/imoveis/${p.slug}`),
      lastModified: p.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ]
}
