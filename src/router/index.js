import Vue from 'vue'
import Router from 'vue-router'
import Frontpage from '@/components/Frontpage'
import Submit from '@/components/Submit'
import Place from '@/components/Place'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Frontpage',
      component: Frontpage
    },
    {
      path: '/submit',
      name: 'Submit',
      component: Submit
    },
    {
      name: 'Place',
      path: '/p/:id',
      component: Place
    },
  ]
})
