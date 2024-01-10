<template>
  <div class="flex flex-center full-width">
    <q-toolbar class="q-ma-none">
      <q-toolbar-title class="flex flex-center q-mt-none">
        Complete el formulario de registro
      </q-toolbar-title>
    </q-toolbar>
    <q-card class="full-width" flat>
      <q-tabs v-model="tab">
        <q-tab name="student" label="Estudiante"/>
        <q-tab name="watchmen" label="Vigilante"/>
        <q-tab name="monitor" label="Monitor"/>
      </q-tabs>
      <q-separator></q-separator>
      <q-tab-panels v-model="tab">
        <q-tab-panel name="student" label="Estudiante">
          <StudentForm @RegistrarUsuario="registerStudent"/>
        </q-tab-panel>

        <q-tab-panel name="watchmen" label="Vigilante">
          <WatchmenForm @RegistrarUsuario="registerUser"/>
        </q-tab-panel>

        <q-tab-panel name="monitor" label="Monitor">
          <MonitorForm @RegistrarUsuario="registerUser"/>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
import {api} from 'boot/axios'
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import StudentForm from 'src/components/singupforms/StudentForm.vue'
import MonitorForm from 'src/components/singupforms/MonitorForm.vue'
import WatchmenForm from 'src/components/singupforms/WatchmenForm.vue';

export default defineComponent({
  name:'RegisterPage',
  components:{
    StudentForm,
    MonitorForm,
    WatchmenForm
  },
  setup(){
  const router = useRouter()
  const $q = useQuasar()
  const typeMen = ref('')

  const registerUser = (usuario) => {
    api.post('users/register',{
      user:usuario
    })
    .then(res => {
      console.log(res)
      $q.notify({
        position:'top',
        message: 'Usuario creado exitosamente',
        color:'positive'
      })
      router.replace(`/`)
    })
    .catch((err)=>{
      console.log(err)
      $q.notify({
        message: 'Lo sentimos ocurrio un problema con el servidor',
        color:'negative'
      })
    })
  }

    const registerStudent = (user) => {
      if (
        user.name.trim() &&
        user.lastName.trim() &&
        user.age.trim() &&
        user.ci.trim() &&
        user.carrer.trim() &&
        user.semestre.trim() &&
        user.phone.trim() &&
        user.nroRoom.trim() &&
        user.codKey.trim() &&
        user.username.trim() &&
        user.password.trim() &&
        user.email.trim() &&
        repitPass.value.trim()
        ){
          if (user.password != repitPass.value) {
            $q.notify({
              message: `campo ${repitPass} no coincide con la contrasena`,
              color:'negative'
            })
          }else{
            switch (user.password) {
              case 'MonitorAdmin123':
                typeMen.value = 1
                break;
              case 'PortadaAdmin123':
              typeMen.value = 2
                break;
              case 'AdminAdmin':
              typeMen.value = 4
                break;
              default: typeMen.value = 3
                break;
            }
            api.post('users/register',{
              name:user.name,
              lastName:user.lastName,
              age:user.age,
              ci:user.ci,
              carrer:user.carrer,
              semester:user.semestre,
              phone:user.phone,
              nroRoom:user.nroRoom,
              codKey:user.codKey,
              username:user.username,
              password:user.password,
              email:user.email,
              type:typeMen.value
            })
              .then((res) => {
                router.replace('/')
              })
          }
       }else{
        $q.notify({
          icon:'warning',
          message: 'Hay campos vacios que son requeridos',
          color:'warning'
        })
       }
    }

    return{
      registerStudent,
      registerUser,
      tab:ref('student')
    }
  }
})
</script>
