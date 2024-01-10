<script setup lang="ts">
import type { errorDevInterface, errorProdInterface } from '@/shared/interfaces'
import UserApiKeysList from '@/components/shared-components/UserApiKeysList.vue'

import AddApiKey from '@/components/shared-components/AddApiKey.vue'
import { initStore } from '@/shared/utils'

const { userStore, apiKeysStore } = initStore('userStore', 'apiKeysStore')

const props = defineProps<{
  errors: errorDevInterface | errorProdInterface | null
}>()
</script>
<template>
  <article class="myApiKeys" v-if="userStore && apiKeysStore">
    <h3 class="section__title">Mes clés d'apis</h3>

    <div class="myApiKeys__content">
      <AddApiKey :errors="props.errors" />
      <div class="myApiKeys__info">
        <span class="myApiKeys__quantity"
          >Nombre d'apis :
          <span class="myApiKeys__quantity--number">{{
            apiKeysStore.getCurrentUserApiKeysCount
          }}</span></span
        >
      </div>
      <UserApiKeysList />
    </div>
  </article>
</template>
<style scoped lang="scss">
@use '@/assets/style/abstracts/mixins' as m;

.myApiKeys {
  background-color: var(--color-black-2);

  &__content {
    margin: 2rem;
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
  }

  &__info {
  }

  &__quantity {
    font-family: var(--font-subtext);
    font-weight: 100;

    &--number {
      font-weight: 700;
      color: var(--color-purple-1);
    }
  }
}
</style>
