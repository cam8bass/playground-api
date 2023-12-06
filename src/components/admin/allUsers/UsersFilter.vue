<script setup lang="ts">
import { computed } from 'vue'
import UsersFieldsFilter from './UsersFieldsFilter.vue'
import UsersSearchFilter from './UsersSearchFilter.vue'
import UsersSortFilter from './UsersSortFilter.vue'
import UsersParametersFilter from './UsersParametersFilter.vue'
import UsersLimitFilter from './UsersLimitFilter.vue'
import BtnFilterFields from '@/components/shared-components/BtnFilterFields.vue'
import BtnFilterSort from '@/components/shared-components/BtnFilterSort.vue'
import BtnFilterParameters from '@/components/shared-components/BtnFilterParameters.vue'
import BtnFilterLimit from '@/components/shared-components/BtnFilterLimit.vue'
import { useAppStore, useCurrentUserStore, useUsersStore } from '@/stores'

const appStore = useAppStore()
const currentUserStore = useCurrentUserStore()

const usersStore = computed(() => {
  if (currentUserStore.getCurrentUser && currentUserStore.getCurrentUser.role === 'admin') {
    return useUsersStore()
  }
  return null
})

function updateShowFilterFields(): void {
  appStore.updateShowFilters({ fields: !appStore.showFilters.fields })
}

function updateShowFilterSort(): void {
  appStore.updateShowFilters({ sort: !appStore.showFilters.sort })
}

function updateShowFilterParameters(): void {
  appStore.updateShowFilters({ parameters: !appStore.showFilters.parameters })
}

function updateShowFilterLimit(): void {
  appStore.updateShowFilters({ limit: !appStore.showFilters.limit })
}

function updateFields(value: string[] | null): void {
  if (usersStore.value) {
    usersStore.value.updateQuery({ fields: Array.isArray(value) ? value.join(',') : value })
  }
}

function updateSort(value: string | null): void {
  if (usersStore.value) {
    usersStore.value.updateQuery({ sort: value })
  }
}

function updateParameters(value: {} | null): void {
  if (usersStore.value) {
    usersStore.value.updateQuery({
      parameters: value
    })
  }
}

function updateLimit(value: number): void {
  if (usersStore.value) {
    usersStore.value.updateQuery({ limit: value })
  }
}

function updateSearch(value: string): void {
  if (usersStore.value) {
    usersStore.value.updateQuery({ search: value })
  }
}

const fetchAdminGetAllUsersWithQuery = async (): Promise<void> => {
  if (usersStore.value) {
    usersStore.value.resetUsersStore()
    await usersStore.value.fetchAdminGetAllUsers()
  }
}
</script>
<template>
  <div class="filter" v-if="usersStore">
    <div class="filter__content">
      <!-- Search Filter -->
      <UsersSearchFilter @update-search="updateSearch($event)" />

      <!-- Fields Filter -->
      <BtnFilterFields
        :showFilterFields="appStore.getShowFilters.fields"
        @updateShowFilterFields="updateShowFilterFields"
      />

      <Transition name="translateDown" mode="out-in">
        <UsersFieldsFilter
          v-show="appStore.getShowFilters.fields"
          :class="!appStore.getShowFilters.fields ? 'hide' : ''"
          :showFilterField="appStore.getShowFilters.fields"
          @updateFilter="updateFields($event)"
        />
      </Transition>

      <!-- Sort Filter -->
      <BtnFilterSort
        :showFilterSort="appStore.getShowFilters.sort"
        @update-show-filter-sort="updateShowFilterSort"
      />
      <Transition name="translateDown" mode="out-in">
        <UsersSortFilter
          v-show="appStore.getShowFilters.sort"
          :showFilterSort="appStore.getShowFilters.sort"
          @update-sort="updateSort($event)"
        />
      </Transition>

      <!-- Parameters filter -->
      <BtnFilterParameters
        :showFilterParameters="appStore.getShowFilters.parameters"
        @update-show-filter-parameters="updateShowFilterParameters"
      />
      <Transition name="translateDown" mode="out-in">
        <UsersParametersFilter
          v-show="appStore.getShowFilters.parameters"
          :showFilterParameters="appStore.getShowFilters.parameters"
          @update-parameters="updateParameters($event)"
        />
      </Transition>
      <!-- Limit Filter -->
      <BtnFilterLimit
        :showFilterLimit="appStore.getShowFilters.limit"
        @update-show-filter-limit="updateShowFilterLimit"
      />
      <Transition name="translateDown" mode="out-in">
        <UsersLimitFilter
          v-show="appStore.getShowFilters.limit"
          :results="usersStore.getResults"
          :limitPerPage="usersStore.getLimitPerPage"
          :showFilterLimit="appStore.getShowFilters.limit"
          @updateLimit="updateLimit($event)"
        />
      </Transition>
    </div>
    <button
      :disabled="usersStore.checkIsDefaultQuery"
      @click="fetchAdminGetAllUsersWithQuery()"
      class="btn filter__btn"
    >
      Rechercher
    </button>
  </div>
</template>
<style lang="scss" scoped>
.filter {
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
  padding: 2rem;
  background-color: var(--color-black-2);

  &__content {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
  }

  &__btn {
    align-self: center;
  }
}
</style>
