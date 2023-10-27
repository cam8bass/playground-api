<script setup lang="ts">
import type {
  errorDevInterface,
  errorProdInterface,
  nameSubmitInterface
} from '@/shared/interfaces'
import { profileNameSchema } from '@/shared/schema'
import { useUserStore } from '@/stores'

import { useField, useForm } from 'vee-validate'
import { ref } from 'vue'

const userStore = useUserStore()
const formError = ref<string | null>(null)

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

const onSubmit = handleSubmit(async (values: nameSubmitInterface, action) => {
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

    const errors = props.errors?.errors as Partial<nameSubmitInterface>

    if (errors) {
      Object.entries(errors).forEach(([key, value]) => {
        action.setFieldError(key, value)
      })

      if (errors.request) formError.value = errors.request
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
    <div class="form__content">
      <div class="form__group">
        <label for="firstname" class="form__label">Nom</label>
        <input
          type="text"
          id="firstname"
          class="form__input"
          v-model="inputFirstname"
          @blur="handleChangeFirstname"
          @focus="handleBlurFirstname"
          :class="{
            borderSuccess: firstnameMeta.touched && firstnameMeta.validated && firstnameMeta.valid,
            borderError: firstnameMeta.touched && firstnameMeta.validated && !firstnameMeta.valid
          }"
        />
        <span class="form__textError" v-if="firstnameErrors">{{ firstnameErrorMessage }}</span>
      </div>

      <div class="form__group">
        <label for="lastname" class="form__label">Prénom</label>
        <input
          type="text"
          id="lastname"
          class="form__input"
          v-model="inputLastname"
          @blur="handleChangeLastname"
          @focus="handleBlurLastname"
          :class="{
            borderSuccess: lastnameMeta.touched && lastnameMeta.validated && lastnameMeta.valid,
            borderError: lastnameMeta.touched && lastnameMeta.validated && !lastnameMeta.valid
          }"
        />
        <span class="form__textError" v-if="lastnameErrors">{{ lastnameErrorMessage }}</span>
      </div>
      <div class="form__group-btn">
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
      </div>
    </div>
    <div class="form__errors">
      <span class="form__textError" v-if="formError">{{ formError }}</span>
    </div>
  </form>
</template>
<style scoped lang="scss">
@use '@/assets/abstracts/mixins' as m;
.form {
  &__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 1rem;
  }
}
</style>
