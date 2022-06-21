<template>
<div>
  <nav class="navbar navbar-expand-lg navbar-light bg-light p-20">
    <router-link class="navbar-brand" to="/">Joa TodoList</router-link>

    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <router-link class="nav-link" to="/todos">Todos</router-link>
      </li>
    </ul>
  </nav>
  <router-view/>
</div>
</template>

<script>
export default {}
</script>

<style>

</style>
