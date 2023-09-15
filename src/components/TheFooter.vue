<script setup lang="ts"></script>

<template>
  <footer class="footer">
    <img src="@/assets/img/logo.webp" alt="logo playground api" class="footer__logo" />
  </footer>
</template>

<style scoped lang="scss">
@use '@/assets/abstracts/mixins' as m;
@import '@/assets/abstracts/debug';
.footer {
  display: flex;
  justify-content: center;
  background-color: var(--color-black-1);
  &__logo {
    width: 15rem;

    @include m.md {
      width: 18rem;
    }

    @include m.xl {
      width: 20rem;
    }
  }
}
</style>
