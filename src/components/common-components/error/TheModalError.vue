<script lang="ts" setup>
import type { AppErrorInterface } from '@/shared/interfaces'
import { useRouter } from 'vue-router'

const props = defineProps<{
  criticalError: AppErrorInterface | null
}>()

const emits = defineEmits<{
  (e: 'closeModalError', err: AppErrorInterface): void
}>()
const router = useRouter()
</script>
<template>
  <div v-if="props.criticalError" class="modalError">
    <div class="modalError__block">
      <svg class="modalError__icon">
        <use xlink:href="@/components/icons/sprite.svg#icon-alert-triangle"></use>
      </svg>
      <span class="modalError__message">{{ props.criticalError.message }}</span>

      <button
        type="button"
        title="Cliquez pour être redirigé vers la page d'accueil"
        aria-label="Cliquez pour être redirigé vers la page d'accueil"
        @click="router.push('/home'), emits('closeModalError', props.criticalError)"
        class="btn modalError__btn"
      >
        Fermer
      </button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.modalError {
  background-color: var(--color-black-2);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;

  &__block {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 2rem;
    padding: 2rem;
    box-shadow: var(--boxshadow-black);
    background-color: var(--color-black-2);
    max-width: 80rem;
  }

  &__icon {
    fill: var(--color-red-1);
    width: 8rem;
    height: 8rem;
  }

  &__message {
    font-size: 1.8rem;
    font-family: var(--font-text);
    font-weight: 300;
  }

  &__btn {
  }
}
</style>
