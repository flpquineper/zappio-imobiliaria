'use client'

import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { getImageProps } from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'

import { BrandTriangle } from '@/components/brand/BrandTriangle'
import { buttonClasses } from '@/components/ui/Button'
import { cn } from '@/lib/cn'

export type HeroSlide = {
  id: string
  title: string
  subtitle?: string | null
  ctaLabel?: string | null
  ctaHref?: string | null
  desktop: { src: string; alt: string }
  mobile: { src: string; alt: string }
}

export function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: slides.length > 1 }, [
    Autoplay({ delay: 6000, stopOnInteraction: false, stopOnMouseEnter: true }),
  ])
  const [selected, setSelected] = useState(0)
  const [playing, setPlaying] = useState(true)

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap())
    const onPlay = () => setPlaying(true)
    const onStop = () => setPlaying(false)
    emblaApi.on('select', onSelect).on('autoplay:play', onPlay).on('autoplay:stop', onStop)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) emblaApi.plugins().autoplay?.stop()
    return () => {
      emblaApi.off('select', onSelect).off('autoplay:play', onPlay).off('autoplay:stop', onStop)
    }
  }, [emblaApi])

  const togglePlay = useCallback(() => {
    const autoplay = emblaApi?.plugins().autoplay
    if (!autoplay) return
    if (autoplay.isPlaying()) autoplay.stop()
    else autoplay.play()
  }, [emblaApi])

  if (slides.length === 0) return null

  return (
    <section aria-roledescription="carrossel" aria-label="Destaques da Zappio" className="relative bg-brand-navy">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {slides.map((slide, i) => (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} de ${slides.length}`}
              aria-hidden={i !== selected}
              className="relative min-w-0 shrink-0 grow-0 basis-full"
            >
              <div className="relative aspect-4/5 max-h-[calc(100dvh-72px)] w-full sm:aspect-auto sm:h-[min(80vh,720px)] sm:min-h-[520px]">
                <SlideImage slide={slide} first={i === 0} />
                <div aria-hidden className="absolute inset-0 bg-gradient-overlay sm:bg-gradient-overlay-side" />
                <BrandTriangle className="absolute right-0 bottom-0 h-[38%] w-[48%] text-brand-purple/85 mix-blend-multiply sm:h-[70%] sm:w-[34%]" />

                <div className="absolute inset-0 flex items-end pb-28 sm:items-center sm:pb-0">
                  <div className="container-site">
                    <div className="max-w-xl text-white">
                      <h2 className="text-display text-balance">{slide.title}</h2>
                      {slide.subtitle && <p className="mt-4 text-body-lg text-neutral-100">{slide.subtitle}</p>}
                      {slide.ctaLabel && slide.ctaHref && (
                        <Link
                          href={slide.ctaHref}
                          tabIndex={i === selected ? undefined : -1}
                          className={buttonClasses('primary', 'lg', 'mt-8')}
                          {...(slide.ctaHref.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}
                        >
                          {slide.ctaLabel}
                          <ArrowRight className="size-5" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {slides.length > 1 && (
        <div className="absolute inset-x-0 bottom-14 sm:bottom-16">
          <div className="container-site flex items-center gap-3">
            <div className="-ml-3 flex items-center">
              {slides.map((slide, i) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => emblaApi?.scrollTo(i)}
                  aria-label={`Ir para o banner ${i + 1}`}
                  aria-current={i === selected}
                  className="group flex h-11 items-center px-3"
                >
                  <span
                    className={cn(
                      'block h-1 rounded-full transition-all duration-300 ease-brand',
                      i === selected ? 'w-10 bg-white' : 'w-5 bg-white/45 group-hover:bg-white/70',
                    )}
                  />
                </button>
              ))}
            </div>
            <div className="ml-auto hidden items-center gap-2 sm:flex">
              <button
                type="button"
                onClick={togglePlay}
                aria-label={playing ? 'Pausar banners' : 'Reproduzir banners'}
                className="inline-flex size-11 items-center justify-center rounded-full border border-white/40 text-white hover:bg-white/10"
              >
                {playing ? <Pause className="size-4.5" /> : <Play className="size-4.5" />}
              </button>
              <button
                type="button"
                onClick={() => emblaApi?.scrollPrev()}
                aria-label="Banner anterior"
                className="inline-flex size-11 items-center justify-center rounded-full border border-white/40 text-white hover:bg-white/10"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => emblaApi?.scrollNext()}
                aria-label="Próximo banner"
                className="inline-flex size-11 items-center justify-center rounded-full border border-white/40 text-white hover:bg-white/10"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

/** Direção de arte: imagem paisagem no desktop e retrato no celular (padrão getImageProps do Next). */
function SlideImage({ slide, first }: { slide: HeroSlide; first: boolean }) {
  // Com <picture>, preload só pré-carregaria uma das versões: o primeiro banner usa fetchPriority alta.
  const common = { alt: slide.desktop.alt, sizes: '100vw', quality: 85 }
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({ ...common, src: slide.desktop.src, width: 1920, height: 800 })
  const {
    props: { srcSet: mobileSrcSet, ...rest },
  } = getImageProps({
    ...common,
    src: slide.mobile.src,
    width: 1080,
    height: 1350,
    loading: first ? 'eager' : 'lazy',
    fetchPriority: first ? 'high' : 'auto',
  })

  return (
    <picture>
      <source media="(min-width: 640px)" srcSet={desktopSrcSet} />
      <source srcSet={mobileSrcSet} />
      {/* eslint-disable-next-line jsx-a11y/alt-text -- alt vem de getImageProps */}
      <img {...rest} className="absolute inset-0 size-full object-cover" />
    </picture>
  )
}
