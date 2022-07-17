import { defineStore } from 'pinia';
import IEmploye from 'src/interfaces/Employe';
import { api } from '../boot/axios';

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
    async fetchEmployees() {
      try {
        const data = await api.get('Employees');
        this.Employees = data.data;
      } catch (error) {
        console.log(error);
      }
    },
    createNewEmployee(
      name: string,
      jobTitle: string,
      birthDate: string,
      filingDate: string
    ) {
      if (!name) return;
      return api.post('/Employees', {
        name: name,
        jobTitle: jobTitle,
        birthDate: birthDate,
        filingDate: filingDate,
      });
    },
    editEmployee(
      id: number,
      name: string,
      jobTitle: string,
      birthDate: string,
      filingDate: string
    ) {
      return api.put(`/Employees/${id}`, {
        name: name,
        jobTitle: jobTitle,
        birthDate: birthDate,
        filingDate: filingDate,
      });
    },
    removeEmployee(id: number) {
      return api.delete(`/Employees/${id}`);
    },
  },
});
