<template>
  <q-banner
    class="q-mt-xs q-px-none full-width bg-grey-10 text-white text-left"
    v-for="(soli, index) in permise"
    :key="index"
    rounded
  >
    <template v-slot:action >
      <div class="q-pa-xs">
        <q-avatar >
          <q-img src="public\favicon.ico" />
        </q-avatar>
      </div>
      <div  class="q-px-xs">
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
        <div class="flex" style="justify-content: space-between;">
          <div>
            lugar: {{soli.lugar}}
          </div>
          <div>
            estado: {{ soli.estado }}
          </div>
        </div>
        Motivo: {{soli.motivo}}
        <div v-show="soli.estado != 'negado'" style="text-align: end;">
          <q-btn label="Confirmar" color="positive" @click="quemar(soli.id)"/>
        </div>
      </div>
    </template>
  </q-banner>
</template>

<script>
import { defineComponent,ref } from "vue";
import { api } from "src/boot/axios";

export default defineComponent({
  name: "PermiseComponent",
  props: {
    permise: {
      type: Array,
      required: true,
    }
  },
  setup(){
    const used = ref()
    const quemar = (i) =>{
      used.value = 'usado'
      api.patch(`users/students/permises/used/${i}`,{used:used.value})
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
        window.location.reload()
    }

    return{
      quemar
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
