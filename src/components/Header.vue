<script setup lang='ts'>
import { RouterLink } from 'vue-router';
import { reactive } from 'vue';

defineProps<{
  msg?: string
}>();

const navContent = reactive<{ url: string, name: string }[]>([
  {
    url: '/',
    name: 'home',
  },
  {
    url: '/todo',
    name: 'todo',
  },
  {
    url: '/calculator',
    name: 'calculator',
  }
]);
</script>

<template>
  <header>
    <div class='wrapper'>
      <img alt='Vue logo' class='logo' src='@/assets/r-home.jpeg' width='125' height='125' />

      <nav>
        <RouterLink v-for='el in navContent' v-bind:key='el.name' v-bind:to='el.url'
          :class='$route.name === el.name ? "active" : ""'>
          {{ el.name }}
        </RouterLink>
      </nav>
    </div>
  </header>
</template>


<style scoped lang='scss'>
header {
  background-color: #fff;
  width: 100%;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;

  .wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 10px;
    width: var(--app_width);

    img {
      width: 40px;
      height: 40px;
      border-radius: 40px;
      border: 0.5px solid var(--dark);
      object-fit: cover;
      object-position: center -7px;

      @media only screen and (max-width: 600px) {
        object-fit: cover;
        object-position: center center;
      }
    }

    nav {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: end;
      flex-wrap: wrap;
      gap: 1rem;

      a {
        color: black;
        text-transform: capitalize;
        padding: 5px;
        border-radius: 3px;
        border: 0.5px solid transparent;
        transition: 300ms;

        &.active {
          border: 0.5px solid var(--dark);
        }
      }
    }
  }
}
</style>