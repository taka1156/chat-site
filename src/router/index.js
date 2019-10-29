import Vue from 'vue';
import Router from 'vue-router';

import HelpPage from '@/components/pages/Help';
import Account from '@/components/pages/Account';
import ChatRoom from '@/components/pages/Chatroom';
import ChatPage from '@/components/pages/Chat';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelpPage',
      component: HelpPage
    },
    {
      path: '/account',
      name: 'Account',
      component: Account
    },
    {
      path: '/chatroom',
      name: 'ChatRoom',
      component: ChatRoom
    },
    {
      path: '/chatpage',
      name: 'ChatPage',
      component: ChatPage
    }
  ]
});
