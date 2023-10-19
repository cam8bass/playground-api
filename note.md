<script setup lang="ts">
import type { errorDevInterface, errorProdInterface } from '@/shared/interfaces'
import { profileEmailSchema } from '@/shared/schema'
import { useUserStore } from '@/stores'
import { useField, useForm } from 'vee-validate'

const userStore = useUserStore()

const props = defineProps<{
  errors: errorDevInterface | errorProdInterface | null
}>()

const {
  handleSubmit,
  meta: formEmailMeta,
  isSubmitting: isSubmittingFormEmail,
  resetForm
} = useForm({ validationSchema: profileEmailSchema })

const {
  value: inputEmail,
  errors: emailErrors,
  errorMessage: emailErrorMessage,
  handleBlur: handleBlurEmail,
  handleChange: handleChangeEmail,
  meta: emailMeta
} = useField('email', '', {
  validateOnValueUpdate: false,
  initialValue: userStore.getCurrentUser?.email
})

const onSubmit = handleSubmit(async (values) => {
  console.log(values)
  await userStore.fetchChangeEmailRequest
})
</script>
<template>
  <form @submit="onSubmit" class="form">
    <div class="form__group">
      <label for="email" class="label form__label">Email</label>
      <input
        type="email"
        id="email"
        class="input form__input"
        v-model="inputEmail"
        @blur="handleChangeEmail"
        @focus="handleBlurEmail"
        :class="{
          borderSuccess: emailMeta.touched && emailMeta.validated && emailMeta.valid,
          borderError: emailMeta.touched && emailMeta.validated && !emailMeta.valid
        }"
      />

      <span class="form__error" v-if="emailErrors">{{ emailErrorMessage }}</span>
    </div>

    <button
      type="submit"
      class="btn form__btn"
      :class="{
        btnSuccess: formEmailMeta.touched && formEmailMeta.valid,
        btnError: formEmailMeta.touched && !formEmailMeta.valid
      }"
      :disabled="isSubmittingFormEmail"
    >
      Modifier
    </button>
  </form>
</template>
<style scoped lang="scss">
@use '@/assets/abstracts/mixins' as m;
.form {
  &__group {
    display: grid;
    grid-template-rows: repeat(4, min-content);
    grid-template-columns: 1fr min-content;
  }

  &__label {
    grid-row: 1/2;
  }

  &__input {
    grid-row: 2/3;
    grid-column: 1/2;
  }

  &__error {
    grid-row: 3/-1;
    grid-column: 1/-1;
    margin-bottom: 1rem;
  }

  &__btn {
    align-self: center;
    grid-column: 2/-1;
    grid-row: 2/3;
  }
}
</style>
