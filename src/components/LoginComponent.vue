<template>
  <form class="q-gutter-md" style="
      padding: 15px;
      text-align: center;
      min-width: 75%;
      height: 80%;
      background-image: linear-gradient(#dbd7d777, #55535377);
      border-radius: 30px;
    ">
    <div>
      <img alt="Quasar logo" src="homeplus.png" style="max-width: 150px; max-height: 150px" />
    </div>
    <div class="q-gutter-md" style="margin: 30px; padding: 0px; max-width: 300px; text-align: center">
      <q-input v-model="username" type="email" filled label="Email" />
      <q-input v-model="pass" filled :type="isPwd ? 'password' : 'text'" label="Contraseña">
        <template v-slot:append>
          <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
        </template>
      </q-input>
    </div>

    <div class="flex flex-center q-pa-md" style="justify-content: space-around; margin: 5px">
      <q-checkbox label="Recuerdame" v-model="remem" />
      <p>
        <router-link to="user/forget" color="white">Has olvidado tu <br />
          contrasena</router-link>
      </p>
    </div>
    <q-btn style="width: 50%" label="Ingresar" color="grey-9" @click="verificar()" />
    <div class="flex flex-center q-gutter-md">
      <p>¿No tienes cuenta?</p>
      <p><router-link to="register" color="white">Registrate</router-link></p>
    </div>
  </form>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { api } from "boot/axios";
import { PushNotifications } from "@capacitor/push-notifications";
import { FCM } from "@capacitor-community/fcm";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

export default defineComponent({
  name: "LoginComponent",
  components: {},
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const username = ref("");
    const pass = ref("");

    const addListeners = async () => {
      await PushNotifications.addListener('registration', token => {
        console.info('Registration token: ', token.value);
        $q.notify({
          message:`REgistration Token ${token.value}`
        })
      });
      alert(res)
        $q.notify({
          message:`Esta porqueria no funciona ${res}`
        })

      await PushNotifications.addListener('registrationError', err => {
        console.error('Registration error: ', err.error);
        $q.notify({
          message:`error registration ${err.error}`
        })
      });

      await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
        console.log('Push notification action performed', notification.actionId, notification.inputValue);
      });
    }

    const registerNotifications = async () => {
      let permStatus = await PushNotifications.checkPermissions();

      if (permStatus.receive === 'prompt') {
        permStatus = await PushNotifications.requestPermissions();
      }

      if (permStatus.receive !== 'granted') {
        throw new Error('User denied permissions!');
      }

      await PushNotifications.register();
    }

    const getDeliveredNotifications = async () => {
      const notificationList = await PushNotifications.getDeliveredNotifications();
      console.log('delivered notifications', notificationList);
    }

    const verificar = () => {
      if (username.value.trim() && pass.value.trim()) {
        api
          .post("users/register/login", {
            email: username.value,
            password: pass.value,
          })
          .then((res) => {
            if (res.data.user.type == 1) {
              router.replace(`/monitor`);
            } else if (res.data.user.type == 2) {
              router.replace(`/military`);
            } else if (res.data.user.type == 3) {
              router.replace(`/students`);
            } else if (res.data.user.type == 4) {
              router.replace(`/main`);
            }

            $q.localStorage.set("userData", res.data);

            //Inclouding firebase plugin capacitor into the app
              PushNotifications.register()
              FCM.getToken()
              .then(r => {
                alert(`Token is: ${r.token}`)

                api.post(`users/register/device/${res.data.user.id}`, {
                  tokenDevice: r.token,
                })
              })
              .catch(err => {
                alert(`algo salio mal ${err}`)
                $q.notify({
                  message:`err getToken(): ${err}`
                })
              })
          })
          .catch((err) => {
            if (err.code == "ERR_NETWORK") {
              $q.notify({
                color: "negative",
                position: "bottom",
                message: "Eror de conexión",
              });
            } else {
              $q.notify({
                position: "bottom",
                type: "negative",
                message: `Su usuario no ha sido encontrado en nuestra base de datos`,
              });
            }
          });
      } else {
        $q.notify({
          position: "top",
          type: "warning",
          message: "Mi viejo esos campos estan como vacios",
        });
      }
    };

    return {
      remem: ref(false),
      isPwd: ref(true),
      username,
      pass,
      verificar,
    };
  },
});
</script>
<style>
p,
a {
  text-align: center;
  color: black;
}

a:hover {
  color: rgb(122, 122, 192);
}
</style>
