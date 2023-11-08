<script setup lang="ts"></script>
<template>
  <div class="loading">
    <div class="loading__block">
      <span class="loading__title">Playground @pi</span>
      <div class="loading__bar">&nbsp;</div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.loading {
  z-index: 10000;
  position: fixed;
  top: 0;
  left: 0;
  background-color: var(--color-black-3);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__block {
    min-width: 20rem;
  }
  &__title {
    font-size: 2rem;
    font-family: var(--font-subtitle);
  }

  &__bar {
    margin-top: 1rem;
    background-color: var(--color-purple-1);
    width: 100%;
    height: 1rem;
    border-radius: 20px;
    animation: loading 3s linear;
  }
}

@keyframes loading {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
    background-color: var(--color-purple-2);
  }
}
</style>
