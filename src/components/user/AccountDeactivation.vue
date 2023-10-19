<script setup lang="ts"></script>
<template>
  <div class="deactivation">
    <h4 class="section__title">Désactivation de compte</h4>

    <div class="deactivation__content">
      <div class="deactivation__text">
        <p class="deactivation__text-main">
          Pour désactiver votre compte, il suffit de vous reconnecter avec vos identifiants. Nos
          administrateurs se réservent le droit de supprimer définitivement les comptes désactivés
          après une période prolongée.
        </p>

        <p class="deactivation__text-sub">Confirmez-vous la désactivation ?</p>
      </div>

      <div class="deactivation__btn">
        <button class="deactivation__btn--cancel btn">Annuler</button>
        <button class="deactivation__btn--confirm btn">Confirmer</button>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.deactivation {
  background-color: var(--color-black-2);
  height: min-content;
  &__title {
  }

  &__content {
    margin: 2rem;
  }

  &__text {
    max-width: 60rem;
    margin-bottom: 2rem;
    &-main {
    }

    &-sub {
      margin-top: 1rem;
    }
  }

  &__btn {
    display: flex;
    align-items: center;
    &--cancel {
      margin-right: 2rem;
    }

    &--confirm {
    }
  }
}
</style>
