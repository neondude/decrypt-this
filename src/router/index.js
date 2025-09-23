import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WordsView from '@/views/WordsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_PATH || '/'),
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'words',
      component: WordsView,
    },
    {
      path: '/codes',
      name: 'codes',
      component: () => import('../views/CodesView.vue'),
    },
    {
      path: '/clues/:set',
      name: 'clues',
      component: () => import('../views/CluesView.vue'),
    },
    {
      path: '/grouped',
      name: 'grouped',
      component: () => import('../views/GroupedView.vue'),
    },
  ],
})

export default router
