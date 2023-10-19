<script setup lang="ts">
import type { errorDevInterface, errorProdInterface } from '@/shared/interfaces'
import { profileNameSchema } from '@/shared/schema'
import { useUserStore } from '@/stores'

import { useField, useForm } from 'vee-validate'
const userStore = useUserStore()

const props = defineProps<{
  errors: errorDevInterface | errorProdInterface | null
}>()

const {
  handleSubmit,
  meta: formNameMeta,
  isSubmitting: isSubmittingFormName,
  resetForm
} = useForm({ validationSchema: profileNameSchema })

const {
  value: inputFirstname,
  errors: firstnameErrors,
  errorMessage: firstnameErrorMessage,
  handleBlur: handleBlurFirstname,
  handleChange: handleChangeFirstname,
  meta: firstnameMeta
} = useField('firstname', '', {
  validateOnValueUpdate: false,
  initialValue: userStore.getCurrentUser?.firstname
})

const {
  value: inputLastname,
  errors: lastnameErrors,
  errorMessage: lastnameErrorMessage,
  handleBlur: handleBlurLastname,
  handleChange: handleChangeLastname,
  meta: lastnameMeta
} = useField('lastname', '', {
  validateOnValueUpdate: false,
  initialValue: userStore.getCurrentUser?.lastname
})

const onSubmit = handleSubmit(async (values: { firstname?: string; lastname?: string }, action) => {
  if (userStore.getCurrentUser) {
    if (values.firstname === userStore.getCurrentUser.firstname) {
      delete values.firstname
    }

    if (values.lastname === userStore.getCurrentUser.lastname) {
      delete values.lastname
    }
  }

  if (values.firstname || values.lastname) {
    await userStore.fetchUpdateUser(values)

    const errors = props.errors?.errors

    if (errors) {
      Object.entries(errors).forEach(([key, value]) => {
        action.setFieldError(key, value)
      })
    } else {
      resetForm({
        values: {
          firstname: userStore.getCurrentUser?.firstname,
          lastname: userStore.getCurrentUser?.lastname
        }
      })
    }
  }
})
</script>
<template>
  <form @submit="onSubmit" class="form">
    <div class="form__group">
      <label for="firstname" class="label form__label">Nom</label>
      <input
        type="text"
        id="firstname"
        class="input form__input"
        v-model="inputFirstname"
        @blur="handleChangeFirstname"
        @focus="handleBlurFirstname"
        :class="{
          borderSuccess: firstnameMeta.touched && firstnameMeta.validated && firstnameMeta.valid,
          borderError: firstnameMeta.touched && firstnameMeta.validated && !firstnameMeta.valid
        }"
      />
      <span class="form__error" v-if="firstnameErrors">{{ firstnameErrorMessage }}</span>
    </div>

    <div class="form__group">
      <label for="lastname" class="label form__label">Prénom</label>
      <input
        type="text"
        id="lastname"
        class="input form__input"
        v-model="inputLastname"
        @blur="handleChangeLastname"
        @focus="handleBlurLastname"
        :class="{
          borderSuccess: lastnameMeta.touched && lastnameMeta.validated && lastnameMeta.valid,
          borderError: lastnameMeta.touched && lastnameMeta.validated && !lastnameMeta.valid
        }"
      />
      <span class="form__error" v-if="lastnameErrors">{{ lastnameErrorMessage }}</span>
    </div>

    <button
      type="submit"
      class="btn form__btn"
      :class="{
        btnSuccess: formNameMeta.touched && formNameMeta.valid,
        btnError: formNameMeta.touched && !formNameMeta.valid
      }"
      :disabled="isSubmittingFormName || (!formNameMeta.touched && !formNameMeta.dirty)"
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
