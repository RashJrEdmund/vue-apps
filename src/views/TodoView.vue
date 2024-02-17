<script setup lang='ts'>
import { reactive, ref, computed } from 'vue';
import type { ITodo } from '../interfaces/todo.d';
import Todo from '../components/todo/Todo.vue';
import TodoStats from '../components/todo/TodoStats.vue';

const TODOS = ref<ITodo[]>([
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
  if (hideDone.value) return TODOS.value.filter(t => !t.isCompleted);
  return TODOS.value;
});

const handleSubmit = (e: Event) => {
  e.preventDefault();
  if (!todoVal.value.trim()) return;

  const date = new Date();

  const newTodo: ITodo = {
    id: crypto.randomUUID(),
    todo: todoVal.value,
    createdAt: date.toDateString() + ' | ' + date.toLocaleTimeString(),
    completedAt: null,
    isCompleted: false,
  };

  TODOS.value.push(newTodo);

  todoVal.value = '';
};

const deletedTodo = (event_data: { id: string }) => {
  TODOS.value = TODOS.value.filter(t => t.id !== event_data.id);
};

const handleCompletion = (event_data: { date: string | null, id: string }) => {
  for (const i in TODOS.value) {
    if (TODOS.value[i].id === event_data.id) {
      TODOS.value[i].completedAt = event_data.date;
      break;
    };
  }
}

const handleDeleteAllCompleted = () => {
  TODOS.value = TODOS.value.filter(t => !t.isCompleted);
};

const handleHideDone = () => {
  hideDone.value = !hideDone.value;
};
</script>

<template>
  <main>
    <h1 class='heading'>Create and manage your todo's</h1>

    <div class='container'>
      <form @submit='handleSubmit'>
        <input type='text' name='' placeholder='Add Task' v-model='todoVal'>
        <button type='submit'>+</button>
      </form>

      <TodoStats :TODOS='TODOS' :showing='COMPUTED_TODOS.length' />

      <Todo v-for='todo in COMPUTED_TODOS' v-bind:key='todo.id' v-bind:todo='todo' @completion='handleCompletion'
        @deletion='deletedTodo' />

      <section v-if='TODOS.filter(t => t.isCompleted).length > 0' class='base_cta_btns'>
        <button class='hide-btn' @click='handleHideDone'>
          {{ hideDone ? 'Show All' : 'Hide Completed Todos' }}
        </button>

        <button class='delete-all-btn'
          @click='handleDeleteAllCompleted'>
          Delete All Completed
        </button>
      </section>
    </div>
  </main>
</template>

<style scoped lang='scss'>
main {
  .heading {
    margin: 0 auto;
    text-align: right;
  }

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

    .base_cta_btns {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: start;
      gap: 1rem;

      button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        padding: 10px;
        border-radius: 5px;
        margin: 2rem 0;

        &.hide-btn {
          background-color: var(--light_secondary);
          transition: 300ms;

          &:hover {
            background-color: var(--dark);
            border: 0.5px solid gray;
            color: var(--light);
          }
        }

        &.delete-all-btn {
          background-color: transparent;
          border: 0.5px solid var(--error);
          color: var(--light);
        }
      }
    }
  }
}
</style>
