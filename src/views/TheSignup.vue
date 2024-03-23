<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useField, useForm } from 'vee-validate'
import { ref } from 'vue'
import type { AppErrorInterface, signupInterface } from '@/shared/interfaces'
import type { signupFieldType } from '@/shared/types/types'
import { signupSchema } from '@/shared/schema'
import { AppError, initStore } from '@/shared/utils'

const stores = initStore('userStore')

const router = useRouter()

const showPassword = ref<boolean>(false)
const showPasswordConfirm = ref<boolean>(false)
const formError = ref<string | null>(null)

const props = defineProps<{
  errors: AppErrorInterface | null
}>()

const {
  handleSubmit,
  meta: formMeta,
  isSubmitting,
  resetForm
} = useForm({ validationSchema: signupSchema })
const {
  value: inputFirstname,
  errors: firstnameErrors,
  errorMessage: firstnameErrorMessage,
  handleBlur: handleBlurFirstname,
  handleChange: handleChangeFirstname,
  meta: firstnameMeta
} = useField('firstname', '', { validateOnValueUpdate: false })

const {
  value: inputLastname,
  errors: lastnameErrors,
  errorMessage: lastnameErrorMessage,
  handleBlur: handleBlurLastname,
  handleChange: handleChangeLastname,
  meta: lastnameMeta
} = useField('lastname', '', { validateOnValueUpdate: false })

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

const {
  value: inputPasswordConfirm,
  errors: passwordConfirmErrors,
  errorMessage: passwordConfirmErrorMessage,
  handleBlur: handleBlurPasswordConfirm,
  handleChange: handleChangePasswordConfirm,
  meta: passwordConfirmMeta
} = useField('passwordConfirm', '', { validateOnValueUpdate: false })

const onSubmit = handleSubmit(async (values: signupInterface, action) => {
  await stores.userStore.fetchSignup(values)

  const errors = props.errors ? props.errors.fields : null

  formError.value = null

  if (errors) {
    Object.entries(errors).forEach(([key, value]) => {
      action.setFieldError(key as signupFieldType, value)
    })

    if (errors.form) formError.value = errors.form
  } else {
    resetForm()
    router.push('/home')
  }
})


</script>

<template>
  <main class="signup">
    <h1 class="section__title">Inscription</h1>

    <div class="section__content">
      <form @submit="onSubmit" class="form">
        <fieldset>
          <legend class="form__title">PLayground Api</legend>

          <div class="form__content">
            <div class="form__group">
              <label for="lastname" class="label form__label">Nom</label>
              <input
                type="text"
                id="lastname"
                class="input form__input"
                placeholder="Entrez votre nom"
                v-model="inputLastname"
                @blur="handleChangeLastname"
                @focus="handleBlurLastname"
                :class="{
                  borderSuccess:
                    lastnameMeta.touched && lastnameMeta.validated && lastnameMeta.valid,
                  borderError: lastnameMeta.touched && lastnameMeta.validated && !lastnameMeta.valid
                }"
              />
              <span class="form__textError" v-if="lastnameErrors">{{ lastnameErrorMessage }}</span>
            </div>

            <div class="form__group">
              <label for="firstname" class="label form__label">Prénom</label>
              <input
                type="text"
                id="firstname"
                class="input form__input"
                placeholder="Entrez votre prénom"
                v-model="inputFirstname"
                @blur="handleChangeFirstname"
                @focus="handleBlurFirstname"
                :class="{
                  borderSuccess:
                    firstnameMeta.touched && firstnameMeta.validated && firstnameMeta.valid,
                  borderError:
                    firstnameMeta.touched && firstnameMeta.validated && !firstnameMeta.valid
                }"
              />
              <span class="form__textError" v-if="firstnameErrors">{{
                firstnameErrorMessage
              }}</span>
            </div>

            <div class="form__group">
              <label for="email" class="label form__label">Email</label>
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
              <span class="form__textError" v-if="emailErrors">{{ emailErrorMessage }}</span>
            </div>

            <div class="form__group">
              <label for="password" class="label form__label">Mot de passe</label>

              <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                class="input form__input form__input-password"
                placeholder="Entrez votre password"
                v-model="inputPassword"
                @blur="handleChangePassword"
                @focus="handleBlurPassword"
                :class="{
                  borderSuccess:
                    passwordMeta.touched && passwordMeta.validated && passwordMeta.valid,
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

            <div class="form__group">
              <label for="passwordConfirm" class="label form__label">Confirmer mot de passe</label>

              <input
                :type="showPasswordConfirm ? 'text' : 'password'"
                id="passwordConfirm"
                class="input form__input"
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

            <div class="form__group form__group-btn">
              <button
                title="Retour à la page d'accueil"
                aria-label="Retour à la page d'accueil"
                type="button"
                @click="router.back"
                class="btn form__btn-return"
              >
                Retour
              </button>
              <button
                title="Inscription"
                aria-label="Inscription"
                type="submit"
                class="btn form__btn-submit"
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
        </fieldset>
      </form>

      <div class="description">
        <p class="description__text">
          Rejoignez notre communauté en quelques instants ! Remplissez le formulaire, confirmez
          votre adresse e-mail, et commencez à explorer nos APIs. Lancez-vous dès maintenant !
        </p>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
@use '@/assets/style/abstracts/mixins' as m;
@import '@/assets/style/base/animation';
.signup {
  display: grid;
  grid-template-rows: min-content 1fr;

  @include m.xl {
    grid-template-columns: 2fr 1fr;
    justify-self: center;
  }
}

fieldset {
  border: none;
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
}

.form {
  justify-self: center;
  align-self: center;
  margin: 2rem;
  width: 80%;

  @include m.xl {
    width: fit-content;
    grid-row: 1/-1;
    grid-column: 1/2;
  }

  &__content {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(6, min-content);
    justify-content: center;
    align-items: center;
    row-gap: 2rem;

    @include m.md {
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(3, min-content);
      column-gap: 2rem;
    }
  }

  &__group {
    &-btn {
      grid-row: 6/-1;
      grid-column: 1/-1;
      align-self: center;
      justify-self: center;

      @include m.md {
        grid-row: 3/-1;
        grid-column: 2/-1;
      }
    }
  }

  &__errors {
    display: block;
  }
}

.description {
  grid-row: 2/-1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-black-2);
  padding: 2rem;

  @include m.xl {
    grid-row: 1/-1;
    grid-column: 2/-1;
  }

  &__text {
    max-width: 55.5rem;
    font-weight: 100;
  }
}
</style>
