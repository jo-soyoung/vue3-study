<template>
<div>
  <div class="alert toast-box" :class="`alert-${type}`" role="alert">
    {{message}}
  </div>
</div>
</template>

<script>
export default {
    props: {
        message: {
            type: String,
            required: true
        },
        type: {
            type: String,
            default: 'success'
        }
    }
}
</script>

<style>
.toast-box {
    position: fixed !important;
    top: 0 !important;
    right: 0 !important;
}
</style>
