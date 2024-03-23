<script setup lang="ts">
import { formatDate } from '@/shared/utils'
import { computed } from 'vue'
import ActiveApiKey from '@/components/admin/userProfile/ActiveApiKey.vue'
import { initStore } from '@/shared/utils'

const { appStore, userStore, usersStore } = initStore('appStore', 'userStore', 'usersStore')

const userApiKeys = computed(() => {
  const { apiKeysStore } = initStore('apiKeysStore')

  if (!userStore || !apiKeysStore) return null
  if (userStore.isAdmin) {
    return apiKeysStore.getSelectedUserApiKeys
  } else {
    return apiKeysStore.getCurrentUserApiKeys
  }
})
</script>
<template>
  <div class="apiKeyList" v-if="appStore && userStore">
    <div class="apiKeyList__group" v-for="apiKey in userApiKeys?.apiKeys" :key="apiKey._id">
      <ul class="apiKeyList__list">
        <li class="apiKeyList__item">
          Nom : <span class="apiKeyList__text">{{ apiKey.apiName }}</span>
        </li>

        <li class="apiKeyList__item">
          Clé d'api :
          <span class="apiKeyList__text">{{ apiKey.apiKey ?? 'En attente de validation' }}</span>
        </li>

        <li class="apiKeyList__item" v-if="apiKey.createdAt">
          Création : <span class="apiKeyList__text">{{ formatDate(apiKey.createdAt) }}</span>
        </li>

        <li class="apiKeyList__item" v-if="apiKey.apiKeyExpire">
          Expiration : <span class="apiKeyList__text">{{ formatDate(apiKey.apiKeyExpire) }}</span>
        </li>

        <li class="apiKeyList__item">
          Activé : <span class="apiKeyList__text">{{ apiKey.active ? 'Oui' : 'Non' }}</span>
        </li>

        <li
          class="apiKeyList__item"
          v-if="
            userStore.getCurrentUser && userStore.getCurrentUser.role === 'admin' && !apiKey.active
          "
        >
          <ActiveApiKey :idApi="apiKey._id" />
        </li>
      </ul>
      <div class="apiKeyList__btn">
        <button
          v-if="
            apiKey.active && userStore.getCurrentUser && userStore.getCurrentUser.role === 'user'
          "
          class="btn"
          @click="
            !appStore.getModal
              ? appStore.updateModal({
                  type: 'renewalApiKey',
                  title: 'Demande de renouvellement de clé d\'API.',
                  message: `effectuer une demande de renouvellement de clé pour : ${apiKey.apiName} ?`,
                  id: { idApi: apiKey._id }
                })
              : appStore.getModal && appStore.getModal.type === 'renewalApiKey'
                ? appStore.resetModal
                : ''
          "
        >
          Renouveller
        </button>

        <button
          v-if="userStore.getCurrentUser && userStore.getCurrentUser.role === 'user'"
          class="btn"
          @click="
            !appStore.getModal
              ? appStore.updateModal({
                  type: 'deleteSelectedApiKey',
                  title: 'Demande de suppression de clé d\'API.',
                  message: `effectuer une demande de suppression de clé concernant ${apiKey.apiName} ?`,
                  id: { idApi: apiKey._id }
                })
              : appStore.getModal && appStore.getModal.type === 'deleteSelectedApiKey'
                ? appStore.resetModal
                : ''
          "
        >
          Supprimer
        </button>

        <button
          v-if="
            userStore.getCurrentUser &&
            userStore.getCurrentUser.role === 'admin' &&
            usersStore &&
            usersStore.getUser
          "
          class="btn"
          @click="
            !appStore.getModal
              ? appStore.updateModal({
                  type: 'adminDeleteSelectedApiKey',
                  title: 'Demande de suppression de clé d\'API.',
                  message: `effectuer une demande de suppression de clé concernant ${apiKey.apiName} ?`,
                  id: {
                    idApi: apiKey._id,
                    idUser: usersStore.getUser._id
                  }
                })
              : appStore.getModal && appStore.getModal.type === 'adminDeleteSelectedApiKey'
                ? appStore.resetModal
                : ''
          "
        >
          Supprimer
        </button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@use '@/assets/style/abstracts/mixins' as m;

.apiKeyList {
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  height: 40rem;
  overflow-y: scroll;
  &__group {
    padding: 2rem;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr min-content;
    row-gap: 2rem;
    background-color: var(--color-black-2);

    @include m.md {
      grid-template-columns: 1fr min-content;
      row-gap: 0;
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
  }

  &__item {
    font-family: var(--font-subtitle);
    font-weight: 100;
  }

  &__text {
    font-family: var(--font-subtext);
    color: var(--color-purple-1);
    font-weight: bold;
  }

  &__btn {
    display: flex;
    flex-direction: column;
    row-gap: 2rem;

    @include m.xs {
      flex-direction: row;
      column-gap: 2rem;
      row-gap: 0;
    }

    @include m.md {
      flex-direction: column;
      row-gap: 2rem;
      column-gap: 0;
      justify-content: center;
    }
  }
}
</style>
