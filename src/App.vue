<script setup lang="ts">
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'
import TheLogin from './components/TheLogin.vue'
import { reactive } from 'vue'

const navigation = reactive<{
  login: boolean
  menu: boolean
}>({
  login: false,
  menu: false
})

function updateOpenLogin(status: boolean): void {
  navigation.login = status
}
</script>

<template>
  <div class="container">
    <TheHeader class="header" @open-login="updateOpenLogin" />
    <RouterView class="content" @openLogin="updateOpenLogin"> </RouterView>
    <TheLogin @openLogin="updateOpenLogin" :openLogin="navigation.login" />
    <TheFooter class="footer" />
  </div>
</template>

<style lang="scss">
@use '@/assets/abstracts/mixins' as m;
@import '@/assets/base.scss';
.container {
  display: grid;
  grid-template-rows: min-content 1fr min-content;
}

.content {
  position: relative;
  min-height: 80vh; // TODO: A voir
}

.header,
.footer {
  padding: 2rem;
  @include m.xl {
    padding: 2rem 3rem;
  }
}
</style>
