import { defineStore } from 'pinia';
import ITarget from 'src/interfaces/Target';
import { api } from 'src/boot/axios';

export interface StateTarget {
  Targets: ITarget[];
}

export const useTargetStore = defineStore({
  id: 'targetStore',
  state: () =>
    ({
      Targets: [],
    } as StateTarget),

  getters: {
    getTargets(state) {
      return state.Targets;
    },
  },
  actions: {
    async fetchTargets() {
      try {
        const data = await api.get('Targets');
        this.Targets = data.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
