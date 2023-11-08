<script setup lang="ts">
import type { forgotPasswordSubmitInterface, loginInterface } from '@/shared/interfaces'

import { forgotPasswordSchema, loginSchema } from '@/shared/schema'
import type { loginFieldType } from '@/shared/types/types'
import { useAppStore, useCurrentUserStore, useErrorStore } from '@/stores'
import { useField, useForm } from 'vee-validate'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentUserStore = useCurrentUserStore()
const errorStore = useErrorStore()
const appStore = useAppStore()
const login = ref<boolean>(true)
const forgotpassword = ref<boolean>(false)
const formError = ref<string | null>(null)

function resetFormErrors(): void {
  errorStore.resetError()
  formError.value = null
  resetForm()
}

const validationSchema = computed(() => {
  if (login.value) {
    return loginSchema
  } else {
    return forgotPasswordSchema
  }
})

const {
  handleSubmit,
  meta: formMeta,
  isSubmitting,
  resetForm
} = useForm({
  validationSchema
})

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

const onSubmit = handleSubmit(
  async (values: loginInterface | forgotPasswordSubmitInterface, action) => {
    if (login.value && !forgotpassword.value) {
      await currentUserStore.fetchLogin(values as loginInterface)
    } else if (!login.value && forgotpassword.value) {
      await currentUserStore.fetchForgotPassword(values as forgotPasswordSubmitInterface)
    }

    const errors = errorStore.getError?.errors as
      | Partial<loginInterface>
      | Partial<forgotPasswordSubmitInterface>
      | null

    formError.value = null

    if (errors) {
      Object.entries(errors).forEach(([key, value]) => {
        action.setFieldError(key as loginFieldType, value)
      })

      if (errors.request) formError.value = errors.request
    } else {
      forgotpassword.value = false
      appStore.updateLogin(false)
      resetForm()

      if (login.value && !forgotpassword.value) {
        router.push('/dashboard')
      }
    }
  }
)
</script>

<template>
  <div class="login">
    <!-- LOGIN FORM -->
    <Transition name="translateLeft" mode="out-in" @after-leave="forgotpassword = !forgotpassword">
      <form @submit="onSubmit" class="form" v-if="login">
        <div class="form__content">
          <div class="form__group">
            <label for="email" class="form__label">Email</label>

            <input
              type="email"
              id="email"
              class="form__input"
              placeholder="Entrez votre email"
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
            <label for="password" class="form__label">Mot de passe</label>
            <input
              type="password"
              id="password"
              class="form__input"
              placeholder="Entrez votre mot de passe"
              v-model="inputPassword"
              @blur="handleChangePassword"
              @focus="handleBlurPassword"
              :class="{
                borderSuccess: passwordMeta.touched && passwordMeta.validated && passwordMeta.valid,
                borderError: passwordMeta.touched && passwordMeta.validated && !passwordMeta.valid
              }"
            />
            <span class="form__textError" v-if="passwordErrors">{{ passwordErrorMessage }}</span>
          </div>

          <div class="form__group form__group-btn">
            <button
              type="button"
              @click="appStore.updateLogin(false), resetFormErrors()"
              class="form__btn btn"
            >
              Retour
            </button>
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
        </div>

        <button to="/forgotPassword" type="button" class="login__link" @click="login = !login">
          Mot de passe oublié
        </button>

        <div class="form__errors">
          <span class="form__textError" v-if="formError">{{ formError }}</span>
        </div>
      </form>
    </Transition>

    <!-- FORGOT PASSWORD FORM -->
    <Transition name="translateLeft" mode="out-in" @after-leave="login = !login">
      <form @submit="onSubmit" class="form" v-if="forgotpassword">
        <div class="form__content">
          <div class="form__group">
            <label for="email" class="form__label">Email</label>

            <input
              type="email"
              id="email"
              class="form__input"
              placeholder="Entrez votre email"
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
          <div class="form__group form__group-btn">
            <button
              type="button"
              @click="(forgotpassword = !forgotpassword), resetFormErrors()"
              class="form__btn btn"
            >
              Retour
            </button>
            <button
              type="submit"
              class="form__btn btn"
              :class="{
                btnSuccess: formMeta.touched && formMeta.valid,
                btnError: formMeta.touched && !formMeta.valid
              }"
              :disabled="isSubmitting"
            >
              Envoyer
            </button>
          </div>
        </div>
        <div class="form__errors">
          <span class="form__textError" v-if="formError">{{ formError }}</span>
        </div>
      </form>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/style/abstracts/mixins' as m;
@import '@/assets/style/base/animation';

.login {
  position: fixed;
  overflow-y: scroll;
  z-index: 1000;
  top: 0;
  right: 0;
  height: 100vh;
  width: 100%;
  backdrop-filter: blur(5px);
  background-color: var(--color-black-3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @include m.xl {
    width: 30%;
  }

  &__link {
    margin-top: 1rem;
    grid-row: 4/5;
    text-decoration: none;
    color: var(--color-white);
    font-weight: 100;
    font-size: 1.8rem;
    transition: color 0.2s;
    background-color: transparent;
    &:hover,
    &:active {
      color: var(--color-purple-1);
    }
  }
}
.form {
  &__content {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
  }
}
</style>
