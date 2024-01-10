<script setup lang="ts">
const props = defineProps<{
  currentPage: number
  totalPages: number
}>()

const emits = defineEmits<{
  (e: 'nextPage'): void
  (e: 'prevPage'): void
}>()

</script>
<template>
  <div class="pagination">
    <!-- Button preview -->
    <button :disabled="props.currentPage === 1" class="pagination__btn" @click="emits('prevPage')">
      <svg class="pagination__icon" :class="props.currentPage === 1 ? 'btn-disable' : ''">
        <use xlink:href="@/components/icons/sprite.svg#icon-arrow-left-circle"></use>
      </svg>
    </button>

    <!-- Current page -->
    <p class="pagination__text">
      Page <span class="pagination__text-number">{{ props.currentPage }}</span> sur
      <span class="pagination__text-number">{{ props.totalPages }}</span>
    </p>

    <!-- Button next -->
    <button
      :disabled="props.currentPage >= props.totalPages"
      class="pagination__btn"
      @click="emits('nextPage')"
    >
      <svg
        class="pagination__icon"
        :class="props.currentPage >= props.totalPages ? 'btn-disable' : ''"
      >
        <use xlink:href="@/components/icons/sprite.svg#icon-arrow-right-circle"></use>
      </svg>
    </button>
  </div>
</template>
<style lang="scss" scoped>
.pagination {
  grid-row: 2/-1;
  align-self: flex-end;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 2rem 0;
  background-color: var(--color-black-2);

  &__btn {
    background-color: transparent;
    cursor: pointer;
  }

  &__icon {
    width: 3.5rem;
    height: 3.5rem;
    fill: var(--color-white);
    transition: fill 0.2s;
    &:hover,
    &:active {
      fill: var(--color-purple-1);
    }
  }

  &__text {
    font-size: 1.6rem;
    font-family: var(--font-subtext);

    &-number {
      &:first-of-type {
        color: var(--color-purple-1);
      }
    }
  }
}
</style>
