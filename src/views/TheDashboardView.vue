<script setup lang="ts">
import DashboardHeader from '@/components/TheDashboardHeader.vue'
</script>
<template>
  <main class="dashboard">
    <DashboardHeader class="dashboard__header" />
    <RouterView class="dashboard__content"></RouterView>
  </main>
</template>
<style scoped lang="scss">
@use '@/assets/abstracts/mixins' as m;
.dashboard {

  display: grid;
  grid-template-rows: min-content 1fr;

  @include m.xl {
    grid-template-columns: min-content 1fr;
    grid-template-rows: 1fr;
  }

  &__header {
    grid-row: 1/2;

    @include m.xl {
      grid-row: 1/-1;
      grid-template-columns: 1/2;
    }
  }

  &__content {
    grid-row: 2/-1;

    @include m.xl {
      grid-row: 1/-1;
      grid-template-columns: 2/-1;
    }
  }
}
</style>
