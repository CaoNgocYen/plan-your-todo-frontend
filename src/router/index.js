import { createRouter, createWebHistory } from 'vue-router'
import About from '../views/About.vue'
import ToDos from '../views/ToDos.vue'
import Add from '../views/Add.vue'

const routes = [
  {
    path: '/',
    name: 'about',
    component: About
  },

  {
    path: '/to-dos',
    name: 'to-dos',
    component: ToDos
  },
  {
    path: '/add',
    name: 'add',
    component: Add
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: 'active',
  routes
})

export default router
