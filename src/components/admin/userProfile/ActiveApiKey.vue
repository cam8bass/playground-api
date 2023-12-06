<script lang="ts" setup>
import type { adminSubmitActiveApiKey } from '@/shared/interfaces'
import { activeApiKeySchema } from '@/shared/schema'
import { useApiKeysStore, useCurrentUserStore, useErrorStore, useUsersStore } from '@/stores'
import { useForm, useField } from 'vee-validate'
import { computed, ref } from 'vue'

const errorStore = useErrorStore()
const currentUserStore = useCurrentUserStore()

const apiKeysStore = computed(() => {
  if (currentUserStore.getCurrentUser && currentUserStore.getCurrentUser.role === 'admin') {
    return useApiKeysStore()
  }
  return null
})

const usersStore = computed(() => {
  if (currentUserStore.getCurrentUser && currentUserStore.getCurrentUser.role === 'admin') {
    return useUsersStore()
  }
  return null
})

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
  if (
    currentUserStore.getCurrentUser &&
    currentUserStore.getCurrentUser.role === 'admin' &&
    usersStore.value &&
    usersStore.value.getUser &&
    apiKeysStore.value
  ) {
    await apiKeysStore.value.fetchAdminActiveApiKey(
      value,
      usersStore.value.getUser._id,
      props.idApi
    )
  }

  const errors = errorStore.getError?.errors as Partial<adminSubmitActiveApiKey> | null
  formError.value = null

  if (errors) {
    Object.entries(errors).forEach(([key, value]) => {
      action.setFieldError(key, value)
    })
    if (errors.request) formError.value = errors.request
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
