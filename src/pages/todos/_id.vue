<template>
    <h1> Todo Page </h1>

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

        <button type="submit" class="btn btn-primary">
            Save
        </button>
        <button
            class="btn btn-outline-dark cancel-btn"
            @click="moveToTodoListPage"
        >
            Cancel
        </button>
    </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

export default {
    setup() {
        const route = useRoute();
        const router = useRouter();
        const todoId = route.params.id

        const todo = ref(null);
        const loading = ref(true);

        const getTodo = async() => {
            const res = await axios.get(`http://localhost:3000/todos/${todoId}`)
            console.log(res);
            todo.value = res.data;
            loading.value = false;
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
            const res = await axios.put(`http://localhost:3000/todos/${todoId}`, {
                subject: todo.value.subject,
                completed: todo.value.completed,
            })
            console.log(res)
        }

        return {
            todo,
            loading,
            toggleTodoStatus,
            moveToTodoListPage,
            onSave
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