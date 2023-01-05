<template>
  <div class="container">
    <form class="form-horizontal mt-5" novalidate>
      <div class="form-group row">
        <label for="title" class="control-label col-sm-2">Title:</label>
        <div class="col-sm-20">
          <input type="text" class="form-control" id="title" v-model="title" required placeholder="Enter title">
          <span class="invalid-feedback" v-if="title === ''">A title must be filled in</span>
        </div>
      </div>
      <div class="form-group row">
        <label for="description" class="control-label col-sm-2">Description:</label>
        <div class="col-sm-20">
          <textarea class="form-control" id="description" v-model="description" required placeholder="Enter description"></textarea>
          <span class="invalid-feedback" v-if="description === ''">A description must be filled in</span>
        </div>
      </div>
      <div class="form-group row">
        <label for="deadline" class="control-label col-sm-2">Deadline:</label>
        <div class="col-sm-20">
          <input type="date" class="form-control" id="deadline" v-model="deadline" required placeholder="Enter deadline">
          <span class="invalid-feedback" v-if="deadline === ''">A deadline must be filled in</span>
        </div>
      </div>
      <div class="form-group row">
        <div class="col-sm-offset-2 col-sm-15">
          <button type="submit" class="btn btn-primary mr-2">Submit</button>
          <button type="button" class="btn btn-secondary" @click="resetForm">Reset</button>
        </div>
      </div>
    </form>
  </div>
</template>

<style>
.container {
  display: grid;
  position: relative;
  align-items: start;
  justify-content: center;
  height: 100%;
}
</style>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'createToDo',
  props: {
    modalData: Object,
    editTodo: Function,
    closeModal: Function
  },
  data () {
    return {
      title: '',
      description: '',
      deadline: ''
    }
  },
  methods: {
    resetForm: function () {
      this.title = ''
      this.description = ''
      this.deadline = ''
    }
  }
}
</script>
