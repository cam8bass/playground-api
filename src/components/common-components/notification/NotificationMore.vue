<script setup lang="ts">
import type { modalInterface, updateModalInterface } from '@/shared/interfaces'

const props = defineProps<{
  modal: modalInterface | null
  idNotification: string | null
}>()

const emits = defineEmits<{
  (e: 'closeAllPopup'): void
  (e: 'updateAllNoticationsUser'): void
  (e: 'updateModal', modal: updateModalInterface): void
  (e: 'resetModal'): void
}>()
</script>
<template>
  <div class="more">
    <button
      :class="{ 'more__btn--disabled': !props.idNotification }"
      :disabled="!props.idNotification"
      type="button"
      class="more__btn"
      title="Marquer toutes les notifications comme lues"
      aria-label="Marquer toutes les notifications comme lues"
      @click="emits('updateAllNoticationsUser'),emits('closeAllPopup')"
    >
      Tout marquer comme lues
    </button>

    <button
      :class="{ 'more__btn--disabled': !props.idNotification }"
      :disabled="!props.idNotification"
      class="more__btn"
      type="button"
      title="Supprimer toutes les notifications"
      aria-label="Supprimer toutes les notifications"
      @click="
        !props.modal
          ? emits('updateModal', {
              title: 'Suppression de l\'ensemble des notifications',
              message: 'supprimer toutes les notifications?',
              type: 'deleteAllNoticationsUser',
              id: { idNotification: props.idNotification! }
            })
          : props.modal && props.modal.type === 'deleteAllNoticationsUser'
            ? emits('resetModal')
            : ''
      "
    >
      Tout supprimer
    </button>
  </div>
</template>
<style lang="scss" scoped>
.more {
  background-color: var(--color-black-3);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 1rem;

  &__btn {
    background-color: transparent;
    color: var(--color-white);
    font-size: 1.6rem;
    font-family: var(--font-subtext);
    font-weight: 300;

    &--disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
}
</style>
