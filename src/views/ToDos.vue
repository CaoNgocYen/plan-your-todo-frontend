<template>
  <div class="container mt-3">
    <h1>Your To-Do List</h1>
  </div>
  <create-to-do v-if="isModalOpen" :modalData="modalData" :editTodo="editTodo" :closeModal="closeModal"></create-to-do>
  <div class="container mt-3">
    <div class="row d-flex justify-content-between">
      <div class="col-3">
        <input class="form-control bg-dark text-white" v-model="searchInput" placeholder="Filter nach Modul oder Datum..."/>
      </div>
      <button class="btn btn-success col-auto px-4" @click="openModal">Erstellen</button>
    </div>
    <div class="row mt-2">
      <p class="h6 text-decoration-underline">Noch zu erledigen:</p>
      <to-do-table :toDos="checkToDos(false)" :deleteTodo="deleteTodo" :editTodo="editTodo" :openModal="openModal"></to-do-table>
    </div>
    <div class="row mt-2">
      <p class="text-decoration-underline h6">Bereits erledigt:</p>
      <to-do-table :toDos="checkToDos(true)" :deleteTodo="deleteTodo" :editTodo="editTodo"></to-do-table>
    </div>
  </div>
</template>

<script>
import ToDoTable from '@/components/ToDoTable'
import CreateToDo from '@/components/CreateToDo.vue'

export default {
  name: 'ToDos',
  // eslint-disable-next-line vue/no-unused-components
  components: { CreateToDo, ToDoTable },
  data () {
    return {
      toDos: [],
      searchInput: '',
      isModalOpen: false,
      modalData: null
    }
  },
  methods: {
    checkToDos (isCompleted) {
      return this.toDos.filter(a => a.completed === isCompleted && a.formatDate.includes(this.searchInput))
    },
    async deleteTodo (toDo) {
      const findIndex = this.toDos.findIndex(a => a.id === toDo.id)
      if (findIndex < 0) {
        console.error('Invalid to-do item:', toDo)
        return
      }
      const endpoint = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/todos/' + toDo.id
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      const requestOptions = {
        method: 'DELETE',
        headers: headers,
        redirect: 'follow'
      }
      const response = await fetch(endpoint, requestOptions)
      if (response.ok) {
        this.toDos.splice(findIndex, 1)
      } else {
        console.error('Error deleting to-do item:', response)
      }
    },
    async editTodo (toDo) {
      if (this.isModalOpen) {
        this.closeModal()
      }
      let endpoint = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/todos'
      let method = 'POST'
      const findIndex = this.toDos.findIndex(a => a.id === toDo.id)
      if (findIndex !== -1) {
        endpoint += '/' + toDo.id
        method = 'PUT'
      }

      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      const deadline = toDo.deadline.toString().split('-')
      console.log(deadline)
      deadline[0] = parseInt(deadline[0])
      deadline[1] = parseInt(deadline[1])
      deadline[2] = parseInt(deadline[2])
      toDo.deadline = deadline
      const toDoStringify = JSON.stringify(toDo)
      const requestOptions = {
        method: method,
        headers: headers,
        body: toDoStringify,
        redirect: 'follow'
      }
      const response = await fetch(endpoint, requestOptions)

      if (response.ok) {
        const year = toDo.deadline[0]
        let month = toDo.deadline[1]
        let day = toDo.deadline[2]
        if (month < 10) {
          month = '0' + month
        }
        if (day < 10) {
          day = '0' + day
        }
        toDo.deadline = year + '-' + month + '-' + day
        toDo.formatDate = day + '.' + month + '.' + year
        if (findIndex !== -1) {
          this.toDos[findIndex] = toDo
        } else {
          toDo.id = parseInt(response.headers.get('location'))
          this.toDos.push(toDo)
        }
      }
    },
    openModal (toDo = null) {
      this.isModalOpen = true
      this.modalData = toDo
    },
    closeModal () {
      this.isModalOpen = false
      this.modalData = null
    }
  },
  mounted () {
    const endpoint = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/todos'
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    }

    fetch(endpoint, requestOptions)
      .then(response => response.json())
      .then(result => result.forEach(toDo => {
        const year = toDo.deadline[0]
        let month = toDo.deadline[1]
        let day = toDo.deadline[2]
        if (month < 10) {
          month = '0' + month
        }
        if (day < 10) {
          day = '0' + day
        }
        toDo.deadline = year + '-' + month + '-' + day
        toDo.formatDate = day + '.' + month + '.' + year
        this.toDos.push(toDo)
      }))
      .catch(error => console.log('error', error))
  }
}
</script>

<style scoped>

</style>
