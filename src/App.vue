<script setup lang="ts">
import TheHeader from '@/layouts/TheHeader.vue'
import TheFooter from '@/layouts/TheFooter.vue'
import TheLogin from '@/layouts/TheLogin.vue'
import ThePopup from '@/components/common-components/ThePopup.vue'
import TheModal from '@/components/common-components/TheModal.vue'
import TheLoading from '@/components/common-components/TheLoading.vue'
import { initStore } from '@/shared/utils'
import { resetPopup, updateReadNotification, deleteSelectedNotification } from './stores/utilities'

const stores = initStore('appStore', 'userStore', 'errorStore')
</script>

<template>
  <div class="container" v-if="stores.appStore && stores.userStore && stores.errorStore">
    <TheLoading v-if="stores.appStore.getLoading" />

    <Transition name="translateLeft" mode="out-in" appear>
      <TheLogin v-if="stores.appStore.getNavigation.login" />
    </Transition>

    <ThePopup
      :notification-app="stores.appStore.getNotificationAppMessage"
      :popup="stores.appStore.getNavigation.popup"
      :isLoggedIn="stores.userStore.isLoggedIn"
      @close-popup="resetPopup()"
      @delete-selected-notification="deleteSelectedNotification($event)"
      @update-notification="updateReadNotification($event)"
    />

    <TheHeader class="header" />

    <RouterView v-slot="{ Component, route }">
      <Transition name="fade" mode="out-in" appear>
        <component
          class="content"
          :is="Component"
          :key="route.fullPath"
          :errors="stores.errorStore.getError"
          v-if="!stores.appStore.getNavigation.menu"
        />
      </Transition>
    </RouterView>

    <TheModal v-if="stores.appStore.getModal" />

    <TheFooter class="footer" v-if="!stores.appStore.getNavigation.menu" />
  </div>
</template>

<style lang="scss">
@use '@/assets/style/abstracts/mixins' as m;
@import '@/assets/style/main.scss';

.container {
  display: grid;
  grid-template-rows: minmax(min-content, 10vh) minmax(80vh, 1fr) minmax(min-content, 10vh);
  min-height: 100vh;
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
