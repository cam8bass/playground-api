<script setup lang="ts"></script>

<template>
  <div class="navigation">
    <button class="navigation__btn">
      <svg class="navigation__icon">
        <use xlink:href="@/components/icons/sprite.svg#icon-menu"></use>
      </svg>
    </button>
  </div>
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
  }
}
</style>
