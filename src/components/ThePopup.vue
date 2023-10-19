<script setup lang="ts">
import type { notificationInterface } from '@/shared/interfaces'

defineProps<{
  notification: notificationInterface | null
}>()

</script>
<template>
  <Transition name="translateLeft" mode="out-in">
    <div class="notification" v-if="notification" @click="$emit('cancel')">
      <svg
        class="notification__icon"
        :class="{
          'notification__icon--success': notification.type === 'success',
          'notification__icon--fail': notification.type === 'fail'
        }"
      >
        <use
          v-if="notification.type === 'success'"
          xlink:href="@/components/icons/sprite.svg#icon-check"
        ></use>
        <use v-else xlink:href="@/components/icons/sprite.svg#icon-alert-triangle"></use>
      </svg>
      <p class="notification__message">{{ notification.message }}</p>
    </div>
  </Transition>
</template>
<style scoped lang="scss">
@use '@/assets/abstracts/mixins' as m;

.notification {
  z-index: 5000;
  cursor: pointer;
  position: fixed;
  top: 15rem;
  right: 0;
  padding: 1.5rem;
  background-color: var(--color-black-2);
  backdrop-filter: blur(5px);
  box-shadow: var(--boxshadow-black);
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-template-rows: min-content;
  align-items: center;
  column-gap: 1rem;
  min-width: 25rem;
  width: 95%;
  max-width: 40rem;
  transition: background-color 0.4s;
  border-radius: 10px 0 0 10px;

  &:hover,
  &:active {
    background-color: var(--color-black-3);
  }
  &__icon {
    grid-column: 1/2;
    width: 4rem;
    height: 4rem;

    &--success {
      fill: var(--color-green-1);
    }

    &--fail {
      fill: var(--color-red-1);
    }
  }

  &__message {
    grid-column: 2/-1;
    font-weight: 100;
  }
}

.translateLeft-enter-active,
.translateLeft-leave-active {
  transition: all 0.4s ease;
}

.translateLeft-enter-from,
.translateLeft-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
