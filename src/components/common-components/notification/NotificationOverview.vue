<script setup lang="ts">
const props = defineProps<{
  totalNotifications: number
  totalUnreadNotifications: number
  totalReadNotifications: number
}>()
</script>
<template>
  <div class="notificationOverview">
    <span class="notificationOverview__text"
      >Total : <span class="notificationOverview__number">{{ props.totalNotifications }}</span>
    </span>

    <span class="notificationOverview__text"
      >Non lues :
      <span class="notificationOverview__number">{{ props.totalUnreadNotifications }}</span>
    </span>

    <span class="notificationOverview__text"
      >Lues : <span class="notificationOverview__number">{{ props.totalReadNotifications }}</span>
    </span>
  </div>
</template>
<style lang="scss" scoped>
.notificationOverview {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  gap: 1rem;

  &__text {
    font-family: var(--font-subtitle);
    font-weight: 400;
  }

  &__number {
    color: var(--color-purple-1);
    font-weight: bold;
  }
}
</style>
