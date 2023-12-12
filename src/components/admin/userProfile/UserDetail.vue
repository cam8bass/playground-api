<script setup lang="ts">
import type { AdminUsersInterface } from '@/shared/interfaces'
import { formatDate } from '@/shared/utils'

const props = defineProps<{
  selectedUser: AdminUsersInterface | null
}>()
</script>
<template>
  <div class="detail" v-if="props.selectedUser">
    <h3 class="detail__title section__title">Détails</h3>

    <div class="detail__content">
      <ol class="detail__list">
        <li class="detail__item">
          <span class="form__label detail__label">Changement email : </span>
          <span class="detail__text">{{
            props.selectedUser.emailChangeAt ? formatDate(props.selectedUser.emailChangeAt) : 'Non'
          }}</span>
        </li>
        <li class="detail__item">
          <span class="form__label detail__label">Changement mot de passe : </span>
          <span class="detail__text">{{
            props.selectedUser.passwordChangeAt
              ? formatDate(props.selectedUser.passwordChangeAt)
              : 'Non'
          }}</span>
        </li>
        <li class="detail__item">
          <span class="form__label detail__label">Activation du compte : </span>
          <span class="detail__text">{{
            props.selectedUser.activationAccountAt
              ? formatDate(props.selectedUser.activationAccountAt)
              : 'Non'
          }}</span>
        </li>
        <li class="detail__item">
          <span class="form__label detail__label"> Création du compte : </span>
          <span class="detail__text">{{ formatDate(props.selectedUser.createAt!) }}</span>
        </li>
        <li class="detail__item">
          <span class="form__label detail__label"> Désactivation du compte : </span>
          <span class="detail__text">{{
            props.selectedUser.disableAccountAt
              ? formatDate(props.selectedUser.disableAccountAt)
              : 'Non'
          }}</span>
        </li>
        <li class="detail__item">
          <span class="form__label detail__label">Connexion échoué : </span>
          <span class="detail__text">{{ props.selectedUser.loginFailures }}</span>
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
