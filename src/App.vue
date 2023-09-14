<script setup lang="ts">
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'
</script>

<template>
  <div class="container">
    <TheHeader class="header" />
    <RouterView class="content"></RouterView>
    <TheFooter class="footer" />
  </div>
</template>

<style lang="scss">
@use '@/assets/abstracts/mixins' as m;
@import '@/assets/base.scss';
.container {
  display: grid;
  grid-template-rows: 10vh 1fr min-content;

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
