import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Index',
      component: () => import('@/pages/index.vue'),
    },
    { path: '/player/:id', name: 'Player', component: () => import('@/pages/player.vue') },
  ],
})

export default router
