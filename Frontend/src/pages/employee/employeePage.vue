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
            <q-btn round color="primary" @click="editEmployee(props.row.id)" size="sm" class="q-mr-sm"
              icon="fa-solid fa-pencil" />
            <q-btn round color="red" size="sm" icon="fa-solid fa-trash" @click="removeEmployee(props.row.id)" />
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <div class="q-pa-md q-gutter-sm">
      <q-dialog v-model="qDialogVisibility">
        <RegisterEmployeeModal :id="idProjeto" @save-employee="saveEmployee" @save-edit-employee="saveEditEmployee"
          @qDialogVisibility="changeVisibilityDialog">
        </RegisterEmployeeModal>
      </q-dialog>
    </div>
  </div>
</template>

<script>
import { useEmployeeStore } from 'src/stores/EmployeeStore'
import { computed, defineComponent, ref } from 'vue'
import RegisterEmployeeModal from './registerEmployeeModal.vue'

export default defineComponent({
  setup() {
    const qDialogVisibility = ref(false)
    const useEmployee = useEmployeeStore()
    const Employees = computed(() => useEmployee.getEmployees)
    let idProjeto = ref(Number)
    idProjeto.value = 0;

    const visibleColumns = ref(['name', 'jobTitle', 'birthDate', 'filingDate'])

    const changeVisibilityDialog = () => {
      qDialogVisibility.value = !qDialogVisibility.value
    }

    const removeEmployee = (id) => {
      useEmployee.removeEmployee(id)
    }

    const saveEmployee = (employee) => {
      useEmployee.createNewEmployee(employee)
      qDialogVisibility.value = !qDialogVisibility.value
    }

    const editEmployee = (id) => {
      idProjeto.value = id
      qDialogVisibility.value = !qDialogVisibility.value
    }

    const saveEditEmployee = (employee) => {
      useEmployee.editEmployee(employee);
      idProjeto.value = 0
      qDialogVisibility.value = !qDialogVisibility.value
    }

    return {
      qDialogVisibility,
      changeVisibilityDialog,
      Employees,
      idProjeto,
      visibleColumns,
      saveEmployee,
      saveEditEmployee,
      editEmployee,
      removeEmployee
    };
  },
  components: { RegisterEmployeeModal }
})
</script>
