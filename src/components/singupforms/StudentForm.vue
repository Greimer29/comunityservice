<template>
  <div class="q-pa-md">
    <q-form  class="q-gutter-md q-mb-md text-center" >
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
      <q-input filled v-model="aja" label="repetir contraseña" />
      <q-input filled v-model="user.email" label="correo electronico" />
      <q-btn  label="REGISTRAR" color="positive" @click="registrar(user)"/>
    </q-form>
  </div>
</template>
<script>
import { defineComponent,ref } from 'vue';

export default defineComponent({
  name:'StudentForm',
  setup(){
    const aja = ref('')
    const user = ref({
      name:'',
      lastName:'',
      age:'',
      ci:'',
      carrer:'',
      semestre:'',
      phone:'',
      password:'',
      email:'',
      codKey:'',
      nroRoom:'',
      type:3
    })

    function registrar(){
      this.$emit('RegistrarUsuario',user.value)
    }

    return {
      user,
      aja,
      registrar
    }
  }
})
</script>
