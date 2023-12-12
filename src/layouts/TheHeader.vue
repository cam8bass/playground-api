<script setup lang="ts">
import TheNavigation from '@/layouts/TheNavigation.vue'
import { useAppStore, useCurrentUserStore } from '@/stores'

const appStore = useAppStore()
const currentUserStore = useCurrentUserStore()
</script>

<template>
  <header class="header">
    <div class="header__brand">
      <RouterLink class="header__brand-link" to="/home" title="Retour à la page home">
        <img src="@/assets/img/logo.webp" alt="logo playground api" class="header__logo" />
      </RouterLink>
    </div>

    <RouterLink v-if="currentUserStore.getCurrentUser" class="header__account" to="/dashboard"
      >Mon compte</RouterLink
    >

    <div class="header__navigation">
      <input
        @click="appStore.updateLogin(false), appStore.updateMenu(!appStore.getMenu)"
        type="checkbox"
        class="header__navigation-checkbox"
        id="navi-toggle"
        :checked="appStore.getMenu"
      />

      <label for="navi-toggle" class="header__navigation-btn">
        <span class="header__navigation-icon">&nbsp;</span>
      </label>
    </div>

    <TheNavigation />
  </header>
</template>

<style scoped lang="scss">
@use '@/assets/style/abstracts/mixins' as m;
@import '@/assets/style/abstracts/debug';
.header {
  background-color: var(--color-black-3);
  box-shadow: var(--boxshadow-black);
  display: grid;
  grid-template-columns: min-content 1fr min-content;
  align-items: center;
  column-gap: 2rem;

  &__brand {
    grid-column: 1/2;

    &-link {
      display: flex;
    }
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

  &__account {
    grid-column: 2/3;
    color: var(--color-white);
    font-family: var(--font-subtitle);
    justify-self: end;
    transition: color 0.4s;

    &:hover,
    &:active {
      color: var(--color-purple-1);
    }
  }

  &__navigation {
    grid-column: 3/-1;

    &-checkbox {
      display: none;
    }

    &-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      background-color: transparent;
      height: 4rem;
      width: 4rem;
      cursor: pointer;
      transition: all 0.2s;
      z-index: 3000;
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
