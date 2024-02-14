<script setup lang='ts'>
import { reactive, ref, computed } from 'vue';
import type { ITodo } from '../interfaces/todo.d';
import Todo from '../components/todo/Todo.vue';

const TODOS = reactive<ITodo[]>([
  // {
  //   id: crypto.randomUUID(),
  //   todo: 'carry water',
  //   createdAt: new Date().toDateString(),
  //   completedAt: null,
  //   isCompleted: false,
  // }
]);

const todoVal = ref<string>('');

const hideDone = ref<boolean>(false);

const COMPUTED_TODOS = computed(() => {
  if (hideDone.value) return TODOS.filter(t => !t.isCompleted);
  return TODOS;
})

const handleSubmit = (e: Event) => {
  e.preventDefault();
  if (!todoVal.value.trim()) return;

  const newTodo: ITodo = {
    id: crypto.randomUUID(),
    todo: todoVal.value,
    createdAt: new Date().toDateString(),
    completedAt: null,
    isCompleted: false,
  };

  TODOS.push(newTodo);

  todoVal.value = '';
};

const handleHideDone = () => {
  console.log('todos', TODOS);
};
</script>

<template>
  <main>
    <h1>Create and manage todo's</h1>

    <div class='container'>
      <form @submit='handleSubmit'>
        <input type='text' name='' placeholder='Enter Todo' v-model='todoVal'>
        <button type='submit'>+</button>
      </form>

      <Todo v-for='todo in COMPUTED_TODOS' v-bind:key='todo.id' v-bind:todo='todo' />

      <button v-if='TODOS.length > 0' class='hide-btn' @click='() => hideDone = !hideDone'>
        {{ hideDone ? 'Completed Todos have been hidden' : 'Hide completed Todos' }}
      </button>
    </div>
  </main>
</template>

<style lang='scss'>
main {
  .container {
    width: min(100%, 600px);

    form {
      width: 100%;
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      max-height: 3rem;
      overflow: hidden;
      border-radius: 5px;
      margin: 2rem 0;

      input {
        width: 100%;
        padding: 15px 10px;
      }

      button {
        min-height: 100%;
        padding: 2rem 10px;
        background-color: #ccc;
      }
    }

    .hide-btn {
      align-self: start;
      padding: 10px;
      border-radius: 5px;
      margin: 2rem 0 0;
      transition: 300ms;

      &:hover {
        background-color: var(--dark);
        border: 0.5px solid gray;
        color: #fff;
      }
    }
  }
}
</style>
