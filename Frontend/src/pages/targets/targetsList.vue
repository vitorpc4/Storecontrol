<template>
  <div class="q-pa-md">
    <div class="row justify-end q-gutter-sm">
      <div class="col-1 q-col-gutter-md">
        <q-select borderless v-model="selectYear" @popup-hide="filterListByYear" :options="optsSelect" label="Ano">
        </q-select>
      </div>
      <div>
        <q-btn color="primary" icon-right="fa-regular fa-square-plus" label="Cadastrar"
          @click="changeVisibilityDialog" />
      </div>
    </div>
    <q-table :rows="Targets" :filter="filter" :columns="columns" row-key="name">
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.value }}
          </q-td>
          <q-td auto-width>
            <q-btn round color="primary" size="sm" class="q-mr-sm" @click="editTarget(props.row.id)"
              icon="fa-solid fa-pencil" />
            <q-btn round color="red" size="sm" icon="fa-solid fa-trash" @click="deleteTarget(props.row.id)" />
          </q-td>
        </q-tr>
      </template>
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>
    <div class="q-pa-md q-gutter-sm">
      <q-dialog v-model="qDialogVisibility">
        <TargetRegister :id="idTarget" @q-dialog-visibility="changeVisibilityDialog"></TargetRegister>
      </q-dialog>
    </div>
  </div>

</template>

<script lang="ts">
import { useTargetStore } from 'src/stores/TargetStore'
import { computed, onMounted, ref } from 'vue'
import TargetRegister from './targetRegister.vue'
import { Loading, QSpinnerGears } from 'quasar'

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Nome',
    align: 'left',
    field: 'name',
    sortable: true
  },
  { name: 'value', align: 'center', label: 'Valor', field: 'value', sortable: true },
  { name: 'inicioMeta', align: 'center', label: 'Inicio', field: 'inicioMeta', sortable: true },
  { name: 'fimMeta', align: 'center', label: 'Fim', field: 'fimMeta', sortable: true }
]


export default {
  setup() {
    const useTarget = useTargetStore()
    const Targets = computed(() => useTarget.getTargets)
    const optsSelect = computed(() => useTarget.getYearTargets)
    const selectYear = ref('')
    const idTarget = ref(0)
    const qDialogVisibility = ref(false)

    onMounted(() => {
      showLoad()
      useTarget.fetchTargets().then(() => {
        Loading.hide()
      })
    })

    const showLoad = (() => {
      Loading.show({
        spinner: QSpinnerGears,
        message: 'Carregando'
      })
    })

    const changeVisibilityDialog = () => {
      idTarget.value = 0
      qDialogVisibility.value = !qDialogVisibility.value
      showLoad()
      if (optsSelect.value) {
        useTarget.fetchYearsTargets(selectYear.value).then(() => {
          Loading.hide()
        })
      } else {
        useTarget.fetchTargets().then(() => {
          Loading.hide()
        })
      }
    }

    const filterListByYear = () => {
      useTarget.fetchYearsTargets(selectYear.value)
    }

    const editTarget = (id: string) => {
      idTarget.value = parseInt(id)
      qDialogVisibility.value = !qDialogVisibility.value
    }
    const deleteTarget = (id: string) => {
      idTarget.value = parseInt(id)
      useTarget.deleteTarget(idTarget.value).then(() => {
        const index = useTarget.$state.Targets.findIndex(x => x.id == idTarget.value)
        if (index === -1) return;
        useTarget.$state.Targets.splice(index, 1)
        Loading.hide()
      })
    }
    return {
      changeVisibilityDialog,
      qDialogVisibility,
      filter: ref(''),
      Targets,
      optsSelect,
      filterListByYear,
      selectYear,
      idTarget,
      editTarget,
      deleteTarget,
      columns,
    }
  },
  components: { TargetRegister }
}
</script>
