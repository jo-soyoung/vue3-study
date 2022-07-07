<template>
    <div>Home Page</div>
    <div>{{count}}</div>
    <button @click="test">Add</button>
</template>

<script>
import { useCount } from "@/composables/count";

export default {
    setup() {
        const {count} = useCount()
        const test = () => {
            console.log(count + 1)
        }
        return {
            test,
            count
        }
    }
}
</script>

<style>
</style>