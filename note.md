<script setup lang="ts"></script>

<template>
  <nav class="navigation">
    <button class="navigation__btn">
      <svg class="navigation__icon">
        <use xlink:href="@/components/icons/sprite.svg#icon-menu"></use>
      </svg>
    </button>
  </nav>
</template>

<style scoped lang="scss">
.navigation {
  grid-column: 3/-1;
  align-self: center;

  &__btn {
    background-color: transparent;
  }

  &__icon {
    width: 4rem;
    height: 4rem;
    fill: var(--color-white);
    transition: all 0.2s;
    &:hover,
    &:active {
      fill: var(--color-purple-1);
    }
  }
}
</style>
