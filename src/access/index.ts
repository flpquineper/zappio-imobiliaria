import type { Access, FieldAccess } from 'payload'

import type { User } from '@/payload-types'

const hasRole = (user: unknown, role: User['role']) =>
  Boolean(user && (user as User).role === role)

export const anyone: Access = () => true

export const authenticated: Access = ({ req: { user } }) => Boolean(user)

export const adminOnly: Access = ({ req: { user } }) => hasRole(user, 'admin')

export const adminOnlyField: FieldAccess = ({ req: { user } }) => hasRole(user, 'admin')

/** Admin vê tudo; usuário vê/edita apenas o próprio cadastro. */
export const adminOrSelf: Access = ({ req: { user } }) => {
  if (!user) return false
  if (hasRole(user, 'admin')) return true
  return { id: { equals: user.id } }
}

/** Público só enxerga imóveis publicados ou vendidos; rascunhos e inativos só no admin. */
export const publicPropertiesOrAuthenticated: Access = ({ req: { user } }) => {
  if (user) return true
  return { status: { in: ['published', 'sold'] } }
}

/** Público só enxerga banners ativos; o período de exibição é filtrado na consulta. */
export const activeOrAuthenticated: Access = ({ req: { user } }) => {
  if (user) return true
  return { active: { equals: true } }
}
