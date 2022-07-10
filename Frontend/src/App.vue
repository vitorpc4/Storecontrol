<template>
  <sideBar>
    <q-page-container>
      <q-page>
        <router-view></router-view>
      </q-page>
    </q-page-container>
  </sideBar>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import sideBar from './components/sideBar.vue';

export default defineComponent({
  name: 'App',
  components: { sideBar }
})
</script>
