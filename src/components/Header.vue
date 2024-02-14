<script setup lang='ts'>
import { RouterLink } from 'vue-router';

defineProps<{
  msg?: string
}>()
</script>

<template>
  <header>
    <div class='wrapper'>
      <img alt='Vue logo' class='logo' src='@/assets/logo.svg' width='125' height='125' />

      <nav>
        <RouterLink to='/'>Home</RouterLink>
        <RouterLink to='/calculator'>Calculator</RouterLink>
        <RouterLink to='/about'>About</RouterLink>
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
      }
    }
  }
}
</style>