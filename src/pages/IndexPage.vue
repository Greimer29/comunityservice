<template>
  <q-page >
    <q-bar class="bg-white">
      <q-toolbar-title class="text-center text-bold">
        <div class="text-grey-8">Permisos para hoy: {{ today }}</div>
      </q-toolbar-title>
    </q-bar>
      <q-card>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        narrow-indicator
      >
        <q-tab name="aprobados" label="Aprobados"/>
        <q-tab name="negados" label="Negados"/>
      </q-tabs>
      <q-separator/>
          <keep-alive>
      <q-tab-panels   v-model="tab" animated>
        <q-tab-panel name="aprobados" class="q-px-xs">
          <PermiseComponent :permise="aprovedSoli" @RecallPermises="getAprovedPermises"/>
        </q-tab-panel>

        <q-tab-panel name="negados" class="q-px-xs">
            <PermiseComponent :permise="deniedSoli "/>
        </q-tab-panel>
      </q-tab-panels>
          </keep-alive>
    </q-card>
  </q-page>
</template>

<script>
import { api } from 'src/boot/axios';
import BadgeComponent from 'src/components/BadgeComponent.vue';
import { defineComponent,ref, onMounted } from 'vue'
import PermiseComponent from 'src/components/PermiseComponent.vue'
import { date } from 'quasar';

export default defineComponent({
  name: 'IndexPage',
  components:{
    BadgeComponent,
    PermiseComponent
  },
  emits:['RecallPermises'],
  setup(){
    const today = date.formatDate(new Date(), 'DD/MM/YYYY')
    const aprovedSoli = ref([])
    const deniedSoli = ref([])

    setInterval(()=>{
      getAprovedPermises()
      getDeniedPermises()
    },2000)

    const getAprovedPermises = () => {
      api.get('users/permises/aproved')
        .then(res => {
          aprovedSoli.value = res.data
          aprovedSoli.value.forEach(element => {
              element.fecha_salida = date.formatDate(date.addToDate(element.fecha_salida, { days: 1 }),'YYYY-MM-DD')
              element.fecha_llegada = date.formatDate(date.addToDate(element.fecha_llegada, { days: 1 }),'YYYY-MM-DD')
          });
        })
    }
    const getDeniedPermises = () => {
      api.get('users/permises/denied')
        .then(res => {
          deniedSoli.value = res.data
          deniedSoli.value.forEach(element => {
              element.fecha_salida = date.formatDate(date.addToDate(element.fecha_salida, { days: 1 }),'YYYY-MM-DD')
              element.fecha_llegada = date.formatDate(date.addToDate(element.fecha_llegada, { days: 1 }),'YYYY-MM-DD')
          });
        })
    }

    onMounted(()=>{
      getAprovedPermises()
      getDeniedPermises()
    })

    return{
      tab: ref('aprobados'),
      aprovedSoli,
      deniedSoli,
      today,
      getAprovedPermises
    }
  }
})
</script>
<style>
.q-banner__actions{
  justify-content: start;
  justify-content: left;
}
p {
margin: 0;
justify-content: left;
}
</style>
