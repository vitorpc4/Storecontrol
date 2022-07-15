<template>
  <div>
    <q-card>
      <q-card-section>
        <div class="text-h6">Cadastrar funcionário</div>
      </q-card-section>
      <q-card-section>
        <div class="q-mb-md q-px-md">
          <div class="row justify-around">
            <div class="col-4">
              <q-input v-model="name" outlined label="Nome"
                :input-style="{ backgroundColor: '#ff0000', width: '250px' }" />
            </div>
            <div class="col-4">
              <q-input v-model="jobTitle" outlined label="Cargo" input-style="{window-width}" />
            </div>
          </div>
          <!-- <div class="flex q-gutter-md">
                  <q-input  v-model="name" style="width: 12vw;" outlined label="Nome" />
                  <q-input v-model="jobTitle" style="width: 12vw;" outlined label="Cargo" />
                </div> -->

        </div>
        <div></div>
        <div class="q-mb-md q-px-md">
          <div class="row justify-around">
            <div class="col-4">
              <q-input filled v-model="birthDate" label="Data de nascimento" mask="date" :rules="['date']">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="birthDate">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="col-4">
              <q-input filled v-model="filingDate" label="Data Egresso" mask="date" :rules="['date']">
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
        </div>

      </q-card-section>
      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat label="OK" @click="addEmployee" />
        <q-btn flat label="CANCELAR" @click="closeDialog" />
      </q-card-actions>
    </q-card>
  </div>

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'registerEmploye',
  emits: ['qDialogVisibility', 'saveEmployee'],

  setup(props, { emit }) {


    const actualDate = new Date;
    const name = ref('');
    const jobTitle = ref('');
    const birthDate = ref((actualDate.getFullYear() + '/' + ('0' + (actualDate.getMonth() + 1)).slice(-2) + '/' + ('0' + actualDate.getDate()).slice(-2)).toString());
    const filingDate = ref((actualDate.getFullYear() + '/' + ('0' + (actualDate.getMonth() + 1)).slice(-2) + '/' + ('0' + actualDate.getDate()).slice(-2)).toString());

    const addEmployee = (): void => {
      emit('saveEmployee', {
        name: name,
        jobTitle: jobTitle,
        birthDate: birthDate,
        filingDate: filingDate
      });
    }

    const closeDialog = () => {
      emit('qDialogVisibility')
    }
    return {
      name,
      jobTitle,
      birthDate,
      filingDate,
      addEmployee,
      closeDialog,
    };
  },
});
</script>
