import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DetailView from '../views/DetailView.vue'
import LikedComics from '../views/LikedComics.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/detail/:id', // Parametre olarak film ID'sini alacak şekilde güncellendi
    name: 'detail',
    component: DetailView,
    props: true,
  },

  {
    path: '/liked', 
    name: 'liked',
    component: LikedComics,
    
  },
 
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
