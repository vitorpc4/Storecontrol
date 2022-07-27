<template>
  <div>
    <q-card>
      <q-card-section>
        <div class="text-h6">Cadastrar Metas</div>
      </q-card-section>
      <q-card-section>
        <div class="q-pl-md">
          <div class="row items-start q-gutter-lg">
            <div class="col">
              <q-select borderless v-model="targetSelected" :options="optionsTargets" label="Meses">
              </q-select>
            </div>
            <div class="col">
              <q-input v-model="value" outlined label="valor" />
            </div>
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
import LaunchingClothes from 'src/interfaces/LaunchingClothes';

export default defineComponent({
  emits: ['qDialogVisibility'],
  props: {
    data: {
      type: String,
      required: true
    }
  },
  setup(props, { emit }) {
    const optionsTargets = ['teste', 'teste2']
    const targetSelected = ref('')
    const value = ref(0);
    console.log(props.data)
    const save = () => {
      console.log('save');
    }

    const closeDialog = () => {
      emit('qDialogVisibility');
    }

    return {
      closeDialog,
      save,
      optionsTargets,
      value,
      targetSelected
    }
  },
})
</script>
