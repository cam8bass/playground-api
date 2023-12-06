<script setup lang="ts">
import { useApiKeysStore, useAppStore, useCurrentUserStore, useUsersStore } from '@/stores'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const appStore = useAppStore()
const currentUserStore = useCurrentUserStore()

const apiKeysStore = computed(() => {
  if (currentUserStore.getCurrentUser && currentUserStore.getCurrentUser.role === 'admin') {
    return useApiKeysStore()
  }
  return null
})

const usersStore = computed(() => {
  if (currentUserStore.getCurrentUser && currentUserStore.getCurrentUser.role === 'admin') {
    return useUsersStore()
  }
  return null
})
const router = useRouter()

async function logout(): Promise<void> {
  await currentUserStore.fetchLogout()
  if (
    currentUserStore.getCurrentUser &&
    currentUserStore.getCurrentUser.role === 'admin' &&
    usersStore.value
  ) {
    usersStore.value.resetUsersStore()
  }

  if (
    currentUserStore.getCurrentUser &&
    currentUserStore.getCurrentUser.role === 'admin' &&
    apiKeysStore.value
  ) {
    apiKeysStore.value.resetApiKeysStore()
  }
  currentUserStore.resetCurrentUserStore()
  appStore.resetModal()
  router.push('/home')
}

async function fetchRenewalApiKey(id: { idApi: string }): Promise<void> {
  await currentUserStore.fetchUserRequestRenewalApiKey(id.idApi)

  appStore.resetModal()
}

async function fetchDeactivationAccount(): Promise<void> {
  await currentUserStore.fetchDeactivationAccount()
  appStore.resetModal()
  currentUserStore.resetCurrentUserStore()
  router.push('/home')
}

async function fetchRequestChangeEmail(): Promise<void> {
  await currentUserStore.fetchChangeEmailRequest()
  appStore.resetModal()
}

async function fetchDeleteSelectedApiKey(id: { idApi: string }): Promise<void> {
  await currentUserStore.fetchUserDeleteSelectedApiKey(id.idApi)
  appStore.resetModal()
}

async function fetchAdminDeleteSelectedUser(id: { idUser: string }) {
  if (usersStore.value) {
    await usersStore.value.fetchAdminDeleteUser(id.idUser)
    appStore.resetModal()
    router.back()
  }
}

async function fetchAdminDeleteSelectedApiKey(id: {
  idUser: string
  idApi: string
}): Promise<void> {
  if (apiKeysStore.value) {
    await apiKeysStore.value.fetchAdminDeleteSelectedApiKey(id.idUser, id.idApi)
    appStore.resetModal()
  }
}
</script>
<template>
  <Teleport to="body">
    <Transition mode="out-in" name="fade">
      <div class="modal" v-if="appStore.getModal">
        <div class="modal__content">
          <h3 class="modal__title">{{ appStore.getModal.title }}</h3>
          <p class="modal__message">Êtes-vous sûr de vouloir {{ appStore.getModal.message }}</p>
          <div class="modal__btn">
            <button class="btn modal__btn--cancel" @click="appStore.resetModal">Annuler</button>
            <button
              v-if="appStore.getModal.type === 'logout'"
              class="btn modal__btn--confirm"
              @click="logout"
            >
              Confirmer
            </button>

            <button
              v-if="appStore.getModal.type === 'requestChangeEmail'"
              class="btn modal__btn--confirm"
              @click="fetchRequestChangeEmail"
            >
              Confirmer
            </button>
            <button
              v-if="appStore.getModal.type === 'deactivation'"
              class="btn modal__btn--confirm"
              @click="fetchDeactivationAccount"
            >
              Confirmer
            </button>

            <button
              v-if="
                appStore.getModal.type === 'renewalApiKey' &&
                appStore.getModal.id &&
                appStore.getModal.id.idApi
              "
              class="btn modal__btn--confirm"
              @click="fetchRenewalApiKey({ idApi: appStore.getModal.id.idApi })"
            >
              Confirmer
            </button>
            <button
              v-if="
                appStore.getModal.type === 'deleteSelectedApiKey' &&
                appStore.getModal.id &&
                appStore.getModal.id.idApi
              "
              class="btn modal__btn--confirm"
              @click="fetchDeleteSelectedApiKey({ idApi: appStore.getModal.id.idApi })"
            >
              Confirmer
            </button>

            <button
              v-if="
                appStore.getModal.type === 'adminDeleteSelectedUser' &&
                appStore.getModal.id &&
                appStore.getModal.id.idUser
              "
              class="btn modal__btn--confirm"
              @click="fetchAdminDeleteSelectedUser({ idUser: appStore.getModal.id.idUser })"
            >
              Confirmer
            </button>

            <button
              v-if="
                appStore.getModal.type === 'adminDeleteSelectedApiKey' &&
                appStore.getModal.id &&
                appStore.getModal.id.idApi &&
                appStore.getModal.id.idUser
              "
              class="btn modal__btn--confirm"
              @click="
                fetchAdminDeleteSelectedApiKey({
                  idUser: appStore.getModal.id.idUser,
                  idApi: appStore.getModal.id.idApi
                })
              "
            >
              Confirmer
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
<style scoped lang="scss">
@import '@/assets/style/base/animation';
.modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5000;
  background-color: var(--color-black-2);
  backdrop-filter: blur(5px);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__content {
    background-color: var(--color-black-2);
    padding: 2rem;
    display: flex;
    flex-direction: column;
    box-shadow: var(--boxshadow-black);
  }
  &__title {
    font-family: var(--font-subtitle);
    font-weight: 100;
    margin-bottom: 2rem;
    font-size: 2rem;
  }

  &__message {
    margin-bottom: 2rem;
    font-weight: 100;
  }

  &__btn {
    align-self: center;
    &--cancel {
      margin-right: 2rem;
      margin-bottom: 2rem;
    }
    &--confirm {
    }
  }
}
</style>
