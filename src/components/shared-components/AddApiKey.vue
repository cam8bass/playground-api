<script lang="ts" setup>
import type {  AppErrorInterface, requestCreateNewApiKeyInterface } from '@/shared/interfaces'
import { addApiKeySchema } from '@/shared/schema'
import type { vueEnvType } from '@/shared/types/types'
import { initStore } from '@/shared/utils'

import { useForm, useField } from 'vee-validate'
import { ref } from 'vue'

const props = defineProps<{
  errors: AppErrorInterface | null
}>()

const formError = ref<string | null>(null)

const { handleSubmit, isSubmitting, resetForm } = useForm({ validationSchema: addApiKeySchema })

const {
  value: inputApiName,
  errors: apiNameErrors,
  errorMessage: apiNameErrorMessage
} = useField('apiName', '', {
  validateOnValueUpdate: false
})

const onSubmit = handleSubmit(async (value: requestCreateNewApiKeyInterface, action) => {
  const stores = initStore('userStore', 'usersStore', 'apiKeysStore')

  if (value.apiName) {
    if (stores.userStore.getCurrentUser && stores.userStore.getCurrentUser.role === 'user') {
      await stores.apiKeysStore.fetchUserRequestCreateNewApiKey(value)
    } else if (
      stores.userStore.getCurrentUser &&
      stores.userStore.getCurrentUser.role === 'admin' &&
      stores.usersStore &&
      stores.apiKeysStore &&
      stores.usersStore.getUser
    ) {
      await stores.apiKeysStore.fetchAdminCreateApiKey(value.apiName, stores.usersStore.getUser._id)
    }

    const errors = props.errors ? props.errors.fields : null

    formError.value = null

    if (errors) {
      Object.entries(errors).forEach(([key, value]) => {
        action.setFieldError(key, value)
      })

      if (errors.form) formError.value = errors.form
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
