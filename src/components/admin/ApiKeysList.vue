<script setup lang="ts"></script>
<template>
  <div class="apiKeysList">
    <table class="table apiKeysList__table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Utilisateur</th>
          <th>Email</th>
          <th>Quantité</th>
          <th>Supprimer</th>
          <th>&nbsp;</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>98492265494</td>
          <td>66553554425</td>
          <td>philippe@email.com</td>
          <td>2</td>
          <td>
            <button class="table__btn">
              <svg class="table__icon">
                <use xlink:href="@/components/icons/sprite.svg#icon-bin2"></use>
              </svg>
            </button>
          </td>
          <td>
            <router-link class="table__link" to="/test"> Details </router-link>
          </td>
        </tr>

        <tr>
          <td>98492265494</td>
          <td>66553554425</td>
          <td>philippe@email.com</td>
          <td>2</td>
          <td>
            <button class="table__btn">
              <svg class="table__icon">
                <use xlink:href="@/components/icons/sprite.svg#icon-bin2"></use>
              </svg>
            </button>
          </td>
          <td>
            <router-link class="table__link" to="/test"> Details </router-link>
          </td>
        </tr>

        <tr>
          <td>98492265494</td>
          <td>66553554425</td>
          <td>philippe@email.com</td>
          <td>2</td>
          <td>
            <button class="table__btn">
              <svg class="table__icon">
                <use xlink:href="@/components/icons/sprite.svg#icon-bin2"></use>
              </svg>
            </button>
          </td>
          <td>
            <router-link class="table__link" to="/test"> Details </router-link>
          </td>
        </tr>

        <tr>
          <td>98492265494</td>
          <td>66553554425</td>
          <td>philippe@email.com</td>
          <td>2</td>
          <td>
            <button class="table__btn">
              <svg class="table__icon">
                <use xlink:href="@/components/icons/sprite.svg#icon-bin2"></use>
              </svg>
            </button>
          </td>
          <td>
            <router-link class="table__link" to="/test"> Details </router-link>
          </td>
        </tr>

        <tr>
          <td>98492265494</td>
          <td>66553554425</td>
          <td>philippe@email.com</td>
          <td>2</td>
          <td>
            <button class="table__btn">
              <svg class="table__icon">
                <use xlink:href="@/components/icons/sprite.svg#icon-bin2"></use>
              </svg>
            </button>
          </td>
          <td>
            <router-link class="table__link" to="/test"> Details </router-link>
          </td>
        </tr>

        <tr>
          <td>98492265494</td>
          <td>66553554425</td>
          <td>philippe@email.com</td>
          <td>2</td>
          <td>
            <button class="table__btn">
              <svg class="table__icon">
                <use xlink:href="@/components/icons/sprite.svg#icon-bin2"></use>
              </svg>
            </button>
          </td>
          <td>
            <router-link class="table__link" to="/test"> Details </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style scoped lang="scss">
@use '@/assets/abstracts/mixins' as m;

.apiKeysList {
  background-color: var(--color-black-2);
  display: flex;
  justify-content: center;

  &__table {
    padding: 2rem 0;
    width: 100%;
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
td:nth-child(2),
th:nth-child(6),
td:nth-child(6) {
  display: table-cell;
}
@include m.xs {
  th:nth-child(5),
  td:nth-child(5) {
    display: table-cell;
  }
}

tr:hover,
tr:active {
  color: var(--color-purple-1);
}
</style>
