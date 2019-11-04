import Vue from 'vue';
import Router from 'vue-router';

import HelpPage from '@/components/pages/Help';
import Account from '@/components/pages/Account';
import ChatRoom from '@/components/pages/Chatroom';
import SettingPage from '@/components/pages/Setting';
import ChatPage from '@/components/pages/Chat';

Vue.use(Router);

export default new Router({
  routes: [
    {
      name: 'HelpPage',
      path: '/',
      component: HelpPage
    },
    {
      name: 'Account',
      path: '/account',
      component: Account
    },
    {
      name: 'ChatRoom',
      path: '/chatroom',
      component: ChatRoom,
      meta: { Auth: true }
    },
    {
      name: 'Setting',
      path: '/setting',
      component: SettingPage
    },
    {
      name: 'ChatPage',
      path: '/chatpage',
      component: ChatPage,
      meta: { Auth: true }
    }
  ]
});
