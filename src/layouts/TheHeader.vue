<script setup lang="ts">
import TheNavigation from '@/layouts/TheNavigation.vue'
import TheNotification from '@/components/common-components/notification/TheNotification.vue'
import BtnNotification from '@/components/shared-components/BtnNotification.vue'
import BtnMenu from '@/components/shared-components/BtnMenu.vue'
import { initStore } from '@/shared/utils'
import {
  updateModal,
  updateNavigation,
  updateReadNotification,
  deleteSelectedNotification,
  resetModal,
  updateShow
} from '@/stores/utilities'
import type { FilterAppInterface } from '@/shared/interfaces'

const { appStore, userStore } = initStore('appStore', 'userStore')

/**
 * Updates the filter of the notifications
 * @param filter the new filter to apply
 * @return {void} void
 */
function updateFilterNotification(filter: Partial<FilterAppInterface>): void {
  if (!userStore) return
  userStore.updateFilter({ notification: filter.notification })
}

/**
 * Updates all the notifications of the user
 * @return {Promise<void>} Promise(void)
 */
async function updateAllNoticationsUser(): Promise<void> {
  if (!userStore) return
  await userStore.fetchUpdateAllNotificationsUser()
}
</script>

<template>
  <header class="header" v-if="appStore && userStore">
    <div class="header__brand">
      <RouterLink class="header__brand-link" to="/home" title="Retour à la page home">
        <img src="@/assets/img/logo.webp" alt="logo playground api" class="header__logo" />
      </RouterLink>
    </div>
    <div class="header__content">
      <BtnNotification
        v-if="userStore.isLoggedIn"
        :unreadNotificationCount="userStore.getUnreadNotificationsCount"
        @updateNavigation="updateNavigation($event)"
      />

      <Transition name="translateLeft" mode="out-in" appear>
        <TheNotification
          v-if="appStore.getNavigation.notification"
          :showMore="appStore.getShow.notificationMore"
          :notifications="userStore.getUserNotifications"
          :idNotification="userStore.getNotificationId"
          :filterNotification="userStore.getFilterNotification"
          :totalNotifications="userStore.getTotalNotificationsCount"
          :totalUnreadNotifications="userStore.getUnreadNotificationsCount"
          :totalReadNotifications="userStore.getReadNotificationsCount"
          :modal="appStore.getModal"
          @updateNavigation="updateNavigation($event)"
          @update-read-notification="updateReadNotification($event)"
          @delete-selected-notification="deleteSelectedNotification($event)"
          @get-user-notifications="updateFilterNotification($event)"
          @update-all-notications-user="updateAllNoticationsUser"
          @reset-modal="resetModal"
          @update-modal="updateModal($event)"
          @update-show="updateShow($event)"
        />
      </Transition>

      <RouterLink
        v-if="userStore.isLoggedIn"
        class="header__account"
        to="/dashboard"
        title="Mon compte"
        aria-label="Mon compte"
      >
        <svg class="header__account-icon">
          <use xlink:href="@/components/icons/sprite.svg#icon-user-circle-o"></use>
        </svg>
      </RouterLink>

      <BtnMenu
        :openMenu="appStore.getNavigation.menu"
        @updateNavigation="updateNavigation($event)"
      />
      <Teleport to="body" :disabled="appStore.getNavigation.menu">
        <Transition mode="out-in" name="translateLeft">
          <TheNavigation
            v-if="appStore.getNavigation.menu"
            :modal="appStore.getModal"
            :isLoggedIn="userStore.isLoggedIn"
            @updateNavigation="updateNavigation($event)"
            @update-modal="updateModal($event)"
            @reset-modal="resetModal"
          />
        </Transition>
      </Teleport>
    </div>
  </header>
</template>

<style scoped lang="scss">
@use '@/assets/style/abstracts/mixins' as m;
@import '@/assets/style/abstracts/debug';
.header {
  background-color: var(--color-black-3);
  box-shadow: var(--boxshadow-black);
  display: grid;
  grid-template-columns: min-content 1fr;
  column-gap: 2rem;

  &__brand {
    grid-column: 1/2;

    &-link {
      display: flex;
    }
  }

  &__content {
    grid-column: 2/-1;

    justify-self: flex-end;
    display: flex;
    align-items: center;
    column-gap: 2rem;
  }

  &__logo {
    width: 15rem;

    @include m.md {
      width: 18rem;
    }

    @include m.xl {
      width: 20rem;
    }
  }

  &__account {
    display: flex;
    &:hover &-icon,
    &:active &-icon {
      fill: var(--color-purple-1);
    }

    &-icon {
      width: 2.5rem;
      height: 2.5rem;
      @include m.lg {
        width: 3rem;
        height: 3rem;
      }
      fill: var(--color-white);
      transition: fill 0.2s;
    }
  }
}
</style>
