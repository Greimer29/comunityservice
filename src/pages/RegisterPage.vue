<template>
  <div class="flex flex-center q-mt-xl">
    <form  class="q-gutter-md q-mb-md text-center" style="width: 80%;" >
      <q-input filled  v-model="user.names" label="Nombres" />
      <q-input filled v-model="user.lastNames" label="Apellidos" />
      <q-input filled v-model="user.age" label="Edad" />
      <q-input filled v-model="user.ci" label="Cedula" />
      <q-input filled v-model="user.carrer" label="Carrera" />
      <q-input filled v-model="user.semestre" label="Semestre" />
      <q-input filled v-model="user.phone" label="Telefono" />
      <q-input filled v-model="user.nroRoom" label="Nro de Habitacion" />
      <q-input filled v-model="user.codKey" label="Codigo de Llave" />
      <q-input filled v-model="user.username" label="Nombre de Usuario" />
      <q-input filled v-model="user.password" label="contraseña" />
      <q-input filled v-model="user.repitPass" label="repetir contraseña" />
      <q-input filled v-model="user.email" label="correo electronico" />
      <q-btn  label="REGISTRAR" color="positive" @click="registrar(user)"/>
    </form>
  </div>
</template>
<script>
import { defineComponent, popScopeId, ref } from 'vue';
import {api} from 'boot/axios'
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

export default defineComponent({
  name:'RegisterPage',
  setup(){
  const router = useRouter()
  const $q = useQuasar()

    const user = ref({
      names:'',
      lastNames:'',
      age:'',
      ci:'',
      carrer:'',
      username:'',
      semestre:'',
      phone:'',
      password:'',
      repitPass:'',
      email:'',
      codKey:'',
      nroRoom:''
    })

    const registrar = (user) => {
      api.post('users/register',{
        names:user.names,
        lastNames:user.lastNames,
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
        type:2
      })
        .then((res) => {
          console.log(res)
          $q.notify({
            message: 'Usuario creado exitosamente',
            color:'positive'
          })
          router.replace('/')
        })
        .catch((err)=>{
          console.log(err)
          $q.notify({
            message: 'Lo sentimos ocurrio un problema',
            color:'negative'
          })
        })
    }

    return{
      user,
      registrar
    }
  }
})
</script>
