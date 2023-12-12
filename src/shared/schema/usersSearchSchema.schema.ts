import * as z from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import type { TypedSchema } from 'vee-validate'

export const usersSearchSchema = toTypedSchema(
  z
    .string({ invalid_type_error: 'Ce champ doit être une chaîne de caractères' })

    .regex(new RegExp('^[a-zA-Z0-9]*$'), {
      message:
        'Ce champ ne doit contenir uniquement des lettres , des chiffres ou une adresse email valide'
    })
    .toLowerCase()
    .trim()
    .or(
      z
        .string({ invalid_type_error: 'Ce champ doit être une chaîne de caractères' })
        .email({ message: 'Ce champ doit être une adresse email valide' })
    )
    .optional()
) as TypedSchema<string>
