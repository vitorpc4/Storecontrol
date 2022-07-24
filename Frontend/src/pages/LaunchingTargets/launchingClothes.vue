<template>
  <div class="q-pa-md">
    <div class="row justify-end q-gutter-sm">
      <div class="col-1 q-col-gutter-md">
        <q-select borderless v-model="selectMonth" :options="optionsMonths" label="Meses">
        </q-select>
      </div>
      <div class="col-1 q-col-gutter-md">
        <q-select borderless v-model="selectYear" @popup-hide="filterListByYear" :options="optionsYear" label="Ano">
        </q-select>
      </div>
    </div>
    <div v-for="(days, index) in numberOfMonth" :key="index">
      <q-expansion-item icon="fa-solid fa-calendar-day" :label="selectMonth.toUpperCase()" :caption="days.toString()">
        <q-card>
          <q-card-section>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
            commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
            eveniet doloribus ullam aliquid.
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <!-- <q-expansion-item caption="`${days}`">

        <template v-slot:header>
          <q-item-section avatar>
            <q-avatar icon="fa-solid fa-calendar-day" color="primary" text-color="white" />
          </q-item-section>
          <q-item-section>
            {{ days }}
          </q-item-section>

        </template>



      </q-expansion-item> -->
    </div>
  </div>
</template>
<script lang="ts">

import { useTargetStore } from 'src/stores/TargetStore'
import { computed, defineComponent, onMounted, ref } from 'vue'


export default defineComponent({
  setup() {
    const useTarget = useTargetStore()
    const optionsMonths = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']
    let daysArray = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
    const actualDate = new Date();
    let selectMonth = ref('')
    let selectYear = ref('')

    const optionsYear = computed(() => useTarget.getYearTargets)
    const actualMonth = actualDate.toLocaleString('default', { month: 'long' });
    const actualYear = actualDate.getFullYear();

    let getNumberOfMonth: number
    let numberOfMonth = ref(0)

    const getDayInMonths = (year: number, month: number) => {
      return new Date(year, month, 0).getDate();
    }

    const getNameDay = () => {
      let day = new Date('2012, 10, 0').getDate()
      let dayName = daysArray[day];
      console.log(dayName)
    }




    onMounted(() => {
      selectMonth.value = actualMonth
      selectYear.value = actualYear.toString()
      useTarget.fetchTargets()
      console.log(selectMonth.value)
      getNumberOfMonth = optionsMonths.indexOf(selectMonth.value)
      numberOfMonth.value = getDayInMonths(2022, getNumberOfMonth + 1)
    })

    return {
      expanded: ref(false),
      numberOfMonth,
      optionsMonths,
      selectMonth,
      selectYear,
      optionsYear,
      caption: ref('')
    }
  },
})
</script>
