<template>
  <div class="q-gutter-md text-center" v-show="!show">
    <q-input v-model="cod" label="Codigo de Portada"/>
    <q-btn label="verificar codigo" color="primary" @click="enviar"/>
  </div>
  <div class="q-pa-md" v-show="show">
    <q-form class="q-gutter-md text-center">
      <q-input filled label="Nombre" v-model="user.name"/>
      <q-input filled label="Apellido" v-model="user.lastName"/>
      <q-input v-model="user.email" filled placeholder="email@portada.com" label="Email" type="email" />
      <q-input v-model="user.password" filled :type="isPwd ? 'password' : 'text'" label="Contraseña">
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <q-input v-model="repitPassword" filled :type="isRpwd ? 'password' : 'text'" label="RepetirContraseña">
        <template v-slot:append>
          <q-icon
            :name="isRpwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isRpwd = !isRpwd"
          />
        </template>
      </q-input>
      <q-btn label="registrar" color="positive" @click="registrar()"/>
    </q-form>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
import {api} from 'src/boot/axios.js'
import { useQuasar } from 'quasar';

export default defineComponent({
  name:'WatchmenForm',
  emits:['RegistrarUsuario'],
  setup(){
    const repitPassword = ref('')
    const show = ref(false)
    const cod = ref('')
    const $q = useQuasar()

    const user = ref({
      name:'',
      lastName:'',
      email:'',
      password:'',
      type:2
    })

    const enviar = () => {
      if(cod.value.trim()){
      api.post('user/validation',{
        cod:cod.value,typeUser:2
      })
      .then(res => {
        const {validation} = res.data
        if(validation){
          $q.notify({
            color:'positive',
            position:'bottom',
            message:'Codigo verificado exitosamente'
          })
          setTimeout(()=>{
            show.value = validation
          },2000)
        }
      })
      .catch(err => {
        console.log(err)
          $q.notify({
            color:'negative',
            position:'bottom',
            message:'Codigo invalido'
          })
      })
      }else{
          $q.notify({
            icon:'warning',
            color:'warning',
            position:'bottom',
            message:'Ingrese un codigo'
          })
      }
    }

    function registrar(){
      this.$emit('RegistrarUsuario',user.value)
    }

    return {
      show,
      user,
      repitPassword,
      cod,
      isPwd: ref(true),
      isRpwd: ref(true),
      enviar,
      registrar
    }
  }
})
</script>
