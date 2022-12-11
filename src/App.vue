<template>
  <div class="background">
    <navbar></navbar>
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar'

export default {
  name: 'App',
  components: { Navbar }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #eee4e4;
}

.background  {
  background: #0b025d;
  background: -webkit-linear-gradient(to left, rgb(45, 173, 88), rgb(11, 2, 93));
  background: linear-gradient(to left, rgb(45, 173, 88), rgb(11, 2, 93));
  height: 100vh;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #ffffff;
}

nav a.router-link-exact-active {
  color: #ffffff;
}
</style>
