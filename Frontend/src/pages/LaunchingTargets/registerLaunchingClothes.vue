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
              <q-select borderless v-model="targetSelected" :options="arrayTargetsNames" label="Tipo">
              </q-select>
            </div>
            <div class="col">
              <q-input v-model="valueClothe" outlined label="valor" />
            </div>
          </div>
        </div>
      </q-card-section>
      <div class="row justify-end">
        <q-card-actions class="bg-white text-teal q-mr-xl">
          <q-btn flat label="OK" @click="save(LaunchingClothes)" />
          <q-btn flat label="CANCELAR" @click="closeDialog" />
        </q-card-actions>
      </div>
    </q-card>
  </div>
</template>

<script lang="ts">
import ILaunchingClothes from 'src/interfaces/LaunchingClothes';
import { useLaunchingClothesStore } from 'src/stores/LaunchingClothesStore';

import { useTargetStore } from 'src/stores/TargetStore'
import { defineComponent, onMounted, Ref, ref } from 'vue'

export default defineComponent({
  emits: ['qDialogVisibility'],
  props: {
    data: {
      type: String,
      required: true
    }
  },
  setup(props, { emit }) {
    const TargetStore = useTargetStore();
    const LaunchingClothesStore = useLaunchingClothesStore();

    const targetSelected = ref('')
    const arrayTargetsNames: Ref<string[]> = ref([])
    const valueClothe = ref(0);
    let LaunchingClothes: ILaunchingClothes = {
      id: 0,
      data: '',
      Targets: {
        id: 0,
        name: '',
        inicioMeta: '',
        fimMeta: '',
        value: 0
      },
      value: 0
    }

    const getYear = props.data.split('-')

    const targetsFilterByYear = TargetStore.getTargets.filter((x) => x.inicioMeta.includes(getYear[0]))

    const save = (LaunchingClothes: ILaunchingClothes): void => {
      const selectedTarget = targetsFilterByYear.find((x) => x.name.includes(targetSelected.value))
      if (selectedTarget != null) {
        LaunchingClothes.id = 0
        LaunchingClothes.data = props.data
        LaunchingClothes.Targets = selectedTarget;
        LaunchingClothes.value = valueClothe.value;
        LaunchingClothesStore.createNewLaunchingClothes(LaunchingClothes);
        emit('qDialogVisibility');
      }

    }

    onMounted(() => {
      for (let i = 0; i < targetsFilterByYear.length; i++) {
        const name = targetsFilterByYear[i].name
        arrayTargetsNames.value.push(name)
      }
    })



    const closeDialog = () => {
      emit('qDialogVisibility');
    }

    return {
      closeDialog,
      save,
      arrayTargetsNames,
      valueClothe,
      LaunchingClothes,
      targetSelected
    }
  },
})
</script>
