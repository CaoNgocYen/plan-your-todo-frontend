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
* {
  margin: 0;
  padding: 0;
}

.background  {
  background: #ffffff;
  background: -webkit-linear-gradient(to left, rgb(147, 213, 168), rgb(73, 99, 147));
  background: linear-gradient(to bottom right, #93d5a8, #496393);
  height: 300vh;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2dad58;
}

nav a.router-link-exact-active {
  color: #2dad58;
}
</style>
