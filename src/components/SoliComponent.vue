<template>
  <q-banner
    class="q-mt-xs q-px-none full-width bg-grey-10 text-white text-left"
    v-for="(soli, index) in soliPending"
    :key="index"
    rounded
  >
    <template v-slot:action >
      <div class="q-pa-xs">
        <q-avatar >
          <q-img src="public\favicon.ico" />
        </q-avatar>
      </div>
      <div  class="q-px-xs text-white ">
        <div>{{ soli.users.nombre }} {{ soli.users.apellido }}</div>
        <div>{{ soli.users.cedula }}</div>
        <div>{{ soli.users.edad }} años</div>
      </div>
      <q-separator vertical color="grey"/>
      <div  class="q-px-xs text-white ">
        <div>Permiso: {{soli.tipo}}</div>
        <div> {{soli.fecha_salida}}</div>
        <div> {{soli.fecha_llegada}}</div>
      </div>
      <q-separator vertical color="grey"/>
      <div class="q-px-xs text-white " style="max-width: 150px;">
        <div>{{ soli.users.telefono }}</div>
        <div> Salida: {{soli.hora_salida}}</div>
        <div> Llegada: {{soli.hora_llegada}}</div>
      </div>

      <div class="q-ma-xs text-white " style="border-top: 2px solid grey;min-width: 95%;">
            lugar: {{soli.lugar}}
        <div class="flex" style="justify-content: space-between;">
          <div>
            Motivo: {{soli.motivo}}
          </div>
          <div>
            estado: {{ soli.estado }}
          </div>
        </div>
      <div style="display: block;text-align: end;">
        <q-btn label="Aceptar" color="positive" @click="aceptar(soli.id)"/>
        <q-btn label="Rechazar" color="negative" @click="negar(soli.id)"/>
      </div>
      </div>
    </template>
  </q-banner>
</template>

<script>
import { defineComponent,onUnmounted,ref } from "vue";
import { api } from "src/boot/axios";

export default defineComponent({
  name: "HistoryComponent",
  props: {
    soliPending: {
      type: Array,
      required: true,
    }
  },
  setup(){
    const estado = ref()
    const aceptar = (i) =>{
      estado.value = 'aprobado'
      api.patch(`users/students/permises/state/${i}`,{estado:estado.value})
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
        window.location.reload()
    }
    const negar = (i) =>{
      estado.value = 'negado'
      api.patch(`users/students/permises/state/${i}`,{estado:estado.value})
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
        window.location.reload()
    }

    return{
      aceptar,
      negar
    }
  }
});
</script>

<style>
p {
  margin: 0;
  justify-content: left;
  text-align: left;
}

</style>
