<script setup lang='ts'>
// const ARR_OPERATORS = ['+', '-', '*', '/'];
const emits = defineEmits(['numPress', 'operatorPress', 'AC', 'delete']);

const ARR_OPERATORS = [
  {
    visual: '+',
    value: '+',
  },
  {
    visual: '-',
    value: '-',
  },
  {
    visual: 'x',
    value: 'x',
  },
  {
    visual: '÷',
    value: '/'
  }
];

const ARR_TOP_ACTIONS = [
  {
    visual: 'AC',
    value: '+',
    action: () => emits('AC'),
  },
  {
    visual: 'Del',
    value: '-',
    action: () => emits('delete'),
  }
];

const ARR_NUMBERS: Array<string> = ['=', ...new Array(10).fill(null).map((_, i) => {
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
    <button v-for='{ visual, value, action } in ARR_TOP_ACTIONS' v-bind:key='visual' @click='action'>
      {{ visual }}
    </button>
  </section>

  <div class='key-pad'>
    <div class='numbers'>
      <button v-for='digit in ARR_NUMBERS.reverse()' v-bind:key='digit' @click='() => handleNumberPress(digit)'>
        {{ digit }}
      </button>
    </div>

    <div class='operators'>
      <button v-for='{ visual, value } in ARR_OPERATORS' v-bind:key='visual' @click='() => handleOperatorPress(value)'>
        {{ visual }}
      </button>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.top-actions {
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 5px;

  button {
    background-color: brown;
    width: 100%;
    height: 100%;
    font-weight: 600;
    font-size: 1.4rem;
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

      &:nth-last-child(2) {
        grid-column: 1 / span 2;
      }

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
