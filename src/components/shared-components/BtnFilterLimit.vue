<script setup lang="ts">
const props = defineProps<{
  showFilterLimit: boolean
}>()

const emits = defineEmits<{
  (e: 'updateShowFilterLimit'): void
}>()
</script>
<template>
  <button class="btnFilter" @click="emits('updateShowFilterLimit')">
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
