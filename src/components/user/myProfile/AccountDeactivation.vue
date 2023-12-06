<script setup lang="ts">
import { useAppStore } from '@/stores'

const appStore = useAppStore()
</script>
<template>
  <div class="deactivation">
    <h4 class="section__title">Désactivation de compte</h4>

    <div class="deactivation__content">
      <p class="deactivation__text">
        Pour désactiver votre compte, il suffit de vous reconnecter avec vos identifiants. Nos
        administrateurs se réservent le droit de supprimer définitivement les comptes désactivés
        après une période prolongée.
      </p>

      <button
        class="deactivation__btn btn"
        @click="
          !appStore.getModal
            ? appStore.updateModal({
                type: 'deactivation',
                title: 'Désactivation de compte',
                message: 'désactiver votre compte ?'
              })
            : appStore.getModal && appStore.getModal.type === 'deactivation'
            ? appStore.resetModal
            : ''
        "
      >
        Désactiver
      </button>
    </div>
  </div>
</template>
<style scoped lang="scss">
.deactivation {
  // align-self: center;
  background-color: var(--color-black-2);
  height: min-content;

  &__content {
    margin: 2rem;
  }

  &__text {
    max-width: 60rem;
    margin-bottom: 2rem;
  }
}
</style>
