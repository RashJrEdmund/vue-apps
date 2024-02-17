<script setup lang='ts'>
import type { IOperators } from '@/interfaces/calculator';
import { ref, computed } from 'vue';
import { evaluateExpression } from '../utils/calculator/index.ts';
import KeyPad from '@/components/calculator/KeyPad.vue';

const formError = ref<{ error: boolean, message: string } | null>(null);

const ARR_OPERATORS: IOperators[] = ['+', '-', 'x', '÷', '%'];

const displayAnswer = ref<string | number>(0);

const tracker = ref<{
  left: string;
  right: string;
  operator: IOperators | ''
}>({ left: '0', right: '', operator: '' });

const computedDisplay = computed(() => {
  const left = tracker.value.left;
  const right = tracker.value.right;
  const operator = tracker.value.operator;

  return left + operator + right;
});

const handleEvaluation = () => {
  if (!tracker.value.left || !tracker.value.right) return;

  const left = +tracker.value.left;
  const right = +tracker.value.right;

  if (isNaN(left) || isNaN(right)) return;

  const res = evaluateExpression(left, right, tracker.value.operator as IOperators);

  if (res.errorMsg) {
    // handle error;
    return;
  }

  displayAnswer.value = res.answer;
  tracker.value.left = String(res.answer);
  tracker.value.operator = '';
  tracker.value.right = '';
};

const handleNumberPress = (event_data: { value: string }) => {
  if (formError.value) formError.value = null;

  if (event_data.value === '=') {
    handleEvaluation();
    return;
  };

  if (tracker.value.operator) { // an operator was selected already.
    if (event_data.value === '.') {
      tracker.value.right += event_data.value;
      return;
    };

    tracker.value.right += event_data.value;
    return;
  }

  if (event_data.value === '.') {
    tracker.value.left += event_data.value;
    return;
  };

  if (tracker.value.left === '0' || !tracker.value.left) {
    tracker.value.left = event_data.value;
    return;
  };

  tracker.value.left += event_data.value;
}

const handleOperatorPress = (event_data: { value: string }) => {
  if (tracker.value.operator && tracker.value.right) {
    handleEvaluation();

    tracker.value.operator = event_data.value as IOperators;
    return;
  }

  tracker.value.operator = event_data.value as IOperators;
}

const handleDel = () => {
  if (tracker.value.right) {
    tracker.value.right = tracker.value.right.slice(0, -1);
    return;
  };

  if (tracker.value.operator) {
    tracker.value.operator = '';
    return;
  };

  if (tracker.value.left.length <= 1) {
    tracker.value.left = '0';
    return;
  }

  const lastVal = computedDisplay.value.slice(-1);

  if (ARR_OPERATORS.includes(lastVal as IOperators)) { // meaning last val is an operator sign;
    tracker.value.operator = '';
    return;
  }

  tracker.value.left = tracker.value.left.slice(0, -1);
  return;
}

const handleAllClear = () => {
  tracker.value.left = '0';
  tracker.value.right = '';
  tracker.value.operator = '';

  displayAnswer.value = '';
}
</script>

<template>
  <main>
    <h1>Calculator App</h1>

    <div class='container'>
      <div class='top-section'>
        <div class='input-display'>
          {{ computedDisplay }}
          <span v-if='formError?.error' class='error'>{{ formError?.message }}</span>
        </div>

        <div class='answer'>{{ displayAnswer }}</div>
      </div>

      <KeyPad @num-press='handleNumberPress' @operator-press='handleOperatorPress' @delete='handleDel'
        @all-clear='handleAllClear' />
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
