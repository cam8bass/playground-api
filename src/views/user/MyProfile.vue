<script setup lang="ts">
import MyAccount from '@/components/user/myProfile/MyAccount.vue'
import type { AppErrorInterface } from '@/shared/interfaces'

const props = defineProps<{
  errors: AppErrorInterface | null
}>()
</script>
<template>
  <div class="profile">
    <h1 class="section__title profile__title">Mon profil</h1>

    <MyAccount :errors="props.errors" class="profile__content" />
  </div>
</template>
<style scoped lang="scss">
@use '@/assets/style/abstracts/mixins' as m;
@import '@/assets/style/abstracts/debug';
.profile {
  display: flex;
  flex-direction: column;
  background-color: var(--color-black-2);

  &__content {
    @include m.xl {
      align-self: center;
    }
  }
}
</style>
