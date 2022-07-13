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

  actions: {
    createNewEmployee(item: IEmploye) {
      if (!item) return;
      this.Employees.push(item);
    },
  },
});
