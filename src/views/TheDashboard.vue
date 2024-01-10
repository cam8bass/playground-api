<script setup lang="ts">
import DashboardHeader from '@/components/common-components/TheDashboardHeader.vue'
import TheModal from '@/components/common-components/TheModal.vue'
import { initStore } from '@/shared/utils'

const { errorStore } = initStore('errorStore')
</script>
<template>
  <main class="dashboard" v-if="errorStore">
    <DashboardHeader class="dashboard__header" />

    <RouterView v-slot="{ Component, route }">
      <Transition name="translateLeft" mode="out-in" appear>
        <component
          class="dashboard__content"
          :is="Component"
          :key="route.fullPath"
          :errors="errorStore.getError"
        />
      </Transition>
    </RouterView>

    <TheModal />
  </main>
</template>
<style scoped lang="scss">
@use '@/assets/style/abstracts/mixins' as m;
@import '@/assets/style/base/animation';

.dashboard {
  display: grid;
  grid-template-rows: min-content 1fr;
  grid-template-rows: 1fr;

  @include m.xl {
    grid-template-columns: min-content 1fr;
  }

  &__header {
    grid-row: 1/2;

    @include m.xl {
      grid-row: 1/-1;
      grid-template-columns: 1/2;
    }
  }

  &__content {
    grid-row: 2/-1;
    height: 80vh;
    overflow-y: scroll;
    max-width: 250rem;
    width: 100%;
    justify-self: center;

    @include m.xl {
      grid-row: 1/-1;
      grid-template-columns: 2/-1;
    }
  }
}
</style>
