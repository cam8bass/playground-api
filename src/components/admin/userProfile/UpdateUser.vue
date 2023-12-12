<script lang="ts" setup>
import type { AdminUpdateUserInterface } from '@/shared/interfaces'
import { adminUpdateUserSchema } from '@/shared/schema'
import { submitFilter } from '@/shared/utils'
import { useCurrentUserStore, useErrorStore, useUsersStore } from '@/stores'
import { useField, useForm } from 'vee-validate'
import { computed, ref } from 'vue'

const errorStore = useErrorStore()
const currentUserStore = useCurrentUserStore()
const usersStore = computed(() => {
  if (currentUserStore.getCurrentUser && currentUserStore.getCurrentUser.role === 'admin') {
    return useUsersStore()
  }
  return null
})

const emits = defineEmits<{
  (e: 'modify', value: boolean): void
}>()

const formError = ref<string | null>(null)

const {
  handleSubmit,
  meta: formMeta,
  isSubmitting,
  resetForm
} = useForm({ validationSchema: adminUpdateUserSchema })

const {
  value: inputFirstname,
  errors: firstnameErrors,
  errorMessage: firstnameErrorMessage,
  handleBlur: handleBlurFirstname,
  handleChange: handleChangeFirstname,
  meta: firstnameMeta
} = useField('firstname', '', {
  validateOnValueUpdate: false,
  initialValue: usersStore.value?.getUser?.firstname
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
  initialValue: usersStore.value?.getUser?.lastname
})

const {
  value: inputEmail,
  errors: emailErrors,
  errorMessage: emailErrorMessage,
  handleBlur: handleBlurEmail,
  handleChange: handleChangeEmail,
  meta: emailMeta
} = useField('email', '', {
  validateOnValueUpdate: false,
  initialValue: usersStore.value?.getUser?.email
})

const {
  value: inputRole,
  errors: roleErrors,
  errorMessage: roleErrorMessage,
  handleBlur: handleBlurRole,
  handleChange: handleChangerole,
  meta: roleMeta
} = useField('role', '', {
  validateOnValueUpdate: false,
  initialValue: usersStore.value?.getUser?.role
})

const {
  value: inputActive,
  errors: activeErrors,
  errorMessage: activeErrorMessage,
  handleBlur: handleBlurActive,
  handleChange: handleChangeActive,
  meta: activeMeta
} = useField('active', '', {
  validateOnValueUpdate: false,
  initialValue: usersStore.value?.getUser?.active
})

const onSubmit = handleSubmit(async (values: AdminUpdateUserInterface, action) => {
  if (
    currentUserStore.getCurrentUser &&
    currentUserStore.getCurrentUser.role === 'admin' &&
    usersStore.value &&
    usersStore.value.getUser
  ) {
    const filteredValues = submitFilter(
      values,
      ['firstname', 'lastname', 'email', 'active', 'role'],
      usersStore.value.getUser
    )

    if (filteredValues) {
      await usersStore.value.fetchAdminUpdateUser(filteredValues, usersStore.value.getUser._id)

      const errors = errorStore.getError?.errors as AdminUpdateUserInterface
      formError.value = null

      if (errors) {
        Object.entries(errors).forEach(([key, value]) => {
          action.setFieldError(key, value)
        })

        if (errors.request) formError.value = errors.request
      }
    }
  }
})
</script>
<template>
  <form @submit="onSubmit" class="form">
    <div class="form__content">
      <div class="form__group">
        <label for="lastname" class="form__label">Nom : </label>
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

      <div class="form__group">
        <label for="firstname" class="form__label">Prénom : </label>
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
        <label for="email" class="form__label">Adresse email : </label>
        <input
          type="email"
          id="email"
          class="form__input"
          v-model="inputEmail"
          @blur="handleChangeEmail"
          @focus="handleBlurEmail"
          :class="{
            borderSuccess: emailMeta.touched && emailMeta.validated && emailMeta.valid,
            borderError: emailMeta.touched && emailMeta.validated && !emailMeta.valid
          }"
        />
        <span class="form__textError" v-if="emailErrors">{{ emailErrorMessage }}</span>
      </div>

      <div class="form__group">
        <label for="role" class="form__label">Rôle : </label>
        <select class="form__select" name="role" id="role" v-model="inputRole">
          <option value="user">utilisateur</option>
          <option value="admin">administrateur</option>
        </select>
        <span class="form__textError" v-if="roleErrors">{{ roleErrorMessage }}</span>
      </div>

      <div class="form__group">
        <label for="active" class="form__label">Compte activé : </label>
        <select class="form__select" name="active" id="active" v-model="inputActive">
          <option :value="true">oui</option>
          <option :value="false">non</option>
        </select>
        <span class="form__textError" v-if="activeErrors">{{ activeErrorMessage }}</span>
      </div>

      <div class="form__group form__group-btn">
        <button type="button" class="btn form__btn" @click="emits('modify', false)">Retour</button>
        <button type="submit" class="btn form__btn" :disabled="isSubmitting">Envoyer</button>
      </div>
    </div>

    <div class="form__errors">
      <span class="form__textError"></span>
    </div>
  </form>
</template>
<style lang="scss" scoped>
.form {
  &__select {
    margin: 1rem 0;
    box-shadow: var(--boxshadow-black);
    background-color: var(--color-black-2);
    font-size: 1.6rem;
    color: var(--color-purple-1);
    padding: 0.8rem;
    border: none;
    display: block;
  }

  &__errors {
    justify-content: flex-start;
  }
}
</style>
