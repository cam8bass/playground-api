<script setup lang="ts">
import ChangeName from '@/components/user/myProfile/ChangeName.vue'
import ChangeEmail from '@/components/user/myProfile/ChangeEmail.vue'
import ChangePassword from '@/components/user/myProfile/ChangePassword.vue'
import AccountDeactivation from '@/components/user/myProfile/AccountDeactivation.vue'
import type { errorDevInterface, errorProdInterface } from '@/shared/interfaces'

defineProps<{
  errors: errorDevInterface | errorProdInterface | null
}>()
</script>
<template>
  <article class="myProfile">
    <ChangeName class="myProfile__form" :errors="errors" />
    <ChangePassword class="myProfile__form" :errors="errors" />
    <ChangeEmail class="myProfile__form" />
    <AccountDeactivation class="myProfile__form profile__deactivation" />
  </article>
</template>
<style scoped lang="scss">
@use '@/assets/style/abstracts/mixins' as m;
.myProfile {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(40rem, 1fr));
  grid-template-rows: auto;
  gap: 2rem;
  align-self: stretch;
  @include m.lg {
    margin: 2rem;
  }

  &__form {
    background-color: var(--color-black-2);
    padding: 2rem;
    display: grid;
    grid-template-rows: min-content 1fr;
    align-items: center;
  }
}
</style>
