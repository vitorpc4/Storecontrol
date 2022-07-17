<template>
  <div>
    <q-card>
      <q-card-section>
        <div class="text-h6">Cadastrar funcionário</div>
      </q-card-section>
      <q-card-section>
        <div class="q-pl-md">
          <div class="q-gutter-lg row items-start">
            <q-input class="col-5" v-model="name" outlined label="Nome" />
            <q-input class="col-5" v-model="jobTitle" outlined label="Cargo" />
            <q-input class="col-5" filled v-model="birthDate" label="Data de nascimento" mask="date" :rules="['date']">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="birthDate">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-input class="col-5" filled v-model="filingDate" label="Data Egresso" mask="date" :rules="['date']">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="filingDate">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </div>
      </q-card-section>
      <div class="row justify-end">
        <q-card-actions class="bg-white text-teal q-mr-xl">
          <q-btn flat label="OK" @click="save" />
          <q-btn flat label="CANCELAR" @click="closeDialog" />
        </q-card-actions>
      </div>

    </q-card>

  </div>

</template>

<script lang="ts">
import { useEmployeeStore } from 'src/stores/EmployeeStore';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'registerEmploye',
  emits: ['qDialogVisibility'],
  props: {
    id: {
      type: Number,
      required: true
    }
  },

  setup(props, { emit }) {

    const useStoreEmployee = useEmployeeStore();
    const actualDate = new Date;
    const name = ref('');
    const jobTitle = ref('');
    const birthDate = ref((actualDate.getFullYear() + '/' + ('0' + (actualDate.getMonth() + 1)).slice(-2) + '/' + ('0' + actualDate.getDate()).slice(-2)).toString());
    const filingDate = ref((actualDate.getFullYear() + '/' + ('0' + (actualDate.getMonth() + 1)).slice(-2) + '/' + ('0' + actualDate.getDate()).slice(-2)).toString());
    console.log(props.id)
    if (props.id) {
      const employeefind = useStoreEmployee.$state.Employees.find(p => p.id == props.id)
      name.value = employeefind?.name || '';
      jobTitle.value = employeefind?.jobTitle || '';
      birthDate.value = employeefind?.birthDate.toString() || '';
      filingDate.value = employeefind?.filingDate.toString() || '';
    }
    const save = (): void => {
      if (props.id > 0) {
        useStoreEmployee.editEmployee(props.id, name.value, jobTitle.value, birthDate.value, filingDate.value)
          ?.then(() => {
            emit('qDialogVisibility');
          })
      } else {
        useStoreEmployee.createNewEmployee(name.value, jobTitle.value, birthDate.value, filingDate.value)
          ?.then(() => {
            emit('qDialogVisibility')
          })
      }
    }
    const closeDialog = () => {
      emit('qDialogVisibility')
    }
    return {
      name,
      jobTitle,
      birthDate,
      filingDate,
      save,
      closeDialog,
    };
  },
});
</script>
