<script setup lang="ts">
import { useCurrentUserStore, useUsersStore } from '@/stores'
import { computed, onMounted } from 'vue'

import UsersPagination from './UsersPagination.vue'

const currentUserStore = useCurrentUserStore()

const usersStore = computed(() => {
  if (currentUserStore.getCurrentUser && currentUserStore.getCurrentUser.role === 'admin') {
    return useUsersStore()
  }
  return null
})

const initAdminGetAllUsers = async () => {
  if (usersStore.value) {
    await usersStore.value.fetchAdminGetAllUsers()
  }
}

// const fetchAdminGetAllUsers = async (limit: number = 10) => {
//   if (usersStore.value) {
//     usersStore.value.resetUsersStore()
//     await usersStore.value.fetchAdminGetAllUsers(usersStore.value.getCurrentPage, limit)
//   }
// }

onMounted(initAdminGetAllUsers)
</script>
<template>
  <div class="usersList list" v-if="usersStore">
    <!-- Pagination -->
    <UsersPagination />

    <!-- Users list -->
    <div class="list__content" v-if="usersStore">
      <div class="list__group" v-for="user in usersStore.getAllUsers" :key="user._id">
        <ul class="list__list">
          <li class="list__item" v-if="user._id">
            Id : <span class="list__text">{{ user._id }}</span>
          </li>

          <li class="list__item" v-if="user.lastname">
            Nom : <span class="list__text">{{ user.lastname }}</span>
          </li>

          <li class="list__item" v-if="user.firstname">
            Prénom : <span class="list__text">{{ user.firstname }}</span>
          </li>

          <li class="list__item" v-if="user.email">
            Email : <span class="list__text">{{ user.email }}</span>
          </li>

          <li class="list__item" v-if="user.role">
            Rôle : <span class="list__text">{{ user.role }}</span>
          </li>
          <!-- TODO: Voir pour ne pas afficher active  que si active est pas du tout dans l'object user -->
          <li class="list__item" v-if="user.hasOwnProperty('active')">
            Activé : <span class="list__text">{{ user.active ? 'oui' : 'non' }}</span>
          </li>

          <li class="list__item" v-if="user.accountLockedExpire">
            Bloqué :
            <span class="list__text">{{ user.accountLockedExpire ? 'oui' : 'non' }}</span>
          </li>
        </ul>

        <router-link :to="'/users/' + user._id" class="list__link">Details</router-link>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@use '@/assets/style/abstracts/mixins' as m;
</style>
