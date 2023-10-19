<script setup lang="ts">
import type { modalInterface } from '@/shared/interfaces'
import type { modalType } from '@/shared/types/types'
import { useUserStore } from '@/stores'

const userStore = useUserStore()

defineProps<{
  modal: modalInterface | null
}>()

const emits = defineEmits<{
  (e: 'requestChangeEmail', modal: { type: modalType; title: string; message: string }): void
  (e: 'cancel'): void
}>()
</script>
<template>
  <div class="email">
    <span class="email__label"
      >Email : <span class="email__text">{{ userStore.getCurrentUser?.email }}</span></span
    >

    <button
      type="button"
      class="btn email__btn"
      @click="
        !modal
          ? emits('requestChangeEmail', {
              type: 'requestChangeEmail',
              title: 'Changement d\'adresse email',
              message: 'changer votre adresse email ?'
            })
          : modal && modal.type === 'logout'
          ? emits('cancel')
          : ''
      "
    >
      Modifier
    </button>
  </div>
</template>
<style scoped lang="scss">
@use '@/assets/abstracts/mixins' as m;
.email {
  row-gap: 2rem;

  &__label {
    font-family: var(--font-subtext);
  }

  &__text {
    margin-left: 1rem;
    font-family: var(--font-text);
    color: var(--color-purple-1);
  }

  &__btn {
    align-self: center;
  }
}
</style>
