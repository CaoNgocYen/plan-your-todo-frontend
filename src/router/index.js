import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ToDoView from '../views/ToDoView.vue'
import AddView from '../views/AddView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },

  {
    path: '/to-do',
    name: 'to-do',
    component: ToDoView
  },
  {
    path: '/add',
    name: 'add',
    component: AddView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: 'active',
  routes
})

export default router
