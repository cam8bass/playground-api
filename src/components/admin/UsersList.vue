<script setup lang="ts"></script>
<template>
  <div class="usersList">
    <table class="table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Nom</th>
          <th>Prénom</th>
          <th>Email</th>
          <th>Role</th>
          <th>Activé</th>
          <th>Bloqué</th>
          <th>Supprimer</th>
          <th>&nbsp;</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>98492265494</td>
          <td>Martinez</td>
          <td>Philippe</td>
          <td>philippe@email.com</td>
          <td>User</td>
          <td>Oui</td>
          <td>Non</td>
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
          <td>Martinez</td>
          <td>Philippe</td>
          <td>philippe@email.com</td>
          <td>User</td>
          <td>Oui</td>
          <td>Non</td>
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
          <td>Martinez</td>
          <td>Philippe</td>
          <td>philippe@email.com</td>
          <td>User</td>
          <td>Oui</td>
          <td>Non</td>
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
          <td>Martinez</td>
          <td>Philippe</td>
          <td>philippe@email.com</td>
          <td>User</td>
          <td>Oui</td>
          <td>Non</td>
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

.usersList {
  background-color: var(--color-black-2);
  display: flex;
  justify-content: center;
}
.table {
  padding: 2rem 0;
  width: 100%;


}

td,
th {
  display: none;
  @include m.lg {
    display: table-cell;
  }
}

th:nth-child(4),
td:nth-child(4),
th:nth-child(9),
td:nth-child(9) {
  display: table-cell;
}

@include m.xs {
  th:nth-child(1),
  td:nth-child(1) {
    display: table-cell;
  }
}

@include m.md {
  th:nth-child(5),
  td:nth-child(5),
  th:nth-child(6),
  td:nth-child(6),
  th:nth-child(7),
  td:nth-child(7) {
    display: table-cell;
  }
}
tr {
  transition: all 0.2s;
}

tr:hover,
tr:active {
  color: var(--color-purple-1);
}
</style>
