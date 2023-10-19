import { toTypedSchema } from '@vee-validate/zod'
import type { TypedSchema } from 'vee-validate'

import { z } from 'zod'

export const signupSchema = toTypedSchema(
  z
    .object({
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
        ),
      passwordConfirm: z.string({ required_error: 'Ce champ est obligatoire' })
    })
    .refine((data) => data.password === data.passwordConfirm, {
      path: ['passwordConfirm'],
      message: 'Les mots de passe ne correspondent pas'
    })
) as TypedSchema
