<script setup lang="ts">
import type { errorDevInterface, errorProdInterface, loginInterface } from '@/shared/interfaces'
import { loginSchema } from '@/shared/schema'
import type { loginFieldType } from '@/shared/types/types'
import { useUserStore } from '@/stores'
import { useField, useForm } from 'vee-validate'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()
const props = defineProps<{
  errors: errorDevInterface | errorProdInterface | null
}>()

const emits = defineEmits<{
  (e: 'openLogin', value: boolean): void
}>()

const formError = ref<string | null>(null)

const {
  handleSubmit,
  meta: formMeta,
  isSubmitting,
  resetForm
} = useForm({ validationSchema: loginSchema })

const {
  value: inputEmail,
  errors: emailErrors,
  errorMessage: emailErrorMessage,
  handleBlur: handleBlurEmail,
  handleChange: handleChangeEmail,

  meta: emailMeta
} = useField('email', '', { validateOnValueUpdate: false })

const {
  value: inputPassword,
  errors: passwordErrors,
  errorMessage: passwordErrorMessage,
  handleBlur: handleBlurPassword,
  handleChange: handleChangePassword,
  meta: passwordMeta
} = useField('password', '', { validateOnValueUpdate: false })

// TODO: A voir syncVmodel
const onSubmit = handleSubmit(async (values: loginInterface, action) => {
  await userStore.fetchLogin(values)
  const errors = props.errors?.errors as Partial<loginInterface> | null
  formError.value = null

  if (errors) {
    Object.entries(errors).forEach(([key, value]) => {
      action.setFieldError(key as loginFieldType, value)
    })

    if (errors.request) formError.value = errors.request
  } else {
    emits('openLogin', false)
    router.push('/dashboard')

    resetForm()
  }
})
</script>

<template>
  <form @submit="onSubmit" class="form">
    <div class="form__group">
      <label for="email" class="label section__label form__label">Email</label>

      <input
        type="email"
        id="email"
        class="input form__input"
        placeholder="Entrez votre email"
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

    <div class="form__group">
      <label for="password" class="label form__label">Mot de passe</label>
      <input
        type="password"
        id="password"
        class="input form__input"
        placeholder="Entrez votre mot de passe"
        v-model="inputPassword"
        @blur="handleChangePassword"
        @focus="handleBlurPassword"
        :class="{
          borderSuccess: passwordMeta.touched && passwordMeta.validated && passwordMeta.valid,
          borderError: passwordMeta.touched && passwordMeta.validated && !passwordMeta.valid
        }"
      />
      <span class="form__error" v-if="passwordErrors">{{ passwordErrorMessage }}</span>
    </div>

    <RouterLink to="/forgotPassword" class="form__link">Mot de passe oublié</RouterLink>
    <div class="form__group">
      <button type="button" @click="emits('openLogin', false)" class="form__btn btn">Retour</button>
      <button
        type="submit"
        class="form__btn btn"
        :class="{
          btnSuccess: formMeta.touched && formMeta.valid,
          btnError: formMeta.touched && !formMeta.valid
        }"
        :disabled="isSubmitting"
      >
        Connexion
      </button>
    </div>
    <span class="form__error form__error-form" v-if="formError">{{ formError }}</span>
  </form>
</template>

<style scoped lang="scss">
@use '@/assets/abstracts/mixins' as m;
@import '@/assets/base/animation';
.form {
  position: fixed;
  overflow-y: scroll;
  z-index: 1000;
  top: 0;
  right: 0;
  height: 100vh;
  width: 100%;
  backdrop-filter: blur(5px);
  align-content: center;
  display: grid;
  grid-template-rows: repeat(5, min-content);
  justify-content: center;
  align-items: center;
  row-gap: 2rem;
  background-color: var(--color-black-3);

  @include m.xl {
    width: 30%;
  }

  &__btn {
    justify-self: center;

    &:first-of-type {
      margin-right: 2rem;
    }
  }

  &__label {
    grid-row: 1/2;
    grid-column: 1/-1;
  }

  &__input {
    grid-row: 2/3;
    grid-column: 1/-1;
  }
  &__error {
    grid-row: 3/-1;
    grid-column: 1/-1;
    margin-top: 1rem;

    &-form {
      grid-row: 5/-1;
      grid-column: 1/-1;
      justify-self: center;
    }
  }

  &__link {
    text-decoration: none;
    color: var(--color-white);
    font-weight: 100;
    font-size: 1.8rem;
    transition: color 0.2s;
    &:hover,
    &:active {
      color: var(--color-purple-1);
    }
  }
}
</style>
