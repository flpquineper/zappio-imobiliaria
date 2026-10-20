import { revalidatePath } from 'next/cache'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from 'payload'

// O site é pequeno: qualquer alteração no conteúdo revalida todas as páginas públicas.
// Fora do runtime do Next (ex.: `pnpm seed`) revalidatePath lança erro — por isso o try/catch.
const revalidate = (context: Record<string, unknown>) => {
  if (context.disableRevalidate) return
  try {
    revalidatePath('/', 'layout')
  } catch {
    // sem runtime do Next
  }
}

export const revalidateAfterChange: CollectionAfterChangeHook = ({ doc, req }) => {
  revalidate(req.context)
  return doc
}

export const revalidateAfterDelete: CollectionAfterDeleteHook = ({ doc, req }) => {
  revalidate(req.context)
  return doc
}

export const revalidateGlobal: GlobalAfterChangeHook = ({ doc, req }) => {
  revalidate(req.context)
  return doc
}
