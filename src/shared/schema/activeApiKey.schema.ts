import { toTypedSchema } from '@vee-validate/zod'
import type { TypedSchema } from 'vee-validate'
import { z } from 'zod'

export const activeApiKeySchema = toTypedSchema(
  z.object({
    active: z.boolean({
      required_error: 'Ce champ est obligatoire',
      invalid_type_error: 'Ce champ doit contenir une valeur booléenne'
    })
  })
) as TypedSchema
