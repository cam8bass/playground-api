<script setup lang="ts">
import type { NavigationType } from '@/shared/types/types'

const emits = defineEmits<{
  (e: 'updateNavigation', navigation: { type: NavigationType; value?: boolean }): void
}>()

const props = defineProps<{
  unreadNotificationCount: number
}>()
</script>
<template>
  <button
    @click="emits('updateNavigation', { type: 'notification' })"
    class="btnNotification"
    title="Voir les notifications"
    aria-label="notifications"
  >
    <svg class="btnNotification-icon">
      <use xlink:href="@/components/icons/sprite.svg#icon-bell-o"></use>
    </svg>
    <span class="btnNotification-number">{{ props.unreadNotificationCount }}</span>
  </button>
</template>
<style lang="scss" scoped>
@use '@/assets/style/abstracts/mixins' as m;

.btnNotification {
  background-color: transparent;

  &-icon {
    width: 1.8rem;
    height: 1.8rem;

    fill: var(--color-white);
    transition: all 0.2s;

    @include m.lg {
      width: 2.5rem;
      height: 2.5rem;
    }
  }
  &-number {
    color: var(--color-red-1);
  }

  &:hover &-icon,
  &:active &-icon {
    fill: var(--color-purple-1);
  }

  &:hover &-number,
  &:active &-number {
    color: var(--color-red-2);
  }
}
</style>
