<script setup lang="ts">
import { uncheckInputs } from '@/shared/utils'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { useField, useForm } from 'vee-validate'
import { ref } from 'vue'

const checkedValues = ref<Record<string, string>>({})

const emits = defineEmits<{
  (e: 'updateParameters', value: {} | null): void
}>()

const filters: Record<string, string[] | boolean[]> = {
  role: ['user', 'admin'],
  active: [true, false],
  accountLocked: [true, false],
  accountDisable: [true, false]
}

const filters_fr: Record<string, string> = {
  roleUser: 'Role utilisateur',
  roleAdmin: 'Role administrateur',
  activeTrue: 'Compte activé',
  activeFalse: 'Compte non activé',
  accountDisableTrue: 'Compte désactivé',
  accountDisableFalse: 'Compte non désactivé',
  accountLockedTrue: 'Compte bloqué',
  accountLockedFalse: 'Compte non bloqué'
}

const parametersFilterSchema = toTypedSchema(
  z.object(
    Object.keys(filters).reduce(
      (prev, curr) => ({
        ...prev,
        [curr]: typeof filters[curr][0] === 'string' ? z.enum(['user', 'admin']) : z.boolean()
      }),
      {}
    )
  )
)

const { resetForm } = useForm({ validationSchema: parametersFilterSchema })

const fields = Object.entries(filters).map(([group, values]) => {
  const groupFields = values.map((value: string | boolean) => {
    const { handleChange } = useField(group, '', {
      validateOnValueUpdate: false
    })
    return { value: value as string, handleChange }
  })
  return { group, groupFields }
})

const updateCheckedValues = (group: string, event: Event) => {
  const target = event.target as HTMLInputElement
  const value = typeof filters[group][0] === 'boolean' ? target.value === 'true' : target.value
  checkedValues.value[group] = value as string
  emits('updateParameters', checkedValues.value)
}

function resetCheckedValues() {
  checkedValues.value = {}
}
</script>

<template>
  <div class="filter">
    <ul class="filter__group" v-for="{ group, groupFields } in fields" :key="group">
      <li class="filter__block" v-for="{ value, handleChange } in groupFields" :key="value">
        <input
          type="radio"
          :name="group"
          :id="`${group}${value}`"
          class="filter__checkbox"
          :value="value"
          @change="updateCheckedValues(group, $event)"
          @focus="handleChange"
        />
        <label :for="`${group}${value}`" class="form__label"
          >{{
            filters_fr[
              `${group}${value.toString().charAt(0).toUpperCase() + value.toString().slice(1)}`
            ]
          }}
        </label>
      </li>
    </ul>
    <button
      class="filter__btn"
      type="button"
      @click="
        uncheckInputs('.filter__checkbox'),
          emits('updateParameters', null),
          resetCheckedValues(),
          resetForm()
      "
    >
      Reset
    </button>
  </div>
</template>

<style lang="scss" scoped></style>
