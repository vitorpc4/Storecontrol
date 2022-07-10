<template>
    <div class="">
        <q-layout view="hHh Lpr lff" container style="height: 54em" class="shadow-2">
            <q-header elevated class="bg-black">
                <q-toolbar>
                    <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
                    <q-toolbar-title>Store Control</q-toolbar-title>
                </q-toolbar>
            </q-header>
            <q-drawer v-model="drawer" show-if-above :width="200" :breakpoint="700" elevated class="bg-grey-3">
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
                        <router-link to="/teste" class="link">
                            <q-item clickable v-ripple>
                                <q-item-section avatar>
                                    <q-icon color="primary" class="fa-solid fa-user-gear"></q-icon>
                                </q-item-section>
                                <q-item-section>Teste</q-item-section>
                            </q-item>
                        </router-link>
                        <router-link to="/relatorio" class="link">
                            <q-item clickable v-ripple>
                                <q-item-section avatar>
                                    <q-icon color="primary" class="fa-solid fa-bullseye"></q-icon>
                                </q-item-section>
                                <q-item-section>Metas</q-item-section>
                            </q-item>
                        </router-link>
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
    text-decoration: none;
}
</style>
