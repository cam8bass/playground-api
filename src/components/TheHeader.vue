<script setup lang="ts">
import TheNavigation from '@/components/TheNavigation.vue'
import type {
  modalInterface,
  userBasicInfoInterface,
  userCompleteInfoInterface
} from '@/shared/interfaces'
import type { modalType } from '@/shared/types/types'

defineProps<{
  menu: boolean
  user: userBasicInfoInterface | userCompleteInfoInterface | null
  modal: modalInterface | null
}>()
const emits = defineEmits<{
  (e: 'openLogin', status: boolean): void
  (e: 'openMenu', status: boolean): void
  (e: 'logout', modal: { type: modalType; title: string; message: string }): void
  (e: 'cancel'): void
}>()
</script>

<template>
  <header class="header">
    <div class="header__brand">
      <RouterLink class="header__brand-link" to="/home">
        <img src="@/assets/img/logo.webp" alt="logo playground api" class="header__logo" />
      </RouterLink>
    </div>

    <RouterLink v-if="user" class="header__account" to="/dashboard">Mon compte</RouterLink>

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
      @cancel="emits('cancel')"
      @logout="emits('logout', $event)"
      :menu="menu"
      :user="user"
      :modal="modal"
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
    // align-self: center;
    justify-self: end;
    transition: color 0.4s;

    &:hover,
    &:active {
      color: var(--color-purple-1);
    }
  }

  &__navigation {
    grid-column: 3/-1;
    // align-self: center;

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
