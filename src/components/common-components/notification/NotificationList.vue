<script setup lang="ts">
import type { NotificationDetailInterface } from '@/shared/interfaces'
import { formatDate, formatNotificationDate } from '@/shared/utils'
import { onMounted, ref } from 'vue'

const props = defineProps<{
  notifications: NotificationDetailInterface[] | []
}>()

const emits = defineEmits<{
  (e: 'updateReadNotification', idNotification: string): void
  (e: 'deleteSelectedNotification', idNotification: string): void
}>()

const showFront = ref<Record<string, boolean>>({})

/**
 * onMounted hook is used to initialize the showFront ref with the notifications array
 */
onMounted(() => {
  showFront.value = props.notifications.reduce<Record<string, boolean>>((acc, notification) => {
    acc[notification._id] = true
    return acc
  }, {})
})

/**
 * checkShowFront function returns whether the front of the notification with the specified id is shown or not
 * @param id the id of the notification
 */
const checkShowFront = (id: string): boolean => showFront.value[id] ?? true

/**
 * updateShowFront function updates the showFront property of the notification with the specified id
 * @param id the id of the notification
 */
const updateShowFront = (id: string): void => {
  showFront.value[id] = !showFront.value[id]
}
</script>

<template>
  <ul class="notificationList" v-if="props.notifications.length > 0">
    <li
      class="notificationList__item"
      v-for="notification in props.notifications"
      :key="notification._id"
    >
      <div
        class="notificationList__item-front"
        v-if="checkShowFront(notification._id)"
        :class="{ 'notificationList__item--read': notification.read }"
      >
        <svg
          class="notificationList__icon"
          :class="{
            'notificationList__icon--success': notification.type === 'success',
            'notificationList__icon--fail':
              notification.type === 'fail' || notification.type === 'error'
          }"
        >
          <use
            v-if="notification.type === 'success'"
            xlink:href="@/components/icons/sprite.svg#icon-check-circle1"
          ></use>
          <use
            v-else-if="notification.type === 'fail'"
            xlink:href="@/components/icons/sprite.svg#icon-exclamation-circle"
          ></use>
          <use v-else xlink:href="@/components/icons/sprite.svg#icon-alert-triangle"></use>
        </svg>

        <p class="notificationList__message">
          {{ notification.message }}
        </p>
      </div>

      <div class="notificationList__time">
        <span class="notificationList__time-createAt">
          {{ formatNotificationDate(notification.createAt) }}
        </span>

        <span class="notificationList__time-readAt" v-if="notification.readAt"
          >Lue le {{ formatDate(notification.readAt) }}</span
        >
      </div>

      <div class="notificationList__item-back" v-if="!checkShowFront(notification._id)">
        <button
          v-if="!notification.read"
          type="button"
          class="btn-small"
          @click="
            emits('updateReadNotification', notification._id), updateShowFront(notification._id)
          "
        >
          Marquer comme lu
        </button>
        <button
          type="button"
          class="btn-small"
          @click="emits('deleteSelectedNotification', notification._id)"
        >
          Supprimer
        </button>
      </div>

      <button
        type="button"
        class="notificationList__btn"
        @click="updateShowFront(notification._id)"
      >
        ...
      </button>
    </li>
  </ul>
  <div class="notificationList" v-else>
    <p class="notificationList__empty">Aucune notification</p>
  </div>
</template>
<style lang="scss" scoped>
.notificationList {
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
  &__item {
    position: relative;
    display: grid;
    grid-template-columns: 1fr min-content;
    grid-template-rows: 1fr min-content;
    background-color: var(--color-black-2);
    padding: 1rem 2rem;
    gap: 1rem 2rem;
    transition: background-color 0.2s;
    &:hover,
    &:active {
      background-color: var(--color-gray-1);
    }

    &-front {
      grid-column: 1/2;
      grid-row: 1/2;
      display: grid;
      grid-template-columns: min-content 1fr;
      align-items: center;
      column-gap: 2rem;
    }

    &-back {
      grid-column: 1/2;
      grid-row: 1/-1;
      display: flex;
      align-items: center;
      column-gap: 2rem;
    }
  }

  &__icon {
    grid-column: 1/2;

    width: 3rem;
    height: 3rem;

    &--success {
      fill: var(--color-green-1);
    }

    &--fail {
      fill: var(--color-red-1);
    }
  }

  &__message {
    grid-column: 2/-1;
    font-weight: 300;
  }

  &__time {
    grid-column: 1/-1;
    font-size: 1.4rem;
    font-weight: bold;
    font-family: var(--font-subtext);
    color: var(--color-purple-1);
    display: flex;
    justify-content: space-between;

    &-readAt {
      opacity: 0.7;
    }
  }

  &__btn {
    grid-column: 2/-1;
    grid-row: 1/2;
    background-color: transparent;
    font-size: 3rem;
    font-weight: bolder;
    color: var(--color-white);
    letter-spacing: 2px;
    transition: all 0.2s;
    &:hover,
    &:active {
      color: var(--color-purple-1);
      transform: scale(1.1) translateY(-0.2rem);
    }
  }

  &__empty {
    font-size: 1.8rem;
    align-self: center;
    font-family: var(--font-subtext);
    font-weight: 400;
  }

  &__item--read {
    opacity: 0.4;
  }
}
</style>
