<script setup lang="ts">
defineProps<{
  openLogin: boolean
}>()
</script>

<template>
  <Transition name="fade" mode="out-in" appear>
    <form action="" class="login" v-show="openLogin">
      <div class="login__group">
        <label for="email" class="login__label">Email</label>
        <input type="email" id="email" class="login__input" placeholder="Entrez votre email" />
      </div>

      <div class="login__group">
        <label for="password" class="login__label">Mot de passe</label>
        <input
          type="password"
          id="password"
          class="login__input"
          placeholder="Entrez votre mot de passe"
        />
      </div>

      <RouterLink to="/forgotPassword" class="login__link">Mot de passe oublié</RouterLink>
      <div class="login__group">
        <button type="button" @click="$emit('openLogin', false)" class="login__btn btn">
          Retour
        </button>
        <button type="submit" class="login__btn btn">Connexion</button>
      </div>
    </form>
  </Transition>
</template>

<style scoped lang="scss">
@use '@/assets/abstracts/mixins' as m;

.login {
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  height: 100vh;
  width: 100%;
  backdrop-filter: blur(5px);

  
  align-content: center;
  display: grid;
  grid-template-rows: repeat(4, min-content);
  justify-content: center;
  align-items: center;
  row-gap: 2rem;
  background-color: var(--color-black-3);

  @include m.xl {
    width: 30%;
  }

  &__group {
  }

  &__label {
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
  }

  &__btn {
    justify-self: center;

    &:first-of-type {
      margin-right: 2rem;
    }
  }

  &__link {
    text-decoration: none;
    color: var(--color-white);
    font-weight: 100;
    font-size: 1.8rem;
    transition: color 0.2s;
    &:hover,
    &:active {
      color: var(--color-purple-1);
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s;
}

.fade-enter-from,
.fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
