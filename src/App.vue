<script setup lang="ts">
import TheHeader from '@/layouts/TheHeader.vue'
import TheFooter from '@/layouts/TheFooter.vue'
import TheLogin from '@/layouts/TheLogin.vue'
import TheModal from '@/components/common-components/TheModal.vue'
import TheLoading from '@/components/common-components/TheLoading.vue'
import ThePopupList from './components/common-components/popUp/ThePopupList.vue'
import TheModalError from './components/common-components/error/TheModalError.vue'
import ThePopupError from './components/common-components/error/ThePopupError.vue'
import { initStore } from '@/shared/utils'
import {
  closeSelectedPopup,
  updateReadNotification,
  deleteSelectedNotification,
  updateViewNotification
} from './stores/utilities'
import type { AppErrorInterface } from './shared/interfaces'

const stores = initStore('appStore', 'userStore', 'errorStore')

function deleteSelectedError(error: AppErrorInterface): void {
  //  TODO:  Es ce que je la journalise ?
  stores.errorStore.deleteSelectedError(error)
}
</script>

<template>
  <div class="container" v-if="stores.appStore && stores.userStore && stores.errorStore">
    <TheLoading v-if="stores.appStore.getLoading" />

    <Transition name="translateLeft" mode="out-in" appear>
      <TheLogin v-if="stores.appStore.getNavigation.login" />
    </Transition>

    <ThePopupList
      :notification-app="stores.appStore.getNotificationAppMessage"
      :popup="stores.appStore.getNavigation.popup"
      :isLoggedIn="stores.userStore.isLoggedIn"
      @close-popup="closeSelectedPopup($event)"
      @delete-selected-notification="deleteSelectedNotification($event)"
      @update-notification="updateReadNotification($event)"
      @auto-close-popup="updateViewNotification($event), closeSelectedPopup($event)"
      @update-view-notification="updateViewNotification($event)"
    />

    <TheHeader class="header" />

    <RouterView v-slot="{ Component, route }">
      <Transition name="fade" mode="out-in" appear>
        <component
          class="content"
          :is="Component"
          :key="route.fullPath"
          :errors="stores.errorStore.getLastInfoError"
          v-if="!stores.appStore.getNavigation.menu"
        />
      </Transition>
    </RouterView>

    <TheModal v-if="stores.appStore.getModal" />

    <Transition name="fade" mode="out-in">
      <TheModalError
        v-if="stores.errorStore.getLastCriticalError"
        :criticalError="stores.errorStore.getLastCriticalError"
        @close-modal-error="deleteSelectedError($event)"
      />
    </Transition>

    <Transition name="translateUp" mode="out-in">
      <ThePopupError
        v-if="stores.errorStore.getLastWarningError"
        :warningError="stores.errorStore.getLastWarningError"
        @close-popup-error="deleteSelectedError($event)"
      />
    </Transition>

    <TheFooter class="footer" v-if="!stores.appStore.getNavigation.menu" />
  </div>
</template>

<style lang="scss">
@use '@/assets/style/abstracts/mixins' as m;
@import '@/assets/style/main.scss';

.container {
  display: grid;
  grid-template-rows: minmax(min-content, 10vh) minmax(80vh, 1fr) minmax(min-content, 10vh);
  min-height: 100svh;
  overflow: auto;
}

.content {
  position: relative;
}

.header,
.footer {
  padding: 2rem;
  @include m.xl {
    padding: 2rem 3rem;
  }
}
</style>
