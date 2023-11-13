<template>
  <div class="q-pa-md q-gutter-md" style="width: 80%;;margin: auto; text-align: center;">
    <q-option-group class="q-ma-none" style="text-align: start;"
      v-model="group"
      :options="permission.options"
      color="primary"
    />
    <div class="flex flex-center q-ma-none">
      <q-date class="q-mb-md" title="Fecha de Salida" v-model="permission.dateS" today-btn/>
      <q-date title="Fecha de Llegada" v-model="permission.dateL" today-btn/>
    </div>
      <q-input class="q-mx-none" filled v-model="timeS" label="Hora de salida">
        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-time v-model="timeS">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-time>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <q-input class="q-mx-none" filled v-model="timeL" label="Hora de llegada">
        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-time
                v-model="timeL"
              >
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-time>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    <q-input class="q-ma-none" type="text" v-model="type" label="Tipo"/>
    <q-input class="q-ma-none" type="text" v-model="place" label="Lugar"/>
    <q-input class="q-ma-none" type="text" v-model="motive" label="Motivo"/>
    <q-btn label="Enviar" class="full-width q-mt-md bg-positive"/>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import TimeComponent from 'components/TimeComponent.vue'

export default defineComponent({
  name:'PermisePage',
  components:{
    TimeComponent
  },
  setup () {
    const permission = ref({
      timeS:'',
      timeL:'',
      dateS:'',
      dateL:'',
      place:'',
      motive:'',
      place:'',
      options:[
        {label:'permiso Local',value:'local'},
        {label:'Permiso de fin de semana',value:'findesemana'}
      ]
    })
    const timeS = ref('')
    const timeL = ref('')
    const dateS = ref('')
    const dateL = ref('')
    const type = ref('')
    const place = ref('')
    const motive = ref('')
    const group = ref('op1')
    const options = ref([
      {label:'Permiso Local',value:'local'},
      {label:'Permiso fin de semana',value:'findesemana'}
    ])
    return {
      timeS,
      timeL,
      dateS,
      dateL,
      type,
      place,
      motive,
      group,
      options,
      permission
    }
  }
})
</script>
