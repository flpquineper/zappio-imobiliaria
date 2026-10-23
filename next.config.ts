import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

// Cabeçalhos de segurança em todas as respostas. Sem CSP completa (exigiria liberar scripts inline do Next e o
// mapa do Google); frame-ancestors já impede que o site e o painel sejam embutidos em outro domínio (clickjacking).
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Content-Security-Policy', value: "frame-ancestors 'self'" },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
]

const nextConfig: NextConfig = {
  poweredByHeader: false,
  headers: async () => [{ source: '/:path*', headers: securityHeaders }],
  images: {
    localPatterns: [{ pathname: '/api/media/file/**' }, { pathname: '/brand/**' }],
    // AVIF primeiro (menor), WebP como alternativa; o navegador recebe o melhor que suporta.
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 85],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  turbopack: {
    root: path.resolve(dirname),
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
