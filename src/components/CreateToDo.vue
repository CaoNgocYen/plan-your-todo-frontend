<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 v-if="modalData.id" class="modal-title">ToDo bearbeiten</h5>
              <h5 v-else class="modal-titel"> <strong>Create a new To-Do</strong></h5>
            </div>
            <form class="needs-validation" id="to-do-create" novalidate>
              <div class="modal-body">
                <div class="form-group">
                  <label>Title</label>
                  <input type="text" class="form-control" v-model="title" placeholder="Enter title" required>
                  <div class="invalid-feedback">
                    A title muss be filled in.
                  </div>
                </div>
                <div class="form-group mt-3 needs-validation" novalidate>
                  <label>Description</label>
                  <input type="text" class="form-control" v-model="description" placeholder="Enter description" required>
                  <div class="invalid-feedback">
                    A description muss be filled in.
                  </div>
                </div>
                <div class="form-group mt-3 needs-validation" novalidate>
                  <label for='prior' class='form-label'>Priority</label>
                  <select id='prior' class='form-select' v-model="prior" placeholder="Select a status" required>
                    <option value='' selected disabled>Choose...</option>
                    <option value='h'>High</option>
                    <option value='m'>Medium</option>
                    <option value='l'>Low</option>
                  </select>
                  <div class='invalid-feedback'>
                    A status muss be selected.
                  </div>
                </div>
                <div class="form-group mt-3 needs-validation" novalidate>
                  <label>Deadline</label>
                  <input type="date" class="form-control" v-model="deadline" required placeholder="Enter deadline">
                  <div class='invalid-feedback'>
                    A deadline muss be selected.
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button class='btn btn-danger me-3' type='reset' @click='resetForm'>Reset</button>
                <button class='btn btn-primary me-3' type='submit' @click='saveForm'>Submit</button>
                <button class='btn btn-primary me-3' type='close' @click='closeModal'>Close</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </transition>
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
      deadline: '',
      response: {}
    }
  },
  methods: {
    saveForm () {
      let valid = true
      if (this.title !== '' && this.description !== '' && this.priority !== '' && this.deadline !== '') {
        this.response = {}
        if (this.modalData.id) {
          this.response = this.modalData
        } else {
          this.response.completed = false
        }
        this.response.title = this.title
        this.response.description = this.description
        this.response.deadline = this.deadline
        this.editTodo(this.response)
      } else {
        valid = false
        // Show warning message
        alert('All fields are required!')
      }
      return valid
    },
    validate () {
      let valid = true
      const form = document.querySelector('#to-do-create')
      if (!form.checkValidity()) {
        valid = false
      }
      form.classList.add('was-validated')
      return valid
    },
    resetForm () {
      this.title = ''
      this.description = ''
      this.deadline = ''
    }
  },
  mounted () {
    if (this.modalData) {
      this.title = this.modalData.title
      this.description = this.modalData.description
      this.deadline = this.modalData.deadline
    }
  }
}
</script>
