<script setup lang="ts">

import BtnPopup from '../shared-components/BtnPopup.vue'
import BtnClose from '../shared-components/BtnClose.vue'
import { watch } from 'vue'
import type { NotificationAppInterface } from '@/shared/interfaces'


const props = defineProps<{
  notificationApp: NotificationAppInterface | null
  popup: boolean
  isLoggedIn: boolean
}>()

const emits = defineEmits<{
  (e: 'closePopup'): void
  (e: 'updateNotification', idNotification: string): void
  (e: 'deleteSelectedNotification', idNotification: string): void
}>()



function autoClosePopup(): void {
  setTimeout(() => emits('closePopup'), 5000)
}

watch(
  () => props.popup,
  (newPopup) => {
    if (newPopup) {
      autoClosePopup()
    }
  }
)
</script>
<template>
  <Transition name="translateLeft" mode="out-in">
    <div class="popup" v-if="props.notificationApp">
      <BtnClose class="popup__btnClose" @closeComponent="emits('closePopup')" />

      <svg
        class="popup__icon"
        :class="{
          'popup__icon--success': props.notificationApp.type === 'success',
          'popup__icon--fail':
            props.notificationApp.type === 'fail' || props.notificationApp.type === 'error'
        }"
      >
        <use
          v-if="props.notificationApp.type === 'success'"
          xlink:href="@/components/icons/sprite.svg#icon-check-circle1"
        ></use>
        <use
          v-else-if="props.notificationApp.type === 'fail'"
          xlink:href="@/components/icons/sprite.svg#icon-exclamation-circle"
        ></use>
        <use v-else xlink:href="@/components/icons/sprite.svg#icon-alert-triangle"></use>
      </svg>

      <div class="popup__content">
        <p class="popup__message">
          {{ props.notificationApp.message }}
        </p>
      </div>

      <BtnPopup
        v-if="props.isLoggedIn && props.notificationApp._id"
        class="popup__btnPopup"
        :idNotification="props.notificationApp._id"
        @delete-selected-notification="emits('deleteSelectedNotification', $event)"
        @update-notification="emits('updateNotification', $event)"
        @close-popup="emits('closePopup')"
      />
    </div>
  </Transition>
</template>
<style scoped lang="scss">
@use '@/assets/style/abstracts/mixins' as m;

.popup {
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-template-rows: min-content 1fr min-content;
  align-items: center;
  gap: 1rem 2rem;
  z-index: 5000;
  cursor: pointer;
  position: fixed;
  top: 15rem;
  right: 0;

  padding: 1.5rem;
  background-color: var(--color-black-2);
  backdrop-filter: blur(5px);
  box-shadow: var(--boxshadow-black);
  max-width: 60rem;
  min-width: 20rem;
  transition: background-color 0.4s;
  border-radius: 10px 0 0 10px;

  &:hover,
  &:active {
    background-color: var(--color-black-3);
  }

  &__btnClose {
    justify-self: flex-end;
    grid-column: 1/-1;
    grid-row: 1/2;
  }

  &__icon {
    grid-column: 1/2;
    grid-row: 2/3;
    width: 4rem;
    height: 4rem;

    &--success {
      fill: var(--color-green-1);
    }

    &--fail {
      fill: var(--color-red-1);
    }
  }

  &__content {
    grid-row: 2/3;
    grid-column: 2/-1;
    justify-self: center;
  }

  &__message {
    font-weight: 100;
  }

  &__btnPopup {
    grid-row: 3/-1;
    grid-column: 2/-1;
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
