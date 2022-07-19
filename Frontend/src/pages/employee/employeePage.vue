<template>
  <div class="q-pa-md">
    <div class="column">
      <q-btn color="primary" icon-right="fa-regular fa-square-plus" label="Cadastrar" class="col self-end q-mb-sm"
        @click="changeVisibilityDialog" />
    </div>
    <q-table :rows="Employees" row-key="name" :visible-columns="visibleColumns">
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.value }}
          </q-td>
          <q-td auto-width>
            <q-btn round color="primary" size="sm" class="q-mr-sm" @click="editEmployee(props.row.id)"
              icon="fa-solid fa-pencil" />
            <q-btn round color="red" size="sm" icon="fa-solid fa-trash" @click="removeEmployee(props.row.id)" />
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <div class="q-pa-md q-gutter-sm">
      <q-dialog v-model="qDialogVisibility">
        <RegisterEmployeeModal :id="idProjeto" @q-dialog-visibility="changeVisibilityDialog">
        </RegisterEmployeeModal>
      </q-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { Loading, QSpinnerGears } from 'quasar'
import { useEmployeeStore } from 'src/stores/EmployeeStore'
import { computed, defineComponent, onMounted, ref } from 'vue'
import RegisterEmployeeModal from './registerEmployeeModal.vue'

export default defineComponent({
  setup() {
    const qDialogVisibility = ref(false)
    const useEmployee = useEmployeeStore()
    const idProjeto = ref(0)
    const visibleColumns = ref(['name', 'jobTitle', 'birthDate', 'filingDate'])
    const Employees = computed(() => useEmployee.getEmployees)


    const showLoad = (() => {
      Loading.show({
        spinner: QSpinnerGears,
        message: 'Carregando'
      })
    })

    onMounted(() => {
      showLoad()
      useEmployee.fetchEmployees().then(() => {
        Loading.hide()
      });
    })

    const changeVisibilityDialog = () => {
      idProjeto.value = 0
      qDialogVisibility.value = !qDialogVisibility.value
      showLoad()
      useEmployee.fetchEmployees().then(() => {
        Loading.hide()
      })
    }
    const editEmployee = (id: string) => {
      idProjeto.value = parseInt(id)
      qDialogVisibility.value = !qDialogVisibility.value
    }
    const removeEmployee = (id: string) => {
      idProjeto.value = parseInt(id)
      showLoad()
      useEmployee.removeEmployee(idProjeto.value).then(() => {
        const index = useEmployee.$state.Employees.findIndex(x => x.id == parseInt(id))
        if (index === -1) return;
        useEmployee.$state.Employees.splice(index, 1)
        Loading.hide()
      })
    }
    return {
      qDialogVisibility,
      changeVisibilityDialog,
      Employees,
      idProjeto,
      editEmployee,
      removeEmployee,
      visibleColumns,
    };
  },
  components: { RegisterEmployeeModal }
})
</script>
