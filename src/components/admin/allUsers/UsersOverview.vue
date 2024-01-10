<script setup lang="ts"></script>
<template>
  <ul class="overview">
    <li class="overview__item">
      Total :
      <span class="overview__number">20</span>
    </li>
    <li class="overview__item">
      Activé :
      <span class="overview__number">5</span>
    </li>
    <li class="overview__item">
      Non activé :
      <span class="overview__number">6</span>
    </li>
    <li class="overview__item">
      Désactivé :
      <span class="overview__number">6</span>
    </li>
    <li class="overview__item">
      Bloqué :
      <span class="overview__number">6</span>
    </li>
  </ul>
</template>
<style lang="scss" scoped>
@use '@/assets/style/abstracts/mixins' as m;

.overview {
  grid-row: 2/3;
  grid-column: 1/-1;
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  column-gap: 2rem;
  row-gap: 1rem;
  background-color: var(--color-black-2);

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
