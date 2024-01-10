<script setup lang="ts">
import type { ShowType } from '@/shared/types/types';

const props = defineProps<{
  showOverview: boolean
  textBtn: string
}>()

const emits = defineEmits<{
  (e: 'updateShow',show:ShowType): void
}>()
</script>
<template>
  <div class="btnFilter btnOverview">
    <button
      class="btnFilter__btn"
      @click="emits('updateShow','overview')"
      aria-label="Afficher les statistiques"
      title="Afficher les statistiques"
    >
      <h3 class="btnFilter__title">{{ props.textBtn }}</h3>

      <svg class="btnFilter__icon">
        <use
          v-if="props.showOverview"
          xlink:href="@/components/icons/sprite.svg#icon-chevron-small-up"
        ></use>
        <use v-else xlink:href="@/components/icons/sprite.svg#icon-chevron-small-down"></use>
      </svg>
    </button>
  </div>
</template>
<style lang="scss">
.btnOverview {
  padding: 1rem 2rem;
}
</style>
