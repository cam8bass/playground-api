<script setup lang="ts">
import type { NavigationType } from '@/shared/types/types'

const props = defineProps<{
  showFilter: boolean
}>()

const emits = defineEmits<{
  (e: 'updateNavigation', navigation: { type: NavigationType; value?: boolean }): void

}>()
</script>
<template>
  <div class="btnFilter">
    <button class="btnFilter__btn" @click="emits('updateNavigation', {type:'menuFilter'})">
      <h3 class="btnFilter__title">Filtres</h3>
      <svg class="btnFilter__icon">
        <use
          v-if="props.showFilter"
          xlink:href="@/components/icons/sprite.svg#icon-chevron-small-up"
        ></use>
        <use v-else xlink:href="@/components/icons/sprite.svg#icon-chevron-small-down"></use>
      </svg>
    </button>
  </div>
</template>
<style lang="scss" scoped>
.btnFilter {
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  align-self: center;
}
</style>
