<script setup lang="ts">
import BtnPopup from '../../shared-components/BtnPopup.vue'
import BtnClose from '../../shared-components/BtnClose.vue'
import type { NotificationDetailInterface } from '@/shared/interfaces'
import { watchEffect } from 'vue'

const props = defineProps<{
  notificationApp: NotificationDetailInterface
  isLoggedIn: boolean
}>()

const emits = defineEmits<{
  (e: 'closePopup', id: string): void
  (e: 'autoClosePopup', id: string): void
  (e: 'updateNotification', idNotification: string): void
  (e: 'updateViewNotification', idNotification: string): void
  (e: 'deleteSelectedNotification', idNotification: string): void
}>()

/**
 * @description This function is used to automatically close the popup after a certain time interval.
 * @param {string} id - The id of the popup.
 */
function autoClosePopup(id: string): void {
  setTimeout(() => emits('autoClosePopup', id), 8000)
}

/**
 * @description This function is used to watch the props.notificationApp property and automatically close the popup after a certain time interval.
 */
watchEffect(() => {
  const newPopup = props.notificationApp
  if (newPopup) {
    autoClosePopup(newPopup._id)
  }
})
</script>
<template>
  <div class="popup" v-if="props.notificationApp">
    <BtnClose
      class="popup__btnClose"
      @closeComponent="
        emits('closePopup', props.notificationApp._id),
          emits('updateViewNotification', $props.notificationApp._id)
      "
    />

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
      @close-popup="emits('closePopup', $event)"
    />
  </div>
</template>
<style scoped lang="scss">
@use '@/assets/style/abstracts/mixins' as m;

.popup {
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-template-rows: min-content 1fr min-content;
  align-items: center;
  gap: 1rem 2rem;
  cursor: pointer;
  padding: 1.5rem;
  background-color: var(--color-black-2);
  -webkit-backdrop-filter: blur(5px);
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
    column-gap: 2rem;
  }
}
</style>

