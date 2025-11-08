import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import DashboardHome from '../views/DashboardHome.vue'
import ProductView from '../views/ProductView.vue'
import ProductsGridView from '../views/ProductsGridView.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/dashboard',
    component: DashboardView,
    children: [
      {
        path: '',
        name: 'dashboard',
        component: DashboardHome
      },
      {
        path: 'productos',
        name: 'productos',
        component: ProductView
      },
      {
        path: 'catalogo', 
        name: 'catalogo',
        component: ProductsGridView
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Protección de rutas
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
  
  if (to.path !== '/login' && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router