<script setup lang="ts">
import UpdateUser from '@/components/admin/userProfile/UpdateUser.vue'
import InfoList from '@/components/admin/userProfile/InfoList.vue'
import { ref } from 'vue'
import type { AdminUsersInterface, modalInterface, updateModalInterface } from '@/shared/interfaces'

const props = defineProps<{
  selectedUser: AdminUsersInterface | null
  modal: modalInterface | null
}>()

const emits = defineEmits<{
  (e: 'updateModal', modal: updateModalInterface): void
  (e: 'resetModal'): void
}>()

const modifyUser = ref<boolean>(false)

function updateModifyUser(value: boolean): void {
  modifyUser.value = value
}
</script>
<template>
  <div class="info">
    <h2 class="info__title section__title">Info</h2>

    <Transition name="fade" mode="out-in" appear v-if="!modifyUser">
      <InfoList
        :modifyUser="modifyUser"
        :selectedUser="props.selectedUser"
        :modal="$props.modal"
        @modifyUser="updateModifyUser"
        @updateModal="emits('updateModal', $event)"
        @resetModal="emits('resetModal')"
      />
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
