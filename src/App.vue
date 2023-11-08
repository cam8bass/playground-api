<script setup lang="ts">
import TheHeader from '@/layouts/TheHeader.vue'
import TheFooter from '@/layouts/TheFooter.vue'
import TheLogin from '@/layouts/TheLogin.vue'
import ThePopup from '@/components/common-components/ThePopup.vue'
import TheModal from '@/components/common-components/TheModal.vue'

import { useAppStore, useErrorStore } from './stores'
import TheLoading from '@/components/common-components/TheLoading.vue'

const appStore = useAppStore()
const errorStore = useErrorStore()
</script>

<template>
  <div class="container">
    <Transition name="translateLeft" mode="out-in" appear>
      <TheLogin v-if="appStore.navigation.login" />
    </Transition>

    <TheLoading v-if="appStore.getLoading" />

    <ThePopup />

    <TheHeader class="header" />

    <RouterView v-slot="{ Component, route }" class="content">
      <Transition name="fade" mode="out-in" appear>
        <component
          :is="Component"
          :key="route.fullPath"
          :errors="errorStore.getError"
          v-if="!appStore.getMenu"
        />
      </Transition>
    </RouterView>

    <TheModal />

    <TheFooter class="footer" v-if="!appStore.getMenu" />
  </div>
</template>

<style lang="scss">
@use '@/assets/style/abstracts/mixins' as m;
@import '@/assets/style/base.scss';
@import '@/assets/style/base/animation';
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
