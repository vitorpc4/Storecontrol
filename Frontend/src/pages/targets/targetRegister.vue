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
          <q-btn flat label="OK" @click="save()" />
          <q-btn flat label="CANCELAR" @click="closeDialog" />
        </q-card-actions>
      </div>
    </q-card>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import ITarget from 'src/interfaces/Target';
import { useTargetStore } from 'src/stores/TargetStore'

export default defineComponent({
  emits: ['qDialogVisibility'],
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  setup(props, { emit }) {
    const useTarget = useTargetStore()
    const actualDate = new Date;
    const name = ref('')
    const value = ref(0)
    const inicioMeta = ref((actualDate.getFullYear() + '/' + ('0' + (actualDate.getMonth() + 1)).slice(-2) + '/' + ('0' + actualDate.getDate()).slice(-2)).toString())
    const fimMeta = ref((actualDate.getFullYear() + '/' + ('0' + (actualDate.getMonth() + 1)).slice(-2) + '/' + ('0' + actualDate.getDate()).slice(-2)).toString())
    let Target: ITarget = {
      id: 0,
      name: '',
      value: 0,
      inicioMeta: '',
      fimMeta: '',
    }

    if (props.id) {
      const targetFind = useTarget.$state.Targets.find(p => p.id == props.id)
      if (targetFind != null) {
        name.value = targetFind.name
        value.value = targetFind.value
        inicioMeta.value = targetFind.inicioMeta
        fimMeta.value = targetFind.fimMeta
      }
    }


    const save = () => {
      if (props.id) {
        Target.id = props.id
        Target.name = name.value
        Target.value = value.value
        Target.inicioMeta = inicioMeta.value
        Target.fimMeta = fimMeta.value
        useTarget.updateTarget(Target).then(() => {
          emit('qDialogVisibility')
        })
      } else {
        Target.name = name.value
        Target.value = value.value
        Target.inicioMeta = inicioMeta.value
        Target.fimMeta = fimMeta.value
        useTarget.createNewTarget(Target).then(() => {
          emit('qDialogVisibility')
        })
      }

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
