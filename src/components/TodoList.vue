<template>
  <ul v-for="(t, index) in todos" :key="t.id" class="card mt-2">
    <li class="card-body d-flex align-center p-2"  @click="moveToPage(t.id)">
      <label :for="t.id" class="card-text" :class="{doneTodo: t.completed}" >
        <input type="checkbox" class="form-input-check" :id="t.id" :value="t.completed" @change="toggleTodo(index, $event)" @click.stop>
        <span class="checkbox-text">{{t.subject}}</span>
      </label>
      <div>
        <button class="btn btn-danger btn-sm" @click.stop="deleteTodo(index)">Delete</button>
      </div>
    </li>
  </ul>
</template>

<script>
import {useRouter} from 'vue-router';

export default {
    props: {
        todos: {
            type: Array,
            required: true
        }
    },
    emits: ["toggle-todo", "delete-todo"],
    setup(props, { emit }) {
      const router = useRouter();

      const toggleTodo = (index, event) => {
          emit('toggle-todo', index, event.target.checked)
      }

      const deleteTodo= (index) => {
          emit('delete-todo', index)
      }

      const moveToPage = (todoId) => {
        router.push('/todos/' + todoId)
      }

      return {
          toggleTodo,
          deleteTodo,
          moveToPage
      }
    }
}
</script>

<style>
.doneTodo {
  color: lightgrey;
  text-decoration: line-through;
}
.card-body {
    justify-content: space-between;
    cursor: pointer;
}
.checkbox-text {
  display: inline-block;
  margin-left: 8px;
}
</style>