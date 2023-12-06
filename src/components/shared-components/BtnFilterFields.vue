<script setup lang="ts">
const props = defineProps<{
  showFilterFields: boolean
}>()
const emits = defineEmits<{
  (e: 'updateShowFilterFields'): void
}>()
</script>
<template>
  <button type="button" class="btnFilter" @click="emits('updateShowFilterFields')">
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
