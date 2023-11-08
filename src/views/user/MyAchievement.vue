<!-- <script setup lang="ts"></script>
<template>
  <article class="myAchieves">
    <h2 class="myAchieves__title section__title">Mes réalisations</h2>

    <div class="myAchieves__content">
      <div class="myAchieves__btn">
        <button class="btn myAchieves__btn--add">Ajouter un site</button>
        <button class="btn myAchieves__btn--delete">Supprimer tous mes sites</button>
      </div>

      <ul class="myAchieves__list">
        <li class="myAchieves__item">
          <span class="myAchieves__item-text">Mon site 1</span>

          <button class="myAchieves__item-btn myAchieves__item-btn--add">
            <svg class="myAchieves__item-icon">
              <use xlink:href="@/components/icons/sprite.svg#icon-edit"></use>
            </svg>
          </button>

          <button class="myAchieves__item-btn myAchieves__item-btn--delete">
            <svg class="myAchieves__item-icon">
              <use xlink:href="@/components/icons/sprite.svg#icon-bin2"></use>
            </svg>
          </button>
        </li>

        <li class="myAchieves__item">
          <span class="myAchieves__item-text">Mon site 2</span>

          <button class="myAchieves__item-btn myAchieves__item-btn--add">
            <svg class="myAchieves__item-icon">
              <use xlink:href="@/components/icons/sprite.svg#icon-edit"></use>
            </svg>
          </button>

          <button class="myAchieves__item-btn myAchieves__item-btn--delete">
            <svg class="myAchieves__item-icon">
              <use xlink:href="@/components/icons/sprite.svg#icon-bin2"></use>
            </svg>
          </button>
        </li>

        <li class="myAchieves__item">
          <span class="myAchieves__item-text">Mon site 3</span>

          <button class="myAchieves__item-btn myAchieves__item-btn--add">
            <svg class="myAchieves__item-icon">
              <use xlink:href="@/components/icons/sprite.svg#icon-edit"></use>
            </svg>
          </button>

          <button class="myAchieves__item-btn myAchieves__item-btn--delete">
            <svg class="myAchieves__item-icon">
              <use xlink:href="@/components/icons/sprite.svg#icon-bin2"></use>
            </svg>
          </button>
        </li>
      </ul>
    </div>
  </article>
</template>
<style scoped lang="scss">
@use '@/assets/style/abstracts/mixins' as m;

.myAchieves {
  background-color: var(--color-black-2);

  &__title {
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    margin: 2rem;
  }

  &__btn {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 2rem;

    @include m.md {
      flex-direction: row;
    }

    &--add {
      margin-bottom: 2rem;

      @include m.md {
        margin-bottom: 0;
        margin-right: 2rem;
      }
    }

    &--delete {
    }
  }

  &__list {
  }

  &__item {
    display: grid;
    grid-template-columns: 1fr repeat(2, min-content);
    align-items: center;
    &:not(:last-of-type) {
      margin-bottom: 2rem;
    }
    &-text {
      margin-right: 2rem;
      font-size: 1.8rem;
      font-weight: 100;
    }

    &-btn {
      background-color: transparent;

      &--add {
        margin-right: 1rem;
      }

      &--delete {
      }
    }

    &-icon {
      width: 2rem;
      height: 2rem;
      fill: var(--color-white);
      transition: fill 0.4s;

      &:hover,
      &:active {
        fill: var(--color-purple-1);
      }
    }
  }
}
</style> -->
