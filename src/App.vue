<template>
<div class="container">
  <h1 class="todo-title">투두리스트</h1>
  <input type="text" class="form-control" v-model="searchText" placeholder="Seach">
  <hr/>
  <TodoForm @add-todo="addTodo"/>
  <strong style="color: red">{{error}}</strong>
  <p v-if="!filteredTodos.length">You have nothing to do.</p>
  <TodoList
    :todos="filteredTodos" @toggle-todo="toggleTodo" @delete-todo="deleteTodo" />
</div>
</template>

<script>
import {ref, computed} from 'vue';
import TodoForm from './components/TodoForm.vue'
import TodoList from './components/TodoList.vue'
import axios from 'axios'

export default {
  components: {
    TodoForm,
    TodoList
  },
  setup() {
      const todos = ref([]);
      const error = ref('');

      const getTodos = async() => {
        error.value = ''
        try {
          const res = await axios.get('http://localhost:3000/todos')
          console.log(res.data)
          todos.value = res.data
        } catch (err) {
          console.log(err)
          error.value = 'Oops Something went wrong!'
        }
      }
      getTodos()

      const addTodo = async(todo) => {
        // DB에 TODO 저장
        error.value = ''
        try {
          await axios.post('http://localhost:3000/todos', {
          subject: todo.subject,
          completed: todo.completed
          })
          todos.value.push(todo)
        } catch (err) {
          console.log(err)
          error.value = 'Oops Something went wrong!'
        }
      }

      const toggleTodo = async(index) => {
        const id = todos.value[index].id
        try {
          await axios.patch('http://localhost:3000/todos/' + id, {
            completed: !todos.value[index].completed
          })
        } catch (err) {
          console.log(err)
          error.value = 'Oops Something went wrong!'
        }
        todos.value[index].completed = !todos.value[index].completed
      }

      const deleteTodo = async(index) => {
        error.value = ''
        const id = todos.value[index].id
        try {
          await axios.delete('http://localhost:3000/todos/' + id)
        } catch (err) {
          console.log(err)
          error.value = 'Oops Something went wrong!'
        }
        todos.value.splice(index, 1);
      };

      const searchText = ref('')
      const filteredTodos = computed(() => {
        if (searchText.value) {
          return todos.value.filter(todo => {
            return todo.subject.includes(searchText.value)
          })
        } 
        return todos.value;
      })

      return {
          todos,
          addTodo,
          toggleTodo,
          deleteTodo,
          searchText,
          filteredTodos,
          error
      };
  },
}
</script>

<style>
* {
  list-style: none;
}

.container {
  margin-top: 50px;
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
</style>
