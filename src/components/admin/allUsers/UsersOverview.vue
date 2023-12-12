<script setup lang="ts">
import type { AdminUsersStatsInterface } from '@/shared/interfaces'

import { onMounted } from 'vue'
const props = defineProps<{
  stats: AdminUsersStatsInterface | null
}>()

const emits = defineEmits<{
  (e: 'initOverview'): void
}>()

onMounted(() => emits('initOverview'))
</script>
<template>
  <ul class="overview" v-if="props.stats">
    <li class="overview__item">
      Total :
      <span class="overview__number">{{ props.stats.totalUsers }}</span>
    </li>
    <li class="overview__item">
      Activé :
      <span class="overview__number">{{ props.stats.totalActiveAccount }}</span>
    </li>
    <li class="overview__item">
      Non activé :
      <span class="overview__number">{{ props.stats.totalInactiveAccount }}</span>
    </li>
    <li class="overview__item">
      Désactivé :
      <span class="overview__number">{{ props.stats.totalDisableAccount }}</span>
    </li>
    <li class="overview__item">
      Bloqué :
      <span class="overview__number">{{ props.stats.totalAccountLocked }}</span>
    </li>
  </ul>
</template>
<style lang="scss" scoped>
@use '@/assets/style/abstracts/mixins' as m;

.overview {
  padding: 1rem 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  column-gap: 2rem;
  row-gap: 1rem;

  &__item {
    font-family: var(--font-subtitle);
    font-weight: 300;
  }

  &__number {
    font-weight: bold;
    color: var(--color-purple-1);
  }
}
</style>
