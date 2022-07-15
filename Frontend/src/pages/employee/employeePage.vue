<template>
  <div class="q-pa-md">
    <div class="column">
      <q-btn color="primary" icon-right="fa-regular fa-square-plus" label="Cadastrar" class="col self-end q-mb-sm"
        @click="changeVisibilityDialog" />
    </div>
    <q-table :rows="useEmployee.getEmployess" row-key="name">
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.value }}
          </q-td>
          <q-td auto-width>
            <q-btn round color="primary" size="sm" class="q-mr-sm" icon="fa-solid fa-pencil" />
            <q-btn round color="red" size="sm" icon="fa-solid fa-trash" />
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <div class="q-pa-md q-gutter-sm">
      <q-dialog v-model="qDialogVisibility">
        <RegisterEmployeeModal @save-employee="saveEmployee" @qDialogVisibility="changeVisibilityDialog">
        </RegisterEmployeeModal>
      </q-dialog>
    </div>
  </div>
</template>

<script>
import { useEmployeeStore } from 'src/stores/EmployeeStore'
import { defineComponent, ref } from 'vue'
import RegisterEmployeeModal from './registerEmployeeModal.vue'

export default defineComponent({
  setup() {
    const qDialogVisibility = ref(false)
    const useEmployee = useEmployeeStore()

    const changeVisibilityDialog = () => {
      qDialogVisibility.value = !qDialogVisibility.value
    }

    const saveEmployee = (employee) => {
      useEmployee.createNewEmployee(employee)
      qDialogVisibility.value = !qDialogVisibility.value
    }

    return {
      qDialogVisibility,
      changeVisibilityDialog,
      useEmployee,
      saveEmployee
    };
  },
  components: { RegisterEmployeeModal }
})
</script>
