<script setup lang='ts'>
import { ref, reactive, watch } from 'vue';
import KeyPad from '@/components/calculator/KeyPad.vue';

const formError = ref<{ error: boolean, message: string } | null>(null);
const inputVal = ref<string>('0');

const answer = ref<string>('0');

const ARR_OPERATORS = ['x', '/', '*', '-', '+'];

const handleNumberPress = (event_data: { value: string }) => {
  console.log(event_data);
  if (event_data.value === '=') {
    // evaluate inputVal
    return;
  };

  if (inputVal.value === '0' || !inputVal.value) {
    inputVal.value = event_data.value;
  };

  inputVal.value += event_data.value;
}

const handleOperatorPress = (event_data: { value: string }) => {
  console.log(event_data)

  if (ARR_OPERATORS.includes(inputVal.value.trim().slice(-1))) {
    return;
  }

  inputVal.value += event_data.value;
  //
}
//
</script>

<template>
  <main>
    <h1>Calculator App</h1>

    <div class='container'>
      <div class='top-section'>
        <div class='input-display'>
          {{ inputVal }}
          <span v-if='formError?.error' class='error'>{{ formError?.message }}</span>
        </div>

        <div class='answer'>{{ answer }}</div>
      </div>

      <KeyPad @num-press='handleNumberPress' @operator-press='handleOperatorPress' />
    </div>
  </main>
</template>

<style scoped lang='scss'>
main {
  .container {
    width: min(100%, 600px);
    margin: 2.2rem auto 0;
    display: flex;
    flex-direction: column;
    gap: 4px;

    .top-section {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: start;
      border: 0.5px solid var(--light_secondary);
      word-break: break-all;

      .input-display {
        background-color: black;
        width: 100%;
        height: fit-content;
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
        border-radius: 5px;
        position: relative;
        width: 100%;
        padding: 3rem 10px 10px;
        font-size: 1.2rem;

        .error {
          color: var(--error);
          position: absolute;
          left: 0;
          top: -5px;
          transform: translateY(-100%);
          font-size: 0.9rem;
          font-size: 400;
        }
      }

      .answer {
        background-color: var(--dark);
        border-top: 0.5px solid var(--light_secondary);
        width: calc(100% - 1px);
        text-align: right;
        padding: 10px;
        height: fit-content;
        min-height: 80px;
        word-break: break-all;
      }
    }
  }
}
</style>
