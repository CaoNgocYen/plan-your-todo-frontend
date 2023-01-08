<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 v-if="modalData.id" class="modal-title">Edit To-Do</h5>
              <h5 v-else class="text-center m-lg-auto">Create a new To-Do</h5>
            </div>
            <form class="needs-validation" id="to-do-create" novalidate>
              <div class="modal-body p-5">
                <div class="form-group">
                  <label class="font-weight-bold">Title</label>
                  <input type="text" class="form-control" v-model="title" placeholder="Enter title" required>
                  <div class="invalid-feedback">
                    A title muss be filled in.
                  </div>
                </div>
                <div class="form-group mt-3 needs-validation" novalidate>
                  <label class="font-weight-bold">Description</label>
                  <input type="text" class="form-control" v-model="description" placeholder="Enter description" required>
                  <div class="invalid-feedback">
                    A description muss be filled in.
                  </div>
                </div>
                <div class="form-group mt-3 needs-validation" novalidate>
                  <label>Deadline</label>
                  <input type="date" class="form-control" v-model="deadline" required placeholder="Enter deadline">
                  <div class='invalid-feedback'>
                    A deadline muss be selected.
                  </div>
                </div>
                <div v-if="this.serverValidationMessages">
                  <ul>
                    <li v-for="(message, index) in serverValidationMessages" :key="index" style="color: red">
                      {{ message }}
                    </li>
                  </ul>
                </div>
              </div>
              <div class="modal-footer d-flex justify-content-around">
                <button class='btn btn-secondary' type='reset' @click='resetForm'>Reset</button>
                <button class='btn btn-secondary' type='submit' @click='saveForm'>Submit</button>
                <button class='btn btn-secondary' type='close' @click='closeModal'>Close</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}
.modal-wrapper {
  position: fixed;
  padding: 50px 0;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(to bottom right, #93d5a8, #496393);
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
      serverValidationMessages: []
    }
  },
  emits: ['created'],
  methods: {
    async saveForm () {
      if (this.validate()) {
        let endpoint = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/todos'
        let method = 'POST'
        if (this.modalData.id) {
          endpoint += '/' + this.modalData.id
          method = 'PUT'
        }

        const headers = new Headers()
        headers.append('Content-Type', 'application/json')

        const todo = JSON.stringify({
          title: this.title,
          description: this.description,
          deadline: this.deadline
        })

        const requestOptions = {
          method: method,
          headers: headers,
          body: todo,
          redirect: 'follow'
        }

        const response = await fetch(endpoint, requestOptions)
        await this.handleResponse(response)
      }
    },
    async handleResponse (response) {
      if (response.ok) {
        const toDo = await response.json()
        if (this.modalData.id) {
          // ToDo item was updated, so update the toDos array
          const index = this.toDos.findIndex(item => item.id === this.modalData.id)
          if (index === -1) {
            console.error('Error updating to-do item: item not found')
          } else {
            this.toDos.splice(index, 1, toDo)
          }
        } else {
          // ToDo item was created, so add it to the toDos array
          this.toDos.push(toDo)
        }
      } else {
        console.error('Error saving to-do item:', response)
      }
    },
    validate () {
      const form = document.getElementById('to-do-create')
      form.classList.add('was-validated')
      return form.checkValidity()
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
