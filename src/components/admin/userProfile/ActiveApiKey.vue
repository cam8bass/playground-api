<script lang="ts" setup>
import type { adminSubmitActiveApiKey } from '@/shared/interfaces'
import { activeApiKeySchema } from '@/shared/schema'
import { initStore } from '@/shared/utils'
import { useForm, useField } from 'vee-validate'
import { ref } from 'vue'

const props = defineProps<{
  idApi: string
}>()

const formError = ref<string | null>(null)
const { handleSubmit, isSubmitting, resetForm } = useForm({ validationSchema: activeApiKeySchema })

const {
  value: inputActive,
  errors: activeErrors,
  errorMessage: activeErrorMessage
} = useField('active', '', { validateOnValueUpdate: false })

const onSubmit = handleSubmit(async (value: adminSubmitActiveApiKey, action) => {
  const stores = initStore('errorStore', 'userStore', 'apiKeysStore', 'usersStore')

  if (
    stores.userStore.getCurrentUser &&
    stores.userStore.getCurrentUser.role === 'admin' &&
    stores.usersStore &&
    stores.usersStore.getUser &&
    stores.apiKeysStore
  ) {
    await stores.apiKeysStore.fetchAdminActiveApiKey(
      value,
      stores.usersStore.getUser._id,
      props.idApi
    )
  }

  const errors = stores.errorStore.getLastInfoError
    ? stores.errorStore.getLastInfoError.fields
    : null
  formError.value = null

  if (errors) {
    Object.entries(errors).forEach(([key, value]) => {
      action.setFieldError(key, value)
    })
    if (errors.form) formError.value = errors.form
  } else {
    resetForm()
  }
})
</script>
<template>
  <form @submit="onSubmit" class="formSelect">
    <label for="active" class="formSelect__label form__label">Activation :</label>
    <select name="active" id="active" class="formSelect__select" v-model="inputActive">
      <option selected :value="true">Accepter</option>
      <option :value="false">Refuser</option>
    </select>

    <button type="submit" class="formSelect__btn" :disabled="isSubmitting">
      <svg class="formSelect__icon">
        <use xlink:href="@/components/icons/sprite.svg#icon-arrow-right-circle"></use>
      </svg>
    </button>
    <span class="form__textError formSelect__textError" v-if="activeErrors">{{
      activeErrorMessage
    }}</span>

    <span class="form__textError formSelect__textError" v-if="formError">{{ formError }}</span>
  </form>
</template>
<style lang="scss" scoped></style>
