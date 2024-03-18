<template>
  <div class="q-pa-md q-gutter-md" style="width: 80%;;margin: auto; text-align: center;">
    <div class="q-ma-none" style="text-align: start;">
      <q-radio v-model="permission.type" val="local" label="Permiso Local" />
      <q-radio v-model="permission.type" val="finDe" label="Permiso largo" />
    </div>
    <div class="flex flex-center q-ma-none" v-show="permission.type == 'local'">
      <q-date class="q-mb-md" title="Fecha de Salida" v-model="permission.dateS" today-btn/>
    </div>
    <div class="flex flex-center q-ma-none" v-show="permission.type == 'finDe'">
      <q-date class="q-mb-md" title="Fecha de Salida" v-model="permission.dateS" today-btn/>
      <q-date  title="Fecha de Llegada" v-model="permission.dateL" today-btn/>
    </div>
      <q-input class="q-mx-none" filled v-model="permission.timeS" label="Hora de salida">
        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-time v-model="permission.timeS" now-btn>
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-time>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-input class="q-mx-none" filled v-model="permission.timeL" label="Hora de llegada">
        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-time v-model="permission.timeL" now-btn>
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-time>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    <q-input class="q-ma-none" type="text" v-model="permission.place" label="Lugar"/>
    <q-input class="q-ma-none" type="text" v-model="permission.motive" label="Motivo"/>
    <q-btn
      label="Enviar"
      class="full-width q-mt-md bg-positive"
      @click="Solicitar"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { api } from 'src/boot/axios'

export default defineComponent({
  name:'PermisePage',
  setup () {
    const $q = useQuasar()
    const data = $q.localStorage.getItem('userData')
    const router = useRouter()
    const token2 = data.token
    const permission = ref({
      timeS:'00:00',
      timeL:'00:00',
      dateS:'',
      dateL:'',
      motive:'',
      place:'',
      type:'',
      state:''
    })

    const Solicitar = () => {
      if(permission.value.type == 'local'){
        if(permission.value.dateS.trim() && permission.value.timeS.trim() && permission.value.timeL.trim() && permission.value.place.trim() && permission.value.motive.trim()){
          if (permission.value.timeS > permission.value.timeL){
            $q.notify({
              position:'bottom',
              type: 'warnning',
              message: 'La hora de salida no puede ser inferior a la hora de llegada'
            })
          }else{
          const {state,dateS,timeL,timeS,motive,place,type} = permission.value
            api.post('users/permises',{dateL:permission.value.dateS,dateS,timeL,timeS,motive,place,type,state:'pendiente',used:'no usado'},{
              headers:{
                'Authorization':`bearer ${token2}`
              }
            })
              .then(res => {
                console.log(res.data)
                $q.notify({
                  position:'top',
                  type: 'positive',
                  message: 'Solicitud de permiso enviado con exito'
                })
                router.replace('/students')
              })
              .catch(err => {
                $q.notify({
                  position:'bottom',
                  type: 'negative',
                  message: 'Ha ocurrido un error'
                })
                console.log(err)
              })}
          }
          else{
            $q.notify({
              position:'bottom',
              type: 'warning',
              message: 'Algunos campos requeridos estan vacios'
            })
          }
      }else if(permission.value.type == 'finDe'){
        if(permission.value.dateS.trim() && permission.value.dateL.trim() && permission.value.timeS.trim() && permission.value.timeL.trim() && permission.value.place.trim() && permission.value.motive.trim()){
            const {dateL,dateS,timeL,timeS,motive,place,type} = permission.value
            api.post('users/permises',{dateL,dateS,timeL,timeS,motive,place,type,state:'pendiente',used:'no usado'},{
              headers:{
                'Authorization':`bearer ${token2}`
              }
            })
              .then(res => {
                console.log(res.data)
                $q.notify({
                  position:'top',
                  type: 'positive',
                  message: 'Solicitud de permiso enviado con exito'
                })

                router.replace('/students')
              })
              .catch(err => {
                $q.notify({
                  position:'bottom',
                  type: 'negative',
                  message: 'Ha ocurrido un error'
                })
                console.log(err)
              })
          }else{
            $q.notify({
              position:'bottom',
              type: 'warning',
              message: 'Algunos campos requeridos estan vacios'
            })
          }
      }else{
        $q.notify({
          position:'bottom',
          type: 'warning',
          message: 'Algunos campos requeridos estan vacios'
        })
      }
    }

    return {
      permission,
      Solicitar
    }
  }
})
</script>
