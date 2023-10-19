<script setup lang="ts">
import DashboardHeader from '@/components/TheDashboardHeader.vue'

import { useAppStore, useErrorStore } from '@/stores'
import type { modalType } from '@/shared/types/types'

const appStore = useAppStore()
const errorStore = useErrorStore()

const emits = defineEmits<{
  (e: 'logout', modal: { type: modalType; title: string; message: string }): void
  (e: 'requestChangeEmail', modal: { type: modalType; title: string; message: string }): void
  (e: 'cancel'): void
}>()
</script>
<template>
  <main class="dashboard">
    <DashboardHeader
      class="dashboard__header"
      @logout="emits('logout', $event)"
      :modal="appStore.getModal"
      @cancel="emits('cancel')"
    />

    <RouterView class="dashboard__content" v-slot="{ Component, route }">
      <component
        :is="Component"
        :key="route.fullPath"
        :errors="errorStore.getError"
        :modal="appStore.getModal"
        @request-change-email="emits('requestChangeEmail', $event)"
      />
    </RouterView>
  </main>
</template>
<style scoped lang="scss">
@use '@/assets/abstracts/mixins' as m;
@import '@/assets/base/animation';

.dashboard {
  display: grid;
  grid-template-rows: min-content 1fr;

  @include m.xl {
    grid-template-columns: min-content 1fr;
    grid-template-rows: 1fr;
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

    @include m.xl {
      grid-row: 1/-1;
      grid-template-columns: 2/-1;
    }
  }
}
</style>
