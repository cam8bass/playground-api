import * as z from 'zod'

export const usersLimitSchema = z
  .object({
    limit: z
      .number({
        required_error: 'Ce champ est obligatoire',
        invalid_type_error: 'Ce champ doit être un nombre'
      })
      .positive({ message: 'Ce champ doit être supérieur à 0' })
      .int({ message: 'Ce champ doit être un nombre entier.' })
  })
  .transform((data) => ({ ...data, limit: Number(data.limit) }))
