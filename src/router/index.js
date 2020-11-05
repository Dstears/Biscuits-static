import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Login from '@/components/login'
import Diary from '@/components/diary'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/login/:sessionId',
      component: Login,
      props: true
    },
    {
      path: '/diary',
      component: Diary,
      props: true
    }
  ]
})
