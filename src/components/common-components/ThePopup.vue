<script setup lang="ts">
import { useAppStore } from '@/stores'
const appStore = useAppStore()

function resetPopup(): void {
  appStore.updatePopup(false), appStore.resetNotification()
}
</script>
<template>
  <Transition name="translateLeft" mode="out-in">
    <div class="notification" v-if="appStore.getNotificationMessage" @click="resetPopup()">
      <svg
        class="notification__icon"
        :class="{
          'notification__icon--success': appStore.getNotificationMessage.type === 'success',
          'notification__icon--fail':
            appStore.getNotificationMessage.type === 'fail' ||
            appStore.getNotificationMessage.type === 'error'
        }"
      >
        <use
          v-if="appStore.getNotificationMessage.type === 'success'"
          xlink:href="@/components/icons/sprite.svg#icon-check-circle1"
        ></use>
        <use
          v-else-if="appStore.getNotificationMessage.type === 'fail'"
          xlink:href="@/components/icons/sprite.svg#icon-exclamation-circle"
        ></use>
        <use v-else xlink:href="@/components/icons/sprite.svg#icon-alert-triangle"></use>
      </svg>
      <p class="notification__message">{{ appStore.getNotificationMessage.message }}</p>
    </div>
  </Transition>
</template>
<style scoped lang="scss">
@use '@/assets/style/abstracts/mixins' as m;

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
