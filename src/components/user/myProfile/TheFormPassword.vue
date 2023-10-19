<script setup lang="ts">
import type { errorDevInterface, errorProdInterface } from '@/shared/interfaces'
import { profilePasswordSchema } from '@/shared/schema'
import { useUserStore } from '@/stores'
import { useField, useForm } from 'vee-validate'
import { ref } from 'vue'

const props = defineProps<{
  errors: errorDevInterface | errorProdInterface | null
}>()

const showPassword = ref<boolean>(false)
const showNewPassword = ref<boolean>(false)
const showPasswordConfirm = ref<boolean>(false)

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

const onSubmit = handleSubmit(
  async (values: { password: string; newPassword: string; newPasswordConfirm: string }, action) => {
    if (values.password && values.newPassword && values.newPasswordConfirm) {
      const userStore = useUserStore()
      await userStore.fetchUpdatePassword(values)

      const errors = props.errors?.errors

      if (errors) {
        Object.entries(errors).forEach(([key, value]) => {
          action.setFieldError(key, value)
        })
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
  }
)
</script>
<template>
  <form @submit="onSubmit" class="form">
    <div class="form__group">
      <label for="password" class="label form__label">Mot de passe</label>
      <input
        :type="showPassword ? 'text' : 'password'"
        id="password"
        class="input form__input"
        placeholder="Entrez votre password actuel"
        v-model="inputPassword"
        @blur="handleChangePassword"
        @focus="handleBlurPassword"
        :class="{
          borderSuccess: passwordMeta.touched && passwordMeta.validated && passwordMeta.valid,
          borderError: passwordMeta.touched && passwordMeta.validated && !passwordMeta.valid
        }"
      />

      <span class="form__error" v-if="passwordErrors">{{ passwordErrorMessage }}</span>
      <button class="form__btn" type="button" @click="showPassword = !showPassword">
        <svg class="form__icon">
          <use xlink:href="@/components/icons/sprite.svg#icon-eye"></use>
        </svg>
      </button>
    </div>

    <!-- NEW PASSWORD -->
    <div class="form__group">
      <label for="newPassword" class="label form__label">Nouveau mot de passe</label>
      <input
        :type="showNewPassword ? 'text' : 'password'"
        id="newPassword"
        class="input form__input"
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

      <span class="form__error" v-if="newPasswordErrors">{{ newPasswordErrorMessage }}</span>
      <button class="form__btn" type="button" @click="showNewPassword = !showNewPassword">
        <svg class="form__icon">
          <use xlink:href="@/components/icons/sprite.svg#icon-eye"></use>
        </svg>
      </button>
    </div>
    <!-- NEW CONFIRM PASSWORD -->
    <div class="form__group">
      <label for="passwordConfirm" class="label form__label">Mot de passe de confirmation</label>
      <input
        :type="showPasswordConfirm ? 'text' : 'password'"
        id="passwordConfirm"
        class="input form__input"
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

      <span class="form__error" v-if="passwordConfirmErrors">{{
        passwordConfirmErrorMessage
      }}</span>
      <button class="form__btn" type="button" @click="showPasswordConfirm = !showPasswordConfirm">
        <svg class="form__icon">
          <use xlink:href="@/components/icons/sprite.svg#icon-eye"></use>
        </svg>
      </button>
    </div>

    <button
      type="submit"
      class="btn form__btn"
      :class="{
        btnSuccess: formPasswordMeta.touched && formPasswordMeta.valid,
        btnError: formPasswordMeta.touched && !formPasswordMeta.valid
      }"
      :disabled="isSubmittingFormPassword"
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
