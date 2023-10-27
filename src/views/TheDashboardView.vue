<script setup lang="ts">
import DashboardHeader from '@/components/TheDashboardHeader.vue'

import { useAppStore, useErrorStore } from '@/stores'
import type { modalType } from '@/shared/types/types'
import type { userInterface } from '@/shared/interfaces'

const appStore = useAppStore()

const errorStore = useErrorStore()

defineProps<{
  user: userInterface | null
}>()

const emits = defineEmits<{
  (e: 'logout', modal: { type: modalType; title: string; message: string }): void
  (e: 'requestChangeEmail', modal: { type: modalType; title: string; message: string }): void
  (e: 'deactivation', modal: { type: modalType; title: string; message: string }): void
  (
    e: 'renewalApiKey',
    modal: { type: modalType; title: string; message: string; _id: string }
  ): void
  (
    e: 'deleteSelectedApiKey',
    modal: { type: modalType; title: string; message: string; _id: string }
  ): void
  (e: 'cancel'): void
}>()
</script>
<template>
  <main class="dashboard">
    <DashboardHeader
      class="dashboard__header"
      :modal="appStore.getModal"
      :user="user"
      @logout="emits('logout', $event)"
      @cancel="emits('cancel')"
    />

    <RouterView class="dashboard__content" v-slot="{ Component, route }">
      <Transition name="translateLeft" mode="out-in" appear>
        <component
          :is="Component"
          :key="route.fullPath"
          :errors="errorStore.getError"
          :modal="appStore.getModal"
          @request-change-email="emits('requestChangeEmail', $event)"
          @deactivation="emits('deactivation', $event)"
          @cancel="emits('cancel')"
          @renewal-api-key="emits('renewalApiKey', $event)"
          @delete-selected-api-key="emits('deleteSelectedApiKey', $event)"
        />
      </Transition>
    </RouterView>
  </main>
</template>
<style scoped lang="scss">
@use '@/assets/abstracts/mixins' as m;
@import '@/assets/base/animation';

.dashboard {
  display: grid;
  grid-template-rows: min-content 1fr;
  height: 100%;
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
