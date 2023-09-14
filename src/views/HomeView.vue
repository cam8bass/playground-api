<script setup lang="ts"></script>

<template>
  <main class="home">
    <section class="home__section intro">
      <div class="home__content">
        <div class="intro__describe">
          <div class="intro__describe-text">
            <p class="intro__describe-text--main">
              API Playground, votre terrain d’entraînement pour maîtriser les appels API et créer
              des sites web interactifs.
            </p>
            <p class="intro__describe-text--sub">
              Que vous soyez novice en développement web en quête d’amélioration ou un passionné de
              code en quête d’inspiration, API Playground est votre allié.
            </p>
          </div>
          <RouterLink to="/apis" class="btn intro__describe-btn">Nos apis</RouterLink>
        </div>
        <div class="intro__begin">
          <h1 class="intro__begin-title">Commencer maintenant</h1>
          <div class="intro__begin-link">
            <RouterLink to="/signup" class="btn intro__begin-link--signup">Inscription</RouterLink>
            <RouterLink to="/login" class="btn">Connexion</RouterLink>
          </div>
        </div>
      </div>
    </section>

    <section class="home__section discover">
      <h1 class="home__title">Pratiquez en Conditions Réelles</h1>

      <div class="discover__content">
        <div class="discover__cardBlock">
          <div class="discover__card">
            <h5 class="discover__card-title">Inscription facile</h5>
            <svg class="discover__card-icon">
              <use xlink:href="@/components/icons/sprite.svg#icon-user-plus"></use>
            </svg>
            <p class="discover__card-text">
              Rejoignez notre communauté en quelques clics avec une inscription rapide et intuitive.
            </p>
          </div>

          <div class="discover__card">
            <h5 class="discover__card-title">Exploration immédiate</h5>
            <svg class="discover__card-icon">
              <use xlink:href="@/components/icons/sprite.svg#icon-compass"></use>
            </svg>
            <p class="discover__card-text">
              Parcourez nos APIs dès votre arrivée, sans tracas ni complications.
            </p>
          </div>

          <div class="discover__card">
            <h5 class="discover__card-title">Documentation clair</h5>
            <svg class="discover__card-icon">
              <use xlink:href="@/components/icons/sprite.svg#icon-document"></use>
            </svg>
            <p class="discover__card-text">
              Des informations claires et précises vous guident à chaque étape.
            </p>
          </div>
        </div>

        <p class="discover__text discover__text-up">
          Notre environnement de jeu vous permet de faire des appels réels à nos APIs, vous donnant
          la possibilité de manipuler des données et de voir instantanément comment elles
          réagissent.
        </p>

        <p class="discover__text discover__text-down">
          C’est l’occasion idéale d’affiner vos compétences en communication entre le frontend et le
          backend tout en gagnant en confiance.
        </p>
      </div>
    </section>

    <section class="home__section explore">
      <h2 class="home__title">Explorez, Apprenez, Créez</h2>
      <div class="home__content">
        <img
          src="@/assets/img/explore-img.webp"
          alt="image mockup mobile and desktop"
          class="explore__img"
        />

        <div class="explore__textBlock">
          <p class="explore__text">
            Découvrez un ensemble varié d’APIs soigneusement conçues pour vous offrir une expérience
            d’apprentissage pratique. Chaque API est accompagnée d’une documentation détaillée, vous
            guidant à travers les endpoints, les paramètres requis et les réponses attendues.
          </p>
          <p class="explore__text">
            Vous pourrez ainsi apprendre en vous engageant directement dans la création de vos
            propres projets front-end.
          </p>
        </div>
      </div>
    </section>

    <section class="home__section access">
      <h3 class="home__title">Simple et accessible</h3>

      <div class="home__content">
        <img src="@/assets/img/access-img.webp" alt="image" class="access__img" />
        <div class="access__block">
          <h6 class="access__subtitle">Créez et Accédez à Nos APIs en toute simplicité</h6>

          <ul class="access__list">
            <li class="access__item">
              <svg class="access__item-icon">
                <use xlink:href="@/components/icons/sprite.svg#icon-check-circle"></use>
              </svg>

              <span class="access__item-text">Cliquez sur Inscription pour commencer</span>
            </li>

            <li class="access__item">
              <svg class="access__item-icon">
                <use xlink:href="@/components/icons/sprite.svg#icon-check-circle"></use>
              </svg>

              <span class="access__item-text"
                >Remplissez rapidement le formulaire d’inscription.</span
              >
            </li>

            <li class="access__item">
              <svg class="access__item-icon">
                <use xlink:href="@/components/icons/sprite.svg#icon-check-circle"></use>
              </svg>

              <span class="access__item-text">Activé votre compte</span>
            </li>

            <li class="access__item">
              <svg class="access__item-icon">
                <use xlink:href="@/components/icons/sprite.svg#icon-check-circle"></use>
              </svg>

              <span class="access__item-text">Accédez à votre profil utilisateur.</span>
            </li>

            <li class="access__item">
              <svg class="access__item-icon">
                <use xlink:href="@/components/icons/sprite.svg#icon-check-circle"></use>
              </svg>

              <span class="access__item-text">Trouvez la section Gérer les Clés API</span>
            </li>

            <li class="access__item">
              <svg class="access__item-icon">
                <use xlink:href="@/components/icons/sprite.svg#icon-check-circle"></use>
              </svg>

              <span class="access__item-text">Cliquez sur Ajouter une Nouvelle Clé</span>
            </li>
          </ul>
          <RouterLink to="/login" class="btn access__btn">Inscription</RouterLink>
        </div>
      </div>
    </section>

    <section class="home__section achieve">
      <h4 class="home__title">Partagez Vos Réalisations</h4>

      <div class="home__content">
        <div class="achieve__textBlock">
          <p class="achieve__text">
            Lorsque vous maîtrisez une API et créez quelque chose d’unique, partagez-le avec la
            communauté ! La section <strong>Réalisations</strong> met en valeur vos projets créatifs
            et vos applications construites à partir des APIs Playground.
          </p>
          <p class="achieve__text">
            Rejoignez une communauté enthousiaste de développeurs partageant les mêmes idées et
            inspirez-vous des réalisations des autres.
          </p>
        </div>

        <ul class="achieve__list">
          <li class="achieve__item">
            <a href="" class="achieve__link">
              <img src="@/assets/img/access-img.webp" alt="image" class="achieve__img" />
            </a>
          </li>

          <li class="achieve__item">
            <a href="" class="achieve__link">
              <img src="@/assets/img/access-img.webp" alt="image" class="achieve__img" />
            </a>
          </li>

          <li class="achieve__item">
            <a href="" class="achieve__link">
              <img src="@/assets/img/access-img.webp" alt="image" class="achieve__img" />
            </a>
          </li>

          <li class="achieve__item">
            <a href="" class="achieve__link">
              <img src="@/assets/img/access-img.webp" alt="image" class="achieve__img" />
            </a>
          </li>

          <li class="achieve__item">
            <a href="" class="achieve__link">
              <img src="@/assets/img/access-img.webp" alt="image" class="achieve__img" />
            </a>
          </li>

          <li class="achieve__item">
            <a href="" class="achieve__link">
              <img src="@/assets/img/access-img.webp" alt="image" class="achieve__img" />
            </a>
          </li>
        </ul>
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
@use '@/assets/abstracts/mixins' as m;
@import '@/assets/abstracts/_debug.scss';

