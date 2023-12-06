<script setup lang="ts">
import { useCurrentUserStore, useUsersStore } from '@/stores'
import { computed } from 'vue'

const currentUserStore = useCurrentUserStore()

const usersStore = computed(() => {
  if (currentUserStore.getCurrentUser && currentUserStore.getCurrentUser.role === 'admin') {
    return useUsersStore()
  }
  return null
})

async function nextPage(): Promise<void> {
  if (usersStore.value) {
    const page = usersStore.value.getCurrentPage
    const nextPage = page + 1
    usersStore.value.updateCurrentPage(nextPage)
    usersStore.value.updateRefresh(true)
    await usersStore.value.fetchAdminGetAllUsers()
  }
}
function previousPage(): void {
  if (usersStore.value) {
    const page = usersStore.value.getCurrentPage
    usersStore.value.updateCurrentPage(page - 1)
  }
}
</script>
<template>
  <div class="pagination" v-if="usersStore && usersStore.getTotalPages !== 1">
    <!-- Button preview -->
    <button
      :disabled="usersStore.getCurrentPage === 1"
      class="pagination__btn"
      @click="previousPage"
    >
      <svg class="pagination__icon" :class="usersStore.getCurrentPage === 1 ? 'btn-disable' : ''">
        <use xlink:href="@/components/icons/sprite.svg#icon-arrow-left-circle"></use>
      </svg>
    </button>

    <!-- Current page -->
    <p class="pagination__text">
      Page <span class="pagination__text-number">{{ usersStore.getCurrentPage }}</span> sur
      <span class="pagination__text-number">{{ usersStore.getTotalPages }}</span>
    </p>

    <!-- Button next -->
    <button
      :disabled="usersStore.getCurrentPage >= usersStore.getTotalPages"
      class="pagination__btn"
      @click="nextPage"
    >
      <svg
        class="pagination__icon"
        :class="usersStore.getCurrentPage >= usersStore.getTotalPages ? 'btn-disable' : ''"
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
