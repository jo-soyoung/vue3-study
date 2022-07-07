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

  <Toast v-if="showToast" message="joa" :type="toastAlertType" />
</div>
</template>

<script>
import Toast from '@/components/Toast.vue'
import {useToast} from '@/composables/toast'
export default {
  components:{
    Toast
  },
  setup() {
    const {
        showToast,
        toastMessage,
        toastAlertType,
        triggerToast
    } = useToast()

    console.log(showToast.value)

    return {
        showToast,
        toastMessage,
        toastAlertType,
        triggerToast
    }
  }
}
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
