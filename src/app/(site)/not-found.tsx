import { BrandTriangle } from '@/components/brand/BrandTriangle'
import { ButtonLink } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-gradient-glow text-white">
      <div aria-hidden className="absolute inset-0 bg-pattern opacity-[0.06]" />
      <BrandTriangle className="absolute right-0 bottom-0 h-2/3 w-1/2 text-brand-purple/40" />
      <div className="relative container-site flex min-h-[60vh] flex-col items-start justify-center py-20">
        <p className="text-caption text-neutral-300 uppercase">Erro 404</p>
        <h1 className="mt-3 max-w-xl text-display">Essa página não existe (mais).</h1>
        <p className="mt-4 max-w-md text-body-lg text-neutral-100">
          O imóvel pode ter sido vendido ou o endereço mudou. Que tal ver o que temos disponível agora?
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/imoveis" variant="on-dark" size="lg">
            Ver imóveis
          </ButtonLink>
          <ButtonLink href="/" variant="ghost" size="lg" className="text-white hover:bg-white/10">
            Ir para o início
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
