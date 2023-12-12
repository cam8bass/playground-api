<script setup lang="ts">
const props = defineProps<{
  showFilterSort: boolean
}>()

const emits = defineEmits<{
  (e: 'updateShowFilterSort'): void
}>()
</script>
<template>
  <!-- 
         * Button component for filtering users based on creation date.
         * @click - Event handler for toggling the visibility of the sort filters.
         * @showFilters.sort - Boolean value indicating whether the sort filters are visible or not. 
        -->
  <button
    class="btnFilter"
    @click="emits('updateShowFilterSort')"
    aria-label="Afficher le filtre de trie"
    title="Afficher le filtre de trie"
  >
    <span for="sort" class="btnFilter__text">
      Date de création :
      <svg class="btnFilter__icon">
        <use
          v-if="props.showFilterSort"
          xlink:href="@/components/icons/sprite.svg#icon-chevron-small-up"
        ></use>
        <use v-else xlink:href="@/components/icons/sprite.svg#icon-chevron-small-down"></use>
      </svg>
    </span>
  </button>
</template>
<style lang="scss" scoped></style>
