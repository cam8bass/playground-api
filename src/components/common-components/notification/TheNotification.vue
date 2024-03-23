<script setup lang="ts">
import BtnNotificationMore from '@/components/shared-components/BtnNotificationMore.vue'
import NotificationFilter from './NotificationFilter.vue'
import NotificationList from './NotificationList.vue'
import NotificationMore from './NotificationMore.vue'
import NotificationOverview from './NotificationOverview.vue'
import type {
  FilterAppInterface,
  FilterNotificationInterface,
  NotificationDetailInterface,
  modalInterface,
  updateModalInterface
} from '@/shared/interfaces'
import type { NavigationType, ShowType } from '@/shared/types/types'

const props = defineProps<{
  notifications: NotificationDetailInterface[] | []
  filterNotification: FilterNotificationInterface
  idNotification: string | null
  modal: modalInterface | null
  totalNotifications: number
  totalUnreadNotifications: number
  totalReadNotifications: number
  showMore: boolean
}>()
const emits = defineEmits<{
  (e: 'closeAllPopup'): void
  (e: 'updateNavigation', navigation: { type: NavigationType; value?: boolean }): void
  (e: 'updateReadNotification', idNotification: string): void
  (e: 'deleteSelectedNotification', idNotification: string): void
  (e: 'getUserNotifications', filter: Partial<FilterAppInterface>): void
  (e: 'updateAllNoticationsUser'): void
  (e: 'updateModal', modal: updateModalInterface): void
  (e: 'resetModal'): void
  (e: 'updateShow', show: ShowType): void
}>()
</script>
<template>
  <div class="notification">
    <div class="notification__header">
      <h5 class="notification__title">Notifications</h5>
      <button
        title="Cliquez pour fermer la fenêtre de notification"
        aria-label="Cliquez pour fermer la fenêtre de notification"
        class="notification__btnClose"
        @click="emits('updateNavigation', { type: 'notification' })"
      >
        Fermer
      </button>

      <BtnNotificationMore
        class="notification__btnMore"
        v-if="props.notifications"
        @update-show="emits('updateShow', $event)"
      />

      <NotificationOverview
        class="notification__overview"
        :totalNotifications="props.totalNotifications"
        :totalUnreadNotifications="props.totalUnreadNotifications"
        :totalReadNotifications="props.totalReadNotifications"
      />

      <Transition name="translateDown" mode="out-in" appear>
        <NotificationMore
          class="notification__more"
          v-if="props.showMore && props.notifications"
          :modal="props.modal"
          :idNotification="props.idNotification"
          @update-all-notications-user="emits('updateAllNoticationsUser')"
          @reset-modal="emits('resetModal')"
          @update-modal="emits('updateModal', $event)"
          @close-all-popup="emits('closeAllPopup')"
        />
      </Transition>
    </div>

    <NotificationFilter
      class="notification__filter"
      v-if="props.notifications"
      @get-user-notifications="emits('getUserNotifications', $event)"
      :filterNotification="props.filterNotification"
      :idNotification="props.idNotification"
    />

    <NotificationList
      class="notification__list"
      :notifications="props.notifications"
      @update-read-notification="emits('updateReadNotification', $event)"
      @delete-selected-notification="emits('deleteSelectedNotification', $event)"
    />
  </div>
</template>
<style lang="scss" scoped>
@use '@/assets/style/abstracts/mixins' as m;

.notification {
  z-index: 4000;
  overflow-y: scroll;
  position: fixed;
  right: 0;
  bottom: 0;
  height: 100svh;
  width: 100%;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  background-color: var(--color-black-3);
  display: grid;
  grid-template-areas:
    'header'
    'filter'
    'list';
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, min-content) 1fr;
  gap: 2rem;
  @include m.lg {
    width: 30%;
    min-width: 40rem;
  }

  &__header {
    padding: 2rem;
    grid-area: header;
    background-color: var(--color-black-3);
    display: grid;
    grid-template-areas:
      'title btnMore btnClose'
      'more more more'
      'overview overview overview';

    grid-template-columns: min-content min-content 1fr;
    align-items: center;
    column-gap: 1rem;
    row-gap: 1rem;
    grid-template-rows: min-content 1fr min-content;
  }

  &__btnClose {
    grid-area: btnClose;
    justify-self: flex-end;
    background-color: transparent;
    color: var(--color-white);
    font-family: var(--font-subtext);
    font-weight: bold;
    font-size: 1.8rem;
    transition: color 0.2s;
    &:hover,
    &:active {
      color: var(--color-purple-1);
    }
  }

  &__btnMore {
    justify-self: self-start;
    grid-area: btnMore;
  }

  &__more {
    grid-area: more;
  }

  &__overview {
    grid-area: overview;
  }

  &__title {
    grid-area: title;
    font-size: 1.8rem;
    font-family: var(--font-submenu);
    font-weight: bold;
  }

  &__filter {
    grid-area: filter;
  }

  &__list {
    grid-area: list;
  }
}
</style>
