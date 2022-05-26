<template>
  <ul v-for="(t, index) in todos" :key="t.id" class="card mt-2">
    <li  class="card-body d-flex align-center p-2 flex-grow-1">
      <label :for="t.id" class="card-text" :class="{doneTodo: t.completed}">
        <input type="checkbox" class="form-input-check" :id="t.id" v-model="t.completed">
        {{t.subject}}
      </label>
      <div>
        <button class="btn btn-danger btn-sm" @click="deleteTodo(index)">Delete</button>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
    props: {
        todos: {
            type: Array,
            required: true
        }
    }
}
</script>

<style></style>