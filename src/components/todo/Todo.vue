<script setup lang='ts'>
import type { ITodo } from '../../interfaces/todo.d';
defineProps<{
  todo: ITodo,
}>();

const emit = defineEmits(['completion', 'deletion']);

const handleCompletionEmission = (e: Event, _todo: ITodo) => {
  if ((e.target as HTMLInputElement).checked) {
    const date = new Date();

    emit('completion', {
      date: date.toDateString() + ' | ' + date.toLocaleTimeString(),  // the date of completion
      id: _todo.id,
    })
  } else emit('completion', {
    date: null,  // converting date back to null
    id: _todo.id,
  });
}

const handleDeletionEmission = (id: string) => {
  emit('deletion', { id });
}
</script>

<template>
  <div v-bind:class='todo.isCompleted ? "completed todo" : "todo"'>
    <div class='top'>
      <input type='checkbox' @click='(e: Event) => handleCompletionEmission(e, todo)' v-model='todo.isCompleted' />

      <span class='name'>{{ todo.todo }}</span>
    </div>
    <div class='bottom'>
      <span>
        started at:
        <span class='date'>{{ todo.createdAt }}</span>
      </span>

      <span>
        completed at:
        <span class='date completion-date'>{{ todo.completedAt || 'Not yet done' }}</span>
      </span>

      <button class='delete-btn' @:click='() => handleDeletionEmission(todo.id)'>delete todo</button>
    </div>
  </div>
</template>

<style lang='scss'>
.todo {
  display: flex;
  flex-direction: column;
  background-color: #000;
  width: 100%;
  margin: 7px 0;
  padding: 10px;
  border-radius: 4px;

  &.completed {

    .top,
    .bottom {
      width: 100%;
    }

    .top {
      .name {
        text-decoration: line-through;
      }
    }

    .bottom {
      .completion-date {
        color: var(--twitter_blue);
      }
    }
  }

  .top,
  .bottom {
    width: 100%;
  }

  .top {
    span {
      margin: 0 10px;
      text-transform: capitalize;
      font-size: 1.2rem;
    }
  }

  .bottom {
    display: flex;
    flex-direction: column;
    margin: 10px 0;
    gap: 10px;
    color: var(--light_tertiary);

    .date {
      color: var(--dark);
      color: var(--light_secondary);
      font-weight: 600;
    }

    .delete-btn {
      color: var(--light);
      align-self: flex-end;
      cursor: pointer;
      padding: 4px;
      border-radius: 5px;
      transition: 300ms;
      border: 0.5px solid transparent;

      @media only screen and (max-width: 600px) {
        border: 0.5px solid var(--error);
      }

      &:hover {
        border: 0.5px solid var(--error);
      }
    }
  }
}
</style>