// *** PAGE HOME ***
.home {
  display: grid;
  grid-template-rows: minmax(min-content, 90vh) repeat(4, min-content);
  justify-content: center;

  @include m.xl {
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      clip-path: polygon(60% 0%, 100% 0, 100% 100%, 0% 100%);
      background-color: var(--color-black-2);
      z-index: -1;
    }
  }

  @include m.md {
    grid-template-rows: minmax(min-content, 90vh) repeat(4, minmax(min-content, 100vh));
  }

  &__section {
    display: grid;
    grid-template-rows: min-content 1fr;

    @include m.xl {
      grid-template-columns: 2fr 1fr;
    }
  }

  &__title {
    margin: 2rem;
    grid-row: 1/2;
    font-family: var(--font-title);
    font-size: 1.8rem;
    font-weight: 300;
    position: relative;
    padding-bottom: 2rem;
    border-bottom: 1px solid var(--color-white);
    @include m.lg {
      font-size: 2.5rem;
    }

    @include m.xl {
      grid-column: 1/2;
    }
  }

  &__content {
    grid-row: 2/-1;
    display: grid;
    grid-template-rows: 2fr 1fr;
    grid-template-columns: 1fr;
    row-gap: 2rem;

    @include m.xl {
      grid-column: 1/-1;
      grid-template-rows: 1fr;
      grid-template-columns: 2fr 1fr;
    }
  }
}

