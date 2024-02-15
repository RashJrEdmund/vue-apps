<script setup lang='ts'>
import { ref, reactive, watch } from 'vue';
const formError = ref<{ error: boolean, message: string } | null>(null);
const inputVal = ref<string>('');

const answer = ref<string>('0');

const ARR_OPERATORS = ['/', '*', '-', '+'];

const handleSubmit = (e: Event) => {
  e.preventDefault();

  if (inputVal.value.length <= 1) return;

  const regex = new RegExp(`^\\d([\\d${ARR_OPERATORS.join('')}]*)?\\d$`, 'g'); // returns /^\d([\d/*-+]*)?\d$/g. wrote it myself. if it starts and ends with digit;

  if (!regex.test(inputVal.value)) {
    formError.value = {
      error: true,
      message: 'Expression must start and end with a digit',
    }

    return;
  }

  formError.value = null;
};

const handleInputChange = (e: Event) => {
  const value = (e.target as HTMLInputElement).value;
  const regex = new RegExp(`[^0-9${ARR_OPERATORS.join('')}]`, 'g'); // returns /[^0-9/*-+]/g;

  const wrongMatch = value.match(regex); // anything that's none of these.
  console.log({ wrongMatch });

  if (wrongMatch) {
    formError.value = {
      error: true,
      message: 'Invalid character "' + wrongMatch.join(',') + `" detected . only numbers and operators (${ARR_OPERATORS.join(' ')}) are allowed`,
    }

    return;
  }

  formError.value = null;

  inputVal.value = value;
};
//
</script>

<template>
  <main>
    <h1>Calculator App</h1>

    <div class='container'>
      <div class='top-section'>
        <form @submit='handleSubmit'>
          <input type='text' placeholder='0' @:input='handleInputChange' v-bind:value='inputVal'>

          <span v-if='formError?.error' class='error'>{{ formError?.message }}</span>
        </form>

        <div class='answer'>{{ answer }}</div>
      </div>
    </div>
  </main>
</template>

<style scoped lang='scss'>
main {

  .container {
    width: min(100%, 600px);

    .top-section {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: start;

      form {
        width: 100%;
        height: fit-content;
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
        border-radius: 5px;
        margin: 3rem 0 0;
        position: relative;

        input {
          width: 100%;
          padding: 3rem 10px 10px;
          font-size: 1.2rem;
        }

        .error {
          color: var(--error);
          position: absolute;
          left: 0;
          top: -5px; //calc(100% + 5px);
          transform: translateY(-100%);
          font-size: 0.9rem;
          font-size: 400;
        }
      }

      .answer {
        background-color: var(--dark);
        border: 0.5px solid var(--light_secondary);
        width: calc(100% - 1px);
        text-align: right;
        margin: 0 auto 2rem;
        padding: 10px;
        height: fit-content;
        min-height: 80px;
      }
    }
  }
}
</style>
