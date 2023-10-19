<script lang="ts" setup>
import type {
  confirmResetEmailInterface,
  errorDevInterface,
  errorProdInterface,
  loginInterface
} from '@/shared/interfaces'
import { loginSchema } from '@/shared/schema'
import type { loginFieldType } from '@/shared/types/types'
import { useUserStore } from '@/stores'
import { profileEmailSchema } from '@/shared/schema'
import { useField, useForm } from 'vee-validate'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const userStore = useUserStore()

const props = defineProps<{
  errors: errorDevInterface | errorProdInterface | null
}>()

const showPassword = ref<boolean>(false)

const formError = ref<string | null>(null)

const {
  handleSubmit,
  meta: formMeta,
  isSubmitting,

  resetForm
} = useForm({
  validationSchema:
    route.name === 'activationAccount'
      ? loginSchema
      : route.name === 'resetEmail'
      ? profileEmailSchema
      : ''
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
  value: inputNewEmail,
  errors: newEmailErrors,
  errorMessage: newEmailErrorMessage,
  handleBlur: handleBlurNewEmail,
  handleChange: handleChangeNewEmail,
  meta: newEmailMeta
} = useField('newEmail', '', { validateOnValueUpdate: false })

const {
  value: inputPassword,
  errors: passwordErrors,
  errorMessage: passwordErrorMessage,
  handleBlur: handleBlurPassword,
  handleChange: handleChangePassword,
  meta: passwordMeta
} = useField('password', '', { validateOnValueUpdate: false })

const onSubmit = handleSubmit(
  async (values: loginInterface | confirmResetEmailInterface, action) => {
    const { token } = route.params

    if (route.name === 'resetEmail') {
      await userStore.fetchResetEmail(values, token as string)
    } else if (route.name === 'activationAccount') {
      await userStore.fetchActivationAccountForm(values, token as string)
    }

    const errors = props.errors?.errors as Partial<loginInterface> | null

    formError.value = null

    if (errors) {
      Object.entries(errors).forEach(([key, value]) => {
        action.setFieldError(key as loginFieldType, value)
      })

      if (errors.request) formError.value = errors.request
    } else {
      resetForm()
      router.push('/dashboard')
    }
  }
)
</script>
<template>
  <form @submit="onSubmit" class="form">
    <div class="form__group">
      <label for="email" class="label form__label">Email</label>
      <input
        type="email"
        id="email"
        placeholder="Entrez votre email"
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

    <div class="form__group" v-if="route.name === 'resetEmail'">
      <label for="newEmail" class="label form__label">Nouvel email</label>
      <input
        type="email"
        id="newEmail"
        placeholder="Entrez votre nouvel email"
        class="input form__input"
        v-model="inputNewEmail"
        @blur="handleChangeNewEmail"
        @focus="handleBlurNewEmail"
        :class="{
          borderSuccess: newEmailMeta.touched && newEmailMeta.validated && newEmailMeta.valid,
          borderError: newEmailMeta.touched && newEmailMeta.validated && !newEmailMeta.valid
        }"
      />
      <span class="form__error" v-if="newEmailErrors">{{ newEmailErrorMessage }}</span>
    </div>

    <div class="form__group">
      <label for="password" class="label form__label">Mot de passe</label>
      <input
        :type="showPassword ? 'text' : 'password'"
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
      <button @click="showPassword = !showPassword" class="form__btn--show" type="button">
        <svg class="form__icon">
          <use xlink:href="@/components/icons/sprite.svg#icon-eye"></use>
        </svg>
      </button>
      <span class="form__error" v-if="passwordErrors">{{ passwordErrorMessage }}</span>
    </div>

    <div class="form__group form__group-btn">
      <button @click="router.push('/home')" type="button" class="btn form__btn--return">
        Retour
      </button>
      <button
        type="submit"
        class="btn form__btn--submit"
        :class="{
          btnSuccess: formMeta.touched && formMeta.valid,
          btnError: formMeta.touched && !formMeta.valid
        }"
        :disabled="isSubmitting"
      >
        Envoyer
      </button>
    </div>

    <div class="form__group">
      <span class="form__error form__error--form" v-if="formError">{{ formError }}</span>
    </div>
  </form>
</template>
<style scoped lang="scss">
@use '@/assets/abstracts/mixins' as m;
.form {
  display: grid;
  grid-template-rows: repeat(4, min-content);
  justify-content: center;
  align-content: center;
  background-color: var(--color-black-3);
  row-gap: 1rem;
  padding: 2rem;

  &__group {
    max-width: 35rem;
    display: grid;
    grid-template-columns: 1fr min-content;
    grid-template-rows: repeat(3, min-content);
    column-gap: 1rem;

    &-btn {
      margin-top: 1rem;
      display: flex;
      justify-content: center;
      column-gap: 2rem;
    }
  }

  &__icon {
    width: 3rem;
    height: 3rem;
    fill: var(--color-white);
    transition: all 0.4s;

    &:hover,
    &:active {
      transform: scale(1.1);
      fill: var(--color-purple-1);
    }
  }

  &__label {
    grid-row: 1/2;
    grid-column: 1/-1;
  }

  &__input {
    grid-row: 2/3;
    grid-column: 1/2;
    margin-bottom: 1rem;
  }

  &__error {
    grid-row: 3/-1;
    grid-column: 1/-1;
    color: var(--color-purple-1);
    width: 100%;
    max-width: 28rem;
    &--form {
    }
  }

  &__btn {
    &--show {
      grid-row: 2/3;
      grid-column: 2/-1;
      background-color: transparent;
    }

    &--submit {
    }

    &--return {
    }
  }
}
</style>
