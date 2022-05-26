<template>
<form action="" class="d-flex" @submit.prevent="onSubmit">
    <div class="flex-grow-1 mr-2">
      <input type="text" class="form-control" v-model="todo" placeholder="Any plan for today?">
    </div>
    <div>
      <button class="btn btn-primary" type="submit">
        Add
      </button>
    </div>
  </form>
</template>

<script>
import {ref} from 'vue';

export default {
  emits: ['add-todo'],
  setup(props, { emit }) {
        const hasError = ref(false);
        const todo = ref("");

        const onSubmit = () => {
            if(todo.value === '') {
                hasError.value = true; 
            } else {
                emit('add-todo', {
                    id: Date.now(),
                    subject: todo.value,
                    completed: false,
                })
                hasError.value = false;
                todo.value = "";
            }
        };

        return {
            todo,
            hasError,
            onSubmit,
        }
    }
}
</script>

<style></style>