<template>
  <div class="q-pa-md">
    <div class="row justify-end q-gutter-sm">
      <div class="col-1 q-col-gutter-md">
        <q-select borderless v-model="model" :options="options" label="Ano">
        </q-select>
      </div>
      <div>
        <q-btn color="primary" icon-right="fa-regular fa-square-plus" label="Cadastrar"
          @click="changeVisibilityDialog" />
      </div>

    </div>
    <q-table :rows="rows" :columns="columns" row-key="name" :visible-columns="visibleColumns">
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
  </div>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="qDialogVisibility">
      <TargetRegister></TargetRegister>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import targetRegister from './targetRegister.vue'


const options = [
  '2022', '2023', '2024', '2025', '2026'
]

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: 'Name',
    sortable: true
  },
  { name: 'values', align: 'center', label: 'values', field: 'values', sortable: true },
]

const rows = [
  {
    Name: 'Terno',
    values: '15000',
  }
]

export default {
  setup() {
    const qDialogVisibility = ref(false)

    const changeVisibilityDialog = () => {
      qDialogVisibility.value = !qDialogVisibility.value
    }

    return {
      changeVisibilityDialog,
      qDialogVisibility,
      model: ref(null),
      columns,
      rows,
      options
    }
  },
  components: { targetRegister }
}
</script>
