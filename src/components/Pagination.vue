<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item" v-if="currentPage !== 1">
        <a class="page-link" href="#" @click="onClick(currentPage - 1)">Previous</a>
      </li>
      <li v-for="i of numOfPages" :key="i" class="page-item" :class="currentPage===i? 'active':''">
        <a class="page-link" href="#" @click="onClick(i)">{{i}}</a>
      </li>
      <li class="page-item" v-if="numOfPages !== currentPage">
        <a class="page-link" href="#"  @click="onClick(currentPage + 1)">Next</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
    props: {
        currentPage: {
            type: Number,
            default: true,
      },
        numOfPages: {
            type: Number,
            default: true,
        },
    },
    emits: ['click'],
    setup(props, {emit}) {
        const onClick = (page) => {
            emit('click', page)
        }
        return {
            onClick
        }
    }
}
</script>

<style>
</style>