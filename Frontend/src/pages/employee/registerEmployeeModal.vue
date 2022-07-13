<template>
      <div>
          <q-card>
            <q-card-section>
              <div class="text-h6">Full Width</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              Click/Tap on the backdrop.
            </q-card-section>

            <q-card-actions align="right" class="bg-white text-teal">
              <q-btn flat label="OK" @click="teste" />
              <q-btn flat label="CANCELAR" @click="teste" />
            </q-card-actions>
          </q-card>
      </div>
      
</template>

<script lang="ts">
import { defineComponent, ref, toRefs } from 'vue';
import { useEmployeeStore } from '../../stores/EmployeeStore'
import IEmploye from '../../interfaces/Employe';

export default defineComponent({
  name: 'registerEmploye',
  emits: ['qDialogVisibility'],
  props: {
    show: {
      type: Boolean,
      required: true
    },
  },
  setup(props, { emit }) {

    const employeeStore = useEmployeeStore()
    const employee = ref<IEmploye>()
    const { show } = toRefs(props);
    console.log(props.show)
    const addEmployee = (): void => {
      if (employee.value != null) {
        employeeStore.createNewEmployee(employee.value)
      }
    }


    const teste = () => {
      emit('qDialogVisibility', !show.value)
      console.log(show.value)
    }

    return {
      employee,
      addEmployee,
      teste
    };
  },
});
</script>
