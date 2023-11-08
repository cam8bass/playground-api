import { toTypedSchema } from '@vee-validate/zod'
import type { TypedSchema } from 'vee-validate'
import { z } from 'zod'

export const addApiKeySchema = toTypedSchema(
  z.object({
    apiName: z.string({ required_error: 'Ce champ est obligatoire' }).refine(
      (value) => {
        return ['Api-travel', 'Api-test1', 'Api-test2'].includes(value)
      },
      {
        message: "Veuillez saisir un nom d'api valide",
        path: ['apiName']
      }
    )
  })
) as TypedSchema
