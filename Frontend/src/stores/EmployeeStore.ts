import { defineStore } from 'pinia';
import IEmploye from 'src/interfaces/Employe';

export interface StateEmployee {
  Employees: IEmploye[];
}

export const useEmployeeStore = defineStore({
  id: 'EmployeeStore',
  state: () =>
    ({
      Employees: [],
    } as StateEmployee),

  getters: {
    getEmployees(state) {
      return state.Employees;
    },
  },

  actions: {
    createNewEmployee(item: IEmploye) {
      if (!item) return;
      this.Employees.push(item);
    },
    removeEmployee(id: number) {
      const index = this.findIndexById(id);
      if (index === -1) return;
      this.Employees.splice(index, 1);
    },
    editEmployee(Employe: IEmploye) {
      const index = this.findIndexById(Employe.id);
      if (index === -1) return;
      this.Employees[index] = Employe;
    },
    findIndexById(id: number) {
      return this.Employees.findIndex((item) => item.id === id);
    },
  },
});
