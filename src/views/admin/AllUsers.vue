<script setup lang="ts">
import UsersList from '@/components/admin/allUsers/UsersList.vue'
import UsersFilter from '@/components/admin/allUsers/UsersFilter.vue'
import BtnFilter from '@/components/shared-components/BtnFilter.vue'
import BtnOverview from '@/components/shared-components/BtnOverview.vue'
import UsersOverview from '@/components/admin/allUsers/UsersOverview.vue'
import BtnRefresh from '@/components/shared-components/BtnRefresh.vue'
import { useAppStore, useCurrentUserStore, useUsersStore } from '@/stores'
import { computed } from 'vue'

const appStore = useAppStore()
const currentUserStore = useCurrentUserStore()

const usersStore = computed(() => {
  if (currentUserStore.getCurrentUser && currentUserStore.getCurrentUser.role === 'admin') {
    return useUsersStore()
  }
  return null
})

function updateShowFilter() {
  appStore.updateMenuFilter(!appStore.getMenuFilter)
}

function updateShowOverview() {
  appStore.updateShow({ overview: !appStore.getShow.overview })
}

async function resetFetchAdminGetAllUsers(): Promise<void> {
  if (usersStore.value) {
    usersStore.value.resetUsersStore()
    await usersStore.value.fetchAdminGetAllUsers()
  }
}

async function initOverview() {
  if (usersStore.value) {
    await usersStore.value.fetchDashboardUsersInfo()
  }
}

const initAdminGetAllUsers = async () => {
  if (usersStore.value) {
    await usersStore.value.fetchAdminGetAllUsers()
  }
}

function updateShowFilterFields(): void {
  appStore.updateShow({ fields: !appStore.getShow.fields })
}

function updateShowFilterSort(): void {
  appStore.updateShow({ sort: !appStore.getShow.sort })
}

function updateShowFilterParameters(): void {
  appStore.updateShow({ parameters: !appStore.getShow.parameters })
}

function updateShowFilterLimit(): void {
  appStore.updateShow({ limit: !appStore.getShow.limit })
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
  console.log(value)
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
  <div class="users">
    <div class="users__content" v-if="usersStore">
      <h1 class="section__title users__title">Liste d'utilisateurs</h1>
      <BtnOverview
        :showOverview="appStore.getShow.overview"
        @updateShowOverview="updateShowOverview"
      />

      <BtnRefresh
        class="users__btnRefresh"
        @reset-fetch-admin-get-all-users="resetFetchAdminGetAllUsers"
      />

      <UsersOverview
        class="users__overview"
        :showOverview="appStore.getShow.overview"
        :stats="usersStore.getUsersStats"
        v-show="appStore.getShow.overview"
        @initOverview="initOverview"
      />

      <BtnFilter
        :showFilter="appStore.getMenuFilter"
        @updateShowFilter="updateShowFilter"
        class="users__btnFilter"
      />

      <Transition name="translateDown" mode="out-in" appear>
        <UsersFilter
          class="users__filter"
          v-show="appStore.getMenuFilter"
          :show="appStore.getShow"
          :results="usersStore.getResults"
          :limitPerPage="usersStore.getLimitPerPage"
          @update-search="updateSearch($event)"
          @update-sort="updateSort($event)"
          @update-fields="updateFields($event)"
          @update-parameters="updateParameters($event)"
          @update-limit="updateLimit($event)"
          @fetch-all-users-with-query="fetchAdminGetAllUsersWithQuery"
          @updateShowFilterFields="updateShowFilterFields"
          @update-show-filter-sort="updateShowFilterSort"
          @update-show-filter-parameters="updateShowFilterParameters"
          @update-show-filter-limit="updateShowFilterLimit"
        />
      </Transition>

      <UsersList
        class="users__list"
        :class="!appStore.getMenuFilter ? 'hideOptions' : ''"
        :allUsers="usersStore.getAllUsers"
        @init-get-all-users="initAdminGetAllUsers"
      />
    </div>
  </div>
</template>
<style scoped lang="scss">
@use '@/assets/style/abstracts/mixins' as m;

.users {
  &__content {
    min-height: 100%;
    display: grid;
    grid-template-areas:
      'title title'
      'btnOverview refresh'
      'overview overview'
      'btnFilter btnFilter'
      'filter filter'
      'list list';
    grid-template-rows: repeat(5, min-content) 1fr;
    grid-template-columns: 1fr min-content;
    background-color: var(--color-black-2);

    @include m.lg {
      grid-template-areas:
        'title title'
        'btnOverview refresh'
        'overview overview'
        'btnFilter btnFilter'
        'filter list';

      grid-template-columns: max-content 1fr;
      grid-template-rows: repeat(4, min-content) 1fr;
    }
  }

  &__title {
    grid-area: title;
  }

  &__btnOverview {
    grid-area: btnOverview;
  }

  &__overview {
    grid-area: overview;
  }

  &__btnFilter {
    grid-area: btnFilter;
  }

  &__filter {
    grid-area: filter;
  }

  &__list {
    grid-area: list;
  }

  &__btnRefresh {
    margin: 0 2rem;
    justify-self: flex-end;
    grid-area: refresh;
  }
}

.hideOptions {
  animation: fullList 0.8s ease;

  @include m.lg {
    grid-column: 1/-1;
  }
}

@keyframes fullList {
  0% {
    transform: translateX(20%);
  }

  100% {
    transform: translateX(0%);
  }
}
</style>
