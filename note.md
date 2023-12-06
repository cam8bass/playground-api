<script setup lang="ts">
import type { parametersFilterType } from '@/shared/types/types'
import { ref } from 'vue'
/**
 * A reactive variable that stores the currently selected filter parameters.
 * The key of the record is the name of the parameter, and the value is the selected value.
 */
const checkedValues = ref<Record<string, string>>({})

const emits = defineEmits<{
  (e: 'updateParameters', value: {}): void
}>()

/**
 * A function that updates the selected filter parameters.
 * @param key The name of the parameter to update.
 * @param event The event that triggered the update.
 */

const updateCheckedValues = (key: parametersFilterType, event: Event) => {
  const target = event.target as HTMLInputElement
  checkedValues.value[key] = target.value
  emits('updateParameters', checkedValues.value)
}
</script>
<template>
  <div class="filter">
    <div class="filter__group">
      <div class="filter__block">
        <input
          type="radio"
          name="role"
          id="userRole"
          class="filter__checkbox"
          value="user"
          @change="updateCheckedValues('role', $event)"
        />
        <label for="userRole" class="form__label">Rôle utilisateur</label>
      </div>

      <div class="filter__block">
        <input
          type="radio"
          name="role"
          id="adminRole"
          class="filter__checkbox"
          value="admin"
          @change="updateCheckedValues('role', $event)"
        />
        <label for="adminRole" class="form__label">Rôle administrateur</label>
      </div>

      <div class="filter__block">
        <input
          type="radio"
          name="active"
          id="activeTrue"
          class="filter__checkbox"
          value="true"
          @change="updateCheckedValues('active', $event)"
        />
        <label for="activeTrue" class="form__label">Compte activé</label>
      </div>

      <div class="filter__block">
        <input
          type="radio"
          name="active"
          id="activeFalse"
          class="filter__checkbox"
          value="false"
          @change="updateCheckedValues('active', $event)"
        />
        <label for="activeFalse" class="form__label">Compte désactivé</label>
      </div>

      <div class="filter__block">
        <input
          type="radio"
          name="accountLocked"
          id="accountLockedTrue"
          class="filter__checkbox"
          value="true"
          @change="updateCheckedValues('accountLocked', $event)"
        />
        <label for="accountLockedTrue" class="form__label">Compte bloqué</label>
      </div>

      <div class="filter__block">
        <input
          type="radio"
          name="accountLocked"
          id="accountLockedFalse"
          class="filter__checkbox"
          value="false"
          @change="updateCheckedValues('accountLocked', $event)"
        />
        <label for="accountLockedFalse" class="form__label">Compte non bloqué</label>
      </div>

      <div class="filter__block">
        <input
          type="radio"
          name="accountDisable"
          id="accountDisableTrue"
          class="filter__checkbox"
          value="true"
          @change="updateCheckedValues('accountDisable', $event)"
        />
        <label for="accountDisableTrue" class="form__label">Compte suspendu</label>
      </div>

      <div class="filter__block">
        <input
          type="radio"
          name="accountDisable"
          id="accountDisableFalse"
          class="filter__checkbox"
          value="false"
          @change="updateCheckedValues('accountDisable', $event)"
        />
        <label for="accountDisableFalse" class="form__label">Compte non suspendu</label>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.filter {
  &__group {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
  }

  &__block {
    display: flex;
    column-gap: 1rem;
  }

  &__checkbox {
    width: 1.6rem;
    height: 1.6rem;
  }
}
</style>
