import { toTypedSchema } from '@vee-validate/zod'
import type { TypedSchema } from 'vee-validate'
import { z } from 'zod'

export const profileNameSchema = toTypedSchema(
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
      .trim()
  })
) as TypedSchema
