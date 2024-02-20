<template>
  <form
    class="q-gutter-md"
    style="
      padding:15px;
      text-align:center;
      min-width:75%;
      height:80%;
      background-image: linear-gradient(#dbd7d777,#55535377);
      border-radius: 30px;
    ">
      <div>
          <img
              alt="Quasar logo"
              src="homeplus.png"
              style="max-width: 150px; max-height: 150px"
          >
      </div>
      <div class="q-gutter-md" style=" margin:30px; padding:0px; max-width:300px; text-align:center">
          <q-input v-model="username" type="email" filled label="Email"/>
          <q-input v-model="pass" filled :type="isPwd ? 'password' : 'text'" label="Contraseña">
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>      </div>

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
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

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

            if (res.data.user.type == 1) {
              router.replace(`/monitor`)
            }else if (res.data.user.type == 2) {
              router.replace(`/military`)
            }else if (res.data.user.type == 3) {
              router.replace(`/students`)
            }else if (res.data.user.type == 4) {
              router.replace(`/main`)
            }

            $q.localStorage.set("userData",res.data)

            // Your web app's Firebase configuration
            // For Firebase JS SDK v7.20.0 and later, measurementId is optional
            const firebaseConfig = {
              apiKey: "AIzaSyASaQkUftrTTDp_5PfoQvBoH6SFJUlsgsM",
              authDomain: "homeplusnotify-f6088.firebaseapp.com",
              projectId: "homeplusnotify-f6088",
              storageBucket: "homeplusnotify-f6088.appspot.com",
              messagingSenderId: "566040100897",
              appId: "1:566040100897:web:0df17c3c685cd2884c6360",
              measurementId: "G-ZE97SL1PEE"
            };

            // Initialize Firebase
            const app = initializeApp(firebaseConfig);

            // Get registration token. Initially this makes a network call, once retrieved
            // subsequent calls to getToken will return from cache.
            const messaging = getMessaging();
            onMessage(messaging, (payload) => {
              console.log('Message received. ', payload);
              // ...
            });

            getToken(messaging, { vapidKey: 'BCdquCm3NTt7JvX3zxKFkNGiDQ8ijctXSU3BK3Ke9pTuaALdH34BR-kjxBvVh5NcPSk-z8tMXOAXM6VSSitDYE4' })
            .then((currentToken) => {
              if (currentToken) {
                // Send the token to your server and update the UI if necessary
                console.log('token is:', currentToken)
                api.post(`users/register/device/${res.data.user.id}`)
                  .then(res => {
                  })
                // ...
              } else {
                // Show permission request UI
                console.log('No registration token available. Request permission to generate one.');
                // ...
              }
            }).catch((err) => {
              console.log('An error occurred while retrieving token. ', err);
              // ...
            });

        })
       .catch((err)=>{
          if(err.code == "ERR_NETWORK"){
            $q.notify({
              color:'negative',
              position:'bottom',
              message:'Eror de conexión'
            })
          }else{
            $q.notify({
              position:'bottom',
              type: 'negative',
              message: `Su usuario no ha sido encontrado en nuestra base de datos`
            })
          }
          console.log(aja.value)

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
    isPwd: ref(true),
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
