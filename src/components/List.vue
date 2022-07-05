<template>
  <ul v-for="(item, index) in items" :key="item.id" class="card mt-2">
    <slot :item="item" :index="index"></slot>
  </ul> 
</template>

<script>
export default {
    props: {
        items: {
            type: Array,
            required: true,
        }
    }
}
</script>

<style>
</style>