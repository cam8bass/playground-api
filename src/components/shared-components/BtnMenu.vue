<script setup lang="ts">
import type { NavigationType } from '@/shared/types/types'

const props = defineProps<{
  openMenu: boolean
}>()

const emits = defineEmits<{
  (e: 'updateNavigation', navigation: { type: NavigationType; value?: boolean }): void
}>()
</script>
<template>
  <div class="btnMenu">
    <input
      @click="
        emits('updateNavigation', { type: 'login', value: false }),
          emits('updateNavigation', { type: 'menu' })
      "
      type="checkbox"
      class="btnMenu-checkbox"
      id="navi-toggle"
      :checked="props.openMenu"
    />

    <label for="navi-toggle" class="btnMenu-btn">
      <span class="btnMenu-icon">&nbsp;</span>
    </label>
  </div>
</template>
<style lang="scss" scoped>
.btnMenu {
  &-checkbox {
    display: none;
  }

  &-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background-color: transparent;
    height: 4rem;
    width: 4rem;
    cursor: pointer;
    transition: all 0.2s;
    z-index: 3000;
  }

  //ICON
  &-icon {
    position: relative;

    &,
    &::before,
    &::after {
      width: 3rem;
      height: 3px;
      background-color: var(--color-white);
      display: inline-block;
    }

    &::before,
    &::after {
      content: '';
      position: absolute;
      left: 0;
      transition: all 0.2s;
    }

    &::before {
      top: -0.8rem;
    }
    &::after {
      top: 0.8rem;
    }
  }

  &-checkbox:checked + &-btn &-icon {
    background-color: transparent;
    position: fixed;
  }

  &-checkbox:checked + &-btn &-icon::before {
    top: 0;
    transform: rotate(135deg);
  }

  &-checkbox:checked + &-btn &-icon::after {
    top: 0;
    transform: rotate(-135deg);
  }
}
</style>
