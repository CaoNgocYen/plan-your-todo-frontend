<template>
  <div>
    <table class="table table-striped table-bordered table-hover">
      <thead>
      <tr>
        <th scope="col">Title</th>
        <th scope="col">Description</th>
        <th role="button" scope="col" @click="sortBy('deadline')">Deadline
          <i v-if="sortedColumn === 'deadline' && sortedState === 2"></i>
          <i v-if="sortedColumn === 'deadline' && sortedState === 1"></i>
        </th>
        <th scope="col">Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="toDo in toDosCopy" :key="toDo.id">
        <td>{{ toDo.title }}</td>
        <td>{{ toDo.description }}</td>
        <td>{{ toDo.formatDate }}</td>
        <td v-if="toDo.completed">
          <i role="button" class="fas fa-check" @click="editDone(toDo)"></i>
          <i role="button" class="fas fa-trash-alt" @click="deleteTodo(toDo)"></i>
        </td>
        <td v-else class="">
          <i role="button" class="fas fa-check" @click="editDone(toDo)"></i>
          <i role="button" class="fas fa-edit" @click="openModal(toDo)"></i>
          <i role="button" class="fas fa-trash-alt" @click="deleteTodo(toDo)"></i>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ToDoTable',
  props: {
    toDos: {
      type: Array,
      required: true
    },
    deleteTodo: Function,
    editTodo: Function,
    openModal: Function
  },
  data () {
    return {
      toDosCopy: this.toDos,
      sortedColumn: '',
      sortedState: 0
    }
  },
  watch: {
    toDos: function (newVal, oldVal) {
      this.toDosCopy = this.toDos
      this.sort()
    }
  },
  methods: {
    editDone (toDo) {
      toDo.completed = !toDo.completed
      this.editTodo(toDo)
    },
    sortBy (column) {
      if (this.sortedColumn === column) {
        if (this.sortedState === 1) {
          this.sortedState = 2
        } else {
          this.sortedState = 0
          this.sortedColumn = ''
        }
      } else {
        this.sortedColumn = column
        this.sortedState = 1
      }
      this.sort()
    },
    sort () {
      if (this.sortedState === 0) {
        this.toDosCopy.sort((a, b) => a.id > b.id ? 1 : -1)
      } else if (this.sortedState === 1) {
        this.toDosCopy.sort((a, b) => a[this.sortedColumn] > b[this.sortedColumn] ? -1 : 1)
      } else {
        this.toDosCopy.sort((a, b) => a[this.sortedColumn] > b[this.sortedColumn] ? 1 : -1)
      }
    }
  }
}
</script>

<style scoped>

</style>
