<template>
  <div
    class="q-mt-md q-gutter-md flex felx-center full-width"
    v-for="(permiso,index) in permiso" :key="index"
  >
    <div>
      <q-avatar v-show="permiso.status === 'aprobada'" class="row items-center">
        <img src="public\icons\5aa78e387603fc558cffbf1d.png" alt="correcto/incorrecto">
      </q-avatar>
      <q-avatar v-show="permiso.status === 'denegada'" class="row items-center">
        <img src="public\icons\images.jpg" alt="correcto/incorrecto">
      </q-avatar>
    </div>
    <div>
      hola
    </div>
    <div>
      que tal
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: 'HistoryComponent',
  props:{
    permiso:{
      type: Array,
      required: true
    }
  }

})
</script>

<style>
</style>
