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
          <q-img :src="`https://homeplus.iunav.edu.ve/avatar/${soli.users.foto_url}`" />
        </q-avatar>
      </div>
      <div  class="q-px-xs text-white ">
        <div>{{ soli.users.nombre }} {{ soli.users.apellido }}</div>
        <div>{{ soli.users.cedula }}</div>
        <div>{{ soli.users.edad }} años</div>
      </div>
      <q-separator vertical color="grey"/>
      <div  class="q-px-xs text-white ">
        <div>Tipo: {{soli.tipo}}</div>
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
        <div class="flex" style="justify-content: space-between;">
          <div>
            lugar: {{soli.lugar}}
          </div>
          <div>
            estado: {{ soli.estado }}
          </div>
        </div>
        Motivo: {{soli.motivo}}
      <div style="display: block;text-align: end;">
        <q-btn label="Aceptar" color="positive" @click="aceptar(soli.id)"/>
        <q-btn label="Rechazar" color="negative" @click="negar(soli.id)"/>
      </div>
      </div>
    </template>
  </q-banner>
  <q-inner-loading
    style="display: flex; position: fixed;"
    :showing="visible"
    label="Please wait..."
    label-class="text-teal"
    label-style="font-size: 1.1em"
  />
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
  emits:['RecallPermises'],
  setup(){
    const estado = ref()
    const visible = ref(false)

    function aceptar(i){
      visible.value = true

      estado.value = 'aprobado'
      api.patch(`users/students/permises/state/${i}`,{estado:estado.value})
        .then(res => {
          visible.value = false
          console.log(res)
        })
        .catch(err => {
          visible.value = false
          console.log(err)
        })
        this.$emit('RecallPermises',true)
    }
    function negar(i){
      visible.value = true

      estado.value = 'negado'
      api.patch(`users/students/permises/state/${i}`,{estado:estado.value})
        .then(res => {
          visible.value = false
          console.log(res)
        })
        .catch(err => {
          visible.value = false
          console.log(err)
        })
        this.$emit('RecallPermises',true)
    }

    return{
      visible,
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
