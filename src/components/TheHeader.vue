<script setup lang="ts">
import TheNavigation from '@/components/TheNavigation.vue'
const emits = defineEmits<{
  (e: 'openLogin', status: boolean): void
}>()
</script>

<template>
  <header class="header">
    <div class="header__brand">
      <RouterLink to="/home">
        <img src="@/assets/img/logo.webp" alt="logo playground api" class="header__logo" />
      </RouterLink>
    </div>
    <TheNavigation @openLogin="emits('openLogin', $event)" />
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
  // z-index: 2000;
  &__brand {
    grid-column: 1/2;
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
}
</style>
