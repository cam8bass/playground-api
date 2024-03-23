<script setup lang="ts">
import { initStore } from '@/shared/utils'
import { logout } from '@/stores/utilities'
import { useRouter } from 'vue-router'
import { closeAllPopup } from '@/stores/utilities'

const { appStore } = initStore('appStore')

const router = useRouter()

/**
 * request a renewal api key
 * @param {object} id - the id of the api key
 * @return {Promise<void>} Promise(void)
 */
async function fetchRenewalApiKey(id: { idApi: string }): Promise<void> {
  const { apiKeysStore } = initStore('apiKeysStore')

  if (!apiKeysStore || !appStore) return
  await apiKeysStore.fetchUserRequestRenewalApiKey(id.idApi)
  appStore.resetModal()
}

/**
 * request a deactivation of the user's account
 * @return {Promise<void>} Promise(void)
 */
async function fetchDeactivationAccount(): Promise<void> {
  const { userStore } = initStore('userStore')

  if (!userStore || !appStore) return
  // make a request to the backend to deactivate the user's account
  await userStore.fetchDeactivationAccount()
  // reset the modal state
  appStore.resetModal()
  // reset the user store
  userStore.resetUserStore()
  // navigate to the home page
  router.push('/home')
}

/**
 * request a change of the user's email
 * @return {Promise<void>} Promise(void)
 */
async function fetchRequestChangeEmail(): Promise<void> {
  const { userStore } = initStore('userStore')

  if (!userStore || !appStore) return
  await userStore.fetchChangeEmailRequest()
  appStore.resetModal()
}

/**
 * request a deletion of an api key
 * @param {object} id - the id of the api key
 * @return {Promise<void>} Promise(void)
 */
async function fetchDeleteSelectedApiKey(id: { idApi: string }): Promise<void> {
  const { apiKeysStore } = initStore('apiKeysStore')

  if (!apiKeysStore || !appStore) return
  await apiKeysStore.fetchUserDeleteSelectedApiKey(id.idApi)
  appStore.resetModal()
}

/**
 * request the deletion of a user
 * @param {object} id - the id of the user
 * @return {Promise<void>} Promise(void)
 */
async function fetchAdminDeleteSelectedUser(id: { idUser: string }) {
  const { usersStore } = initStore('usersStore')

  if (!appStore || !usersStore) return

  await usersStore.fetchAdminDeleteUser(id.idUser)
  appStore.resetModal()
  router.back()
}

/**
 * request the deletion of an api key from a user
 * @param {object} id - the id of the user and the api key
 * @return {Promise<void>} Promise(void)
 */
async function fetchAdminDeleteSelectedApiKey(id: {
  idUser: string
  idApi: string
}): Promise<void> {
  const { apiKeysStore } = initStore('apiKeysStore')

  if (!appStore || !apiKeysStore) return

  await apiKeysStore.fetchAdminDeleteSelectedApiKey(id.idUser, id.idApi)
  appStore.resetModal()
}

/**
 * request the deletion of all api keys from a user
 * @param {object} id - the id of the api key
 * @return {Promise<void>} Promise(void)
 */
async function fetchAdminDeleteAllApiKeysFromUser(id: { idApi: string }): Promise<void> {
  const { apiKeysStore } = initStore('apiKeysStore')

  if (!appStore || !apiKeysStore) return

  await apiKeysStore.fetchAdminDeleteAllApiKeysFromUser(id.idApi)
  appStore.resetModal()
}

/**
 * request the deletion of all notifications from a user
 * @param {object} id - the id of the notification
 * @return {Promise<void>} Promise(void)
 */
async function deleteAllNoticationsUser(id: { idNotification: string }): Promise<void> {
  const { userStore } = initStore('userStore')

  if (!appStore || !userStore) return

  await userStore.fetchDeleteAllNotificationsUser(id.idNotification)
  closeAllPopup()
  appStore.resetModal()
}
</script>
<template>
  <Teleport to="body">
    <Transition mode="out-in" name="fade">
      <div class="modal" v-if="appStore && appStore.getModal">
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
                appStore.getModal.type === 'deleteAllNoticationsUser' &&
                appStore.getModal.id &&
                appStore.getModal.id.idNotification
              "
              class="btn modal__btn--confirm"
              @click="
                deleteAllNoticationsUser({ idNotification: appStore.getModal.id.idNotification })
              "
            >
              Confirmer
            </button>

            <button
              v-if="
                appStore.getModal.type === 'adminDeleteAllApiKeysFromUser' &&
                appStore.getModal.id &&
                appStore.getModal.id.idApi
              "
              class="btn modal__btn--confirm"
              @click="fetchAdminDeleteAllApiKeysFromUser({ idApi: appStore.getModal.id.idApi })"
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
  -webkit-backdrop-filter: blur(5px);
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
