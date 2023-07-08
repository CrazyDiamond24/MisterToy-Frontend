import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import About from './../views/AboutView.vue'
import ToyIndex from './../views/ToyIndex.vue'
import ToyEdit from './../views/ToyEdit.vue'
import ToyDetails from './../views/ToyDetails.vue'
import StatsPage from '../views/StatsPage.vue'
import LoginSignup from './../views/LoginSignup.vue'
import UserDetails from './../components/UserDetails.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/toy',
      name: 'toy',
      component: ToyIndex
    },
    {
      path: '/toy/edit/:id?',
      name: 'edit',
      component: ToyEdit
    },
    {
      path: '/toy/:id',
      name: 'toyDetails',
      component: ToyDetails
    },
    {
      path: '/stats',
      name: 'stats',
      component: StatsPage
    },
    {
      path: '/LoginSignup',
      name: 'login',
      component: LoginSignup,
    },
    {
      path: '/user',
      name: 'userDetails',
      component: UserDetails
    }
  ]
})

export default router
