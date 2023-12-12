<script setup lang="ts">
import AddApiKey from '@/components/shared-components/AddApiKey.vue'
import type { errorDevInterface, errorProdInterface } from '@/shared/interfaces'
import UserApiKeysList from '@/components/shared-components/UserApiKeysList.vue'

const props = defineProps<{
  apiKeysCount: number
  activeApiKeysCount: number
  pendingApiKeysCount: number
  errors: errorDevInterface | errorProdInterface | null
}>()
</script>
<template>
  <div class="apiKey">
    <h4 class="apiKey__title section__title">Clés d'api</h4>

    <AddApiKey :errors="props.errors" />

    <div class="apiKey__content">
      <div class="apiKey__info">
        <span class="apiKey__info-label"
          >Nombre d'apis :
          <span class="apiKey__info-number">{{
            props.apiKeysCount ? props.apiKeysCount : 0
          }}</span></span
        >

        <span class="apiKey__info-label"
          >Clés activées :
          <span class="apiKey__info-number">{{
            props.activeApiKeysCount ? props.activeApiKeysCount : 0
          }}</span></span
        >

        <span class="apiKey__info-label"
          >Clés en attente d'activation :
          <span class="apiKey__info-number">{{
            props.pendingApiKeysCount ? props.pendingApiKeysCount : 0
          }}</span></span
        >
      </div>

      <UserApiKeysList />
    </div>
  </div>
</template>
<style lang="scss" scoped>
@use '@/assets/style/abstracts/mixins' as m;

.apiKey {
  padding: 2rem;
  background-color: var(--color-black-2);
  overflow-y: scroll;
  &__title {
    margin: 0;
    margin-bottom: 2rem;
  }

  &__select {
    margin: 0;
    padding: 0;
  }

  &__content {
    display: grid;
    grid-template-rows: repeat(2, min-content);
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }

  &__info {
    grid-row: 1/3;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min-content, 25rem));
    grid-template-rows: auto;
    row-gap: 1rem;

    &-label {
      font-family: var(--font-subtext);
    }

    &-number {
      font-family: var(--font-subtext);
      font-weight: bold;
      color: var(--color-purple-1);
    }
  }
}
</style>
