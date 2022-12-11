<template>
  <div class="to-dos">
    <h1>To-do List</h1>
    <table class="table table-striped">
      <thead>
      <tr>
        <th scope="col">Title</th>
        <th scope="col">Description</th>
        <th scope="col">Due Date</th>
        <th scope="col">Is Completed</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="todo in todos" :key="todo.id">
        <td>{{ todo.title }}</td>
        <td>{{ todo.description }}</td>
        <td>{{ todo.dueDate }}</td>
        <td>{{ todo.completed }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ToDos',
  data () {
    return {
      todos: []
    }
  },
  mounted () {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    }

    fetch('http://localhost:8080/api/v1/todos', requestOptions)
      .then(response => response.json())
      .then(result => result.forEach(todo => {
        this.todos.push(todo)
      }))
      .catch(error => console.log('error', error))
  }
}
</script>
