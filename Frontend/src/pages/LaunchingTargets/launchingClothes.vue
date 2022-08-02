<template>
  <div class="q-pa-md">
    <div class="row justify-end q-gutter-sm">
      <div class="col-1 q-col-gutter-md">
        <q-select borderless v-model="selectMonth" @popup-hide="refreshDaysMonths" :options="optionsMonths"
          label="Meses">
        </q-select>
      </div>
      <div class="col-1 q-col-gutter-md">
        <q-select borderless v-model="selectYear" :options="optionsYear" label="Ano">
        </q-select>
      </div>
    </div>
    <div v-for="(days, index) in numberOfMonth" :key="index">
      <q-expansion-item icon="fa-solid fa-calendar-day"
        @show="loadTable(selectYear, (optionsMonths.indexOf(selectMonth) + 1).toString(), days.toString())"
        :label="selectMonth.toUpperCase() + ' ' + days" :caption="getNameDay(selectYear, selectMonth, days)"
        group="somegroup">
        <q-card>
          <q-card-section>
            <div class="q-pa-md q-gutter-sm">
              <q-btn round color="primary"
                @click="addNewLaunching(selectYear, (optionsMonths.indexOf(selectMonth) + 1).toString(), days.toString())"
                icon="fa-solid fa-circle-plus" />
            </div>
          </q-card-section>
        </q-card>
        <q-card>
          <q-card-section>
            <div class="q-pa-md">
              <q-table title="Metas Roupas" :rows="LaunchingClothes" row-key="name">
                <template v-slot:body="props">
                  <q-tr :props="props">
                    <q-td v-for="col in props.cols" :key="col.name" :props="props">
                      {{ col.value }}
                    </q-td>
                    <q-td auto-width>
                      <q-btn round color="primary" size="sm" class="q-mr-sm" @click="editLaunchingClothes(props.row.id)"
                        icon="fa-solid fa-pencil" />
                      <q-btn round color="red" size="sm" icon="fa-solid fa-trash"
                        @click="removeLaunchingClothes(props.row.id)" />
                    </q-td>
                  </q-tr>
                </template>
              </q-table>
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </div>
    <div class="q-pa-md q-gutter-sm">
      <q-dialog v-model="qDialogVisibility">
        <registerLaunchingClothes :data="dataProp" @q-dialog-visibility="changeVisibilityDialog">
        </registerLaunchingClothes>
      </q-dialog>
    </div>
  </div>
</template>
<script lang="ts">

import { useTargetStore } from 'src/stores/TargetStore'
import { computed, defineComponent, onMounted, Ref, ref } from 'vue'
import registerLaunchingClothes from 'src/pages/LaunchingTargets/registerLaunchingClothes.vue'
import { useLaunchingClothesStore } from 'src/stores/LaunchingClothesStore'


export default defineComponent({
  setup() {
    const useTarget = useTargetStore()
    const useLaunchingClothes = useLaunchingClothesStore()
    const optionsMonths: Ref<string[]> = ref([])
    const actualDate = new Date();
    const LaunchingClothes = computed(() => useLaunchingClothes.getLaunchingClothesTable)

    let selectMonth = ref('')
    let selectYear = ref('')
    const qDialogVisibility = ref(false)
    const dataProp = ref('')

    const optionsYear = computed(() => useTarget.getYearTargets)
    const actualMonth = actualDate.toLocaleString('default', { month: 'long' });
    const actualYear = actualDate.getFullYear();

    let getNumberOfMonth: number
    let numberOfMonth = ref(0)


    const getNameofMonth = () => {
      let d = new Date(2000, 0);
      for (let i = 0; i < 12; i++) {
        optionsMonths.value.push(d.toLocaleString('default', { month: 'long' }))
        d.setMonth(i + 1);
      }
      return optionsMonths;
    }

    const getDaysInMonths = (year: number, month: number) => {
      return new Date(year, month, 0).getDate();
    }

    const getNameDay = (year: string, month: string, dayNumber: number) => {
      let monthIndex = optionsMonths.value.indexOf(selectMonth.value)
      let day = new Date(`${year}-${monthIndex + 1}-${dayNumber}`).toLocaleString('default', { weekday: 'long' })
      let dayName = day;
      return dayName
    }

    const refreshDaysMonths = () => {
      getNumberOfMonth = optionsMonths.value.indexOf(selectMonth.value)
      numberOfMonth.value = getDaysInMonths(actualYear, getNumberOfMonth + 1)
    }

    const addNewLaunching = (selectYear: string, selectMonth: string, days: string) => {
      const day = '0' + days
      const month = '0' + selectMonth
      dataProp.value = `${selectYear}-${month.slice(-2)}-${day.slice(-2)}`
      qDialogVisibility.value = !qDialogVisibility.value;
    }

    const changeVisibilityDialog = () => {
      qDialogVisibility.value = !qDialogVisibility.value;
      const data = dataProp.value.split('-');
      console.log(data)
      loadTable(data[0], data[1], data[2])
    }
    const loadTable = (selectYear: string, selectMonth: string, days: string) => {
      const day = '0' + days
      const month = '0' + selectMonth
      const data = `${selectYear}-${month.slice(-2)}-${day.slice(-2)}`
      useLaunchingClothes.fetchYearLaunchingClothes(data);
    }

    const editLaunchingClothes = (id: string) => {
      console.log(id)
    }

    const removeLaunchingClothes = (id: string) => {
      useLaunchingClothes.deleteLaunchingClothe(id);
      const data = dataProp.value.split('-');
      loadTable(data[0], data[1], data[2])

    }

    onMounted(() => {
      selectMonth.value = actualMonth
      selectYear.value = actualYear.toString()
      useTarget.fetchTargets()
      refreshDaysMonths()
      getNameofMonth()
    })

    return {
      numberOfMonth,
      optionsMonths,
      selectMonth,
      selectYear,
      LaunchingClothes,
      getNameDay,
      refreshDaysMonths,
      changeVisibilityDialog,
      addNewLaunching,
      optionsYear,
      loadTable,
      qDialogVisibility,
      dataProp,
      editLaunchingClothes,
      removeLaunchingClothes
    }
  },
  components: { registerLaunchingClothes }
})
</script>
