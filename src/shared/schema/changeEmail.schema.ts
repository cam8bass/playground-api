import { toTypedSchema } from '@vee-validate/zod'
import type { TypedSchema } from 'vee-validate'
import { z } from 'zod'

export const profileEmailSchema = toTypedSchema(
  z
    .object({
      email: z
        .string({ required_error: 'Ce champ est obligatoire' })

        .email({ message: 'Veuillez saisir une adresse email valide' }),

      newEmail: z
        .string({ required_error: 'Ce champ est obligatoire' })

        .email({ message: 'Veuillez saisir une adresse email valide' }),
      password: z
        .string({ required_error: 'Ce champ est obligatoire' })

        .regex(
          new RegExp(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@;,#$%^&*])[a-zA-Z0-9!@;,#$%^&*]{8,30}$'
          ),
          {
            message:
              'Mot de passe invalide. Il faut 8 à 30 caractères, dont 1 minuscule, 1 majuscule, 1 chiffre et 1 symbole (!@;,#$%^&*).'
          }
        )
    })
    .refine((data) => data.email !== data.newEmail, {
      path: ['newEmail'],
      message: "Veuillez fournir une adresse e-mail différente de l'ancienne."
    })
) as TypedSchema
