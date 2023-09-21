<script setup lang="ts"></script>
<template>
  <article class="myApiKeys">
    <h3 class="section__title myApiKeys__title">Mes clés d'apis</h3>

    <div class="myApiKeys__content">
      <button class="myApiKeys__btn btn">Ajouter une api</button>

      <table class="myApiKeys__table">
        <tr class="myApiKeys__table-row myApiKeys__table-row--main">
          <th class="myApiKeys__table-header">Nom api</th>
          <th class="myApiKeys__table-header">Clé d'api</th>
          <th class="myApiKeys__table-header">Création</th>
          <th class="myApiKeys__table-header">Expiration</th>
          <th class="myApiKeys__table-header">Activé</th>
          <th class="myApiKeys__table-header">Renouveller</th>
          <th class="myApiKeys__table-header">Supprimer</th>
        </tr>

        <tr class="myApiKeys__table-row myApiKeys__table-row--sub">
          <td class="myApiKeys__table-data">Api-travel</td>
          <td class="myApiKeys__table-data">tbJ8KNivtlhrqlcfOp/NNlyGcqfeYC4</td>
          <td class="myApiKeys__table-data">16/08/2015</td>
          <td class="myApiKeys__table-data">16/08/2016</td>
          <td class="myApiKeys__table-data">oui</td>
          <td class="myApiKeys__table-data myApiKeys__table-data--btn">
            <button class="myApiKeys__table-btn myApiKeys__table-btn--renewal">
              <svg class="myApiKeys__table-icon" aria-label="Renouveller la clé d'api">
                <use xlink:href="@/components/icons/sprite.svg#icon-plus-circle"></use>
              </svg>
            </button>
          </td>
          <td class="myApiKeys__table-data myApiKeys__table-data--btn">
            <button class="myApiKeys__table-btn myApiKeys__table-btn--delete">
              <svg class="myApiKeys__table-icon" aria-label="Supprimer la clé d'api">
                <use xlink:href="@/components/icons/sprite.svg#icon-bin2"></use>
              </svg>
            </button>
          </td>
        </tr>
      </table>
    </div>
  </article>
</template>
<style scoped lang="scss">
@use '@/assets/abstracts/mixins' as m;

.myApiKeys {
  background-color: var(--color-black-2);

  &__title {
  }

  &__content {
  }

  &__btn {
    margin-left: 2rem;
    margin-bottom: 2rem;
  }

  &__table {
    border-collapse: separate;
    border-spacing: 1rem;
    text-align: justify;
    padding: 2rem;
    background-color: var(--color-black-2);
    margin-bottom: 2rem;

    &-row {



      &--main {

      }

      &--sub {
  
      }
    }

    &-header {
      font-weight: 100;
    }

    &-data {
      &--btn {
      }
    }

    &-btn {
      background-color: transparent;

      &--renewal {
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
</style>
