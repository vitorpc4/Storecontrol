import { RouteRecordRaw } from 'vue-router';
import InitialView from '../views/InitialView.vue';
import employee from '../pages/employee/employeePage.vue';
import targets from '../pages/targets/targetsList.vue';
import launchingClothes from '../pages/LaunchingTargets/launchingClothes.vue';

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
  {
    path: '/targets',
    name: 'targets',
    component: targets,
  },
  {
    path: '/launching',
    name: 'launching',
    component: launchingClothes,
  },
];

export default routes;
