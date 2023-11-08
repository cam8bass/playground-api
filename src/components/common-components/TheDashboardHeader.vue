<script setup lang="ts">
import { useAppStore, useCurrentUserStore } from '@/stores'

const appStore = useAppStore()
const currentUserStore = useCurrentUserStore()
</script>
<template>
  <div class="dashboardHeader" v-if="currentUserStore.getCurrentUser">
    <ul class="dashboardHeader-list">
      <li class="dashboardHeader-item">
        <RouterLink to="/home" class="dashboardHeader-btn">
          <svg class="dashboardHeader-icon" aria-label="Retour à la page home">
            <defs>
              <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color: var(--color-icon-1)" />
                <stop offset="100%" style="stop-color: var(--color-icon-2)" />
              </linearGradient>
            </defs>
            <use
              xlink:href="@/components/icons/sprite.svg#icon-home"
              fill="url(#iconGradient)"
            ></use>
          </svg>
        </RouterLink>
      </li>

      <li class="dashboardHeader-item">
        <RouterLink to="/myProfile" class="dashboardHeader-btn">
          <svg class="dashboardHeader-icon" aria-label="Voir votre profil personnel">
            <use
              xlink:href="@/components/icons/sprite.svg#icon-user-circle-o"
              fill="url(#iconGradient)"
            ></use>
          </svg>
        </RouterLink>
      </li>

      <li class="dashboardHeader-item" v-if="currentUserStore.getCurrentUser.role === 'user'">
        <RouterLink to="/myApikeys" class="dashboardHeader-btn">
          <svg class="dashboardHeader-icon" aria-label="Accéder à mes clés d'API">
            <use
              xlink:href="@/components/icons/sprite.svg#icon-key"
              fill="url(#iconGradient)"
            ></use>
          </svg>
        </RouterLink>
      </li>

      <li class="dashboardHeader-item" v-if="currentUserStore.getCurrentUser.role === 'admin'">
        <RouterLink to="/users" class="dashboardHeader-btn">
          <svg class="dashboardHeader-icon" aria-label="Accéder à la liste des utilisateurs">
            <use
              xlink:href="@/components/icons/sprite.svg#icon-group"
              fill="url(#iconGradient)"
            ></use>
          </svg>
        </RouterLink>
      </li>

      <li class="dashboardHeader-item" v-if="currentUserStore.getCurrentUser.role === 'admin'">
        <RouterLink to="/apiKeys" class="dashboardHeader-btn">
          <svg class="dashboardHeader-icon" aria-label="Accéder à la liste des clés d'API">
            <use
              xlink:href="@/components/icons/sprite.svg#icon-key"
              fill="url(#iconGradient)"
            ></use>
          </svg>
        </RouterLink>
      </li>

      <li class="dashboardHeader-item">
        <button
          type="button"
          class="dashboardHeader-btn"
          @click="
            !appStore.getModal
              ? appStore.updateModal({
                  type: 'logout',
                  title: 'Deconnection',
                  message: 'vous déconnecter ?'
                })
              : appStore.getModal && appStore.getModal.type === 'logout'
              ? appStore.resetModal
              : ''
          "
        >
          <svg class="dashboardHeader-icon" aria-label="Se déconnecter">
            <use
              xlink:href="@/components/icons/sprite.svg#icon-exit"
              fill="url(#iconGradient)"
            ></use>
          </svg>
        </button>
      </li>
    </ul>
  </div>
</template>
<style scoped lang="scss">
@use '@/assets/style/abstracts/mixins' as m;
.dashboardHeader {
  position: relative;
  background-image: linear-gradient(
    to bottom,
    var(--background-color-secondary-1),
    var(--color-black-2)
  );
  box-shadow: var(--boxshadow-black);
  padding: 1rem 0;

  @include m.xl {
    padding: 0 1rem;
  }

  &-list {
    display: flex;
    justify-content: space-around;
    align-items: center;
    @include m.xl {
      height: 100%;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;
    }
  }

  &-item {
  }

  &-btn {
    background-color: transparent;
  }

  &-icon {
    width: 3rem;
    height: 3rem;
    transition: transform 0.4s;
    &:hover,
    &:active {
      transform: scale(1.1);
    }
    @include m.xl {
      width: 3.5rem;
      height: 3.5rem;
    }
  }
}
</style>
