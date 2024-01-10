<script setup lang="ts">
import type { ShowType } from '@/shared/types/types';

const emits = defineEmits<{
  (e: 'updateShow',show:ShowType): void
}>()
</script>
<template>
  <button
    class="btnMore"
    @click="emits('updateShow','notificationMore')"
    title="Cliquez pour afficher les options de notification"
    aria-label="Cliquez pour afficher les options de notification"
  >
    <svg class="btnMore__icon">
      <use xlink:href="@/components/icons/sprite.svg#icon-cog"></use>
    </svg>
  </button>
</template>
<style lang="scss" scoped>
.btnMore {
  background-color: transparent;

  &:hover &__icon,
  &:active &__icon {
    fill: var(--color-purple-1);
  }

  &__icon {
    transition: fill 0.2s;
    width: 2.5rem;
    height: 2.5rem;
    fill: var(--color-white);
  }

  &--disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
}
</style>
