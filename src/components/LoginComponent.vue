<template>
  <form
    class="q-gutter-md"
    style="
      padding:15px;
      text-align:center;
      min-width:75%;
      height:80%;
      background-image: linear-gradient(#f8f4f477,#55535377);
      border-radius: 30px;
    ">
      <div>
          <img
              alt="Quasar logo"
              src="https://cdn.freebiesupply.com/logos/large/2x/marvels-agents-of-shield-logo-png-transparent.png"
              style="max-width: 150px; max-height: 150px"
          >
      </div>
      <div class="q-gutter-md" style=" margin:30px; padding:0px; max-width:300px; text-align:center">
          <q-input v-model="username" filled label="Email"/>
          <q-input v-model="pass" filled label="Contraseña" type="password"/>
      </div>

      <div class="flex flex-center q-pa-md" style="justify-content: space-around; margin:5px">
          <q-checkbox  label="Recuerdame" v-model="remem" />
          <p><router-link to="user/forget" color="white">Has olvidado tu <br/> contrasena</router-link></p>
      </div>
      <q-btn style="width: 50%;" label="Ingresar" color="grey-9" @click="verificar()"/>
      <div class="flex flex-center q-gutter-md">
        <p>¿No tienes cuenta?</p>
        <p><router-link to="register" color="white">Registrate</router-link></p>
      </div>
  </form>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useQuasar} from 'quasar'
import {useRouter} from 'vue-router'
import {api} from 'boot/axios'

export default defineComponent({
name: 'LoginComponent',
components:{
},
setup(){
  const $q = useQuasar()
  const router = useRouter()
  const username = ref('')
  const pass = ref('')

  const verificar = () => {
    if((username.value.trim())&&(pass.value.trim())){
      api.post('users/register/login',{email:username.value,password:pass.value})
        .then((res)=>{
          $q.notify({
              position:'top',
              color:'positive',
              message: 'Bienvenido'
            })

            $q.localStorage.set('info',res.data)
            if (res.data.user.type == 1) {
              router.replace(`/monitor`)
            }else if (res.data.user.type == 2) {
              router.replace(`/students`)
            }else if (res.data.user.type == 3) {
              router.replace(`/military`)
            }else if (res.data.user.type == 4) {
              router.replace(`/main`)
            }
        })
       .catch((err)=>{
          const aja = ref(err)
          console.log(aja.value)
            $q.notify({
              position:'bottom',
              type: 'negative',
              message: `Su usuario no ha sido encontrado en nuestra base de datos`
            })
        })
    }else{
      $q.notify({
        position:'top',
        type: 'warning',
        message: 'Mi viejo esos campos estan como vacios'
      })
    }
  }

  return{
    remem : ref(false),
    username,
    pass,
    verificar
  }
}
})
</script>
<style>
p,a{
  text-align:center;
  color:black
}
a:hover{
  color: rgb(122, 122, 192);
}
</style>
