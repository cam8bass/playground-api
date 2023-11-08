<script setup lang="ts">
import MyAccount from '@/components/user/myProfile/MyAccount.vue'

import AccountDeactivation from '@/components/user/myProfile/AccountDeactivation.vue'
import type { errorDevInterface, errorProdInterface } from '@/shared/interfaces'

const props = defineProps<{
  errors: errorDevInterface | errorProdInterface | null
}>()
</script>
<template>
  <div class="profile">
    <MyAccount class="profile__myProfile" :errors="props.errors" />
    <AccountDeactivation class="profile__deactivation" />
  </div>
</template>
<style scoped lang="scss">
@use '@/assets/style/abstracts/mixins' as m;
@import '@/assets/style/abstracts/debug';
.profile {
  align-self: center;
  display: grid;
  grid-template-areas:
    'myProfile'
    'deactivation';
  row-gap: 2rem;
  margin: 2rem 0;
  @include m.lg {
    margin: 3rem 0;
    row-gap: 3rem;
  }

  @include m.xl {
    grid-template-areas: 'myProfile deactivation';
    grid-template-columns: repeat(2, minmax(min-content, 70rem));
    justify-content: center;
    column-gap: 4rem;
    margin: 4rem;
  }

  &__myProfile {
    grid-area: myProfile;
  }

  &__deactivation {
    grid-area: deactivation;
  }
}
</style>
