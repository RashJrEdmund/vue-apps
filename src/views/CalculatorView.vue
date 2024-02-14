<script setup lang='ts'>
import { ref, reactive, watch } from 'vue';
const formError = ref<{ error: boolean, message: string } | null>(null);
const inputVal = ref<string>('');

console.log('mounted')

const handleInputChange = (e: Event) => {
  const value = (e.target as HTMLInputElement).value;
  new RegExp("^[0-9\/*+-]", "ig")
  const wrongMatch = value.match(/[^0-9+-\/*]/ig);
  console.log({ wrongMatch });

  if (wrongMatch) {
    formError.value = {
      error: true,
      message: ''
    }

    return;
  }

  inputVal.value = value;
};
//
</script>

<template>
  <main>
    <h1>Calculator App</h1>

    <div class='container'>
      <form class='top-section'>
        <input type='text' placeholder='0' @:input='handleInputChange' v-bind:value='inputVal'>

        <span v-if='formError?.error' class='error'>{{ formError?.message }}</span>
      </form>
    </div>
  </main>
</template>

<style scoped lang='scss'>
main {

  .container {
    width: min(100%, 600px);

    form {
      width: 100%;
      height: fit-content;
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      border-radius: 5px;
      margin: 2rem 0;
      position: relative;

      input {
        width: 100%;
        padding: 10px;
        font-size: 1.2rem;
      }

      .error {
        color: var(--error);
        position: absolute;
        left: 0;
        top: calc(100% + 5px);
        font-size: 0.9rem;
        font-size: 400;
      }
    }
  }
}
</style>
