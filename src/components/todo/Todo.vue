<script setup lang='ts'>
import type { ITodo } from '../../interfaces/todo.d';

defineProps<{
  todo: ITodo,
}>();
</script>

<template>
  <div class='todo'>
    <div class='top'>
      <input type='checkbox' v-model='todo.isCompleted' />

      <span v-bind:class='todo.isCompleted ? "completed" : ""'>{{ todo.todo }}</span>
    </div>
    <div class='bottom'>
      <span>
        started At:
        <span class="date">{{ todo.createdAt }}</span>
      </span>

      <span>
        completed At:
        <span class="date">{{ todo.completedAt || 'Not yet done' }}</span>
      </span>
    </div>
  </div>
</template>

<style lang='scss'>
.todo {
  display: flex;
  flex-direction: column;
  background-color: brown;
  width: 100%;
  margin: 4px 0;
  padding: 10px;
  border-radius: 4px;

  .top,
  .bottom {
    width: 100%;
  }

  .top {
    span {
      margin: 0 10px;

      &.completed {
        text-decoration: line-through;
      }
    }
  }

  .bottom {
    display: flex;
    flex-direction: column;
    margin: 10px 0;
    gap: 10px;

    .date {
      color: var(--dark);
      font-weight: 600;
    }
  }
}
</style>