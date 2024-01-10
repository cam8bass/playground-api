<script setup lang="ts">
import { initObserver } from '@/shared/utils'
import { ref, onMounted } from 'vue'

const props = defineProps<{
  animationType: string
}>()

const target = ref<HTMLDivElement | null>(null)
const animate = ref<boolean>(false)

onMounted(() => {
  initObserver(target, animate)
})
</script>

<template>
  <Transition
    :name="props.animationType"
    mode="out-in"
    v-appear="animate"
    class="animated-component"
    ref="target"
  >
    <slot></slot>
  </Transition>
</template>

<style scoped lang="scss">
.animated-component.fade-enter-from,
.animated-component.translateLeft-enter-from,
.animated-component.translateRight-enter-from,
.animated-component.opacity-enter-from {
  transition: none;
}

// *** Fade animation ***
.fade-enter-active,
.fade-leave-active {
  transition: all 1s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(100px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(0);
}

// *** Translate left animation ***
.translateLeft-enter-active,
.translateLeft-leave-active {
  transition: all 1s ease;
}

.translateLeft-enter-from {
  opacity: 0;
  transform: translateX(-200px);
}

.translateLeft-leave-to {
  opacity: 0;
  transform: translateX(0);
}

// *** Translate right animation ***
.translateRight-enter-active,
.translateRight-leave-active {
  transition: all 1s ease;
}

.translateRight-enter-from {
  opacity: 0;
  transform: translateX(200px);
}

.translateRight-leave-to {
  opacity: 0;
  transform: translateX(0);
}

// *** Opacity animation ***

.opacity-enter-active,
.opacity-leave-active {
  transition: opacity 4s ease;
}

.opacity-enter-from {
  opacity: 0;
}

.opacity-leave-to {
  opacity: 1;
}
</style>
