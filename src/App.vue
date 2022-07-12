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

  <transition name="slide">
    <Toast v-if="showToast" :message="toastMessage" :type="toastAlertType" />
  </transition>
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

.slide-enter-active,
.slide-leave-active {
    transition: all 0.5s ease;
}
.slide-enter-from,
.slide-leave-to {
    opacity: 0;
    transform: translateY(-30px);
}
.slide-enter-to,
.slide-leave-from {
    opacity: 1;
    transform: translateY(0px);
}
</style>
