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
      <q-expansion-item icon="fa-solid fa-calendar-day" :label="selectMonth.toUpperCase() + ' ' + days"
        :caption="getNameDay(selectYear, selectMonth, days)">
        <q-card>
          <q-card-section>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
            commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
            eveniet doloribus ullam aliquid.
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </div>
  </div>
</template>
<script lang="ts">

import { useTargetStore } from 'src/stores/TargetStore'
import { computed, defineComponent, onMounted, Ref, ref } from 'vue'


export default defineComponent({
  setup() {
    const useTarget = useTargetStore()
    const optionsMonths: Ref<string[]> = ref([])
    const actualDate = new Date();
    let selectMonth = ref('')
    let selectYear = ref('')

    const optionsYear = computed(() => useTarget.getYearTargets)
    const actualMonth = actualDate.toLocaleString('default', { month: 'long' });
    const actualYear = actualDate.getFullYear();

    let getNumberOfMonth: number
    let numberOfMonth = ref(0)


    const getNameofMonth = () => {
      let d = new Date(2000, 0); // January
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
      getNameDay,
      refreshDaysMonths,
      getNameofMonth,
      optionsYear,
    }
  },
})
</script>
