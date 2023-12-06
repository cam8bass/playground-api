<script lang="ts" setup>
import type {
  confirmResetEmailInterface,
  confirmResetPasswordInterface,
  errorDevInterface,
  errorProdInterface,
  loginInterface
} from '@/shared/interfaces'
import { loginSchema, passwordSchema } from '@/shared/schema'
import type { loginFieldType } from '@/shared/types/types'
import { useCurrentUserStore } from '@/stores'
import { profileEmailSchema } from '@/shared/schema'
import { useField, useForm } from 'vee-validate'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const currentUserStore = useCurrentUserStore()

const props = defineProps<{
  errors: errorDevInterface | errorProdInterface | null
}>()

const showPassword = ref<boolean>(false)
const showPasswordConfirm = ref<boolean>(false)
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
      : route.name === 'resetPassword'
      ? passwordSchema
      : route.name === 'confirmRenewal'
      ? loginSchema
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

const {
  value: inputPasswordConfirm,
  errors: passwordConfirmErrors,
  errorMessage: passwordConfirmErrorMessage,
  handleBlur: handleBlurPasswordConfirm,
  handleChange: handleChangePasswordConfirm,
  meta: passwordConfirmMeta
} = useField('passwordConfirm', '', { validateOnValueUpdate: false })

const onSubmit = handleSubmit(
  async (
    values: loginInterface | confirmResetEmailInterface | confirmResetPasswordInterface,
    action
  ) => {
    const { token } = route.params

    if (route.name === 'resetEmail') {
      await currentUserStore.fetchResetEmail(values as confirmResetEmailInterface, token as string)
    } else if (route.name === 'activationAccount') {
      await currentUserStore.fetchActivationAccountForm(values as loginInterface, token as string)
    } else if (route.name === 'resetPassword') {
      await currentUserStore.fetchResetPassword(
        values as confirmResetPasswordInterface,
        token as string
      )
    } else if (route.name === 'confirmRenewal') {
      await currentUserStore.fetchUserConfirmRenewalApiKey(
        values as loginInterface,
        token as string
      )
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
    <div class="form__content">
      <div
        class="form__group"
        v-if="
          route.name === 'resetEmail' ||
          route.name === 'activationAccount' ||
          route.name === 'confirmRenewal'
        "
      >
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
        <span class="form__textError" v-if="emailErrors">{{ emailErrorMessage }}</span>
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
        <span class="form__textError" v-if="newEmailErrors">{{ newEmailErrorMessage }}</span>
      </div>

      <div class="form__group">
        <label for="password" class="form__label">Mot de passe</label>
        <input
          :type="showPassword ? 'text' : 'password'"
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
        <button
          @click="showPassword = !showPassword"
          class="form__btn form__btn-show"
          type="button"
        >
          <svg class="form__icon">
            <use xlink:href="@/components/icons/sprite.svg#icon-eye"></use>
          </svg>
        </button>
        <span class="form__textError" v-if="passwordErrors">{{ passwordErrorMessage }}</span>
      </div>

      <div class="form__group" v-if="route.name === 'resetPassword'">
        <label for="passwordConfirm" class="form__label">Mot de passe de confirmation</label>
        <input
          :type="showPasswordConfirm ? 'text' : 'password'"
          id="passwordConfirm"
          class="form__input"
          placeholder="Confirmez votre password"
          v-model="inputPasswordConfirm"
          @blur="handleChangePasswordConfirm"
          @focus="handleBlurPasswordConfirm"
          :class="{
            borderSuccess:
              passwordConfirmMeta.touched &&
              passwordConfirmMeta.validated &&
              passwordConfirmMeta.valid,
            borderError:
              passwordConfirmMeta.touched &&
              passwordConfirmMeta.validated &&
              !passwordConfirmMeta.valid
          }"
        />
        <button
          @click="showPasswordConfirm = !showPasswordConfirm"
          class="form__btn form__btn-show"
          type="button"
        >
          <svg class="form__icon">
            <use xlink:href="@/components/icons/sprite.svg#icon-eye"></use>
          </svg>
        </button>
        <span class="form__textError" v-if="passwordConfirmErrors">{{
          passwordConfirmErrorMessage
        }}</span>
      </div>

      <div class="form__group-btn">
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
    </div>
    <div class="form__errors">
      <span class="form__textError" v-if="formError">{{ formError }}</span>
    </div>
  </form>
</template>
<style scoped lang="scss">
@use '@/assets/style/abstracts/mixins' as m;
.form {
  align-items: center;
  justify-content: center;
  background-color: var(--color-black-3);
  padding: 2rem;

  &__content {
    display: grid;
    grid-template-rows: repeat(3, min-content);
    justify-content: center;
    align-content: center;
    row-gap: 1rem;
  }

  &__group {
    &-btn {
      grid-row: auto;
      // grid-row: 3/-1;
      grid-column: 1/-1;
      display: flex;
      justify-content: center;
      column-gap: 2rem;
    }
  }
}
</style>
