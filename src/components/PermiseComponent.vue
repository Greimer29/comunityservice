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
          <q-img :src="`https://homeplus.iunav.edu.ve/avatar/${soli.users.foto_url}`" />
        </q-avatar>
      </div>
      <div  class="q-px-xs">
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
        <div v-show="soli.estado != 'negado'" style="text-align: end;">
          <q-btn v-show="soli.hora_salida_firmada == null " label="Confirmar salida" color="positive" @click="confiramarSalida(soli.id)" :key="soli.id"/>
          <q-btn v-show="soli.hora_salida_firmada != null " label="Confirmar entrada" color="positive" @click="confirmarLlegada(soli.id)" :key="soli.id"/>
        </div>
      </div>
    </template>
  </q-banner>
</template>

<script>
import { defineComponent,ref } from "vue";
import { date } from "quasar";
import{ api } from "src/boot/axios";

export default defineComponent({
  name: "PermiseComponent",
  props: {
    permise: {
      type: Array,
      required: true,
    }
  },
  emits:['RecallPermises'],
  setup(){
    const used = ref()
    const salidaFirmed = ref(true)
    const llegadaFirmed = ref(false)

    console.log('switch es mejor que checkout')

    function confiramarSalida(id){
      const timeExit = Date.now()
      const formattedTime = date.formatDate(timeExit, 'HH:mm')
      api.patch(`users/students/permises/confirmed/${id}`,{
        salidaFirmed:formattedTime,
        llegadaFirmed:null
      })
      .then(res => {
        console.log(res.data)
      })
      salidaFirmed.value = false
      llegadaFirmed.value = true
    }
    function confirmarLlegada(id){
      const timeArrived = Date.now()
      const formattedTime = date.formatDate(timeArrived, 'HH:mm')
      api.patch(`users/students/permises/confirmed/${id}`,{
        salidaFirmed:null,
        llegadaFirmed:formattedTime
      })
      .then(res => {
        console.log(res.data)
      })
      salidaFirmed.value = false
      llegadaFirmed.value = false
      quemar(id)
        this.$emit('RecallPermises',true)
    }
    function quemar(i) {
      used.value = 'usado'
      api.patch(`users/students/permises/used/${i}`,{used:used.value})
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }

    return{
      llegadaFirmed,
      salidaFirmed,
      quemar,
      confiramarSalida,
      confirmarLlegada
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
