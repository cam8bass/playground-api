<script setup lang="ts">
import type { FilterAppInterface, FilterNotificationInterface } from '@/shared/interfaces'

const emits = defineEmits<{
  (e: 'getUserNotifications', filter: Partial<FilterAppInterface>): void
}>()

const props = defineProps<{
  filterNotification: FilterNotificationInterface
  idNotification: string | null
}>()
</script>
<template>
  <div class="notificationFilter">
    <button
      :disabled="(props.filterNotification.all, !props.idNotification)"
      class="btn-small notificationFilter__btn"
      type="button"
      title="Afficher toutes les notifications"
      aria-label="Afficher toutes les notifications"
      :class="{
        'notificationFilter__btn--active': props.filterNotification.all,
        'notificationFilter__btn--disabled': !props.idNotification
      }"
      @click="
        emits('getUserNotifications', { notification: { all: true, read: false, unread: false } })
      "
    >
      Tout
    </button>

    <button
      :disabled="(props.filterNotification.unread, !props.idNotification)"
      class="btn-small notificationFilter__btn"
      type="button"
      title="Afficher les notifications non lues"
      aria-label="Afficher les notifications non lues"
      :class="{
        'notificationFilter__btn--active': props.filterNotification.unread,
        'notificationFilter__btn--disabled': !props.idNotification
      }"
      @click="
        emits('getUserNotifications', { notification: { unread: true, all: false, read: false } })
      "
    >
      Non lues
    </button>

    <button
      :disabled="(props.filterNotification.read, !props.idNotification)"
      class="btn-small notificationFilter__btn"
      type="button"
      title="Afficher les notifications lues"
      aria-label="Afficher les notifications lues"
      :class="{
        'notificationFilter__btn--active': props.filterNotification.read,
        'notificationFilter__btn--disabled': !props.idNotification
      }"
      @click="
        emits('getUserNotifications', { notification: { read: true, all: false, unread: false } })
      "
    >
      Lues
    </button>
  </div>
</template>
<style lang="scss" scoped>
.notificationFilter {
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  grid-template-rows: auto;
  gap: 2rem;

  &__btn {
    &--disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    &--active {
      background-color: var(--color-purple-2);
      border: none;
      color: var(--color-gray-1);
    }
  }
}
</style>
