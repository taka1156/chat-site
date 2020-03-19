import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      name: 'HelpPage',
      path: '/',
      component: () => import('@/components/pages/Help/Help')
    },
    {
      name: 'Account',
      path: '/account',
      component: () => import('@/components/pages/Account/Account')
    },
    {
      name: 'ChatRoom',
      path: '/chatroom',
      component: () => import('@/components/pages/Chatroom/Chatroom'),
      meta: { Auth: true }
    },
    {
      name: 'Setting',
      path: '/setting',
      component: () => import('@/components/pages/Setting/Setting')
    },
    {
      name: 'ChatPage',
      path: '/chatpage/:id',
      component: () => import('@/components/pages/Chat/Chat'),
      meta: { Auth: true }
    }
  ]
});
