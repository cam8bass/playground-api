<script lang="ts" setup>
import type { AdminUsersInterface, modalInterface, updateModalInterface } from '@/shared/interfaces'

const props = defineProps<{
  selectedUser: AdminUsersInterface | null
  modal: modalInterface | null
  modifyUser: boolean
}>()

const emits = defineEmits<{
  (e: 'modifyUser', value: boolean): void
  (e: 'updateModal', modal: updateModalInterface): void
  (e: 'resetModal'): void
}>()
</script>
<template>
  <div class="list__content" v-if="props.selectedUser">
    <ol class="list__list">
      <li class="list__item">
        <span class="form__label list__label">Nom : </span>
        <span class="list__text">{{ props.selectedUser.lastname }}</span>
      </li>
      <li class="list__item">
        <span class="form__label list__label">Prénom : </span>
        <span class="list__text">{{ props.selectedUser.firstname }}</span>
      </li>
      <li class="list__item">
        <span class="form__label list__label">Email : </span>
        <span class="list__text">{{ props.selectedUser.email }}</span>
      </li>
      <li class="list__item">
        <span class="form__label list__label">Rôle : </span>
        <span class="list__text">{{
          props.selectedUser.role === 'user' ? 'Utilisateur' : 'Administrateur'
        }}</span>
      </li>
      <li class="list__item">
        <span class="form__label list__label">Compte activé : </span>
        <span class="list__text">{{ props.selectedUser.active ? 'Oui' : 'Non' }}</span>
      </li>
      <li class="list__item">
        <span class="form__label list__label">Compte Bloqué : </span>
        <span class="list__text">{{ props.selectedUser.accountLockedExpire ? 'oui' : 'Non' }}</span>
      </li>
    </ol>
    <div class="list__btn">
      <button
        @click="
          !modal
            ? emits('updateModal', {
                title: 'Suppression de l\'utilisateur',
                message: 'supprimer définitivement cet utilisateur ?',
                type: 'adminDeleteSelectedUser',
                id: { idUser: props.selectedUser._id }
              })
            : modal && modal.type === 'adminDeleteSelectedUser'
            ? emits('resetModal')
            : ''
        "
        type="button"
        class="list__btn-delete btn"
      >
        Supprimer
      </button>
      <button
        v-if="!modifyUser"
        type="button"
        class="list__btn-modifie btn"
        @click="emits('modifyUser', true)"
      >
        Modifier
      </button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@use '@/assets/style/abstracts/mixins' as m;

.list {
  background-color: var(--color-black-2);
  padding: 2rem;
  &__title {
    margin: 0;
    margin-bottom: 2rem;
  }

  &__content {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, min-content);
    row-gap: 2rem;
    @include m.md {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr;
      column-gap: 2rem;
      row-gap: 0;
    }
    @include m.xl {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(2, min-content);
      row-gap: 2rem;
      column-gap: 0;
    }
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

  &__btn {
    display: flex;
    flex-direction: column;
    row-gap: 2rem;
    @include m.xs {
      flex-direction: row;
      justify-content: center;
      align-items: center;
      column-gap: 2rem;
    }
  }
}
</style>

<!-- <script lang="ts" setup>
import type { AdminUsersInterface, modalInterface } from '@/shared/interfaces'

import { useAppStore } from '@/stores'

const appStore = useAppStore()

const props = defineProps<{
  selectedUser: AdminUsersInterface | null
  modal: modalInterface | null
  modifyUser: boolean
}>()

const emits = defineEmits<{
  (e: 'modifyUser', value: boolean): void
}>()
</script>
<template>
  <div class="list__content" v-if="props.selectedUser">
    <ol class="list__list">
      <li class="list__item">
        <span class="form__label list__label">Nom : </span>
        <span class="list__text">{{ props.selectedUser.lastname }}</span>
      </li>
      <li class="list__item">
        <span class="form__label list__label">Prénom : </span>
        <span class="list__text">{{ props.selectedUser.firstname }}</span>
      </li>
      <li class="list__item">
        <span class="form__label list__label">Email : </span>
        <span class="list__text">{{ props.selectedUser.email }}</span>
      </li>
      <li class="list__item">
        <span class="form__label list__label">Rôle : </span>
        <span class="list__text">{{
          props.selectedUser.role === 'user' ? 'Utilisateur' : 'Administrateur'
        }}</span>
      </li>
      <li class="list__item">
        <span class="form__label list__label">Compte activé : </span>
        <span class="list__text">{{ props.selectedUser.active ? 'Oui' : 'Non' }}</span>
      </li>
      <li class="list__item">
        <span class="form__label list__label">Compte Bloqué : </span>
        <span class="list__text">{{ props.selectedUser.accountLockedExpire ? 'oui' : 'Non' }}</span>
      </li>
    </ol>
    <div class="list__btn">
      <button
        @click="
          !modal
            ? appStore.updateModal({
                title: 'Suppression de l\'utilisateur',
                message: 'supprimer définitivement cet utilisateur ?',
                type: 'adminDeleteSelectedUser',
                id: { idUser: props.selectedUser._id }
              })
            : modal && modal.type === 'adminDeleteSelectedUser'
            ? emits('resetModal')
            : ''
        "
        type="button"
        class="list__btn-delete btn"
      >
        Supprimer
      </button>
      <button
        v-if="!modifyUser"
        type="button"
        class="list__btn-modifie btn"
        @click="emits('modifyUser', true)"
      >
        Modifier
      </button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@use '@/assets/style/abstracts/mixins' as m;

.list {
  background-color: var(--color-black-2);
  padding: 2rem;
  &__title {
    margin: 0;
    margin-bottom: 2rem;
  }

  &__content {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, min-content);
    row-gap: 2rem;
    @include m.md {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr;
      column-gap: 2rem;
      row-gap: 0;
    }
    @include m.xl {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(2, min-content);
      row-gap: 2rem;
      column-gap: 0;
    }
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

  &__btn {
    display: flex;
    flex-direction: column;
    row-gap: 2rem;
    @include m.xs {
      flex-direction: row;
      justify-content: center;
      align-items: center;
      column-gap: 2rem;
    }
  }
}
</style> -->
