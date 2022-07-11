<template>
    <div class="">
        <q-layout view="hHh Lpr lff" container style="height: 54em" class="shadow-2">
            <q-header elevated class="bg-black">
                <q-toolbar>
                    <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
                    <q-toolbar-title>Store Control</q-toolbar-title>
                </q-toolbar>
            </q-header>
            <q-drawer v-model="drawer" show-if-above :width="250" :breakpoint="700" elevated class="bg-grey-3">
                <q-scroll-area class="fit">
                    <q-list bordered>
                        <router-link to="/" class="link">
                            <q-item clickable v-ripple>
                                <q-item-section avatar>
                                    <q-icon color="primary" class="fa-solid fa-house"></q-icon>
                                </q-item-section>
                                <q-item-section>Home</q-item-section>
                            </q-item>
                        </router-link>
                        <div>
                            <q-expansion-item header-class="text-primary" expand-separator icon="fa-solid fa-pen-to-square"
                                label="Cadastrar">
                                <router-link to="/employee" class="link">
                                    <q-item clickable v-ripple>
                                        <q-item-section avatar>
                                            <q-icon color="employees" class="fa-solid fa-user-group"></q-icon>
                                        </q-item-section>
                                        <q-item-section>Funcionários</q-item-section>
                                    </q-item>
                                </router-link>
                                <router-link to="/targets" class="link">
                                    <q-item clickable v-ripple>
                                        <q-item-section avatar>
                                            <q-icon color="primary" class="fa-regular fa-calendar-check"></q-icon>
                                        </q-item-section>
                                        <q-item-section>Metas</q-item-section>
                                    </q-item>
                                </router-link>
                            </q-expansion-item>
                        </div>

                    </q-list>
                </q-scroll-area>
            </q-drawer>
            <slot></slot>
        </q-layout>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue'


export default {
    name: 'sideBar',
    setup() {
        return {
            drawer: ref(false),
        }
    }
}
</script>

<style scoped>
.link {
    color: #1976D2;
    text-decoration: none;
}
</style>
