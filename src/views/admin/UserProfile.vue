<script lang="ts" setup>
import UserInfo from '@/components/admin/userProfile/UserInfo.vue'
import UserDetail from '@/components/admin/userProfile/UserDetail.vue'
import UserApiKey from '@/components/admin/userProfile/UserApiKey.vue'
import BtnReturn from '@/components/shared-components/BtnReturn.vue'
import { useRoute } from 'vue-router'
import type {
  errorDevInterface,
  errorProdInterface,
  updateModalInterface
} from '@/shared/interfaces'
import { computed, onMounted } from 'vue'
import { useApiKeysStore, useCurrentUserStore, useUsersStore, useAppStore } from '@/stores'

const route = useRoute()
const appStore = useAppStore()
const currentUserStore = useCurrentUserStore()

const usersStore = computed(() => {
  if (currentUserStore.getCurrentUser && currentUserStore.getCurrentUser.role === 'admin') {
    return useUsersStore()
  }
  return null
})

const apiKeysStore = computed(() => {
  if (currentUserStore.getCurrentUser && currentUserStore.getCurrentUser.role === 'admin') {
    return useApiKeysStore()
  }
  return null
})

const props = defineProps<{
  errors: errorDevInterface | errorProdInterface | null
}>()

function updateModal(modal: updateModalInterface): void {
  appStore.updateModal(modal)
}

function resetModal(): void {
  appStore.resetModal()
}

const fetchUserProfile = async () => {
  const { id } = route.params
  if (usersStore.value) {
    await usersStore.value.fetchAdminGetUser(id as string)

    if (apiKeysStore.value && usersStore.value.getUser) {
      await apiKeysStore.value.fetchAdminGetSelectedUserApiKeys(usersStore.value.getUser._id)
    }
  }
}

onMounted(fetchUserProfile)
</script>
<template>
  <div class="profile" v-if="usersStore">
    <h1 class="section__title profile__title">
      Profil de l'utilisateur

      <BtnReturn />
    </h1>
    <div class="profile__content">
      <UserInfo
        class="profile__info"
        :selectedUser="usersStore.getUser"
        :modal="appStore.getModal"
        @updateModal="updateModal($event)"
        @resetModal="resetModal"
      />
      <UserDetail class="profile__detail" :selectedUser="usersStore.getUser" />
      <UserApiKey
        v-if="apiKeysStore"
        class="profile__apiKey"
        :errors="props.errors"
        :apiKeysCount="apiKeysStore?.getUserApiKeysCount"
        :activeApiKeysCount="apiKeysStore?.getUserActiveApiKeysCount"
        :pendingApiKeysCount="apiKeysStore?.getUserPendingApiKeysCount"
      />
    </div>
  </div>
</template>
<style lang="scss" scoped>
@use '@/assets/style/abstracts/mixins' as m;
@import '@/assets/style/abstracts/debug.scss';
.profile {
  background-color: var(--color-black-2);
  &__content {
    padding: 2rem;
    display: grid;
    grid-template-areas:
      'info'
      'detail'
      'apiKey';
    grid-template-rows: repeat(3, min-content);

    gap: 2rem;

    @include m.xl {
      grid-template-areas:
        'info apiKey'
        'detail apiKey';
      grid-template-columns: max-content 1fr;
      grid-template-rows: repeat(2, min-content);
    }
  }

  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__info {
    grid-area: info;
  }

  &__detail {
    grid-area: detail;
  }

  &__apiKey {
    grid-area: apiKey;
  }
}
</style>
