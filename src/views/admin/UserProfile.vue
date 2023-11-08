<script lang="ts" setup>
import UserInfo from '@/components/admin/userProfile/UserInfo.vue'
import UserDetail from '@/components/admin/userProfile/UserDetail.vue'
import UserApiKey from '@/components/admin/userProfile/UserApiKey.vue'
import { useRouter } from 'vue-router'
import type { errorDevInterface, errorProdInterface } from '@/shared/interfaces'

const router = useRouter()

const props = defineProps<{
  errors: errorDevInterface | errorProdInterface | null
}>()
</script>
<template>
  <div class="profile">
    <div class="profile__btn">
      <button type="button" class="profile__btn-return" @click="router.back()">
        <svg class="profile__btn-icon">
          <use xlink:href="@/components/icons/sprite.svg#icon-arrow-left-circle"></use>
        </svg>

        Retour
      </button>
    </div>
    <UserInfo class="profile__info" />
    <UserDetail class="profile__detail" />
    <UserApiKey class="profile__apiKey" :errors="props.errors" />
  </div>
</template>
<style lang="scss" scoped>
@use '@/assets/style/abstracts/mixins' as m;
@import '@/assets/style/abstracts/debug.scss';
.profile {
  display: grid;
  grid-template-areas:
    'btn'
    'info'
    'detail'
    'apiKey';
  grid-template-rows: repeat(4, min-content);
  row-gap: 2rem;

  @include m.xl {
    grid-template-areas:
      'btn btn'
      'info apiKey'
      'detail apiKey';
    grid-template-columns: max-content 1fr;
    grid-template-rows: repeat(3, min-content);
    column-gap: 4rem;
    margin: 4rem;
  }
  &__btn {
    grid-column: 1/-1;
    grid-row: 1/2;
    grid-area: btn;
    // padding: 2rem;

    &-icon {
      transition: fill 0.4s;
      fill: var(--color-white);
      height: 3rem;
      width: 3rem;
    }

    &-return {
      font-family: var(--font-subtitle);
      font-weight: 400;
      transition: color 0.4s;
      background-color: transparent;
      display: flex;
      align-items: center;
      column-gap: 1rem;
      color: var(--color-white);
      font-size: 1.6rem;
    }

    &:hover &-return,
    &:active &-return {
      color: var(--color-purple-1);
    }

    &:hover &-icon,
    &:active &-icon {
      fill: var(--color-purple-1);
    }
  }

  &__info {
    grid-area: info;
  }

  &__detail {
    grid-area: detail;
  }

  &__apiKey {
    grid-area: apiKey;
  }
}
</style>
