<script setup lang="ts">
import type {
  errorDevInterface,
  errorProdInterface,
  modalInterface,
  requestCreateNewApiKeyInterface
} from '@/shared/interfaces'
import { addApiKeySchema } from '@/shared/schema'
import type { modalType } from '@/shared/types/types'
import { formatDate } from '@/shared/utils'
import { useUserStore } from '@/stores'
import { useField, useForm } from 'vee-validate'
import { ref } from 'vue'

const props = defineProps<{
  errors: errorDevInterface | errorProdInterface | null
  modal: modalInterface | null
}>()

const emits = defineEmits<{
  (e: 'cancel'): void
  (
    e: 'renewalApiKey',
    modal: { type: modalType; title: string; message: string; _id: string }
  ): void
  (
    e: 'deleteSelectedApiKey',
    modal: { type: modalType; title: string; message: string; _id: string }
  ): void
}>()

const userStore = useUserStore()

const formError = ref<string | null>(null)

const {
  handleSubmit,
  meta: formMeta,
  isSubmitting,
  resetForm
} = useForm({ validationSchema: addApiKeySchema })

const {
  value: inputApiName,
  errors: apiNameErrors,
  errorMessage: apiNameErrorMessage
} = useField('apiName', '', {
  validateOnValueUpdate: false
})

const onSubmit = handleSubmit(async (value: requestCreateNewApiKeyInterface, action) => {
  if (value.apiName) {
    await userStore.fetchRequestCreateNewApiKey(value)

    const errors = props.errors?.errors as Partial<requestCreateNewApiKeyInterface> | null

    formError.value = null

    if (errors) {
      Object.entries(errors).forEach(([key, value]) => {
        action.setFieldError(key, value)
      })

      if (errors.request) formError.value = errors.request
    } else {
      resetForm()
    }
  }
})
</script>
<template>
  <article class="myApiKeys" v-if="userStore.getCurrentUser">
    <h3 class="section__title">Mes clés d'apis</h3>

    <div class="myApiKeys__content">
      <div class="myApiKeys__btn" v-if="userStore.getCurrentUser.role === 'admin'">
        <button class="myApiKeys__btn btn--delete btn">Supprimer toutes les clés</button>
      </div>

      <form @submit="onSubmit" class="formSelect">
        <div class="formSelect__content">
          <label for="apiName" class="formSelect__label form__label">Ajouter une api : </label>
          <select id="apiName" v-model="inputApiName" class="formSelect__select">
            <option value="Api-travel">Api-travel</option>
            <option value="Api-test1">Api-test1</option>
            <option value="Api-test2">Api-test2</option>
          </select>

          <button type="submit" class="formSelect__btn" :disabled="isSubmitting">
            <svg
              class="form__icon"
              :class="{
                iconSuccess: formMeta.touched && formMeta.valid,
                iconError: formMeta.touched && !formMeta.valid
              }"
            >
              <use xlink:href="@/components/icons/sprite.svg#icon-plus-circle"></use>
            </svg>
          </button>
          <span class="form__textError" v-if="apiNameErrors">{{ apiNameErrorMessage }}</span>
        </div>
        <div class="formSelect__errors" v-if="formError">
          <p class="form__textError">
            {{ formError }}
          </p>
        </div>
      </form>

      <span class="myApiKeys__quantity"
        >Nombre d'apis :
        <span class="myApiKeys__quantity--number">{{ userStore.getNumberOfApiKey }}</span></span
      >

      <table class="table myApiKeys__table" v-if="userStore.getUserApiKey">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Clé d'api</th>
            <th>Création</th>
            <th>Expiration</th>
            <th>Activé</th>
            <th>Renouveller</th>
            <th>Supprimer</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="apiKey in userStore.getUserApiKey" :key="apiKey._id">
            <td>{{ apiKey.apiName }}</td>
            <td>{{ apiKey.apiKey ?? 'En attente de validation' }}</td>
            <td>{{ formatDate(apiKey.createAt) }}</td>
            <td>{{ formatDate(apiKey.apiKeyExpire) }}</td>
            <td>{{ apiKey.active ? 'oui' : 'non' }}</td>
            <td>
              <button
                class="table__btn"
                @click="
                  !modal
                    ? emits('renewalApiKey', {
                        type: 'renewalApiKey',
                        title: 'Demande de renouvellement de clé d\'API.',
                        message: `effectuer une demande de renouvellement de clé pour : ${apiKey.apiName} ?`,
                        _id: apiKey._id
                      })
                    : modal && modal.type === 'renewalApiKey'
                    ? emits('cancel')
                    : ''
                "
              >
                <svg class="table__icon" aria-label="Renouveller la clé d'api">
                  <use xlink:href="@/components/icons/sprite.svg#icon-plus-circle"></use>
                </svg>
              </button>
            </td>

            <td class="myApiKeys__table-data">
              <button
                class="table__btn"
                @click="
                  !modal
                    ? emits('deleteSelectedApiKey', {
                        type: 'deleteSelectedApiKey',
                        title: 'Demande de suppression de clé d\'API.',
                        message: `effectuer une demande de suppression de clé concernant ${apiKey.apiName} ?`,
                        _id: apiKey._id
                      })
                    : modal && modal.type === 'deleteSelectedApiKey'
                    ? emits('cancel')
                    : ''
                "
              >
                <svg class="table__icon" aria-label="Supprimer la clé d'api">
                  <use xlink:href="@/components/icons/sprite.svg#icon-bin2"></use>
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </article>
</template>
<style scoped lang="scss">
@use '@/assets/abstracts/mixins' as m;

.myApiKeys {
  align-self: center;
  margin: 2rem 0;

  background-color: var(--color-black-2);

  @include m.lg {
    margin: 3rem 0;
  }

  @include m.xl {
    margin: 4rem;
  }

  &__content {
    margin: 2rem;
  }

  &__quantity {
    font-family: var(--font-subtext);
    font-weight: 100;

    &--number {
      font-weight: 700;
      color: var(--color-purple-1);
    }
  }

  &__table {
    margin-top: 1rem;
  }
}

td,
th {
  display: none;
  @include m.lg {
    display: table-cell;
  }
}

th:nth-child(1),
td:nth-child(1),
th:nth-child(2),
td:nth-child(2) {
  display: table-cell;
}

@include m.md {
  th:nth-child(6),
  td:nth-child(6),
  th:nth-child(7),
  td:nth-child(7) {
    display: table-cell;
  }
}

.formSelect {
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;

  &__content {
    display: grid;
    grid-template-columns: repeat(2, min-content);
    grid-template-rows: repeat(2, min-content);
    row-gap: 1rem;
    column-gap: 2rem;
  }

  &__btn {
    display: flex;
    background-color: transparent;
    grid-row: 2/-1;
    grid-column: 2/-1;
  }

  &__select {
    grid-row: 2/-1;
    grid-column: 1/2;
    padding: 0.8rem;
    border: none;
    border-radius: 2px;
    box-shadow: var(--boxshadow-black);
    font-size: 1.6rem;
    background-color: var(--color-black-2);
    color: var(--color-purple-1);
  }
}

.iconSuccess {
  fill: var(--color-green-1);
  transition: all 0.4s;
  &:hover,
  &:active {
    fill: var(--color-green-2);
  }
}

.iconError {
  fill: var(--color-red-1);
  transition: all 0.4s;

  &:hover,
  &:active {
    fill: var(--color-red-2);
  }
}
</style>
