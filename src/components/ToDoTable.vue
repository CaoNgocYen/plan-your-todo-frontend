<template>
  <div>
    <table class="table table-bordered table-hover">
      <thead>
      <tr>
        <th scope="col">Title</th>
        <th scope="col">Description</th>
        <th role="button" scope="col" @click="sortDeadline('deadline')">Deadline
          <div class="button-container">
            <button class="btn btn-right" @click="sortDeadline('asc')">
              <i class="fas fa-sort-up"></i>
            </button>
            <button class="btn btn-right" @click="sortDeadline('desc')">
              <i class="fas fa-sort-down"></i>
            </button>
          </div>
        </th>
        <th scope="col">Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="toDo in toDosCopy" :key="toDo.id">
        <td>{{ toDo.title }}</td>
        <td>{{ toDo.description }}</td>
        <td>{{ toDo.formatDate }}</td>
        <td v-if="toDo.completed" class="actions-button">
          <i role="button" class="fas fa-undo" @click="editDone(toDo)"></i>
          <i role="button" class="fas fa-trash-alt" @click="deleteTodo(toDo)"></i>
        </td>
        <td v-else class="actions-button">
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
      sortOrder: 'asc'
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
    sortDeadline (order) {
      if (order === 'asc') {
        this.toDosCopy.sort((a, b) => {
          return new Date(a.deadline) - new Date(b.deadline)
        })
      } else if (order === 'desc') {
        this.toDosCopy.sort((a, b) => {
          return new Date(b.deadline) - new Date(a.deadline)
        })
      }
      this.sortOrder = order
    },
    sort () {
      if (this.sortOrder === 'asc') {
        this.toDosCopy.sort((a, b) => {
          return new Date(a.deadline) - new Date(b.deadline)
        })
      } else if (this.sortOrder === 'desc') {
        this.toDosCopy.sort((a, b) => {
          return new Date(b.deadline) - new Date(a.deadline)
        })
      }
    }
  }
}
</script>

<style scoped>
.button-container {
  display: flex;
  justify-content: space-between;
}

.actions-button {
  display: flex;
  justify-content: space-around;
}
</style>
