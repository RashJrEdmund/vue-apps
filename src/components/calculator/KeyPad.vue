<script setup lang='ts'>
import type { IOperators } from '@/interfaces/calculator';

// const ARR_OPERATORS = ['+', '-', '*', '/'];
const emits = defineEmits(['numPress', 'operatorPress', 'allClear', 'delete']);

const ARR_OPERATORS: IOperators[] = ['÷', 'x', '-', '+'];

const ARR_TOP_ACTIONS = [
  {
    value: 'AC',
    action: () => emits('allClear'),
  },
  {
    value: 'Del',
    action: () => emits('delete'),
  },
  {
    value: '%',
    action: () => emits('operatorPress', { value: '%' }),
  }
];

const ARR_NUMBERS: Array<string> = ['=', '.', ...new Array(10).fill(null).map((_, i) => {
  return String.fromCharCode(48 + i); // String.fromCharCode(48) === '0' hence 0 - 9
})];

const handleNumberPress = (value: number | string) => {
  emits('numPress', {
    value
  })
};

const handleOperatorPress = (value: number | string) => {
  emits('operatorPress', {
    value
  })
};

</script>

<template>
  <section class='top-actions'>
    <button v-for='{ value, action } in ARR_TOP_ACTIONS' v-bind:key='value' @click='action'>
      {{ value }}
    </button>
  </section>

  <div class='key-pad'>
    <div class='numbers'>
      <button v-for='digit in ARR_NUMBERS.reverse()' v-bind:key='digit' @click='() => handleNumberPress(digit)'>
        {{ digit }}
      </button>
    </div>

    <div class='operators'>
      <button v-for='operator in ARR_OPERATORS' v-bind:key='operator' @click='() => handleOperatorPress(operator)'>
        {{ operator }}
      </button>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.top-actions {
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 5px;

  button {
    background-color: #000;
    width: 100%;
    padding: 5px;
    height: 100%;
    font-weight: 600;
    font-size: 1.4rem;
    color: var(--light);

    &:nth-of-type(1),
    &:nth-of-type(2) {
      background-color: brown;
    }
  }
}

.key-pad {
  width: 100%;
  display: flex;
  gap: 5px;
  min-height: min(50vh, 400px);

  button {
    background-color: gray;
    width: 100%;
    height: 100%;
    font-weight: 600;
    font-size: 1.4rem;
  }

  .numbers {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 5px;

    button {
      background-color: gray;
      width: 100%;
      height: 100%;
      padding: 1rem 0;

      &:nth-child(2n) {
        /* background-color: brown; */
      }
    }
  }

  .operators {
    display: grid;
    gap: 5px;

    button {
      padding: 1rem 2rem;
    }
  }
}
</style>
