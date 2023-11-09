<template>
  <div class="flex flex-center q-mt-xl">
    <form  class="q-gutter-md text-center" style="width: 80%;" >
      <q-input filled  v-model="user.name" label="Nombres" />
      <q-input filled v-model="user.lastName" label="Apellidos" />
      <q-input filled v-model="user.ci" label="Cedula" />
      <q-input filled v-model="user.phone" label="Telefono" />
      <q-input filled v-model="user.pass" label="contraseña" />
      <q-input filled v-model="user.repitPass" label="repetir contraseña" />
      <q-input filled v-model="user.email" label="correo electronico" />
      <q-btn  label="REGISTRAR" color="positive" @click="registrar"/>
    </form>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
import {api} from 'boot/axios'
import { useRouter } from 'vue-router';

export default defineComponent({
  name:'RegisterPage',
  setup(){
  const router = useRouter()

    const user = ref({
      name:'',
      lastName:'',
      ci:'',
      phone:'',
      pass:'',
      repitPass:'',
      email:''
    })

    const registrar = () => {
      api.get('users')
        .then((res) => {
          console.log(res)
        })
    }

    return{
      user,
      registrar
    }
  }
})
</script>
