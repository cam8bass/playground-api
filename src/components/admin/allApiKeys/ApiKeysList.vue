<script setup lang="ts"></script>
<template>
  <div class="apiKeys__list list">
    <div class="list__content">
      <div class="list__group">
        <ul class="list__list">
          <li class="list__item">Id : <span class="list__text">65411dde90d1d10261430585</span></li>

          <li class="list__item">Nom : <span class="list__text">Laignel</span></li>

          <li class="list__item">Prénom : <span class="list__text">Camille</span></li>

          <li class="list__item">Email : <span class="list__text">cam8bass@hotmail.fr</span></li>

          <li class="list__item">Nombre d'api : <span class="list__text">5</span></li>

          <li class="list__item">Attente d'activation : <span class="list__text">2</span></li>
        </ul>

        <router-link to="'/apiKeys/' " class="list__link">Details</router-link>
      </div>
    </div>
    <div class="list__pagination">
      <buttton class="btn list__pagination-return">Précédent</buttton>
      <buttton class="btn list__pagination-next">Suivant</buttton>
    </div>
  </div>
</template>
<style scoped lang="scss"></style>
