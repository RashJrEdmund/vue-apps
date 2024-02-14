<script setup lang='ts'>
import { RouterView } from 'vue-router'
import Header from './components/Header.vue';
</script>

<template>
  <Header />

  <RouterView />
</template>

<style>
:root {
  --dark: #242424;
  --app_width: min(97vw, 1224px);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: var(--dark);
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;
}

button {
  border: none;
  cursor: pointer;
  width: fit-content;
  height: fit-content;
}

a {
  cursor: pointer;
  text-decoration: none;
}

li {
  list-style: none;
}
</style>