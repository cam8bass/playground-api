<script setup lang="ts">
import SearchUsers from '@/components/admin/allUsers/SearchUsers.vue'
import UsersList from '@/components/admin/allUsers/UsersList.vue'
</script>
<template>
  <div class="users">
    <SearchUsers class="users__search" />
    <UsersList />
  </div>
</template>
<style scoped lang="scss">
@use '@/assets/style/abstracts/mixins' as m;

.users {
  display: grid;
  grid-template-areas:
    'search'
    'list';
  grid-template-rows: min-content 1fr;
  row-gap: 2rem;
  margin: 2rem 0;
  align-items: start;

  @include m.xl {
    grid-template-areas: 'search list list';
    grid-template-columns: minmax(min-content, 67rem) minmax(min-content, 90rem);

    column-gap: 4rem;
    margin: 4rem;
    grid-template-rows: 1fr;
    justify-content: center;
  }

  &__search {
    grid-area: search;
  }

  &__list {
    grid-area: list;
  }
}
</style>
