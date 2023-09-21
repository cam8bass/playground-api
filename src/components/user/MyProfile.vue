<script setup lang="ts"></script>
<template>
  <article class="myProfile">
    <h1 class="section__title myProfile__title">Mon profil</h1>

    <div class="myProfile__content">
      <form action="" class="myProfile__form myProfile__form--name">
        <div class="myProfile__form-group">
          <label for="firstname" class="myProfile__form-label">Nom</label>
          <input type="text" id="firstname" class="myProfile__form-input" value="laignel" />
          <button type="submit" class="myProfile__form-btn">
            <svg class="myProfile__form-icon" aria-label="Modifier le nom">
              <use xlink:href="@/components/icons/sprite.svg#icon-edit"></use>
            </svg>
          </button>
        </div>

        <div class="myProfile__form-group">
          <label for="lastname" class="myProfile__form-label">Prénom</label>
          <input type="text" id="lastname" class="myProfile__form-input" value="camille" />
          <button type="submit" class="myProfile__form-btn">
            <svg class="myProfile__form-icon" aria-label="Modifier le prénom">
              <use xlink:href="@/components/icons/sprite.svg#icon-edit"></use>
            </svg>
          </button>
        </div>
      </form>

      <form action="" class="myProfile__form myProfile__form--email">
        <div class="myProfile__form-group">
          <label for="email" class="myProfile__form-label">Email</label>
          <input type="email" id="email" class="myProfile__form-input" value="cam@email.fr" />
          <button type="submit" class="myProfile__form-btn">
            <svg class="myProfile__form-icon" aria-label="Modifier email">
              <use xlink:href="@/components/icons/sprite.svg#icon-edit"></use>
            </svg>
          </button>
        </div>
      </form>

      <form action="" class="myProfile__form myProfile__form--password">
        <div class="myProfile__form-group">
          <label for="password" class="myProfile__form-label">Mot de passe</label>
          <input
            type="password"
            id="password"
            class="myProfile__form-input"
            placeholder="Entrez votre password"
          />
          <button type="submit" class="myProfile__form-btn">
            <svg class="myProfile__form-icon" aria-label="Modifier mot de passe">
              <use xlink:href="@/components/icons/sprite.svg#icon-edit"></use>
            </svg>
          </button>
        </div>

        <div class="myProfile__form-group">
          <label for="passwordConfirm" class="myProfile__form-label"
            >Mot de passe de confirmation</label
          >
          <input
            type="passwordConfirm"
            id="passwordConfirm"
            class="myProfile__form-input"
            placeholder="Confirmez votre password"
          />
        </div>
      </form>
    </div>
  </article>
</template>
<style scoped lang="scss">
@use '@/assets/abstracts/mixins' as m;
.myProfile {
  background-color: var(--color-black-2);
  &__title {
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2rem;

    @include m.lg {
      display: grid;
      grid-template-columns: repeat(2, max-content);
      grid-template-rows: repeat(2, min-content);
      column-gap: 2rem;
      justify-items: start;
    }
  }

  &__form {
    display: flex;
    flex-direction: column;

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
        grid-row: 1/2;
        grid-column: 2/-1;
      }
    }

    &-group {
      display: grid;
      grid-template-rows: repeat(2, min-content);
      grid-template-columns: 1fr min-content;
      column-gap: 1rem;
      margin: 1rem 0;
    }

    &-label {
      grid-row: 1/2;
      display: block;
      font-family: var(--font-subtext);
      margin-bottom: 1rem;
    }

    &-input {
      grid-row: 2/-1;
      grid-column: 1/2;
      border: none;
      box-shadow: var(--boxshadow-black);
      background-color: var(--color-black-2);
      height: 3.5rem;
      width: 100%;
      color: var(--color-white);
      padding-left: 1rem;
      font-size: 1.6rem;
      font-weight: 100;
    }

    &-btn {
      grid-column: 2/-1;
      grid-row: 2/-1;
      background-color: transparent;
    }

    &-icon {
      cursor: pointer;
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
</style>
