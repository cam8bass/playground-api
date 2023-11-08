<script setup lang="ts">
import ChangeName from '@/components/user/myProfile/ChangeName.vue'
import ChangeEmail from '@/components/user/myProfile/ChangeEmail.vue'
import ChangePassword from '@/components/user/myProfile/ChangePassword.vue'
import type { errorDevInterface, errorProdInterface } from '@/shared/interfaces'

defineProps<{
  errors: errorDevInterface | errorProdInterface | null
}>()

</script>
<template>
  <article class="myProfile">
    <h1 class="section__title myProfile__title">Mon profil</h1>

    <div class="myProfile__content">
      <ChangeName class="myProfile__form myProfile__form--name" :errors="errors" />
      <ChangeEmail class="myProfile__form myProfile__form--email" />
      <ChangePassword class="myProfile__form myProfile__form--password" :errors="errors" />
    </div>
  </article>
</template>
<style scoped lang="scss">
@use '@/assets/style/abstracts/mixins' as m;
.myProfile {
  background-color: var(--color-black-2);

  &__content {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(3, min-content);
    justify-items: center;
    row-gap: 2rem;
    margin: 2rem;
    @include m.lg {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(2, min-content);
      column-gap: 2rem;
    }

    @include m.xl {
      grid-template-columns: repeat(2, max-content);
      justify-content: center;
    }
  }

  &__form {
    background-color: var(--color-black-2);
    width: 100%;
    max-width: 40rem;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    box-shadow: var(--boxshadow-black);
    &--name {
      @include m.lg {
        grid-row: 1/2;
        grid-column: 1/2;
      }
    }

    &--email {
      @include m.lg {
        grid-row: 2/-1;
        grid-column: 1/2;
      }
    }

    &--password {
      @include m.lg {
        grid-row: 1/-1;
        grid-column: 2/-1;
      }
    }
  }
}
</style>
