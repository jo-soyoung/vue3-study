<template>
<div>
  <Navbar/>

  <div class="container">
    <router-view/>
  </div>

  <Toast />
</div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Toast from '@/components/Toast.vue'

export default {
  components:{
    Toast,
    Navbar
},
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
