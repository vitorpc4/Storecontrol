<template>
  <div>
    <q-card>
      <q-card-section>
        <div class="text-h6">Cadastrar Metas</div>
      </q-card-section>
      <q-card-section>
        <div class="q-pl-md">
          <div class="q-gutter-lg row items-start">
            <q-input class="col-5" v-model="name" outlined label="Nome" />
            <q-input class="col-5" v-model="value" outlined label="valor" />
            <q-input class="col-5" filled v-model="inicioMeta" label="Inicio Meta" mask="date" :rules="['date']">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="inicioMeta">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-input class="col-5" filled v-model="fimMeta" label="Fim Meta" mask="date" :rules="['date']">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="fimMeta">
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
<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  emits: ['qDialogVisibility'],
  setup(props, { emit }) {

    const actualDate = new Date;
    const name = ref('');
    const value = ref('');
    const inicioMeta = ref((actualDate.getFullYear() + '/' + ('0' + (actualDate.getMonth() + 1)).slice(-2) + '/' + ('0' + actualDate.getDate()).slice(-2)).toString());
    const fimMeta = ref((actualDate.getFullYear() + '/' + ('0' + (actualDate.getMonth() + 1)).slice(-2) + '/' + ('0' + actualDate.getDate()).slice(-2)).toString());


    const save = () => {
      emit('qDialogVisibility')
    }
    const closeDialog = () => {
      emit('qDialogVisibility')
    }

    return {
      name,
      value,
      inicioMeta,
      fimMeta,
      save,
      closeDialog

    }
  },
})
</script>
