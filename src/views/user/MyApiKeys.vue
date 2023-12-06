<script setup lang="ts">
import type { errorDevInterface, errorProdInterface } from '@/shared/interfaces'
import UserApiKeysList from '@/components/shared-components/UserApiKeysList.vue'
import { useCurrentUserStore } from '@/stores'
import AddApiKey from '@/components/shared-components/AddApiKey.vue'
import { onMounted } from 'vue'

const currentUserStore = useCurrentUserStore()

const fetchCurrentUserApiKeys = async () => {
  const refresh = currentUserStore.getRefresh
  if (refresh) {
    await currentUserStore.fetchUserGetMyApiKeys()
    currentUserStore.updateRefresh(false)
  }
}

const props = defineProps<{
  errors: errorDevInterface | errorProdInterface | null
}>()

onMounted(fetchCurrentUserApiKeys)
</script>
<template>
  <article class="myApiKeys">
    <h3 class="section__title">Mes clés d'apis</h3>

    <div class="myApiKeys__content">
      <AddApiKey :errors="props.errors" />

      <span class="myApiKeys__quantity"
        >Nombre d'apis :
        <span class="myApiKeys__quantity--number">{{
          currentUserStore.getNumberOfApiKey
        }}</span></span
      >
      <UserApiKeysList />
    </div>
  </article>
</template>
<style scoped lang="scss">
@use '@/assets/style/abstracts/mixins' as m;

.myApiKeys {
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
}
</style>