// *** SECTION INTRO ***
.intro {
  &__describe {
    grid-row: 1/2;
    grid-column: 1/-1;
    justify-self: center;
    align-self: center;
    padding: 0 2rem;

    @include m.xl {
      grid-row: 1/2;
      grid-column: 1/2;
    }

    &-text {
      font-size: 1.8rem;
      margin-bottom: 3rem;
      max-width: 55rem;

      &--main {
        font-family: var(--font-subtext);

        @include m.md {
          font-size: 2.5rem;
        }
      }

      &--sub {
        font-size: 1.6rem;
        margin-top: 1rem;
        font-family: var(--font-text);
        font-weight: 100;

        @include m.md {
          margin-top: 2rem;
        }
      }
    }
  }

  &__begin {
    grid-row: 2/-1;
    grid-column: 1/-1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    background-color: var(--color-black-2);
    @include m.xl {
      grid-row: 1/2;
      grid-column: 2/-1;
      background-color: transparent;
    }
    &-title {
      font-size: 2rem;
      font-weight: 100;
      margin-bottom: 2rem;
      @include m.md {
        font-size: 2.2rem;
        margin-bottom: 3rem;
      }
    }

    &-link {
      &--signup {
        margin-right: 2rem;

        @include m.md {
          margin-right: 4rem;
        }
      }
    }
  }
}

// *** SECTION DISCOVER ***

.discover {
  &__content {
    grid-column: 1/-1;
    display: grid;
    grid-template-rows: 1fr repeat(2, min-content);
    grid-template-columns: 1fr;

    @include m.lg {
      grid-template-rows: min-content 1fr min-content;
      row-gap: 2rem;
    }
  }

  &__cardBlock {
    grid-column: 1/-1;
    grid-row: 1/2;
    display: grid;
    grid-template-rows: repeat(3, min-content);
    row-gap: 2rem;
    padding: 0 2rem;

    @include m.lg {
      grid-row: 2/3;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: min-content;
      column-gap: 3rem;
      row-gap: 0;
      align-content: center;
    }
  }

  &__card {
    background-color: var(--color-black-2);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    box-shadow: var(--boxshadow-black);
    transition: all 0.4s;

    @include m.lg {
      height: 30rem;
      max-width: 35rem;

      &:hover,
      &:active {
        transform: scale(1.1);
        background-color: var(--color-gray-1);
        color: var(--color-purple-1);

        & > .discover__card-icon {
          fill: var(--color-purple-1);
        }
      }
    }

    &-title {
      font-family: var(--font-subtitle);
      font-size: 1.8rem;
      text-align: center;
      transition: color 0.4s;
      @include m.xl {
        font-size: 2.2rem;
      }
    }

    &-icon {
      width: 8rem;
      fill: var(--color-white);
    }

    &-text {
      font-weight: 100;
      text-align: center;
      @include m.lg {
        font-size: 1.8rem;
      }
    }
  }

  &__text {
    padding: 2rem;
    font-weight: 100;
    height: min-content;
    background-color: var(--color-black-2);

    &:first-of-type {
      margin-top: 2rem;
    }

    @include m.lg {
      background-color: transparent;
      font-size: 1.8rem;
      max-width: 73.6rem;
    }
    &-up {
      grid-row: 2/3;
      padding-bottom: 0;
      @include m.lg {
        grid-row: 1/2;
        grid-column: 1/-1;
      }
    }

    &-down {
      grid-row: 3/-1;

      @include m.lg {
        grid-row: 3/-1;
        grid-column: 1/-1;
        justify-self: end;
      }
    }
  }
}

