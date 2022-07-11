import { RouteRecordRaw } from 'vue-router';
import InitialView from '../views/InitialView.vue';
import registerEmploye from '../pages/employee/registerEmployeeModal.vue';
import employee from '../pages/employee/employeePage.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Main',
    component: InitialView,
  },
  {
    path: '/employee',
    name: 'employee',
    component: employee,
  }

];

export default routes;
