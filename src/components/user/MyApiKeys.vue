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

      <table class="table myApiKeys__table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Clé d'api</th>
            <th>Création</th>
            <th>Expiration</th>
            <th>Activé</th>
            <th>Renouveller</th>
            <th>Supprimer</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Api-travel</td>
            <td>tbJ8KNivtlhrqlcfOp/NNlyGcqfeYC4</td>
            <td>16/08/2015</td>
            <td>16/08/2016</td>
            <td>oui</td>
            <td>
              <button class="table__btn">
                <svg class="table__icon" aria-label="Renouveller la clé d'api">
                  <use xlink:href="@/components/icons/sprite.svg#icon-plus-circle"></use>
                </svg>
              </button>
            </td>

            <td class="myApiKeys__table-data">
              <button class="table__btn">
                <svg class="table__icon" aria-label="Supprimer la clé d'api">
                  <use xlink:href="@/components/icons/sprite.svg#icon-bin2"></use>
                </svg>
              </button>
            </td>
          </tr>

          <tr>
            <td>Api-travel</td>
            <td>tbJ8KNivtlhrqlcfOp/NNlyGcqfeYC4</td>
            <td>16/08/2015</td>
            <td>16/08/2016</td>
            <td>oui</td>
            <td>
              <button class="table__btn">
                <svg class="table__icon" aria-label="Renouveller la clé d'api">
                  <use xlink:href="@/components/icons/sprite.svg#icon-plus-circle"></use>
                </svg>
              </button>
            </td>

            <td class="myApiKeys__table-data">
              <button class="table__btn">
                <svg class="table__icon" aria-label="Supprimer la clé d'api">
                  <use xlink:href="@/components/icons/sprite.svg#icon-bin2"></use>
                </svg>
              </button>
            </td>
          </tr>

          <tr>
            <td>Api-travel</td>
            <td>tbJ8KNivtlhrqlcfOp/NNlyGcqfeYC4</td>
            <td>16/08/2015</td>
            <td>16/08/2016</td>
            <td>oui</td>
            <td>
              <button class="table__btn">
                <svg class="table__icon" aria-label="Renouveller la clé d'api">
                  <use xlink:href="@/components/icons/sprite.svg#icon-plus-circle"></use>
                </svg>
              </button>
            </td>

            <td class="myApiKeys__table-data">
              <button class="table__btn">
                <svg class="table__icon" aria-label="Supprimer la clé d'api">
                  <use xlink:href="@/components/icons/sprite.svg#icon-bin2"></use>
                </svg>
              </button>
            </td>
          </tr>

          <tr>
            <td>Api-travel</td>
            <td>tbJ8KNivtlhrqlcfOp/NNlyGcqfeYC4</td>
            <td>16/08/2015</td>
            <td>16/08/2016</td>
            <td>oui</td>
            <td>
              <button class="table__btn">
                <svg class="table__icon" aria-label="Renouveller la clé d'api">
                  <use xlink:href="@/components/icons/sprite.svg#icon-plus-circle"></use>
                </svg>
              </button>
            </td>

            <td class="myApiKeys__table-data">
              <button class="table__btn">
                <svg class="table__icon" aria-label="Supprimer la clé d'api">
                  <use xlink:href="@/components/icons/sprite.svg#icon-bin2"></use>
                </svg>
              </button>
            </td>
          </tr>

          <tr>
            <td>Api-travel</td>
            <td>tbJ8KNivtlhrqlcfOp/NNlyGcqfeYC4</td>
            <td>16/08/2015</td>
            <td>16/08/2016</td>
            <td>oui</td>
            <td>
              <button class="table__btn">
                <svg class="table__icon" aria-label="Renouveller la clé d'api">
                  <use xlink:href="@/components/icons/sprite.svg#icon-plus-circle"></use>
                </svg>
              </button>
            </td>

            <td class="myApiKeys__table-data">
              <button class="table__btn">
                <svg class="table__icon" aria-label="Supprimer la clé d'api">
                  <use xlink:href="@/components/icons/sprite.svg#icon-bin2"></use>
                </svg>
              </button>
            </td>
          </tr>

          <tr>
            <td>Api-travel</td>
            <td>tbJ8KNivtlhrqlcfOp/NNlyGcqfeYC4</td>
            <td>16/08/2015</td>
            <td>16/08/2016</td>
            <td>oui</td>
            <td>
              <button class="table__btn">
                <svg class="table__icon" aria-label="Renouveller la clé d'api">
                  <use xlink:href="@/components/icons/sprite.svg#icon-plus-circle"></use>
                </svg>
              </button>
            </td>

            <td class="myApiKeys__table-data">
              <button class="table__btn">
                <svg class="table__icon" aria-label="Supprimer la clé d'api">
                  <use xlink:href="@/components/icons/sprite.svg#icon-bin2"></use>
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
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

  &__table {
    margin-top: 1rem;
  }
}

td,
th {
  display: none;
  @include m.lg {
    display: table-cell;
  }
}

th:nth-child(1),
td:nth-child(1),
th:nth-child(2),
td:nth-child(2) {
  display: table-cell;
}

@include m.md {
  th:nth-child(6),
  td:nth-child(6),
  th:nth-child(7),
  td:nth-child(7) {
    display: table-cell;
  }
}
</style>
