type EventParams = Record<string, string | number | undefined>

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

/** Envia eventos ao GA4/GTM quando estiverem carregados; sem analytics, não faz nada. */
export const trackEvent = (name: string, params: EventParams = {}) => {
  if (typeof window === 'undefined') return
  if (window.gtag) window.gtag('event', name, params)
  else window.dataLayer?.push({ event: name, ...params })
}
