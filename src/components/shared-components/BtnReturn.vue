<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>
<template>
  <button type="button" class="btnReturn" @click="router.back()">
    <svg class="btnReturn__icon">
      <use xlink:href="@/components/icons/sprite.svg#icon-arrow-left-circle"></use>
    </svg>

    Retour
  </button>
</template>
<style lang="scss" scoped>
.btnReturn {
  font-family: var(--font-subtitle);
  font-weight: 400;
  transition: color 0.4s;
  background-color: transparent;
  display: flex;
  align-items: center;
  column-gap: 1rem;
  color: var(--color-white);
  font-size: 1.6rem;

  &__icon {
    transition: fill 0.4s;
    fill: var(--color-white);
    height: 3rem;
    width: 3rem;
  }

  &:hover,
  &:active {
    color: var(--color-purple-1);
  }

  &:hover &__icon,
  &:active &__icon {
    fill: var(--color-purple-1);
  }
}
</style>
