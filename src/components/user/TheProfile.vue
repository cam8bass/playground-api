<script setup lang="ts">
import MyProfile from '@/components/user/myProfile/MyProfile.vue'

import MyApiKeys from '@/components/user/MyApiKeys.vue'
import AccountDeactivation from '@/components/user/myProfile/AccountDeactivation.vue'
import type { errorDevInterface, errorProdInterface, modalInterface } from '@/shared/interfaces'
import type { modalType } from '@/shared/types/types'

const props = defineProps<{
  errors: errorDevInterface | errorProdInterface | null
  modal: modalInterface | null
}>()

const emits = defineEmits<{
  (e: 'requestChangeEmail', modal: { type: modalType; title: string; message: string }): void
  (e: 'deactivation', modal: { type: modalType; title: string; message: string }): void
  (e: 'cancel'): void
  (
    e: 'renewalApiKey',
    modal: { type: modalType; title: string; message: string; _id: string }
  ): void
  (
    e: 'deleteSelectedApiKey',
    modal: { type: modalType; title: string; message: string; _id: string }
  ): void
}>()
</script>
<template>
  <div class="profile">
    <MyProfile
      class="profile__myProfile"
      :errors="props.errors"
      :modal="props.modal"
      @cancel="emits('cancel')"
      @request-change-email="emits('requestChangeEmail', $event)"
    />

    <AccountDeactivation
      class="profile__deactivation"
      :modal="props.modal"
      @deactivation="emits('deactivation', $event)"
      @cancel="emits('cancel')"
    />
  </div>
</template>
<style scoped lang="scss">
@use '@/assets/abstracts/mixins' as m;
@import '@/assets/abstracts/debug';
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
