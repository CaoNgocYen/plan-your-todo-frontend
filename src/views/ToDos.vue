<template>
  <div class="container mt-3">
    <h1>Your To-Do List</h1>
  </div>
  <create-to-do v-if="isModalOpen" @created="addTodo" :modalData="modalData" :editTodo="editTodo" :closeModal="closeModal"></create-to-do>
  <div class="container mt-3">
    <div class="row d-flex justify-content-between">
      <button class="btn btn-secondary col-auto px-4" @click="openModal">New To-Do</button>
      <div class="col-3">
        <input class="form-control bg-blue text-gray" v-model="searchInput" placeholder="Filter by word"/>
      </div>
    </div>
    <div class="row mt-2">
      <p></p>
      <p class="text-success text-white"><strong>Need to do</strong></p>
      <to-do-table :toDos="filterTodos(false)" :deleteTodo="deleteTodo" :editTodo="editTodo" :openModal="openModal"></to-do-table>
    </div>
    <div class="row mt-2">
      <p class="text-success text-white"><strong>To-Dos completed</strong></p>
      <to-do-table :toDos="filterTodos(true)" :deleteTodo="deleteTodo" :editTodo="editTodo"></to-do-table>
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
  emits: ['created'],
  methods: {
    filterTodos (isCompleted) {
      return this.toDos.filter(a => a.completed === isCompleted && (a.title.includes(this.searchInput) || a.description.includes(this.searchInput)))
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

      if (!toDo.id) {
        console.error('Invalid to-do item:', toDo)
        return
      }

      const endpoint = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/todos/' + toDo.id
      const method = 'PUT'

      const headers = new Headers()
      headers.append('Content-Type', 'application/json')

      const deadline = toDo.deadline.toString().split('-')
      deadline[0] = parseInt(deadline[0])
      deadline[1] = parseInt(deadline[1])
      deadline[2] = parseInt(deadline[2])
      const body = {
        title: toDo.title,
        description: toDo.description,
        deadline: deadline,
        priority: toDo.priority,
        completed: toDo.completed
      }

      const requestOptions = {
        method: method,
        headers: headers,
        body: JSON.stringify(body),
        redirect: 'follow'
      }

      const response = await fetch(endpoint, requestOptions)
      if (response.ok) {
        const index = this.toDos.findIndex(item => item.id === toDo.id)
        if (index === -1) {
          console.error('Error updating to-do item: item not found')
        } else {
          this.toDos.splice(index, 1, toDo)
        }
      } else {
        console.error('Error updating to-do item:', response)
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
