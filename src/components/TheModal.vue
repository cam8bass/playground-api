<script setup lang="ts">
import type { modalInterface } from '@/shared/interfaces/modal.interface'

defineProps<{
  modal: modalInterface | null
}>()
const emits = defineEmits<{
  (e: 'logout'): void
  (e: 'requestChangeEmail'): void
  (e: 'cancel'): void
}>()
</script>
<template>
  <Teleport to="body">
    <Transition mode="out-in" name="fade">
      <div class="modal" v-if="modal">
        <div class="modal__content">
          <h3 class="modal__title">{{ modal.title }}</h3>
          <p class="modal__message">Êtes-vous sûr de vouloir {{ modal.message }}</p>
          <div class="modal__btn">
            <button class="btn modal__btn--cancel" @click="emits('cancel')">Annuler</button>
            <button
              v-if="modal.type === 'logout'"
              class="btn modal__btn--confirm"
              @click="emits('logout')"
            >
              Confirmer
            </button>

            <button
              v-if="modal.type === 'requestChangeEmail'"
              class="btn modal__btn--confirm"
              @click="emits('requestChangeEmail')"
            >
              Confirmer
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
<style scoped lang="scss">
@import '@/assets/base/animation';
.modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5000;
  background-color: var(--color-black-2);
  backdrop-filter: blur(5px);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__content {
    background-color: var(--color-black-2);
    padding: 2rem;
    display: flex;
    flex-direction: column;
    box-shadow: var(--boxshadow-black);
  }
  &__title {
    font-family: var(--font-subtitle);
    font-weight: 100;
    margin-bottom: 2rem;
    font-size: 2rem;
  }

  &__message {
    margin-bottom: 2rem;
    font-weight: 100;
  }

  &__btn {
    align-self: center;
    &--cancel {
      margin-right: 2rem;
      margin-bottom: 2rem;
    }
    &--confirm {
    }
  }
}
</style>
