import { toTypedSchema } from '@vee-validate/zod'
import type { TypedSchema } from 'vee-validate'

import { z } from 'zod'

export const adminUpdateUserSchema = toTypedSchema(
  z.object({
    firstname: z
      .string({ required_error: 'Ce champ est obligatoire' })

      .regex(new RegExp('^[a-zA-Z]{3,15}$'), {
        message:
          'Veuillez saisir un nom valide composé uniquement de lettres entre 3 et 15 caractères'
      })
      .toLowerCase()
      .trim(),
    lastname: z
      .string({ required_error: 'Ce champ est obligatoire' })
      .regex(new RegExp('^[a-zA-Z]{3,15}$'), {
        message:
          'Veuillez saisir un prénom valide composé uniquement de lettres entre 3 et 15 caractères'
      })
      .toLowerCase()
      .trim(),
    email: z
      .string({ required_error: 'Ce champ est obligatoire' })

      .email({ message: 'Veuillez saisir une adresse email valide' }),

    role: z.string({ required_error: 'Ce champ est obligatoire' }).refine(
      (value) => {
        return ['user', 'admin'].includes(value)
      },
      {
        message: 'Veuillez saisir un rôle valide',
        path: ['role']
      }
    ),
    active: z.boolean({
      required_error: 'Ce champ est obligatoire',
      invalid_type_error: 'Ce champ doit contenir une valeur booléenne'
    })
  })
) as TypedSchema
