<template>
<div>
  <div class="container">
      <nav class="navbar navbar-expand-lg navbar-light">
        <router-link class="navbar-brand" to="/">Joa TodoList</router-link>

        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/todos">Todos</router-link>
          </li>
        </ul>
    </nav>
  </div>

  <div class="container">
    <router-view/>
  </div>
</div>
</template>

<script>
export default {}
</script>

<style>
.navbar {
  display: flex;
  justify-content: space-between;
  padding: 30px;
  background-color: lightblue;
}
.navbar-brand {
  color: white !important;
  font-size: 24px;
  font-weight: 700;
}
.nav-link {
  font-size: 20px;
  color: white !important;
}
</style>
