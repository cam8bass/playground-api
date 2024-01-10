<script setup lang="ts">
import { initStore } from '@/shared/utils'


const { appStore } = initStore('appStore')
</script>
<template>
  <div class="deactivation" v-if="appStore">
    <h4 class="component__subtitle">Désactivation de compte</h4>
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
  &__content {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    row-gap: 2rem;
  }

  &__btn {
    align-self: center;
  }
}
</style>
