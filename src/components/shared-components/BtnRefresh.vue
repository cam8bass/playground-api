<script setup lang="ts">
const emits = defineEmits<{
  (e: 'resetFetchAdminGetAllUsers'): void
}>()
</script>
<template>
  <button
    class="refresh"
    aria-label="Actualiser"
    title="Actualiser"
    @click="emits('resetFetchAdminGetAllUsers')"
  >
    <svg class="refresh__icon">
      <use xlink:href="@/components/icons/sprite.svg#icon-loop2"></use>
    </svg>
  </button>
</template>
<style lang="scss" scoped>
.refresh {
  background-color: transparent;

  &__icon {
    width: 2.5rem;
    height: 2.5rem;
    fill: var(--color-purple-1);
    transition: fill 0.2s;
    &:hover,
    &:active {
      fill: var(--color-purple-2);
    }
  }
}
</style>
