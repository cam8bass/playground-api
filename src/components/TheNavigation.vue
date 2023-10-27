<script setup lang="ts">
import type { modalInterface, userInterface } from '@/shared/interfaces'
import type { modalType } from '@/shared/types/types'

defineProps<{
  menu: boolean
  user: userInterface | null
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
  <Teleport to="body" :disabled="!menu">
    <Transition mode="out-in" name="translateLeft">
      <div class="navigation" v-if="menu">
        <div class="navigation__header">
          <span class="navigation__header-title">Playground @pi</span>
          <a href="mailto:test@email.com" class="navigation__header-link">
            <svg class="navigation__header-icon">
              <use xlink:href="@/components/icons/sprite.svg#icon-mail-envelope-closed"></use>
            </svg>
          </a>
          <span class="navigation__header-line">&nbsp;</span>
        </div>

        <nav class="navigation__nav">
          <ul class="navigation__nav-list">
            <li class="navigation__nav-item">
              <RouterLink
                @click="emits('openMenu', false)"
                to="/home#intro"
                class="navigation__nav-link navigation__nav-link--main"
                >Home</RouterLink
              >
            </li>

            <li class="navigation__nav-item">
              <RouterLink
                @click="emits('openMenu', false)"
                to="/home#discover"
                class="navigation__nav-link"
                >Pratiquez en Conditions Réelles</RouterLink
              >
            </li>

            <li class="navigation__nav-item">
              <RouterLink
                @click="emits('openMenu', false)"
                to="/home#explore"
                class="navigation__nav-link"
                >Explorez, Apprenez, Créez</RouterLink
              >
            </li>

            <li class="navigation__nav-item">
              <RouterLink
                @click="emits('openMenu', false)"
                to="/home#access"
                class="navigation__nav-link"
                >Simple et accessible</RouterLink
              >
            </li>

            <li class="navigation__nav-item">
              <RouterLink
                @click="emits('openMenu', false)"
                to="/home#achieve"
                class="navigation__nav-link"
                >Partagez Vos Réalisations</RouterLink
              >
            </li>
          </ul>

          <ul class="navigation__nav-list">
            <li class="navigation__nav-item">
              <RouterLink
                @click="emits('openMenu', false)"
                to="/apis"
                class="navigation__nav-link navigation__nav-link--main"
                >Apis</RouterLink
              >
            </li>

            <li class="navigation__nav-item">
              <RouterLink to="" class="navigation__nav-link">Api-travel</RouterLink>
            </li>

            <li class="navigation__nav-item">
              <RouterLink to="" class="navigation__nav-link">Api-test-1</RouterLink>
            </li>

            <li class="navigation__nav-item">
              <RouterLink to="" class="navigation__nav-link">Api-test-2</RouterLink>
            </li>

            <li class="navigation__nav-item">
              <RouterLink to="" class="navigation__nav-link">Api-test-3</RouterLink>
            </li>
          </ul>

          <ul class="navigation__nav-list">
            <li class="navigation__nav-item">
              <RouterLink
                @click="emits('openMenu', false)"
                to="/documentation"
                class="navigation__nav-link navigation__nav-link--main"
                >Documentation</RouterLink
              >
            </li>

            <li class="navigation__nav-item">
              <RouterLink to="" class="navigation__nav-link">Doc Api-travel</RouterLink>
            </li>

            <li class="navigation__nav-item">
              <RouterLink to="" class="navigation__nav-link">Doc Api-test-1</RouterLink>
            </li>

            <li class="navigation__nav-item">
              <RouterLink to="" class="navigation__nav-link">Doc Api-test-2</RouterLink>
            </li>

            <li class="navigation__nav-item">
              <RouterLink to="" class="navigation__nav-link">Doc Api-test-3</RouterLink>
            </li>
          </ul>
        </nav>

        <div class="navigation__auth">
          <RouterLink @click="emits('openMenu', false)" to="/signup" class="btn"
            >Inscription</RouterLink
          >
          <button
            v-if="!user"
            type="button"
            @click="emits('openMenu', false), emits('openLogin', true)"
            class="btn navigation__auth-btn"
          >
            Connexion
          </button>

          <button
            v-else
            type="button"
            @click="
              emits('openMenu', false),
                !modal
                  ? emits('logout', {
                      type: 'logout',
                      title: 'Deconnection',
                      message: 'vous déconnecter ?'
                    })
                  : modal && modal.type === 'logout'
                  ? emits('cancel')
                  : ''
            "
            class="btn navigation__auth-btn"
          >
            Deconnexion
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
@use '@/assets/abstracts/mixins' as m;
@import '@/assets/base/animation';
.navigation {
  width: 100%;
  height: 100vh;
  position: fixed;
  overflow-y: scroll;
  top: 0;
  left: 0;
  display: grid;
  grid-template-rows: 1fr 2fr 1fr;
  row-gap: 2rem;
  align-items: center;

  background-color: var(--color-black-2);
  backdrop-filter: blur(5px);

  @include m.xl {
    grid-template-columns: 2fr 1fr;
    grid-template-rows: repeat(2, 1fr);
  }

  &__header {
    display: flex;
    flex-direction: column;

    @include m.xl {
      grid-row: 1/2;
      grid-column: 1/2;
      align-self: flex-end;
    }

    &-title {
      align-self: center;
      font-family: var(--font-subtitle);
      font-weight: 100;
      font-size: 2.5rem;

      @include m.xl {
        font-size: 3.5rem;
      }
    }

    &-link {
      align-self: center;
    }

    &-icon {
      cursor: pointer;
      height: 4rem;
      width: 4rem;
      fill: var(--color-white);
      transition: fill 0.4s;

      @include m.xl {
        height: 5rem;
        width: 5rem;
        margin-bottom: 4rem;
      }

      &:hover,
      &:active {
        fill: var(--color-purple-1);
      }
    }

    &-line {
      align-self: center;
      height: 0.1rem;
      width: 80%;
      background-color: var(--color-white);
    }
  }

  &__nav {
    justify-self: center;
    padding: 2rem;
    @include m.xl {
      grid-row: 2/-1;
      grid-column: 1/2;
      align-self: flex-start;
      justify-items: center;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
    }
    &-list {
      &:not(:first-of-type) {
        margin-top: 2rem;

        @include m.xl {
          margin-top: 0;
          margin-left: 4rem;
        }
      }
    }

    &-item {
      &:not(:last-of-type) {
        margin-bottom: 1rem;
      }
    }

    &-link {
      font-family: var(--font-submenu);
      text-decoration: none;
      color: var(--color-white);
      transition: all 0.4s;
      @include m.xl {
        font-size: 1.8rem;
      }

      &--main {
        font-family: var(--font-subtitle);
        font-weight: 400;
        font-size: 2rem;

        @include m.xl {
          font-size: 3.5rem;
        }
      }

      &:hover,
      &active {
        color: var(--color-purple-1);
      }
    }
  }

  &__auth {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color-black-3);
    height: 100%;
    padding: 2rem;

    @include m.xl {
      grid-column: 2/-1;
      grid-row: 1/-1;
    }
    &-btn {
      margin-left: 2rem;
    }
  }
}
</style>
