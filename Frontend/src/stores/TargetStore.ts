/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia';
import ITarget from 'src/interfaces/Target';
import { api } from 'src/boot/axios';

export interface StateTarget {
  Targets: ITarget[];
  Years: any[];
}

export const useTargetStore = defineStore({
  id: 'targetStore',
  state: () =>
    ({
      Targets: [],
      Years: [],
    } as StateTarget),

  getters: {
    getTargets(state) {
      return state.Targets;
    },
    getYearTargets(state) {
      const arrayYear: string[] = [];

      const inicioMetaFilter = state.Years;
      for (let i = 0; i < inicioMetaFilter.length; ++i) {
        const getDate = inicioMetaFilter[i];
        const year = getDate.toString().substring(0, 4);
        arrayYear.push(year);
      }
      return arrayYear;
    },
  },
  actions: {
    async fetchTargets() {
      try {
        const data = await api.get('Targets');
        this.Targets = data.data;
        this.Years = this.Targets.map((x) => x.inicioMeta);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchYearsTargets(year: string) {
      try {
        const data = await api.get(`Targets?q=${year}`);
        this.Targets = data.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
