<template>
  <nav class="navbar navbar-expand-lg bg-white">
    <div class="container-fluid">
      <a class="navbar-brand d-flex align-items-center text-secondary h3" href="#">
        <img class="d-inline-block me-3" src="~@/assets/todo-logo.png" alt="" style="width: 40px;">
        Manage your To-Do
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link class="nav-link text-secondary" to="/"><Strong>About</Strong></router-link>
          <router-link class="nav-link text-secondary" to="/to-dos"><Strong>To-Do List</Strong></router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar-name'
}
</script>

<style scoped>

</style>
