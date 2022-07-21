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
        arrayYear.push('Todos', year);
      }
      const arrayYearFilter = arrayYear.filter(function (elem, index, self) {
        return index === self.indexOf(elem);
      });
      return arrayYearFilter;
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
        if (year === 'Todos') {
          const data = await api.get('Targets?q=');
          this.Targets = data.data;
        } else {
          const data = await api.get(`Targets?q=${year}`);
          this.Targets = data.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    createNewTarget(
      name: string,
      value: number,
      inicioMeta: Date,
      fimMeta: Date
    ) {
      return api.post('/Targets', {
        name: name,
        value: value,
        inicioMeta: inicioMeta,
        fimMeta: fimMeta,
      });
    },
    updateTargert(
      id: number,
      name: string,
      value: number,
      inicioMeta: Date,
      fimMeta: Date
    ) {
      return api.put(`/Targets/${id}`, {
        name: name,
        value: value,
        inicioMeta: inicioMeta,
        fimMeta: fimMeta,
      });
    },

    deleteTarget(id: number) {
      return api.delete(`/Targets/${id}`);
    },
  },
});
