import { RouteRecordRaw } from 'vue-router';
import InitialView from '../views/InitialView.vue';
import TestandoItem from '../views/TestandoItem.vue';


const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Main',
    component: InitialView,
  },
  {
    path: '/teste',
    name: 'testando',
    component: TestandoItem,
  }

];

export default routes;
