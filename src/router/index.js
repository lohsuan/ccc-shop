import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomePage.vue'),
    meta: {
      title: 'CCC Shop'
    }
  },
  {
    path: '/cart',
    name: 'ShoppingCart',
    component: () => import('../views/ShoppingCartPage.vue'),
    meta: {
      title: 'CCC Shop - 購物車'
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/AdminPage.vue'),
    meta: {
      title: 'CCC Shop - 管理員'
    }
  },
  {
    path: '/staff',
    name: 'Staff',
    component: () => import('../views/StaffPage.vue'),
    meta: {
      title: 'CCC Shop - 賣家'
    }
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('../views/OrderPage.vue'),
    meta: {
      title: 'CCC Shop - 我的訂單'
    }
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import('../views/AccountPage.vue'),
    meta: {
      title: 'CCC Shop - 帳號管理'
    }
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/SearchLoadingPage.vue'),
    meta: {
      title: 'CCC Shop - 搜尋'
    }
  },
  {
    path: '/search/:text',
    name: 'SearchResult',
    component: () => import('../views/SearchPage.vue'),
    meta: {
      title: 'CCC Shop - 搜尋結果'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title;
  next()
})

export default router
