import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/Login'
import Home from '../pages/Home'
import Analises from '../pages/Analises'
import ProfessorScreen from '../pages/ProfessorScreen'
import Eventos from '../pages/Eventos.vue'


Vue.use(Router)

export default new Router({

  routes: [
    {
      path: '/',
      name: 'root',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      redirect: '/analises',
      children: [
        {
          path: '/analises',
          name: 'analises',
          component: Analises
        },
        {
          path: '/eventos',
          name: 'eventos',
          component: Eventos
        },
        {
          path: '/professores',
          name: 'professores',
          component: ProfessorScreen
        },
       
      ]
    },
  ]
})
