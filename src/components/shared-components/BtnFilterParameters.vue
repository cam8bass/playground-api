<script setup lang="ts">
const props = defineProps<{
  showFilterParameters: boolean
}>()

const emits = defineEmits<{
  (e: 'updateShowFilterParameters'): void
}>()
</script>
<template>
  <button
    class="btnFilter"
    @click="emits('updateShowFilterParameters')"
    aria-label="Afficher le filtre des critères"
    title="Afficher le filtre des critères"
  >
    <span for="sort" class="btnFilter__text">
      Critère :
      <svg class="btnFilter__icon">
        <use
          v-if="props.showFilterParameters"
          xlink:href="@/components/icons/sprite.svg#icon-chevron-small-up"
        ></use>
        <use v-else xlink:href="@/components/icons/sprite.svg#icon-chevron-small-down"></use>
      </svg>
    </span>
  </button>
</template>
<style lang="scss" scoped></style>
