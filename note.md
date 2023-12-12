<script setup lang="ts">
import UsersList from '@/components/admin/allUsers/UsersList.vue'
import UsersFilter from '@/components/admin/allUsers/UsersFilter.vue'
import BtnFilter from '@/components/shared-components/BtnFilter.vue'

import { useAppStore } from '@/stores'

const appStore = useAppStore()

function updateShowFilter() {
  appStore.updateMenuFilter(!appStore.getMenuFilter)
}

</script>
<template>
  <div class="users">
    <div class="users__content">
      <h1 class="users__title">Utilisateurs</h1>
      <BtnFilter
        :showFilter="appStore.getMenuFilter"
        @updateShowFilter="updateShowFilter"
        class="users__btnFilter"
      />
      

      <Transition name="translateDown" mode="out-in" appear>
        <UsersFilter class="users__filter" v-show="appStore.getMenuFilter" />
      </Transition>

      <UsersList class="users__list" :class="!appStore.getMenuFilter ? 'hideOptions' : ''" />
    </div>
  </div>
</template>
<style scoped lang="scss">
@use '@/assets/style/abstracts/mixins' as m;

.users {
  &__title {
    grid-area: title;
    grid-column: 2/-1;
    grid-row: 1/2;
    padding: 1rem 2rem;
    align-self: center;
    justify-self: flex-end;
    font-size: 1.8rem;
    font-family: var(--font-subtitle);
    font-weight: 300;
  }

  &__content {
    display: grid;
    grid-template-areas:
      'btnFilter title'
      'filter filter'
      'list list';
    grid-template-rows: min-content min-content 1fr;
    grid-template-columns: repeat(2, 1fr);
    margin: 2rem;
    background-color: var(--color-black-2);

    @include m.lg {
      grid-template-areas:
        'btnFilter title'
        'filter list';
      grid-template-columns: max-content 1fr;
      grid-template-rows: min-content 1fr;
      column-gap: 1rem;
      margin: 4rem;
    }
  }

  &__filter {
    grid-area: filter;
  }

  &__list {
    grid-area: list;
  }

  &__btnFilter {
    grid-area: btnFilter;
  }
}

.hideOptions {
  grid-column: 1/-1;

  grid-row: 2/-1;
  animation: fullList-mob 0.8s ease;
  @include m.lg {
    grid-column: 1/-1;
    animation: fullList-desk 0.8s ease;
  }
}

@keyframes fullList-desk {
  0% {
    transform: translateX(20%);
  }

  100% {
    transform: translateX(0%);
  }
}

@keyframes fullList-mob {
  0% {
    transform: translateY(20%);
  }

  100% {
    transform: translateY(0%);
  }
}
</style>
