<script setup lang="ts">
const emits = defineEmits<{
  (e: 'closeComponent'): void
}>()
</script>
<template>
  <button
    type="button"
    title="Cliquez pour fermer"
    aria-label="Cliquez pour fermer"
    class="btnClose"
    @click="emits('closeComponent')"
  >
    <svg class="btnClose__icon">
      <use xlink:href="@/components/icons/sprite.svg#icon-cross"></use>
    </svg>
  </button>
</template>
<style lang="scss" scoped>
.btnClose {
  background-color: transparent;
  &:hover &__icon,
  &:active &__icon {
    fill: var(--color-purple-1);
  }
  &__icon {
    transition: fill 0.2s;
    width: 2rem;
    height: 2rem;
    fill: var(--color-white);
  }
}
</style>
