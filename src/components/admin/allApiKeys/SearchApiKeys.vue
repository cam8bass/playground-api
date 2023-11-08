<script setup lang="ts"></script>
<template>
  <div class="search">
    <h1 class="section__title">Clés d'api</h1>
    <div class="search__content">
      <div class="search__filter">
        <div class="search__filter-field">
          <label for="filter" class="form__label search__label">Filter par : </label>
          <select name="filter" id="filter" class="search__select">
            <option value="_id">Id groupe api</option>
            <option value="user">Id utilisateur</option>
          </select>
        </div>

        <div class="search__filter-sort">
          <label for="sort" class="form__label search__label">Trier par : </label>
          <select name="sort" id="sort" class="search__select">
            <option selected value="-createAt">du + au - récent</option>
            <option value="createAt">du - au + récent</option>
          </select>
        </div>
      </div>

      <div class="search__group">
        <label for="search" class="form__label search__label">Rechercher une clé d'api</label>
        <input type="text" id="search" class="form__input search__input" />
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss"></style>
