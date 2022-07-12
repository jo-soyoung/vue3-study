<template>
  <div v-if="loading">Loading...</div>
  <form
      v-else
      @submit.prevent="onSave"
  >
      <div class="row">
          <div class="col-6 upper">
            <Input
                v-model:subject="todo.subject"
                label="Subject"
                :error="subjectErr"
            />
          </div>

          <div v-if="editing" class="col-6">
              <label>Status</label>
              <div>
                  <button
                      type="button"
                      class="btn"
                      :class="todo.completed ? 'btn-success' : 'btn-danger'"
                      @click="toggleTodoStatus"
                  >
                      {{ todo.completed ? 'Completed' : 'Incomplete' }}
                  </button>
              </div>
          </div>

          <div class="col-12">
            <div class="form-group">
              <label>Body</label>
              <textarea v-model="todo.body" name="" class="form-control" cols="30" rows="10" />
            </div>
          </div>
      </div>

      <button type="submit" class="btn btn-primary" :disabled="!todoUpdated">
          {{editing ? 'Update' : 'Create'}}
      </button>
      <button
          class="btn btn-outline-dark cancel-btn"
          @click="moveToTodoListPage"
      >
          Cancel
      </button>
  </form>

<transition name="fade">
    <Toast v-if="showToast" :message="toastMessage" :type="toastAlertType" />
</transition>
</template>

<script>

import { ref, computed, onUnmounted, onUpdated } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import axios from '@/axios';
import _ from 'lodash';
import { useToast } from '@/composables/toast'
import Toast from '@/components/Toast.vue';
import Input from '@/components/Input.vue'

export default {
    components: {
        Toast,
        Input,
    },
    props: {
      editing: {
        type: Boolean,
        default: false,
      }
    },
    setup(props) {
        // onUpdated(()=>{
        //     console.log(todo.value.subject)
        // })
        const route = useRoute();
        const router = useRouter();
        const todoId = route.params.id
        const todo = ref({
          subject: '',
          completed: false,
          body: ''
        });
        const originalTodo = ref(null);
        const loading = ref(false);
        const subjectErr = ref('')

        const {        
            showToast,
            toastMessage,
            toastAlertType,
            triggerToast
        } = useToast()

        const todoUpdated = computed(()=>{
            return !_.isEqual(todo.value, originalTodo.value)
        })

        const getTodo = async() => {
            loading.value = true;
            try {
            const res = await axios.get(`todos/${todoId}`)
            todo.value = {... res.data};
            originalTodo.value = {... res.data};
            loading.value = false;
            } catch (err) {
                loading.value = false;
                console.log(err)
                triggerToast('Something went wrong', 'danger')
            }
        }
        if (props.editing) {
          getTodo()
        }

        const toggleTodoStatus = () => {
            todo.value.completed = !todo.value.completed
        }

        const moveToTodoListPage = () => {
            router.push({
                name: 'Todos'
            })
        }

        const onSave = async() => {
          subjectErr.value = ''
          if(!todo.value.subject) {
            subjectErr.value="Subject is required. Please type in above."
            return;
          }

          try {
            let res
            const data = {
                subject: todo.value.subject,
                completed: todo.value.completed,
                body: todo.value.body
            }
            if(props.editing){
              res = await axios.put(`${todoId}`, data)
            } else {
              res = await axios.post('todos', data)
              todo.value.subject=''
              todo.value.body=''
            }

              originalTodo.value = {...res.data}
              const msg = `Successfully ${props.editing? 'updated' : 'created'}!`
              triggerToast(msg)

              if(!props.editing) {
                router.push({
                    name: 'Todos'
                })
              }
          } catch (err) {
              console.log(err)
              triggerToast('Something went wrong', 'danger')
          }
        }

        return {
            todo,
            loading,
            showToast,
            toastMessage,
            toastAlertType,
            subjectErr,
            todoUpdated,
            toggleTodoStatus,
            moveToTodoListPage,
            onSave,
            triggerToast,
        }
    }
}
</script>

<style>
.upper {
    margin-bottom: 20px;
}
.cancel-btn {
    margin-left: 2px;
}
.form-group {
  margin-bottom: 12px;
}

.fade-enter-active,
.fade-leave-active {
    transition: all 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(-30px);
}
.fade-enter-to,
.fade-leave-from {
    opacity: 1;
    transform: translateY(0px);
}
</style>