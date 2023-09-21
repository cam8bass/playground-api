<script setup lang="ts"></script>
<template>
  <article class="myApiKeys">
    <h3 class="section__title">Mes clés d'apis</h3>

    <div class="myApiKeys__content">
      <div class="myApiKeys__btn">
        <button class="myApiKeys__btn--add btn">Ajouter une api</button>
        <button class="myApiKeys__btn btn--delete btn">Supprimer toutes les clés</button>
      </div>

      <span class="myApiKeys__quantity"
        >Nombre d'apis : <span class="myApiKeys__quantity--number">5</span></span
      >

      <div class="myApiKeys__block">
        <table class="myApiKeys__table">
          <tr class="myApiKeys__table-row">
            <th>Nom api</th>
            <th>Expiration</th>
            <th>Activé</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
          </tr>

          <tr class="myApiKeys__table-row">
            <td>Api-travel</td>
            <td>16/08/2016</td>
            <td>oui</td>
            <td>
              <button class="myApiKeys__table-btn">
                <svg class="myApiKeys__table-icon" aria-label="Renouveller la clé d'api">
                  <use xlink:href="@/components/icons/sprite.svg#icon-plus-circle"></use>
                </svg>
              </button>
            </td>

            <td class="myApiKeys__table-data">
              <button class="myApiKeys__table-btn">
                <svg class="myApiKeys__table-icon" aria-label="Supprimer la clé d'api">
                  <use xlink:href="@/components/icons/sprite.svg#icon-bin2"></use>
                </svg>
              </button>
            </td>
          </tr>

          <tr class="myApiKeys__table-row">
            <td>Api-travel</td>
            <td>16/08/2016</td>
            <td>oui</td>
            <td>
              <button class="myApiKeys__table-btn">
                <svg class="myApiKeys__table-icon" aria-label="Renouveller la clé d'api">
                  <use xlink:href="@/components/icons/sprite.svg#icon-plus-circle"></use>
                </svg>
              </button>
            </td>

            <td class="myApiKeys__table-data">
              <button class="myApiKeys__table-btn">
                <svg class="myApiKeys__table-icon" aria-label="Supprimer la clé d'api">
                  <use xlink:href="@/components/icons/sprite.svg#icon-bin2"></use>
                </svg>
              </button>
            </td>
          </tr>

          <tr class="myApiKeys__table-row">
            <td>Api-travel</td>
            <td>16/08/2016</td>
            <td>oui</td>
            <td>
              <button class="myApiKeys__table-btn">
                <svg class="myApiKeys__table-icon" aria-label="Renouveller la clé d'api">
                  <use xlink:href="@/components/icons/sprite.svg#icon-plus-circle"></use>
                </svg>
              </button>
            </td>

            <td class="myApiKeys__table-data">
              <button class="myApiKeys__table-btn">
                <svg class="myApiKeys__table-icon" aria-label="Supprimer la clé d'api">
                  <use xlink:href="@/components/icons/sprite.svg#icon-bin2"></use>
                </svg>
              </button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </article>
</template>
<style scoped lang="scss">
@use '@/assets/abstracts/mixins' as m;

.myApiKeys {
  background-color: var(--color-black-2);

  &__content {
    margin: 2rem;
  }

  &__btn {
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    align-items: start;

    @include m.md {
      flex-direction: row;
    }
    &--add {
      margin-bottom: 2rem;
      @include m.md {
        flex-direction: row;
        margin-right: 2rem;
        margin-bottom: 0;
      }
    }
  }

  &__quantity {
    font-family: var(--font-subtext);
    font-weight: 100;

    &--number {
      font-weight: 700;
      color: var(--color-purple-1);
    }
  }
  &__block {
    margin-top: 1rem;
  }

  &__table {
    border-collapse: separate;
    border-spacing: 1rem;
    text-align: justify;

    &-btn {
      background-color: transparent;
      display: flex;
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

th {
  font-weight: 100;
}
</style>
