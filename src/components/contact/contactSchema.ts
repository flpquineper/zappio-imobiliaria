import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Informe seu nome.').max(120),
  email: z.string().trim().email('Informe um e-mail válido.'),
  phone: z
    .string()
    .trim()
    .max(20)
    .refine((v) => v === '' || v.replace(/\D/g, '').length >= 10, 'Informe DDD + número.')
    .optional(),
  message: z.string().trim().min(10, 'Conte um pouco mais (mínimo de 10 caracteres).').max(2000),
  propertyId: z.coerce.number().int().positive().optional(),
  consent: z.literal('on', { message: 'É preciso aceitar a política de privacidade.' }),
})

export type ContactState = {
  status: 'idle' | 'success' | 'error'
  message?: string
  errors?: Partial<Record<'name' | 'email' | 'phone' | 'message' | 'consent', string>>
}
