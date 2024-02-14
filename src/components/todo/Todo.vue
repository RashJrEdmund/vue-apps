<script setup lang='ts'>
import type { ITodo } from '../../interfaces/todo.d';
import { computed, ref } from 'vue';
defineProps<{
  todo: ITodo,
}>();

const emit = defineEmits(['completion']);

const checkBoxRef = ref<HTMLInputElement | null>(null);

const _isCompleted = ref(false);

const handleEmission = (e: Event, _todo: ITodo) => {
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
</script>

<template>
  <div v-bind:class='todo.isCompleted ? "completed todo" : "todo"'>
    <div class='top'>
      <input type='checkbox' @click='(e: Event) => handleEmission(e, todo)' v-model='todo.isCompleted' />

      <span class='name'>{{ todo.todo }}</span>
    </div>
    <div class='bottom'>
      <span>
        started At:
        <span class="date">{{ todo.createdAt }}</span>
      </span>

      <span>
        completed At:
        <span class="date completion-date">{{ todo.completedAt || 'Not yet done' }}</span>
      </span>
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
        color: #1d9bf0;
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
    color: #ffffff83;

    .date {
      color: var(--dark);
      color: #ffffffca;
      font-weight: 600;
    }
  }
}
</style>