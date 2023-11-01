<template>
  <div
    class="q-ma-xs flex felx-center full-width"
    v-for="(permiso,index) in permiso" :key="index"
    style="background-color: red; text-color: blue"
  >
    <div class="flex flex-center q-ma-none q-pa-md">
      <q-avatar v-show="permiso.status === 'aprobada'">
        <img src="public\icons\5aa78e387603fc558cffbf1d.png" alt="correcto/incorrecto">
      </q-avatar>
      <q-avatar v-show="permiso.status === 'denegada'">
        <img src="public\icons\images.jpg" alt="correcto/incorrecto">
      </q-avatar>
    </div>
    <div class="q-ma-none q-pa-md">
      <p>{{permiso.hsalida}}</p>
      <p>{{permiso.hllegada}}</p>
      <p>{{permiso.fecha}}</p>
    </div>
    <div class="q-ma-none q-pa-md col self-end">
      <p>{{permiso.hsalida}}</p>
      <p>{{permiso.hllegada}}</p>
      <p>{{permiso.fecha}}</p>
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
