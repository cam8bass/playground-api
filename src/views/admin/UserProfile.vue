<script lang="ts" setup>
import UserInfo from '@/components/admin/userProfile/UserInfo.vue'
import UserDetail from '@/components/admin/userProfile/UserDetail.vue'
import UserApiKey from '@/components/admin/userProfile/UserApiKey.vue'
import BtnReturn from '@/components/shared-components/BtnReturn.vue'
import type { AppErrorInterface } from '@/shared/interfaces'
import { updateModal, resetModal } from '@/stores/utilities'
import { initStore } from '@/shared/utils'

const { appStore, usersStore, apiKeysStore } = initStore('apiKeysStore', 'usersStore', 'appStore')

const props = defineProps<{
  errors:AppErrorInterface | null
}>()


</script>
<template>
  <div class="profile" v-if="usersStore && apiKeysStore && appStore">
    <h1 class="section__title profile__title">
      Profil de l'utilisateur

      <BtnReturn />
    </h1>
    <div
      class="profile__content"
      :class="{ isAdmin: usersStore.getUser && usersStore.getUser.role === 'admin' }"
    >
      <UserInfo
        class="profile__info"
        :selectedUser="usersStore.getUser"
        :modal="appStore.getModal"
        @updateModal="updateModal($event)"
        @resetModal="resetModal"
      />
      <UserDetail class="profile__detail" :selectedUser="usersStore.getUser" />
      <UserApiKey
        v-if="usersStore.getUser && usersStore.getUser.role === 'user'"
        class="profile__apiKey"
        :errors="props.errors"
        :apiKeysCount="apiKeysStore.getSelectedUserApiKeysCount"
        :activeApiKeysCount="apiKeysStore.getSelectedUserActiveApiKeysCount"
        :pendingApiKeysCount="apiKeysStore.getSelectedUserPendingApiKeysCount"
        :modal="appStore.getModal"
        :apiKeys="apiKeysStore.getSelectedUserApiKeys"
        @resetModal="resetModal"
        @updateModal="updateModal($event)"
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

.isAdmin {
  grid-template-areas:
    'info'
    'detail';
  grid-template-rows: repeat(2, min-content);

  @include m.xl {
    grid-template-areas: 'info detail';
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
  }
}
</style>
