<template>
  <q-badge
    class="q-mt-xs flex felx-center full-width"
    v-for="(permiso,index) in permiso" :key="index"
    :color="permiso.status ? 'positive': 'negative'"
  >
    <div class="flex flex-center q-ma-none q-pa-md">
      <q-avatar v-show="permiso.status">
        <img src="public\icons\5aa78e387603fc558cffbf1d.png" alt="correcto/incorrecto">
      </q-avatar>
      <q-avatar v-show="permiso.status === false">
        <img src="public\icons\images.jpg" alt="correcto/incorrecto">
      </q-avatar>
    </div>
    <div class="q-pt-md q-px-md">
      <p>{{permiso.hsalida}}</p>
      <p>{{permiso.hllegada}}</p>
      <p>{{permiso.fecha}}</p>
    </div>
    <div class="q-pt-md q-px-md col self-end">
      <p>{{permiso.hsalida}}</p>
      <p>{{permiso.hllegada}}</p>
      <p>{{permiso.fecha}}</p>
    </div>
  </q-badge>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";

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
