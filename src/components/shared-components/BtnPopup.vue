<script setup lang="ts">
const props = defineProps<{
  idNotification: string
}>()

const emits = defineEmits<{
  (e: 'closePopup'): void
  (e: 'updateNotification', idNotification: string): void
  (e: 'deleteSelectedNotification', idNotification: string): void
}>()
</script>
<template>
  <div class="btnPopup">
    <button
      type="button"
      class="btn-small btnPopup__btn"
      title="Cliquez pour marquer la notification comme lue"
      aria-label="Cliquez pour marquer la notification comme lue"
      @click="emits('updateNotification', props.idNotification), emits('closePopup')"
    >
      Lue
    </button>

    <button
      type="button"
      class="btn-small btnPopup__btn"
      title="Cliquez pour supprimer la notification"
      aria-label="Cliquez pour supprimer la notification"
      @click="emits('deleteSelectedNotification', props.idNotification), emits('closePopup')"
    >
      Supprimer
    </button>
  </div>
</template>
<style lang="scss" scoped>
.btnPopup {
  display: flex;
  justify-content: space-evenly;

  &__btn {
    // background-color: transparent;

    &:hover .btnPopup__icon,
    &:active .btnPopup__icon {
      fill: var(--color-purple-1);
    }
  }

  &__icon {
    transition: fill 0.2s;
    width: 2.5rem;
    height: 2.5rem;
    fill: var(--color-white);
  }
}
</style>

<!-- <script setup lang="ts"></script>
<template>
  <div class="btnPopup">
    <button
      class="btnPopup__btn"
      title="Cliquez pour marquer la notification comme lue"
      aria-label="Cliquez pour marquer la notification comme lue"
    >
      <svg class="btnPopup__icon">
        <use xlink:href="@/components/icons/sprite.svg#icon-check"></use>
      </svg>
    </button>

    <button
      class="btnPopup__btn"
      title="Cliquez pour supprimer la notification"
      aria-label="Cliquez pour supprimer la notification"
    >
      <svg class="btnPopup__icon">
        <use xlink:href="@/components/icons/sprite.svg#icon-trash-o"></use>
      </svg>
    </button>
  </div>
</template>
<style lang="scss" scoped>
.btnPopup {
  display: flex;
  justify-content: space-around;

  &__btn {
    background-color: transparent;

    &:hover .btnPopup__icon,
    &:active .btnPopup__icon {
      fill: var(--color-purple-1);
    }
  }

  &__icon {
    transition: fill 0.2s;
    width: 2.5rem;
    height: 2.5rem;
    fill: var(--color-white);
  }
}
</style> -->
