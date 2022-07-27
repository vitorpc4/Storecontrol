import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import ILaunchingClothes from 'src/interfaces/LaunchingClothes';

export interface stateLaunchingClothes {
  LaunchingClothes: ILaunchingClothes[];
}

export const useLaunchingClothesStore = defineStore({
  id: 'LaunchingClothesStore',
  state: () =>
    ({
      LaunchingClothes: [],
    } as stateLaunchingClothes),

  getters: {
    getLaunchingClothes(state) {
      return state.LaunchingClothes;
    },
    getLaunchingClothesTable(state) {
      return state.LaunchingClothes.map((obj) => {
        obj.id, obj.date, obj.Targets.name, obj.value;
      });
    },
  },

  actions: {
    async fetchLaunchingClothes() {
      const data = await api.get('TargetCloths');
      this.LaunchingClothes = data.data;
    },
    async fetchYearLaunchingClothes(dataFilter: string) {
      try {
        console.log(dataFilter);
        const data = await api.get(`TargetCloths?q=${dataFilter}`);
        this.LaunchingClothes = data.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
