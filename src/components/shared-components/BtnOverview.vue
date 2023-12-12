<script setup lang="ts">
const props = defineProps<{
  showOverview: boolean
}>()

const emits = defineEmits<{
  (e: 'updateShowOverview'): void
}>()
</script>
<template>
  <div class="btnFilter btnOverview">
    <button
      class="btnFilter__btn"
      @click="emits('updateShowOverview')"
      aria-label="Afficher les statistiques"
      title="Afficher les statistiques"
    >
      <h3 class="btnFilter__title">Utilisateurs</h3>

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
