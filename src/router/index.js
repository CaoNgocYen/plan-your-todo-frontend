import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '../views/AboutView.vue'
import ToDos from '../views/ToDos.vue'
import AddView from '../views/AddView.vue'

const routes = [
  {
    path: '/',
    name: 'about',
    component: AboutView
  },

  {
    path: '/to-dos',
    name: 'to-dos',
    component: ToDos
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
