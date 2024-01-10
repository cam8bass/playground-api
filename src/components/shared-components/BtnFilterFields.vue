<script setup lang="ts">
import type { ShowType } from '@/shared/types/types';

const props = defineProps<{
  showFilterFields: boolean
}>()
const emits = defineEmits<{
  (e: 'updateShow',show:ShowType): void

}>()
</script>
<template>
  <button
    type="button"
    class="btnFilter"
    @click="emits('updateShow','fields')"
    aria-label="Afficher les filtres de sélection de champs"
    title="Afficher les filtres de sélection de champs"
  >
    <span for="filter" class="btnFilter__text">
      Afficher les champs :
      <svg class="btnFilter__icon">
        <use
          v-if="props.showFilterFields"
          xlink:href="@/components/icons/sprite.svg#icon-chevron-small-up"
        ></use>
        <use v-else xlink:href="@/components/icons/sprite.svg#icon-chevron-small-down"></use>
      </svg>
    </span>
  </button>
</template>
<style lang="scss" scoped></style>
