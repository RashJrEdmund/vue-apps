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
  --light: #fff;
  --light_secondary: #ffffffca;
  --light_tertiary: #ffffff83;

  --dark: #242424;
  --app_width: min(97vw, 1224px);
  --twitter_blue: #1d9bf0;
  --error: tomato;

  --query_max_width: 600px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

*:hover {
  outline: none;
}

body {
  background-color: var(--dark);
  color: var(--light);
  font-family: Arial, Helvetica, sans-serif;
}

main {
  width: var(--app_width);
  min-height: 80vh;
  margin: 0 auto;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
}

button {
  background: none;
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

input:focus {
  outline: none;
}
</style>