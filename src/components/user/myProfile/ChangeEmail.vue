<script setup lang="ts">
import { initStore } from '@/shared/utils'

const { userStore, appStore } = initStore('appStore', 'userStore')
</script>
<template>
  <div class="email" v-if="appStore && userStore">
    <h3 class="component__subtitle">Adresse email</h3>

    <div class="email__content">
      <span class="email__label"
        >Email : <span class="email__text">{{ userStore.getCurrentUser?.email }}</span></span
      >

      <button
        type="button"
        class="btn email__btn"
        @click="
          !appStore.getModal
            ? appStore.updateModal({
                type: 'requestChangeEmail',
                title: 'Changement d\'adresse email',
                message: 'changer votre adresse email ?'
              })
            : appStore.getModal && appStore.getModal.type === 'logout'
              ? appStore.resetModal
              : ''
        "
      >
        Modifier
      </button>
    </div>
  </div>
</template>
<style scoped lang="scss">
@use '@/assets/style/abstracts/mixins' as m;
.email {
  &__content {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 2rem;
  }
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
