<script setup lang="ts">
import { useField } from 'vee-validate'
import { usersSearchSchema } from '@/shared/schema'

const emits = defineEmits<{
  (e: 'updateSearch', value: string): void
}>()

const {
  value: inputSearch,
  errors: searchErrors,
  errorMessage: searchErrorMessage,
  handleBlur: handleBlurSearch,
  handleChange: handleChangeSearch,
  meta: searchMeta
  // validate: validateSearch
} = useField('search', usersSearchSchema, { validateOnValueUpdate: false })

// const handleInput = async () => {
//   await validateSearch()
//   if (searchMeta.valid) {
//     emits('updateSearch', inputSearch.value)
//   } else {
//     emits('updateSearch', '')
//   }
// }

const handleInput = () => {
  emits('updateSearch', inputSearch.value)
}
</script>
<template>
  <div class="search">
    <div class="search__content">
      <label for="search" class="search__label form__label search__label"
        >Rechercher un utilisateur</label
      >
      <input
        type="text"
        id="search"
        class="form__input search__input"
        placeholder="Rechercher un utilisateur"
        v-model="inputSearch"
        @blur="handleChangeSearch"
        @focus="handleBlurSearch"
        :class="{
          borderSuccess: searchMeta.touched && searchMeta.validated && searchMeta.valid,
          borderError: searchMeta.touched && searchMeta.validated && !searchMeta.valid
        }"
        @input="handleInput"
      />
      <span class="form__textError search__textError" v-if="searchErrors">{{
        searchErrorMessage
      }}</span>
    </div>
  </div>
</template>
<style scoped lang="scss">
.search {
  &__content {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
  }
}
</style>
