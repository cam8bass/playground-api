<script setup lang="ts">
import UpdateUser from '@/components/admin/userProfile/UpdateUser.vue'
import InfoList from '@/components/admin/userProfile/InfoList.vue'
import { ref } from 'vue'

const modifyUser = ref<boolean>(false)

function updateModifyUser(value: boolean): void {
  modifyUser.value = value
}
</script>
<template>
  <div class="info">
    <h1 class="info__title section__title">Info</h1>

    <Transition name="fade" mode="out-in" appear v-if="!modifyUser">
      <InfoList :modifyUser="modifyUser" @modifyUser="updateModifyUser" />
    </Transition>

    <Transition name="fade" mode="out-in" appear v-if="modifyUser">
      <UpdateUser class="info__modify" @modify="updateModifyUser" />
    </Transition>
  </div>
</template>
<style lang="scss" scoped>
@use '@/assets/style/abstracts/mixins' as m;

@import '@/assets/style/base/animation';

.info {
  background-color: var(--color-black-2);
  padding: 2rem;
  &__title {
    margin: 0;
    margin-bottom: 2rem;
  }
}
</style>
