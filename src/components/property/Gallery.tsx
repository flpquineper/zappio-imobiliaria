'use client'

import { ChevronLeft, ChevronRight, Images, X } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/cn'

export type GalleryImage = { src: string; thumb: string; alt: string }

export function Gallery({ images, title }: { images: GalleryImage[]; title: string }) {
  const [index, setIndex] = useState<number | null>(null)
  const [mobileIndex, setMobileIndex] = useState(0)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const open = index !== null

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  const go = useCallback(
    (delta: number) => setIndex((i) => (i === null ? i : (i + delta + images.length) % images.length)),
    [images.length],
  )

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, go])

  if (images.length === 0) return null
  const [first, ...rest] = images
  const side = rest.slice(0, 4)

  return (
    <>
      {/* Celular: carrossel com rolagem nativa */}
      <div className="relative -mx-4 md:hidden">
        <ul
          className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none]"
          onScroll={(e) => {
            const el = e.currentTarget
            setMobileIndex(Math.round(el.scrollLeft / el.clientWidth))
          }}
        >
          {images.map((img, i) => (
            <li key={img.src} className="relative aspect-4/3 w-full shrink-0 snap-center">
              <button type="button" onClick={() => setIndex(i)} className="absolute inset-0" aria-label={`Ampliar foto ${i + 1}`}>
                <Image src={img.src} alt={img.alt} fill preload={i === 0} fetchPriority={i === 0 ? 'high' : undefined} sizes="100vw" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
        <span className="absolute right-4 bottom-3 rounded-sm bg-brand-navy/80 px-2 py-1 text-caption text-white">
          {mobileIndex + 1} / {images.length}
        </span>
      </div>

      {/* Desktop: mosaico */}
      <div className="relative hidden md:block">
        <div className="grid h-[520px] grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-xl">
          <button
            type="button"
            onClick={() => setIndex(0)}
            className={cn('group relative overflow-hidden', side.length ? 'col-span-2 row-span-2' : 'col-span-4 row-span-2')}
            aria-label="Ampliar foto 1"
          >
            <Image src={first.src} alt={first.alt} fill loading="eager" sizes="50vw" className="object-cover transition-transform duration-500 ease-brand group-hover:scale-[1.02]" />
          </button>
          {side.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setIndex(i + 1)}
              className={cn('group relative overflow-hidden', side.length < 3 && 'row-span-2', side.length === 1 && 'col-span-2')}
              aria-label={`Ampliar foto ${i + 2}`}
            >
              <Image src={img.thumb} alt={img.alt} fill sizes="25vw" className="object-cover transition-transform duration-500 ease-brand group-hover:scale-[1.04]" />
            </button>
          ))}
        </div>
        {images.length > 1 && (
          <button
            type="button"
            onClick={() => setIndex(0)}
            className="absolute right-4 bottom-4 inline-flex h-10 items-center gap-2 rounded-md bg-white px-4 text-body-sm font-semibold text-brand-navy shadow-md hover:bg-neutral-50"
          >
            <Images className="size-4.5" />
            Ver todas as {images.length} fotos
          </button>
        )}
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => setIndex(null)}
        aria-label={`Fotos de ${title}`}
        className="m-0 h-dvh max-h-none w-full max-w-none bg-brand-navy p-0 text-white backdrop:bg-black/80"
      >
        {index !== null && (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-body-sm text-neutral-100">
                {index + 1} / {images.length}
              </span>
              <button
                type="button"
                onClick={() => setIndex(null)}
                aria-label="Fechar"
                className="inline-flex size-11 items-center justify-center rounded-md hover:bg-white/10"
              >
                <X className="size-6" />
              </button>
            </div>
            <div className="relative flex-1">
              <Image src={images[index].src} alt={images[index].alt} fill sizes="100vw" className="object-contain" />
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Foto anterior"
                    className="absolute top-1/2 left-2 inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-brand-navy/70 hover:bg-brand-navy md:left-6"
                  >
                    <ChevronLeft className="size-6" />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Próxima foto"
                    className="absolute top-1/2 right-2 inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-brand-navy/70 hover:bg-brand-navy md:right-6"
                  >
                    <ChevronRight className="size-6" />
                  </button>
                </>
              )}
            </div>
            <ul className="flex justify-center gap-2 overflow-x-auto px-4 py-4">
              {images.map((img, i) => (
                <li key={img.src} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Ver foto ${i + 1}`}
                    aria-current={i === index}
                    className={cn(
                      'relative block h-14 w-20 overflow-hidden rounded-sm opacity-60 transition-opacity hover:opacity-100',
                      i === index && 'opacity-100 ring-2 ring-brand-purple',
                    )}
                  >
                    <Image src={img.thumb} alt="" fill sizes="80px" className="object-cover" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </dialog>
    </>
  )
}
