<script setup lang="ts">
import type {
  errorDevInterface,
  errorProdInterface,
  passwordSubmitInterface
} from '@/shared/interfaces'
import { profilePasswordSchema } from '@/shared/schema'
import { useCurrentUserStore } from '@/stores'
import { useField, useForm } from 'vee-validate'
import { ref } from 'vue'

const props = defineProps<{
  errors: errorDevInterface | errorProdInterface | null
}>()

const showPassword = ref<boolean>(false)
const showNewPassword = ref<boolean>(false)
const showPasswordConfirm = ref<boolean>(false)
const formError = ref<string | null>(null)

const {
  handleSubmit,
  meta: formPasswordMeta,
  isSubmitting: isSubmittingFormPassword,
  resetForm
} = useForm({ validationSchema: profilePasswordSchema })

const {
  value: inputPassword,
  errors: passwordErrors,
  errorMessage: passwordErrorMessage,
  handleBlur: handleBlurPassword,
  handleChange: handleChangePassword,
  meta: passwordMeta
} = useField('password', '', {
  validateOnValueUpdate: false
})

const {
  value: inputNewPassword,
  errors: newPasswordErrors,
  errorMessage: newPasswordErrorMessage,
  handleBlur: handleBlurNewPassword,
  handleChange: handleChangeNewPassword,
  meta: newPasswordMeta
} = useField('newPassword', '', { validateOnValueUpdate: false })

const {
  value: inputPasswordConfirm,
  errors: passwordConfirmErrors,
  errorMessage: passwordConfirmErrorMessage,
  handleBlur: handleBlurPasswordConfirm,
  handleChange: handleChangePasswordConfirm,
  meta: passwordConfirmMeta
} = useField('passwordConfirm', '', { validateOnValueUpdate: false })

const onSubmit = handleSubmit(async (values: passwordSubmitInterface, action) => {
  if (values.password && values.newPassword && values.passwordConfirm) {
    const currentUserStore = useCurrentUserStore()
    await currentUserStore.fetchUpdatePassword(values)

    const errors = props.errors?.errors as Partial<passwordSubmitInterface>
    formError.value = null

    if (errors) {
      Object.entries(errors).forEach(([key, value]) => {
        action.setFieldError(key, value)
      })

      if (errors.request) formError.value = errors.request
    } else {
      resetForm({
        values: {
          password: '',
          newPassword: '',
          passwordConfirm: ''
        }
      })
    }
  }
})
</script>
<template>
  <form @submit="onSubmit" class="form formPassword">
    <h3 class="component__subtitle">Mot de passe</h3>
    <div class="formPassword__content">
      <div class="form__group">
        <label for="password" class="form__label">Mot de passe</label>
        <input
          :type="showPassword ? 'text' : 'password'"
          id="password"
          class="form__input"
          placeholder="Entrez votre password actuel"
          v-model="inputPassword"
          @blur="handleChangePassword"
          @focus="handleBlurPassword"
          :class="{
            borderSuccess: passwordMeta.touched && passwordMeta.validated && passwordMeta.valid,
            borderError: passwordMeta.touched && passwordMeta.validated && !passwordMeta.valid
          }"
        />

        <span class="form__textError" v-if="passwordErrors">{{ passwordErrorMessage }}</span>
        <button
          class="form__btn form__btn-show"
          type="button"
          @click="showPassword = !showPassword"
        >
          <svg class="form__icon">
            <use xlink:href="@/components/icons/sprite.svg#icon-eye"></use>
          </svg>
        </button>
      </div>

      <!-- NEW PASSWORD -->
      <div class="form__group">
        <label for="newPassword" class="form__label">Nouveau mot de passe</label>
        <input
          :type="showNewPassword ? 'text' : 'password'"
          id="newPassword"
          class="form__input"
          placeholder="Entrez votre password"
          v-model="inputNewPassword"
          @blur="handleChangeNewPassword"
          @focus="handleBlurNewPassword"
          :class="{
            borderSuccess:
              newPasswordMeta.touched && newPasswordMeta.validated && newPasswordMeta.valid,
            borderError:
              newPasswordMeta.touched && newPasswordMeta.validated && !newPasswordMeta.valid
          }"
        />

        <span class="form__textError" v-if="newPasswordErrors">{{ newPasswordErrorMessage }}</span>
        <button
          class="form__btn form__btn-show"
          type="button"
          @click="showNewPassword = !showNewPassword"
        >
          <svg class="form__icon">
            <use xlink:href="@/components/icons/sprite.svg#icon-eye"></use>
          </svg>
        </button>
      </div>
      <!-- NEW CONFIRM PASSWORD -->
      <div class="form__group">
        <label for="passwordConfirm" class="form__label">Mot de passe de confirmation</label>
        <input
          :type="showPasswordConfirm ? 'text' : 'password'"
          id="passwordConfirm"
          class="form__input"
          placeholder="Confirmez votre nouveau password"
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

        <span class="form__textError" v-if="passwordConfirmErrors">{{
          passwordConfirmErrorMessage
        }}</span>
        <button
          class="form__btn form__btn-show"
          type="button"
          @click="showPasswordConfirm = !showPasswordConfirm"
        >
          <svg class="form__icon">
            <use xlink:href="@/components/icons/sprite.svg#icon-eye"></use>
          </svg>
        </button>
      </div>

      <div class="form__group-btn">
        <button
          type="submit"
          class="btn form__btn form__btn-submit"
          :class="{
            btnSuccess: formPasswordMeta.touched && formPasswordMeta.valid,
            btnError: formPasswordMeta.touched && !formPasswordMeta.valid
          }"
          :disabled="isSubmittingFormPassword"
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
@use '@/assets/style/abstracts/mixins' as m;
.formPassword {
  &__content {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 1rem;
  }
}
</style>
