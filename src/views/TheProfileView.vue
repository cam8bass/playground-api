<script setup lang="ts">
import MyProfile from '@/components/user/MyProfile.vue'
import MyAchieves from '@/components/user/MyAchieves.vue'
import MyApiKeys from '@/components/user/MyApiKeys.vue'
import AccountDeactivation from '@/components/user/AccountDeactivation.vue'
</script>
<template>
  <div class="profile">
    <MyProfile class="profile__myProfile" />
    <MyAchieves class="profile__myAchieves" />
    <MyApiKeys class="profile__myApiKeys" />
    <AccountDeactivation class="profile__deactivation" />
  </div>
</template>
<style scoped lang="scss">
@use '@/assets/abstracts/mixins' as m;
@import '@/assets/abstracts/debug';
.profile {
  display: grid;
  grid-template-areas:
    'myProfile'
    'myAchieves'
    'myApiKeys'
    'deactivation';
  row-gap: 2rem;
  margin: 2rem 0;
  @include m.lg {
    margin: 3rem 0;
    row-gap: 3rem;
  }
  
  @include m.xl {
    grid-template-areas:
    'myProfile myAchieves'
    'myApiKeys deactivation';
    row-gap: 4rem;
    column-gap: 4rem;
    margin: 4rem;
    justify-content: center;
  }

  &__myProfile {
    grid-area: myProfile;
  }

  &__myAchieves {
    grid-area: myAchieves;
  }

  &__myApiKeys {
    grid-area: myApiKeys;
  }

  &__deactivation {
    grid-area: deactivation;
  }
}
</style>
