export function submitFilter<T, K extends keyof T>(
  values: Partial<T>,
  allowedFields: K[],
  existingProfile?: T
): Partial<T> | null {
  const filteredValues: Partial<T> = {}

  allowedFields.forEach((field) => {
    if (values[field] !== undefined) {
      const isFieldValueDifferent = existingProfile && existingProfile[field] !== values[field]
      if (isFieldValueDifferent) {
        filteredValues[field] = values[field] as T[K]
      }
    }
  })

  return Object.keys(filteredValues).length > 0 ? filteredValues : null
}
