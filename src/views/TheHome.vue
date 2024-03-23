<script setup lang="ts">
import AnimatedComponent from '@/components/common-components/AnimatedComponent.vue'
import { initStore } from '@/shared/utils'

const { appStore, userStore } = initStore('appStore', 'userStore')
</script>

<template>
  <main class="home" v-if="appStore && userStore">
    <section class="home__section intro" id="intro">
      <div class="section__content intro__content">
        <AnimatedComponent animation-type="translateLeft">
          <div class="intro__describe">
            <div class="intro__describe-text">
              <p class="intro__describe-text--main">
                <strong>Api Playground</strong>, votre terrain d’entraînement pour maîtriser les
                appels API et créer des sites web interactifs.
              </p>
              <p class="intro__describe-text--sub">
                Que vous soyez novice en développement web en quête d’amélioration ou un passionné
                de code en quête d’inspiration, <strong>API Playground </strong>est votre allié.
              </p>
            </div>
            <RouterLink to="/apis" class="btn intro__describe-btn" title="Nos apis"
              >Nos apis</RouterLink
            >
          </div>
        </AnimatedComponent>

        <AnimatedComponent animation-type="translateRight">
          <div class="intro__begin">
            <span class="intro__begin-title">Commencer maintenant</span>
            <div class="intro__begin-link">
              <RouterLink to="/signup" class="btn intro__begin-link--signup" title="Inscription"
                >Inscription</RouterLink
              >
              <button
                title="Connexion"
                v-if="!userStore.getCurrentUser"
                @click="appStore.updateNavigation({ login: true })"
                class="btn"
              >
                Connexion
              </button>

              <RouterLink
                v-if="userStore.getCurrentUser"
                to="/dashboard"
                class="btn"
                title="Mon compte"
                >Mon compte</RouterLink
              >
            </div>
          </div>
        </AnimatedComponent>
      </div>
    </section>

    <AnimatedComponent animation-type="fade">
      <section class="home__section discover" id="discover">
        <h2 class="section__title">Pratiquez en Conditions Réelles</h2>

        <div class="discover__content">
          <ul class="discover__cardBlock">
            <li class="discover__card">
              <h5 class="discover__card-title">Inscription facile</h5>
              <svg class="discover__card-icon">
                <use xlink:href="@/components/icons/sprite.svg#icon-user-plus"></use>
              </svg>
              <p class="discover__card-text">
                Rejoignez notre communauté en quelques clics avec une inscription rapide et
                intuitive.
              </p>
            </li>

            <li class="discover__card">
              <h5 class="discover__card-title">Exploration immédiate</h5>
              <svg class="discover__card-icon">
                <use xlink:href="@/components/icons/sprite.svg#icon-compass"></use>
              </svg>
              <p class="discover__card-text">
                Parcourez nos APIs dès votre arrivée, sans tracas ni complications.
              </p>
            </li>

            <li class="discover__card">
              <h5 class="discover__card-title">Documentation clair</h5>
              <svg class="discover__card-icon">
                <use xlink:href="@/components/icons/sprite.svg#icon-document"></use>
              </svg>
              <p class="discover__card-text">
                Des informations claires et précises vous guident à chaque étape.
              </p>
            </li>
          </ul>

          <p class="discover__text discover__text-up">
            Notre environnement de jeu vous permet de faire des <strong>appels réels</strong> à nos
            APIs, vous donnant la possibilité de <strong>manipuler des données</strong> et de voir
            instantanément comment elles réagissent. <br />
          </p>

          <p class="discover__text discover__text-down">
            C’est l’occasion idéale d’affiner vos compétences en communication entre le frontend et
            le backend tout en gagnant en confiance.<br />
          </p>
        </div>
      </section>
    </AnimatedComponent>

    <AnimatedComponent animation-type="fade">
      <section class="home__section explore" id="explore">
        <h3 class="section__title">Explorez, Apprenez, Créez</h3>
        <div class="section__content">
          <img
            src="@/assets/img/explore-img.webp"
            alt="image mockup mobile and desktop"
            class="explore__img"
          />

          <div class="explore__textBlock">
            <p class="explore__text">
              Découvrez un ensemble varié d’APIs soigneusement conçues pour vous offrir une
              expérience d’apprentissage pratique.<br />
              Chaque <strong>API</strong> est accompagnée d’une
              <strong>documentation détaillée</strong>, vous guidant à travers les endpoints, les
              paramètres requis et les réponses attendues.<br />
            </p>
            <p class="explore__text">
              Vous pourrez ainsi apprendre en vous engageant directement dans la création de vos
              propres <em>projets front-end</em>.<br />
            </p>
          </div>
        </div>
      </section>
    </AnimatedComponent>

    <AnimatedComponent animation-type="fade">
      <section class="home__section access" id="access">
        <h4 class="section__title">Simple et accessible</h4>

        <div class="section__content">
          <img src="@/assets/img/access-img.webp" alt="image" class="access__img" />
          <div class="access__block">
            <h6 class="access__subtitle">Créez et Accédez à Nos APIs en toute simplicité</h6>

            <ol class="access__list">
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
            </ol>
            <RouterLink
              title="Créer un compte"
              aria-label="Créer un compte"
              to="/signup"
              class="btn access__btn"
              >Inscription</RouterLink
            >
          </div>
        </div>
      </section>
    </AnimatedComponent>

    <AnimatedComponent animation-type="fade">
      <section class="home__section achieve" id="achieve">
        <h5 class="section__title">Partagez Vos Réalisations</h5>

        <div class="section__content">
          <div class="achieve__textBlock">
            <p class="achieve__text">
              Lorsque vous maîtrisez une <strong>API</strong> et créez quelque chose d’unique,
              partagez-le avec la communauté ! La section <strong>Réalisations</strong> met en
              valeur vos projets créatifs et vos applications construites à partir des APIs
              Playground.<br />
            </p>
            <p class="achieve__text">
              Rejoignez une <em>communauté enthousiaste de développeurs</em> partageant les mêmes
              idées et inspirez-vous des réalisations des autres.<br />
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
    </AnimatedComponent>
  </main>
</template>

<style scoped lang="scss">
@use '@/assets/style/abstracts/mixins' as m;
@import '@/assets/style/abstracts/_debug.scss';

// *** PAGE HOME ***
.home {
  display: grid;
  grid-template-rows: minmax(min-content, 90vh) repeat(4, min-content);
  justify-content: center;
  height: 100%;

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
}

// *** SECTION INTRO ***
.intro {
  &__content {
    @include m.xl {
      grid-template-columns: repeat(2, 1fr);
    }
  }
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
    justify-items: center;
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
    max-width: 40rem;
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
      max-height: 100svh;

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
