import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '@/views/index.vue'
import login from '@/views/login.vue'
import order from '@/views/order.vue'
import placeOrder from '@/views/placeOrder.vue'
import addorder from '@/views/addorder.vue'
import productList from '@/views/productList.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: index
  },{
    path:'/index',
    component:index
  },{
    path:'/order',
    component:order
  },{
    path:'/login',
    component:login
  },{
    path:'/placeOrder',
    component:placeOrder
  },{
    path:'/addorder',
    component:addorder
  },{
    path:'/productList',
    component:productList
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.path === '/addorder' || to.path === '/productList'){
    let user = sessionStorage.getItem('user')
    if(user != null && user === 'admin'){
      next()
    }else{
      next('/login')
    }
  }else{
    next()
  }
});

export default router
