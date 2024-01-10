<script setup lang="ts">
import type { ShowType } from '@/shared/types/types';

const props = defineProps<{
  showFilterLimit: boolean
}>()

const emits = defineEmits<{
  (e: 'updateShow',show:ShowType): void

}>()
</script>
<template>
  <button
    class="btnFilter"
    @click="emits('updateShow','limit')"
    aria-label="Afficher le filtre de limitation d'éléments"
    title="Afficher le filtre de limitation d'éléments"
  >
    <label for="limit" class="btnFilter__text"
      >Élements par page :
      <svg class="btnFilter__icon">
        <use
          v-if="props.showFilterLimit"
          xlink:href="@/components/icons/sprite.svg#icon-chevron-small-up"
        ></use>
        <use v-else xlink:href="@/components/icons/sprite.svg#icon-chevron-small-down"></use>
      </svg>
    </label>
  </button>
</template>
<style lang="scss" scoped></style>
