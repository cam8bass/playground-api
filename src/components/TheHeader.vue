<script setup lang="ts">
import TheNavigation from '@/components/TheNavigation.vue'
defineProps<{
  menu: boolean
}>()
const emits = defineEmits<{
  (e: 'openLogin', status: boolean): void
  (e: 'openMenu', status: boolean): void
}>()
</script>

<template>
  <header class="header">
    <div class="header__brand">
      <RouterLink to="/home">
        <img src="@/assets/img/logo.webp" alt="logo playground api" class="header__logo" />
      </RouterLink>
    </div>
    <div class="header__navigation">
      <input
        @click="emits('openLogin', false), emits('openMenu', !menu)"
        type="checkbox"
        class="header__navigation-checkbox"
        id="navi-toggle"
        :checked="menu"
      />

      <label for="navi-toggle" class="header__navigation-btn">
        <span class="header__navigation-icon">&nbsp;</span>
      </label>
    </div>

    <TheNavigation
      @openLogin="emits('openLogin', $event)"
      @openMenu="emits('openMenu', $event)"
      :menu="menu"
    />
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

  &__navigation {
    grid-column: 3/-1;
    align-self: center;

    &-checkbox {
      display: none;
    }

    &-btn {
      position: relative;
      background-color: transparent;
      height: 4rem;
      width: 4rem;
      cursor: pointer;
      transition: all 0.2s;
      z-index: 3000;
    }

    &-icon {
      &-link {
        width: 3.3rem;
        height: 3.3rem;
        margin-right: 1rem;
      }
    }

    //ICON
    &-icon {
      position: relative;

      &,
      &::before,
      &::after {
        width: 3rem;
        height: 3px;
        background-color: var(--color-white);
        display: inline-block;
      }

      &::before,
      &::after {
        content: '';
        position: absolute;
        left: 0;
        transition: all 0.2s;
      }

      &::before {
        top: -0.8rem;
      }
      &::after {
        top: 0.8rem;
      }
    }

    &-checkbox:checked + &-btn &-icon {
      background-color: transparent;
      position: fixed;
      right: 2vw;
      top: 5vh;
    }

    &-checkbox:checked + &-btn &-icon::before {
      top: 0;
      transform: rotate(135deg);
    }

    &-checkbox:checked + &-btn &-icon::after {
      top: 0;
      transform: rotate(-135deg);
    }
  }
}
</style>
