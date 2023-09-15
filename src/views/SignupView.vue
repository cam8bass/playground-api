<script setup lang="ts"></script>

<template>
  <main class="signup">
    <h1 class="section__title">Inscription</h1>

    <div class="section__content">
      <form action="" class="form">
        <fieldset>
          <legend class="form__title">PLayground Api</legend>
          <div class="form__block">
            <div class="form__group">
              <label for="firstname" class="form__label">Nom</label>
              <input
                type="text"
                id="firstname"
                class="form__input"
                placeholder="Entrez votre nom"
              />
            </div>
            <div class="form__group">
              <label for="lastname" class="form__label">Prénom</label>
              <input
                type="text"
                id="lastname"
                class="form__input"
                placeholder="Entrez votre prénom"
              />
            </div>
            <div class="form__group">
              <label for="email" class="form__label">Email</label>
              <input type="email" id="email" class="form__input" placeholder="Entrez votre email" />
            </div>
            <div class="form__group">
              <label for="password" class="form__label">Mot de passe</label>
              <div class="form__password">
                <input
                  type="password"
                  id="password"
                  class="form__input form__input-password"
                  placeholder="Entrez votre password"
                />
              </div>
              <svg class="form__icon">
                <use xlink:href="@/components/icons/sprite.svg#icon-eye"></use>
              </svg>
            </div>
            <div class="form__group">
              <label for="passwordConfirm" class="form__label">Confirmer mot de passe</label>
              <div class="form__password">
                <input
                  type="password"
                  id="passwordConfirm"
                  class="form__input"
                  placeholder="Confirmez votre password"
                />
              </div>
              <svg class="form__icon">
                <use xlink:href="@/components/icons/sprite.svg#icon-eye"></use>
              </svg>
            </div>
            <div class="form__group form__group-btn">
              <button class="btn form__btn">Retour</button>
              <button class="btn form__btn">Envoyer</button>
            </div>
          </div>
        </fieldset>
      </form>

      <div class="description">
        <p class="description__text">
          Rejoignez notre communauté en quelques instants ! Remplissez le formulaire, confirmez
          votre adresse e-mail, et commencez à explorer nos APIs. Lancez-vous dès maintenant !
        </p>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
@use '@/assets/abstracts/mixins' as m;
.signup {
  display: grid;
  grid-template-rows: min-content 1fr;

  @include m.xl {
    grid-template-columns: 2fr 1fr;
    justify-self: center;
  }
}

fieldset {
  border: none;
  display: grid;
  grid-template-rows: min-content 1fr;
  row-gap: 1rem;
}

.form {
  grid-row: 1/2;
  justify-self: center;
  align-self: center;
  margin: 2rem;

  @include m.xl {
    grid-row: 1/-1;
    grid-column: 1/2;
  }

  &__block {
    grid-row: 2/-1;
    display: grid;
    grid-template-rows: repeat(6, min-content);
    row-gap: 1rem;
    @include m.md {
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(4, min-content);
    }
  }

  &__title {
    display: contents;
    font-family: var(--font-subtitle);
    font-weight: 300;
    font-size: 2rem;
  }

  &__group {
    display: grid;
    grid-template-rows: repeat(2, min-content);
    grid-template-columns: 1fr min-content;
    column-gap: 1rem;
    &-btn {
      margin-top: 1rem;
      column-gap: 2rem;
      grid-column: 1/-1;
      justify-self: center;
    }
  }

  &__label {
    grid-column: 1/-1;
    display: block;
    font-family: var(--font-subtext);
    margin-bottom: 1rem;
  }

  &__input {
    border: none;
    box-shadow: var(--boxshadow-black);
    background-color: var(--color-black-2);
    height: 3.5rem;
    width: 100%;
    color: var(--color-white);
    padding-left: 1rem;
    font-size: 1.6rem;
    font-weight: 100;

    &-password {
    }
  }

  &__password {
    display: flex;
    align-items: center;
  }

  &__icon {
    width: 3rem;
    height: 3rem;
    fill: var(--color-white);
    transition: all 0.4s;

    &:hover,
    &:active {
      transform: scale(1.1);
      fill: var(--color-purple-1);
    }
  }

  &__btn {
  }
}

.description {
  grid-row: 2/-1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-black-2);
  padding: 2rem;

  @include m.xl {
    grid-row: 1/-1;
    grid-column: 2/-1;
  }

  &__text {
    max-width: 55.5rem;
    font-weight: 100;
  }
}
</style>
