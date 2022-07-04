<template>
  <div class="modal-wrapper">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Are you sure to delete this?</h5>
          <button type="button" class="close" aria-label="Close">
            <span aria-hidden="true" @click="onClose">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          ...
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="onClose">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup(props, {emit}) {
    const onClose = () => {
      emit('close')
    }

    return {
      onClose
    }
  }

}
</script>

<style scoped>
.modal-wrapper{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
}
</style>