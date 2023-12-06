<script setup lang="ts">
import { formatDate } from '@/shared/utils'
import { useCurrentUserStore, useUsersStore } from '@/stores'
import { computed } from 'vue'

const currentUserStore = useCurrentUserStore()

const usersStore = computed(() => {
  if (currentUserStore.getCurrentUser && currentUserStore.getCurrentUser.role === 'admin') {
    return useUsersStore()
  }
  return null
})
</script>
<template>
  <div class="detail" v-if="usersStore && usersStore.getUser">
    <h2 class="detail__title section__title">Détails</h2>

    <div class="detail__content">
      <ol class="detail__list">
        <li class="detail__item">
          <span class="form__label detail__label">Changement email : </span>
          <span class="detail__text">{{
            usersStore.getUser.emailChangeAt ? formatDate(usersStore.getUser.emailChangeAt) : 'Non'
          }}</span>
        </li>
        <li class="detail__item">
          <span class="form__label detail__label">Changement mot de passe : </span>
          <span class="detail__text">{{
            usersStore.getUser.passwordChangeAt
              ? formatDate(usersStore.getUser.passwordChangeAt)
              : 'Non'
          }}</span>
        </li>
        <li class="detail__item">
          <span class="form__label detail__label">Activation du compte : </span>
          <span class="detail__text">{{
            usersStore.getUser.activationAccountAt
              ? formatDate(usersStore.getUser.activationAccountAt)
              : 'Non'
          }}</span>
        </li>
        <li class="detail__item">
          <span class="form__label detail__label"> Création du compte : </span>
          <span class="detail__text">{{ formatDate(usersStore.getUser.createAt!) }}</span>
        </li>
        <li class="detail__item">
          <span class="form__label detail__label"> Désactivation du compte : </span>
          <span class="detail__text">{{
            usersStore.getUser.disableAccountAt
              ? formatDate(usersStore.getUser.disableAccountAt)
              : 'Non'
          }}</span>
        </li>
        <li class="detail__item">
          <span class="form__label detail__label">Connexion échoué : </span>
          <span class="detail__text">{{ usersStore.getUser.loginFailures }}</span>
        </li>
      </ol>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.detail {
  background-color: var(--color-black-2);
  padding: 2rem;

  &__title {
    margin: 0;
    margin-bottom: 2rem;
  }

  &__content {
  }

  &__list {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
  }

  &__item {
  }

  &__label {
    display: inline;
  }

  &__text {
    font-family: var(--font-subtext);
    font-weight: bold;
    color: var(--color-purple-1);
  }
}
</style>
