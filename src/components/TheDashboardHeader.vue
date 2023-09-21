<script setup lang="ts"></script>
<template>
  <div class="dashboardHeader">
    <ul class="dashboardHeader-list">
      <li class="dashboardHeader-item">
        <RouterLink to="/dashboard" class="dashboardHeader-btn">
          <svg class="dashboardHeader-icon" aria-label="Retour au tableau de bord">
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

      <li class="dashboardHeader-item">
        <RouterLink to="/users" class="dashboardHeader-btn">
          <svg class="dashboardHeader-icon" aria-label="Accéder à la liste des utilisateurs">
            <use
              xlink:href="@/components/icons/sprite.svg#icon-group"
              fill="url(#iconGradient)"
            ></use>
          </svg>
        </RouterLink>
      </li>

      <li class="dashboardHeader-item">
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
        <RouterLink to="/logout" class="dashboardHeader-btn">
          <svg class="dashboardHeader-icon" aria-label="Se déconnecter">
            <use
              xlink:href="@/components/icons/sprite.svg#icon-exit"
              fill="url(#iconGradient)"
            ></use>
          </svg>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>
<style scoped lang="scss">
@use '@/assets/abstracts/mixins' as m;
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
    @include m.xl {
      width: 3.5rem;
      height: 3.5rem;
    }
  }
}
</style>
