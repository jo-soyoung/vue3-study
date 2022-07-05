<template>
  <List :items="todos">
    <template #default="{item, index}">
      <li class="card-body d-flex align-center p-2"  @click="moveToPage(item.id)">
        <label :for="item.id" class="card-text" :class="{doneTodo: item.completed}" >
          <input type="checkbox" class="form-input-check" :id="item.id" :value="item.completed" @change="toggleTodo(index, $event)" @click.stop>
          <span class="checkbox-text">{{item.subject}}</span>
        </label>
        <div>
          <button class="btn btn-danger btn-sm" @click.stop="openModal(item.id)">Delete</button>
        </div>
      </li>
    </template>
  </List>


  <teleport to='#modal'>
    <Modal v-if="showModal" @close="closeModal" @delete="deleteTodo">

    </Modal>
  </teleport>
</template>

<script>
import { ref } from 'vue';
import {useRouter} from 'vue-router';
import Modal from '@/components/DeleteModal.vue'
import List from '@/components/List.vue'

export default {
  components: {
    Modal,
    List
  },
    props: {
        todos: {
            type: Array,
            required: true
        }
    },
    emits: ["toggle-todo", "delete-todo"],
    setup(props, { emit }) {
      const router = useRouter()
      const showModal = ref(false)
      const todoDeleteId = ref(null)

      const toggleTodo = (index, event) => {
          emit('toggle-todo', index, event.target.checked)
      }

      const openModal = (id) =>{
        showModal.value = true
        todoDeleteId.value = id
      }
      const closeModal = () =>{
        showModal.value = false
        todoDeleteId.value = null
      }

      const deleteTodo = () => {
        emit('delete-todo', todoDeleteId.value)
        closeModal()
      }

      const moveToPage = (todoId) => {
        router.push('/todos/' + todoId)
      }

      return {
          openModal,
          closeModal,
          toggleTodo,
          deleteTodo,
          moveToPage,
          showModal,
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