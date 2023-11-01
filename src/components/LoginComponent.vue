<template>
  <form class="q-gutter-md" style="padding:15px; text-align:center; color:white ; min-width:400px; min-height:630px; ">
      <div>
          <img
              alt="Quasar logo"
              src="public\favicon.ico"
              style="max-width: 150px; max-height: 150px"
          >
      </div>
      <div class="q-gutter-md" style=" margin:30px; padding:0px; max-width:300px; text-align:center">
          <q-input v-model="user" filled label="Usuario"/>
          <q-input v-model="pass" filled label="Contraseña" type="password"/>
      </div>

      <div class="flex flex-center q-pa-md" style="justify-content: space-around; margin:5px">
          <q-checkbox  label="Recuerdame" v-model="remem" />
          <p style="justify-content: center" to="indexPage2">¿Haz olvidado tu <br/> contraseña?</p>
      </div>
      <q-btn style="width: 50%;" label="Ingresar" color="grey-9" @click="verificar(users)"/>
      <div class="flex flex-center q-gutter-md">
        <p>¿No tienes cuenta?</p><p>Registrate</p>
      </div>
  </form>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useQuasar} from 'quasar'
import {useRouter} from 'vue-router'


export default defineComponent({
name: 'LoginComponent',
props:{
  users:{
    type: Array,
    required:true
  }
},
setup(){
  const $q = useQuasar()
  const router = useRouter()
  const user = ref('')
  const pass = ref('')

  const verificar = (users) => {
    if((user.value.trim())&&(pass.value.trim())){
      console.log(users)
      const found = users.find(val => val.user === user.value && val.password === pass.value)

      if(found){
        router.push('/main')
      }else{
        $q.notify({
          position:'top',
          type: 'negative',
          message: 'Sus credenciales son incorrectos'
        })
      }
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
    user,
    pass,
    verificar
  }
}
})
</script>
<style>
form{
  background-image: linear-gradient(rgba(107, 3, 3, 0.952),rgba(5, 5, 46, 0.815));
  border-radius: 60px;
}
p{
  text-align:center
}
</style>
