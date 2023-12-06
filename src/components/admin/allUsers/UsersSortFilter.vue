<script setup lang="ts">
import type { sortFilterType } from '@/shared/types/types'
import { uncheckInputs } from '@/shared/utils'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, useField } from 'vee-validate'
import * as z from 'zod'

const filters = ['-createAt', 'createAt'] as const

const filters_fr = {
  '-createAt': 'Du + au - récent',
  createAt: 'Du - au + récent'
}

const usersSortFilterSchema = toTypedSchema(
  z.object(filters.reduce((prev, curr) => ({ ...prev, [`${curr}Sort`]: z.literal(curr) }), {}))
)

const { resetForm } = useForm({ validationSchema: usersSortFilterSchema })

const radio = filters.map((filter) => {
  const { value, handleChange } = useField(`${filter}Sort`, '', { validateOnValueUpdate: false })
  return { filter, value, handleChange }
})

const emits = defineEmits<{
  (e: 'updateSort', value: sortFilterType | null): void
}>()
</script>
<template>
  <div class="filter">
    <ul class="filter__group">
      <li class="filter__block" v-for="{ filter, handleChange } in radio" :key="filter">
        <input
          type="radio"
          :name="`${filter}Sort`"
          :id="`${filter}Sort`"
          :value="filter"
          class="filter__radio"
          @change="emits('updateSort', filter)"
          @focus="handleChange"
        />
        <label for="createAt" class="form__label">{{ filters_fr[filter] }}</label>
      </li>
    </ul>
    <button
      class="filter__btn"
      @click="uncheckInputs('.filter__radio'), emits('updateSort', null), resetForm()"
    >
      reset
    </button>
  </div>
</template>
<style lang="scss" scoped></style>
