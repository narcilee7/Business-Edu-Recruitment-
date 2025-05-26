import { createRouter, createMemoryHistory } from "vue-router"


const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

export default router