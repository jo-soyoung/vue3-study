<template>
<div>
  <router-view/>
  <h1 class="todo-title">투두리스트</h1>
  <input type="text" class="form-control" v-model="searchText" placeholder="Seach" @keyup.enter="searchTodo">
  <hr/>

  <TodoForm @add-todo="addTodo"/>
  <strong style="color: red">{{error}}</strong>
  <p v-if="!todos.length">You have nothing to do.</p>

  <TodoList
    :todos="todos" @toggle-todo="toggleTodo" @delete-todo="deleteTodo" />
  <hr/>

  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item" v-if="currentPage !== 1">
        <a class="page-link" href="#" @click="getTodos(currentPage - 1)">Previous</a>
      </li>
      <li v-for="i of numOfPages" :key="i" class="page-item" :class="currentPage===i? 'active':''">
        <a class="page-link" href="#" @click="getTodos(i)">{{i}}</a>
      </li>
      <li class="page-item" v-if="numOfPages !== currentPage">
        <a class="page-link" href="#"  @click="getTodos(currentPage + 1)">Next</a>
      </li>
    </ul>
  </nav>
</div>

<Toast v-if="showToast" :message="toastMessage" :type="toastAlertType" />
</template>

<script>
import { ref, computed, watch, onUnmounted } from 'vue'
import axios from 'axios'
import TodoForm from '@/components/TodoForm.vue'
import TodoList from '@/components/TodoList.vue'
import Toast from '@/components/Toast.vue'
import { useToast } from '@/composables/toast'

export default {
  components: {
    TodoForm,
    TodoList,
    Toast,
  },
  setup() {
      const todos = ref([])
      const error = ref('')
      const numOfTodos = ref(0)
      const currentPage = ref(1)
      const limit = 5
      const searchText = ref('')

      const {        
        showToast,
        toastMessage,
        toastAlertType,
        triggerToast
      } = useToast()

      const numOfPages = computed(()=> {
        return Math.ceil(numOfTodos.value/limit)
      })

      const getTodos = async(page = currentPage.value) => {
        currentPage.value = page

        try {
          const res = await axios.get(`http://localhost:3000/todos?_sort=id&_order=desc&subject_like=${searchText.value}&_page=${page}&_limit=${limit}`)
          numOfTodos.value = res.headers['x-total-count']
          todos.value = res.data
        } catch (err) {
          console.log(err)
          triggerToast('Something went wrong', 'danger')
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
          triggerToast('Successfully added!')
          getTodos(1)
        } catch (err) {
          console.log(err)
          triggerToast('Something went wrong', 'danger')
        }
      }

      const toggleTodo = async(index, checked) => {
        const id = todos.value[index].id
        try {
          await axios.patch('http://localhost:3000/todos/' + id, {
            completed: checked
          })
        } catch (err) {
          console.log(err)
          triggerToast('Something went wrong', 'danger')
        }
        todos.value[index].completed = checked
      }

      const deleteTodo = async(index) => {
        error.value = ''
        const id = todos.value[index].id
        try {
          await axios.delete('http://localhost:3000/todos/' + id)
          triggerToast('Successfully deleted!')
          getTodos(1)
        } catch (err) {
          console.log(err)
          triggerToast('Something went wrong', 'danger')
        }
        todos.value.splice(index, 1)
      };

      let timeout = null
      const searchTodo = () => {
        clearTimeout(timeout)
        getTodos(1)
      }
      watch(searchText, () => {
        timeout = setTimeout(()=>{
         getTodos(1) // 첫번째 페이지 보여주기
        }, 1000) 
      })

      return {
          todos,
          addTodo,
          getTodos,
          toggleTodo,
          deleteTodo,
          searchTodo,
          searchText,
          error,
          numOfPages,
          currentPage,
          showToast,
          toastMessage,
          toastAlertType,
          triggerToast,
      }
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

.card-text,
.page-link {
  cursor: pointer;
}
</style>
