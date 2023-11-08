<script setup lang="ts">

import { useUsersStore } from '@/stores';

const usersStore=useUsersStore()


</script>
<template>
  <div class="usersList list">
    <div class="list__content">
      <div class="list__group" v-for="user in usersStore.getAllUsers" :key="user._id">
        <ul class="list__list">
          <li class="list__item">
            Id : <span class="list__text">{{ user._id }}</span>
          </li>

          <li class="list__item">
            Nom : <span class="list__text">{{ user.lastname }}</span>
          </li>

          <li class="list__item">
            Prénom : <span class="list__text">{{ user.firstname }}</span>
          </li>

          <li class="list__item">
            Email : <span class="list__text">{{ user.email }}</span>
          </li>

          <li class="list__item">
            Rôle : <span class="list__text">{{ user.role }}</span>
          </li>

          <li class="list__item">
            Activé : <span class="list__text">{{ user.active ? 'oui' : 'non' }}</span>
          </li>

          <li class="list__item">
            Bloqué :
            <span class="list__text">{{ user.accountLockedExpire ? 'oui' : 'non' }}</span>
          </li>
        </ul>

        <router-link :to="'/users/' + user._id" class="list__link">Details</router-link>
      </div>
    </div>
    <!-- <div class="list__pagination">
      <button class="btn list__pagination-return">Précédent</button>
      <button class="btn list__pagination-next">Suivant</button>
    </div> -->
  </div>
</template>
<style scoped lang="scss">
@use '@/assets/style/abstracts/mixins' as m;


</style>
