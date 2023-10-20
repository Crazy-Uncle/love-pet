import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Admin from '@/views/Administration.vue'
import Cart from '@/views/Cart.vue'
import Order from '@/views/Order.vue'
import Index from '@/views/index.vue'
import Detail from '@/views/Detail.vue'

import Search from '@/views/Search.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/', component: Index },
  { path: '/login', component: Login },
  { path: '/admin', component: Admin, mate: { keepAlive: false } },
  { path: '/cart', component: Cart, mate: { keepAlive: false } },
  { path: '/order', component: Order },
  { path: '/detail', component: Detail },
  { path: '/search', component: Search }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

router.beforeEach((to, from, next) => {
  const token = window.localStorage.getItem('token')

  if (to.path === '/login') next()
  if (!token) next('/login')

  next()
})

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})

export default router
