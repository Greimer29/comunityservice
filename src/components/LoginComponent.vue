<template>
  <q-fomr class="q-gutter-md" style="padding:15px; text-align:center; color:white ; min-width:400px; min-height:630px; ">
      <div>
          <img
              alt="Quasar logo"
              src="public\favicon.ico"
              style="max-width: 150px; max-height: 150px"
          >
      </div>
      <div class="q-gutter-md" style=" margin:30px; padding:0px; max-width:300px; text-align:center">
          <q-input v-model="user" filled label="Usuario"/>
          <q-input v-model="pass" filled label="Contrase;a" type="password"/>
      </div>

      <div class="flex flex-center q-pa-md" style="justify-content: space-around; margin:5px">
          <q-checkbox  label="Recuerdame" v-model="remem" />
          <p style="justify-content: center" sty to="indexPage2">¿Haz olvidado tu <br/> contraseña?</p>
      </div>
      <q-btn label="Ingresar" color="grey-9" @click="ingresar" to="/"/>
      <div class="flex flex-center q-gutter-md">
        <p>¿No tienes cuenta?</p><p>Registrate</p>
      </div>
  </q-fomr>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
name: 'LoginComponent',
setup(){
    const user = ref('')
    const pass = ref('')

    const ingresar = () => {
        alert(`hola ${user.value}`)
    }

    return{
        remem : ref(false),
        user,
        pass,
        ingresar
    }
}
})
</script>
<style>
q-fomr{
  background-image: linear-gradient(rgba(95, 3, 3, 0.952),rgba(5, 5, 46, 0.815));
  border-radius: 60px;
}
p{
  text-align:center
}
</style>
