<script setup lang='ts'>
import type { ITodo } from '../../interfaces/todo.d';
import { computed } from 'vue';
const props = defineProps<{
  TODOS: ITodo[],
  showing: number,
}>();

const todoCount = computed(() => {
  const completed = props.TODOS.filter(t => t?.isCompleted).length;
  return {
    completed,
    notCompleted: props.TODOS.length - completed,
    length: props.TODOS.length,
  }
});
</script>

<template>
  <div class='stats'>
    <span class="completed">
      completed
      <span>
        <span class='done'>{{ todoCount.completed }}</span>
        /
        {{ todoCount.length }}
      </span>
    </span>

    <span class="showing">
      Showing
      <span>{{ props.showing }}</span>
    </span>
  </div>
</template>

<style lang='scss'>
.stats {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .completed,
  .showing {
    .done {
      color: var(--twitter_blue);
    }
  }
}
</style>