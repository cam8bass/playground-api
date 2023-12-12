<script setup lang="ts">
import { usersLimitSchema } from '@/shared/schema'
import { useField } from 'vee-validate'

/**
Define the props for the component.
@param {Object} props - An object containing the props for the component.
@param {number} props.results - The total number of users.
 */
const props = defineProps<{
  results: number
  limitPerPage: number
}>()

const emits = defineEmits<{
  (e: 'updateLimit', limit: number): void
  (e: 'updateBtnDisable', value: boolean): void
}>()

const {
  value: inputLimit,
  errors: limitErrors,
  errorMessage: limitErrorMessage,
  handleBlur: handleBlurLimit,
  handleChange: handleChangeLimit,
  meta: limitMeta
} = useField(
  'limit',
  (value) => {
    const result = usersLimitSchema.safeParse({ limit: value })

    if (!result.success) {
      // If validation fails, return the first error message
      return result.error.issues[0].message
    }

    // If validation succeeds, return true
    return true
  },
  {
    validateOnValueUpdate: false,
    initialValue: 0
    // initialValue: props.limitPerPage
  }
)
</script>
<template>
  <Transition name="translateDown" mode="out-in">
    <div class="limit">
      <div class="limit__group">
        <!-- Component for setting the limit of displayed users.
             * @props   {number} results - The total number of users. 
             * @props   {number} limit - The current limit of displayed users.
             * @emits input - Emitted when the limit value is changed.
             -->
        <input
          type="number"
          name="limit"
          id="limit"
          class="limit__input"
          min="1"
          :max="results"
          v-model="inputLimit"
          @blur="handleChangeLimit"
          @focus="handleBlurLimit"
          @input="
            inputLimit <= 0
              ? (inputLimit = 1)
              : inputLimit > props.results
              ? (inputLimit = props.results)
              : (inputLimit = ($event.target as HTMLInputElement).valueAsNumber),
              emits('updateLimit', inputLimit),
              limitMeta.dirty && limitMeta.valid
                ? emits('updateBtnDisable', false)
                : emits('updateBtnDisable', true)
          "
        />

        <span class="form__textError limit__textError" v-if="limitErrors">{{
          limitErrorMessage
        }}</span>
      </div>
    </div>
  </Transition>
</template>
<style lang="scss" scoped>
.limit {
  &__group {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, min-content);
    align-items: center;
    row-gap: 1rem;
  }

  &__title {
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    font-size: 1.6rem;
    font-family: var(--font-subtitle);
    font-weight: 300;
    color: var(--color-white);
    transition: color 0.2s;
    &:hover,
    &:active {
      color: var(--color-purple-1);
    }
  }

  &__icon {
    grid-row: 1/2;
    grid-column: 2/-1;
    width: 3.5rem;
    height: 3.5rem;
    fill: var(--color-purple-1);
  }

  &__input {
    background-color: var(--color-purple-1);
    border: none;
    height: 3rem;
    max-width: 10rem;
    padding-left: 0.4rem;
    font-size: 1.6rem;
  }

  &__textError {
    grid-column: 1/-1;
    grid-row: 2/-1;
  }

  &__btn {
    justify-self: start;
    background-color: transparent;
    cursor: pointer;
  }
}
</style>
