<script setup lang="ts">
import ThePagination from '@/components/shared-components/ThePagination.vue'

import type { AdminUsersInterface } from '@/shared/interfaces'

const emits = defineEmits<{
  (e: 'nextPage'): void
  (e: 'prevPage'): void
}>()

const props = defineProps<{
  allUsers: AdminUsersInterface[] | null
  currentPage: number
  totalPages: number
}>()
</script>
<template>
  <div class="usersList list">
    <!-- Users list -->
    <div class="list__content">
      <div class="list__group" v-for="user in props.allUsers" :key="user._id">
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
    <!-- Pagination -->
    <ThePagination
      :currentPage="props.currentPage"
      :totalPages="props.totalPages"
      @nextPage="emits('nextPage')"
      @prevPage="emits('prevPage')"
    />
  </div>
</template>
<style scoped lang="scss">
@use '@/assets/style/abstracts/mixins' as m;
</style>
