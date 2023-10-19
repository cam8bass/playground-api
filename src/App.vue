<script setup lang="ts">
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'
import TheLogin from './components/TheLogin.vue'
import ThePopup from './components/ThePopup.vue'
import TheModal from './components/TheModal.vue'
import { useAppStore, useErrorStore, useUserStore } from './stores'
import TheLoading from './components/TheLoading.vue'
import router from './router/router'
import type { modalType } from './shared/types/types'

const userStore = useUserStore()
const appStore = useAppStore()
const errorStore = useErrorStore()

function updateLogin(status: boolean): void {
  appStore.updateLogin(status)
}

function updateOpenMenu(status: boolean): void {
  appStore.updateMenu(status)
}

function closePopup(): void {
  appStore.updatePopup(false)
  appStore.resetNotification()
}

function cancelModal(): void {
  appStore.resetModal()
}

async function logout(): Promise<void> {
  await userStore.fetchLogout()
  appStore.resetModal()
  router.push('/home')
}

async function fetchRequestChangeEmail(): Promise<void> {
  await userStore.fetchChangeEmailRequest()
  appStore.resetModal()
}

function updateModal(modal: { type: modalType | null; title: string; message: string }): void {
  appStore.updateModal(modal.type, modal.title, modal.message)
}
</script>

<template>
  <div class="container">
    <Transition name="translateLeft" mode="out-in" appear>
      <TheLogin
        v-if="appStore.navigation.login"
        :errors="errorStore.getError"
        @openLogin="updateLogin"
      />
    </Transition>

    <TheLoading v-if="appStore.getLoading" />

    <ThePopup @cancel="closePopup" :notification="appStore.getNotificationMessage" />

    <TheHeader
      class="header"
      @openLogin="updateLogin"
      @openMenu="updateOpenMenu"
      @cancel="cancelModal"
      @logout="updateModal"
      :menu="appStore.getMenu"
      :user="userStore.getCurrentUser"
      :modal="appStore.getModal"
    />

    <RouterView v-slot="{ Component, route }" class="content">
      <Transition name="fade">
        <component
          :is="Component"
          :key="route.fullPath"
          :errors="errorStore.getError"
          @openLogin="updateLogin"
          @cancel="cancelModal"
          @logout="updateModal"
          @request-change-email="updateModal"
          v-if="!appStore.getMenu"
        />
      </Transition>
    </RouterView>
    <TheModal
      :modal="appStore.getModal"
      @cancel="cancelModal"
      @logout="logout"
      @request-change-email="fetchRequestChangeEmail"
    />
    <TheFooter class="footer" v-if="!appStore.getMenu" />
  </div>
</template>

<style lang="scss">
@use '@/assets/abstracts/mixins' as m;
@import '@/assets/base.scss';
@import '@/assets/base/animation';
.container {
  display: grid;
  grid-template-rows: min-content 1fr min-content;
  min-height: 100vh; // TODO: a voir
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
