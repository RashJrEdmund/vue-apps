<script setup lang='ts'>
</script>

<template>
  <main>
    <h2 class='heading'>Welcome to my vue app collection</h2>

    <section>
      <img src='@/assets/r-home.jpeg' />
    </section>
  </main>
</template>

<style scoped lang='scss'>
main {
  justify-content: center;

  .heading {
    margin: 0 auto;
    text-align: center;
  }

  section {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
    margin: 4rem auto 0;

    img {
      width: min(97vw, 300px);
      border-radius: 50px;
      background-position: top;
      transition: 300ms;
      object-fit: cover;
      object-position: center -70px;

      &:hover {
        transform: scale(1.3);
      }
    }
  }
}
</style>
