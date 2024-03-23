<script setup lang="ts">
import type { NotificationDetailInterface } from '@/shared/interfaces'
import ThePopup from './ThePopup.vue'

const props = defineProps<{
  notificationApp: NotificationDetailInterface[]
  popup: boolean
  isLoggedIn: boolean
}>()

const emits = defineEmits<{
  (e: 'closePopup', id: string): void
  (e: 'autoClosePopup', id: string): void
  (e: 'updateViewNotification', idNotification: string): void
  (e: 'updateNotification', idNotification: string): void
  (e: 'deleteSelectedNotification', idNotification: string): void
}>()
</script>
<template>
  <ul class="popupList">
    <TransitionGroup name="translateLeft">
      <li
        class="popupList__item"
        v-for="notification in props.notificationApp"
        :key="notification._id"
      >
        <ThePopup
          v-if="props.notificationApp"
          :notification-app="notification"
          :isLoggedIn="props.isLoggedIn"
          @auto-close-popup="emits('autoClosePopup', $event)"
          @close-popup="emits('closePopup', $event)"
          @delete-selected-notification="emits('deleteSelectedNotification', $event)"
          @update-notification="emits('updateNotification', $event)"
          @update-view-notification="emits('updateViewNotification', $event)"
        />
      </li>
    </TransitionGroup>
  </ul>
</template>
<style lang="scss" scoped>
.popupList {
  display: flex;
  flex-direction: column;
  justify-self: flex-end;
  top: 15rem;
  row-gap: 2rem;
  position: fixed;
  z-index: 5000;
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


