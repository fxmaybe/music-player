import Vue from 'vue';
import Router from 'vue-router';
import VRecommend from '@/views/VRecommend';
import VSinger from '@/views/VSinger';
import VRank from '@/views/VRank';
import VSearch from '@/views/VSearch';
import VUser from '@/views/VUser';
import CSingerDetail from '@/components/singer/CSingerDetail';
import CTopList from '@/components/rank/CTopList';
import CDisc from '@/components/recommend/CDisc';

Vue.use(Router);

export default new Router({
  routes: [
  {
    path: '/',
    name: 'Home',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    name: 'VRecommend',
    component: VRecommend,
    children: [
    {
      path: ':id',
      component: CDisc
    }
    ]
  },
  {
    path: '/singer',
    name: 'VSinger',
    component: VSinger,
    children: [
    {
      path: ':id',
      component: CSingerDetail
    }
    ]
  },
  {
    path: '/rank',
    name: 'VRank',
    component: VRank,
    children: [
    {
      path: ':id',
      component: CTopList
    }
    ]
  },
  {
    path: '/search',
    name: 'VSearch',
    component: VSearch
  },
  {
    path: '/user',
    name: 'VUser',
    component: VUser
  }
  ]
});
