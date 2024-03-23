<script lang="ts" setup>
import type { AppErrorInterface } from '@/shared/interfaces'

const props = defineProps<{
  warningError: AppErrorInterface | null
}>()

const emits = defineEmits<{
  (e: 'closePopupError', err: AppErrorInterface): void
}>()
</script>
<template>
  <div class="popupError" v-if="props.warningError">
    <div class="popupError__block">
      <svg class="popupError__icon">
        <use xlink:href="@/components/icons/sprite.svg#icon-alert-triangle"></use>
      </svg>
      <p class="popupError__message">
        {{ props.warningError.message }}
      </p>
      <button
        type="button"
        title="Cliquez pour fermer la popup"
        aria-label="Cliquez pour fermer la popup"
        class="popupError__btn btn"
        @click="emits('closePopupError', props.warningError)"
      >
        Fermer
      </button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@use '@/assets/style/abstracts/mixins' as m;

.popupError {
  background-color: var(--color-black-4);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 10000;
  border-top: 2px solid var(--color-white);
  &__block {
    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 2rem;
    padding: 2rem;
  }

  &__icon {
    fill: var(--color-purple-1);
    width: 5rem;
    height: 5rem;
  }

  &__message {
    font-size: 1.8rem;
    font-family: var(--font-text);
    font-weight: 300;
    max-width: 150rem;
  }

  &__btn {
  }
}
</style>
