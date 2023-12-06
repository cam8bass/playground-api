<script setup lang="ts">
import type { filterType } from '@/shared/types/types'
import { uncheckInputs } from '@/shared/utils'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { ref } from 'vue'
import { useField, useForm } from 'vee-validate'

const checkedValues = ref<string[]>([])

const emits = defineEmits<{
  (e: 'updateFilter', value: string[] | null): void
}>()

const filters = ['role', 'email', 'lastname', 'firstname', 'active', 'accountLocked'] as const

const filters_fr = {
  role: 'Rôle',
  email: 'Email',
  lastname: 'Nom',
  firstname: 'Prénom',
  active: 'Compte activé',
  accountLocked: 'Compte bloqué'
}

const usersFieldsFilterSchema = toTypedSchema(
  z.object(filters.reduce((prev, curr) => ({ ...prev, [`${curr}Filter`]: z.literal(curr) }), {}))
)

const { resetForm } = useForm({ validationSchema: usersFieldsFilterSchema })

const fields = filters.map((filter) => {
  const { value, handleChange } = useField(`${filter}Filter`, '', {
    validateOnValueUpdate: false
  })
  return { filter, value, handleChange }
})

const updateCheckedValues = (value: filterType, event: Event) => {
  const target = event.target as HTMLInputElement

  if (target.checked) {
    checkedValues.value.push(value)
  } else {
    const index = checkedValues.value.indexOf(String(value))

    if (index !== -1) {
      checkedValues.value.splice(index, 1)
    }
  }

  emits('updateFilter', checkedValues.value)
}

function resetCheckedValues() {
  checkedValues.value = []
}
</script>
<template>
  <div class="filter">
    <ul class="filter__group">
      <li class="filter__block" v-for="{ filter, handleChange } in fields" :key="filter">
        <input
          type="checkbox"
          :name="`${filter}Filter`"
          :id="`${filter}Filter`"
          class="filter__checkbox"
          :value="filter"
          @change="updateCheckedValues(filter, $event)"
          @focus="handleChange"
        />
        <label :for="`${filter}Filter`" class="form__label">{{ filters_fr[filter] }}</label>
      </li>
    </ul>
    <button
      class="filter__btn"
      type="button"
      @click="
        uncheckInputs('.filter__checkbox'),
          emits('updateFilter', null),
          resetCheckedValues(),
          resetForm()
      "
    >
      Reset
    </button>
  </div>
</template>
<style lang="scss" scoped></style>
