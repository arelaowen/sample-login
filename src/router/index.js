import Vue from 'vue'
import VueRouter from 'vue-router'
import VueEasySession from 'vue-easysession'

var options = {
  persist: true,
  keySession: 'sessionData'
}
Vue.use(VueEasySession.install, options);

var session = Vue.prototype.$session;

Vue.use(VueRouter)

const routes = [
  {
    path: '/sample-login',
    alias: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '@/views/login.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/dashboard.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const loggedIn = session.has('user');
  if(['/','/login'].includes(to.path) && loggedIn){
    return next('/dashboard');
  }
  if(!['','/'].includes(to.path) && !loggedIn){
    return next('/');
  }
  next();
})

export default router
