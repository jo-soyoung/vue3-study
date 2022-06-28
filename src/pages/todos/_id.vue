<template>
    <div v-if="loading">Loading...</div>

    <form
        v-else
        @submit.prevent="onSave"
    >
        <div class="row">
            <div class="col-6 upper">
                <div class="form-group">
                    <label>Todo Subject</label>
                    <input v-model="todo.subject" type="text" class="form-control">
                </div>
            </div>

            <div class="col-6">
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
        </div>

        <button type="submit" class="btn btn-primary" :disabled="!todoUpdated">
            Save
        </button>
        <button
            class="btn btn-outline-dark cancel-btn"
            @click="moveToTodoListPage"
        >
            Cancel
        </button>
    </form>

    <Toast v-if="showToast" :message="toastMessage" :type="toastAlertType" />
</template>

<script>
import { ref, computed, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import _ from 'lodash';
import Toast from '@/components/Toast.vue';
import { useToast } from '@/composables/toast'

export default {
    components: {
        Toast
    },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const todoId = route.params.id
        const todo = ref(null);
        const originalTodo = ref(null);
        const loading = ref(true);

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
            try {
            const res = await axios.get(`http://localhost:3000/todos/${todoId}`)
            todo.value = {... res.data};
            originalTodo.value = {... res.data};
            loading.value = false;
            } catch (err) {
                console.log(err)
                triggerToast('Something went wrong', 'danger')
            }
        }
        getTodo()

        const toggleTodoStatus = () => {
            todo.value.completed = !todo.value.completed
        }

        const moveToTodoListPage = () => {
            router.push({
                name: 'Todos'
            })
        }

        const onSave = async() => {
            try {
                const res = await axios.put(`http://localhost:3000/todos/${todoId}`, {
                    subject: todo.value.subject,
                completed: todo.value.completed,
                })
                console.log(res)

                originalTodo.value = {...res.data}
                triggerToast('Successfully saved!')
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
            todoUpdated,
            toggleTodoStatus,
            moveToTodoListPage,
            onSave,
            triggerToast
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
</style>