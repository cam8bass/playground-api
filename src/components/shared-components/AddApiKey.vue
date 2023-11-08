<script lang="ts" setup>
import type {
  errorDevInterface,
  errorProdInterface,
  requestCreateNewApiKeyInterface
} from '@/shared/interfaces'
import { addApiKeySchema } from '@/shared/schema'
import { useCurrentUserStore, useUsersStore } from '@/stores'
import { useForm, useField } from 'vee-validate'
import { computed, ref } from 'vue'

const props = defineProps<{
  errors: errorDevInterface | errorProdInterface | null
}>()

const currentUserStore = useCurrentUserStore()
const usersStore = computed(() => {
  if (currentUserStore.getCurrentUser && currentUserStore.getCurrentUser.role === 'admin') {
    return useUsersStore()
  }
  return null
})

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
    if (currentUserStore.getCurrentUser && currentUserStore.getCurrentUser.role === 'user') {
      await currentUserStore.fetchRequestCreateNewApiKey(value)
    } else if (
      currentUserStore.getCurrentUser &&
      currentUserStore.getCurrentUser.role === 'admin' &&
      usersStore.value &&
      usersStore.value.getUser
    ) {
      await usersStore.value.fetchAdminCreateApiKey(value.apiName, usersStore.value.getUser._id)
    }

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
  <form @submit="onSubmit" class="formSelect">
    <label for="apiName" class="formSelect__label form__label">Ajouter une api :</label>
    <select name="apiName" id="apiName" class="formSelect__select" v-model="inputApiName">
      <option selected value="Api-travel">Api-travel</option>
      <option value="Api-test1">Api-test1</option>
      <option value="Api-test2">Api-test2</option>
    </select>

    <button type="submit" class="formSelect__btn" :disabled="isSubmitting">
      <svg class="formSelect__icon">
        <use xlink:href="@/components/icons/sprite.svg#icon-arrow-right-circle"></use>
      </svg>
    </button>
    <span class="form__textError formSelect__textError" v-if="apiNameErrors">{{
      apiNameErrorMessage
    }}</span>

    <span class="form__textError formSelect__textError" v-if="formError">{{ formError }}</span>
  </form>
</template>
<style lang="scss" scoped></style>
