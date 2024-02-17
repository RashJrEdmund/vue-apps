import type { IOperators } from '@/interfaces/calculator';

function evaluateExpression(first: number, second: number, operator: IOperators): { answer: number; errorMsg: string; } {
  let answer: number = 0;

  switch (operator) {
    case '+':
      answer = first + second;
      break;
    case '-':
      answer = first - second;
      break;
    case 'x':
      answer = first * second;
      break;
    case '÷':
      answer = first / second;
      break;
    case '%':
      answer = (first / 100) * second;
      break;
    default:
      break;
  }

  if (answer > Number.MAX_SAFE_INTEGER) {
    return {
      answer: 0,
      errorMsg: 'Your results are out of the positive bounds'
    }
  } else if (answer < Number.MIN_SAFE_INTEGER) {
    return {
      answer: 0,
      errorMsg: 'Your results are out of the negative bounds'
    }
  };

  console.log({ first, second, operator, answer });

  return {
    answer,
    errorMsg: '',
  }
};

export {
  evaluateExpression,
};
