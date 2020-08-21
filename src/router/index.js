import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      name: 'HelpPage',
      path: '/',
      component: () => import('@/pages/Help/Help')
    },
    {
      name: 'Account',
      path: '/account',
      component: () => import('@/pages/Account/Account')
    },
    {
      name: 'ChatRoom',
      path: '/chatroom',
      component: () => import('@/pages/Chatroom/Chatroom'),
      meta: { Auth: true }
    },
    {
      name: 'Setting',
      path: '/setting',
      component: () => import('@/pages/Setting/Setting')
    },
    {
      name: 'ChatPage',
      path: '/chatpage/:id',
      component: () => import('@/pages/Chat/Chat'),
      meta: { Auth: true }
    }
  ]
});
