<template>
<div class="container">
  <h1 class="todo-title">투두리스트</h1>
  <TodoForm @add-todo="addTodo"/>
  <strong v-if="!todos.length">You have nothing to do.</strong>
  <TodoList :todos="todos"/>
</div>
</template>

<script>
import {ref} from 'vue';
import TodoForm from './components/TodoForm.vue'
import TodoList from './components/TodoList.vue'

export default {
  components: {
    TodoForm,
    TodoList
  },
  setup() {
      const todos = ref([]);

      const addTodo = (todo) => {
        todos.value.push(todo)
      }

      const deleteTodo = (index) => {
          todos.value.splice(index, 1);
      };
      return {
          todos,
          addTodo,
          deleteTodo,
      };
  },
}
</script>

<style>
* {
  list-style: none;
}

.container {
  margin-top: 100px;
}

.todo-title {
  margin-bottom: 50px;
  text-align: center;
  font-size: 50px;
  font-weight: 600;
  color: rgb(66, 66, 221);
}

.card-text {
  cursor: pointer;
}

.doneTodo {
  color: lightgrey;
  text-decoration: line-through;
}
</style>
