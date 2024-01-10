<script setup lang="ts">
import { initStore } from '@/shared/utils'
import { nextPage, previousPage } from '@/stores/utilities'
const store = initStore('usersStore')
</script>
<template>
  <div class="pagination" v-if="store.usersStore && store.usersStore.getTotalPages !== 1">
    <!-- Button preview -->
    <button
      :disabled="store.usersStore.getCurrentPage === 1"
      class="pagination__btn"
      @click="previousPage"
    >
      <svg
        class="pagination__icon"
        :class="store.usersStore.getCurrentPage === 1 ? 'btn-disable' : ''"
      >
        <use xlink:href="@/components/icons/sprite.svg#icon-arrow-left-circle"></use>
      </svg>
    </button>

    <!-- Current page -->
    <p class="pagination__text">
      Page <span class="pagination__text-number">{{ store.usersStore.getCurrentPage }}</span> sur
      <span class="pagination__text-number">{{ store.usersStore.getTotalPages }}</span>
    </p>

    <!-- Button next -->
    <button
      :disabled="store.usersStore.getCurrentPage >= store.usersStore.getTotalPages"
      class="pagination__btn"
      @click="nextPage"
    >
      <svg
        class="pagination__icon"
        :class="
          store.usersStore.getCurrentPage >= store.usersStore.getTotalPages ? 'btn-disable' : ''
        "
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

.btn-disable {
  fill: var(--color-gray-2);

  cursor: not-allowed;
  &:hover,
  &:active {
    fill: currentColor;
  }
}
</style>
