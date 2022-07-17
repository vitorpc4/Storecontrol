import { RouteRecordRaw } from 'vue-router';
import InitialView from '../views/InitialView.vue';
import employee from '../pages/employee/employeePage.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Main',
    component: InitialView,
  },
  {
    path: '/employee',
    name: 'Employee',
    component: employee,
  },
];

export default routes;
