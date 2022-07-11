<template>
    <div class="q-pa-md">
        <div class="column">
            <q-btn color="primary" icon-right="fa-regular fa-square-plus" label="Cadastrar" class="col self-end q-mb-sm" @click="registerEmployee"/>
        </div>
        <q-table :rows="rows" row-key="name">
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
        <RegisterEmployeeModal :show="show"></RegisterEmployeeModal>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import RegisterEmployeeModal from './registerEmployeeModal.vue'
const rows = [
    {
        name: 'João da silva',
        jobTitle: 'Vendedor',
        birthDate: '05/04/2000',
        filingDate: '10/07/2019'
    },
    {
        name: 'João da silva',
        jobTitle: 'Vendedor',
        birthDate: '05/04/1999',
        filingDate: '10/07/2019'
    },
    {
        name: 'João da silva',
        jobTitle: 'Vendedor',
        birthDate: '05/04/2000',
        filingDate: '10/07/2019'
    },
]
export default defineComponent({
    setup() {
        const show = ref(Boolean);
        const registerEmployee = () => {
            show.value = true;
            console.log(show.value);
        };
        return {
            show,
            rows,
            registerEmployee
        };
    },
    components: { RegisterEmployeeModal }
})
</script>