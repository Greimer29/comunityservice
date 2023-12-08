<template>
  <div class="flex flex-center q-mt-md">
    <q-toolbar class="q-ma-none">
      <q-toolbar-title class="flex flex-center q-mt-none">
        Complete el formulario de registro
      </q-toolbar-title>
    </q-toolbar>
    <form  class="q-gutter-md q-mb-md text-center" style="width: 80%;" >
      <q-input filled  v-model="user.name" label="Nombre" />
      <q-input filled v-model="user.lastName" label="Apellido" />
      <q-input filled v-model="user.age" label="Edad" />
      <q-input filled v-model="user.ci" label="Cedula" />
      <q-input filled v-model="user.carrer" label="Carrera" />
      <q-input filled v-model="user.semestre" label="Semestre" />
      <q-input filled v-model="user.phone" label="Telefono" />
      <q-input filled v-model="user.nroRoom" label="Nro de Habitacion" />
      <q-input filled v-model="user.codKey" label="Codigo de Llave" />
      <q-input filled v-model="user.username" label="Nombre de Usuario" />
      <q-input filled v-model="user.password" label="contraseña" />
      <q-input filled v-model="repitPass" label="repetir contraseña" />
      <q-input filled v-model="user.email" label="correo electronico" />
      <q-btn  label="REGISTRAR" color="positive" @click="registrar(user)"/>
    </form>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
import {api} from 'boot/axios'
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

export default defineComponent({
  name:'RegisterPage',
  setup(){
  const router = useRouter()
  const $q = useQuasar()
  const repitPass = ref('')
  const typeMen = ref('')

    const user = ref({
      name:'',
      lastName:'',
      age:'',
      ci:'',
      carrer:'',
      username:'',
      semestre:'',
      phone:'',
      password:'',
      email:'',
      codKey:'',
      nroRoom:'',
      type:''
    })

    const registrar = (user) => {
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
              typeMen.value = 3
                break;
              case 'AdminAdmin':
              typeMen.value = 4
                break;
              default: typeMen.value = 2
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
                $q.notify({
                  position:'top',
                  message: 'Usuario creado exitosamente',
                  color:'positive'
                })
                router.replace('/')
              })
              .catch((err)=>{
                console.log(err)
                $q.notify({
                  message: 'Lo sentimos ocurrio un problema con el servidor',
                  color:'negative'
                })
              })
          }
       }else{
        $q.notify({
          message: 'Hay campos vacios que son requeridos',
          color:'warning'
        })
       }
    }

    return{
      user,
      registrar,
      repitPass
    }
  }
})
</script>