// *** SECTION EXPLORE ***
.explore {
  &__img {
    grid-row: 1/2;
    align-self: center;
    justify-self: center;
    width: 80vw;
    min-width: 20rem;
    max-width: 50rem;
    margin: 2rem 0;

    @include m.xl {
      grid-column: 1/2;
      grid-row: 1/-1;
    }
  }

  &__textBlock {
    grid-row: 2/-1;
    padding: 2rem;
    background-color: var(--color-black-2);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @include m.xl {
      grid-row: 1/-1;
      grid-column: 2/-1;
    }
  }

  &__text {
    max-width: 57.5rem;
    font-weight: 100;

    &:last-of-type {
      margin-top: 2rem;
    }

    @include m.lg {
      font-size: 1.8rem;
    }
  }
}

// *** SECTION ACCESS ***
.access {
  &__img {
    grid-row: 1/2;
    width: 80vw;
    min-width: 20rem;
    max-width: 50rem;
    justify-self: center;
    align-self: center;
    @include m.xl {
      grid-row: 1/-1;
      grid-column: 2/-1;
    }
  }

  &__block {
    grid-row: 2/-1;
    grid-column: 1/-1;
    display: grid;
    grid-template-rows: repeat(2, min-content);
    row-gap: 2rem;
    justify-content: center;
    background-color: var(--color-black-2);
    padding: 2rem;

    @include m.xl {
      grid-row: 1/-1;
      grid-column: 1/2;
      align-content: center;
      background-color: transparent;
    }
  }

  &__subtitle {
    font-family: var(--font-subtitle);
    font-size: 1.8rem;
    font-weight: 400;

    @include m.lg {
      font-size: 2.2rem;
    }
  }

  &__item {
    display: grid;
    grid-template-columns: min-content 1fr;
    column-gap: 1rem;
    align-items: center;

    &:not(:last-child) {
      margin-bottom: 1rem;
    }

    &-icon {
      width: 2rem;
      height: 2rem;
      fill: var(--color-white);
    }

    &-text {
      font-weight: 100;

      @include m.lg {
        font-size: 1.8rem;
      }
    }
  }

  &__btn {
    justify-self: start;
  }
}

// *** SECTION ACHIEVE ***
.achieve {
  margin-bottom: 2rem;
  &__textBlock {
    grid-row: 1/2;
    align-self: center;
    justify-self: center;
    max-width: 75rem;
    padding: 0 2rem;

    @include m.lg {
      font-size: 1.8rem;
    }

    @include m.xl {
      grid-row: 1/-1;
      grid-column: 1/2;
    }
  }

  &__text {
    font-weight: 100;
    &:last-of-type {
      margin-top: 2rem;
    }
  }

  &__list {
    grid-row: 2/-1;
    display: flex;
    align-items: center;
    column-gap: 2rem;
    overflow-x: scroll;
    padding: 2rem;
    background-color: var(--color-black-2);
    box-shadow: var(--boxshadow-black);

    @include m.xl {
      grid-row: 1/2;
      grid-column: 2/-1;
      max-height: 100vh;

      overflow-x: unset;
      overflow-y: scroll;

      flex-direction: column;
      column-gap: 0;
      row-gap: 3rem;
    }
  }

  &__img {
    width: 40vw;
    min-width: 30rem;
    max-width: 40rem;
    height: 20rem;
  }
}
</style>
