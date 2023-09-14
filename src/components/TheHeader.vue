<script setup lang="ts">
import TheNavigation from '@/components/TheNavigation.vue'
</script>

<template>
  <header class="header">
    <div class="header_brand">
      <RouterLink to="/home">
        <img src="@/assets/img/logo.svg" alt="logo playground api" class="header__logo" />
      </RouterLink>
    </div>
    <TheNavigation />
  </header>
</template>

<style scoped lang="scss">
@use '@/assets/abstracts/mixins' as m;
@import '@/assets/abstracts/debug';
.header {
  background-color: var(--color-black-3);
  box-shadow: var(--boxshadow-black);
  display: grid;
  grid-template-columns: min-content 1fr min-content;
  align-content: center;

  &__logo {
    grid-column: 1/2;
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
