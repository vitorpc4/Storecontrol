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
      const arrayReturn: {
        id: number;
        data: string;
        name: string;
        value: number;
      }[] = [];

      for (let i = 0; i < state.LaunchingClothes.length; i++) {
        const actualLaunchingClothe: {
          id: number;
          data: string;
          name: string;
          value: number;
        } = {
          id: 0,
          data: '',
          name: '',
          value: 0,
        };
        actualLaunchingClothe.id = state.LaunchingClothes[i].id;
        actualLaunchingClothe.data = state.LaunchingClothes[i].data;
        actualLaunchingClothe.name = state.LaunchingClothes[i].Targets.name;
        actualLaunchingClothe.value = state.LaunchingClothes[i].value;
        arrayReturn.push(actualLaunchingClothe);
      }
      return arrayReturn;
    },
  },

  actions: {
    async fetchLaunchingClothes() {
      const data = await api.get('TargetCloths');
      this.LaunchingClothes = data.data;
    },
    async fetchYearLaunchingClothes(dataFilter: string) {
      try {
        const data = await api.get(`TargetCloths?q=${dataFilter}`);
        this.LaunchingClothes = data.data;
      } catch (error) {
        console.log(error);
      }
    },
    createNewLaunchingClothes(LaunchingClothes: ILaunchingClothes) {
      return api.post('/TargetCloths', LaunchingClothes);
    },
    editLaunchingClothes(LaunchingClothes: ILaunchingClothes) {
      return api.put('/TargetCloths', LaunchingClothes);
    },
    deleteLaunchingClothe(id: string) {
      return api.delete(`/TargetCloths/${id}`);
    },
  },
});
