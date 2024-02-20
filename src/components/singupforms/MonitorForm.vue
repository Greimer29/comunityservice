<template>
  <div class="q-gutter-md text-center" v-show="!show">
    <q-input v-model="cod" label="Codigo de Preceptor"/>
    <q-btn label="verificar codigo" color="primary" @click="enviar"/>
  </div>
  <div class="q-pa-md" v-show="show">
    <q-form class="q-gutter-md text-center">
      <q-file type="file" filled v-model="selectedFile" label="Seleccionar imagen de usuario">
        <template v-slot:prepend>
          <q-icon name="attachment" />
        </template>
      </q-file>
      <q-input filled label="Nombre" v-model="user.name"/>
      <q-input filled label="Apellido" v-model="user.lastName"/>
      <q-input v-model="user.email" filled label="Email" type="email" />
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
import { useRouter } from 'vue-router'

export default defineComponent({
  name:'MonitorForm',
  emits:['RegistrarUsuario'],
  setup(){
    const repitPassword = ref('')
    const show = ref(false)
    const selectedFile = ref();
    const cod = ref('')
    const $q = useQuasar()
    const router = useRouter()

    const user = ref({
      name:'',
      lastName:'',
      email:'',
      password:'',
      type:1
    })

    const enviar = () => {
      if(cod.value.trim()){
      api.post('user/validation',{
        cod:cod.value,typeUser:1
      })
      .then(res => {
        const {validation} = res.data
        console.log(validation)
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
        if(err.code == "ERR_NETWORK"){
          $q.notify({
            color:'negative',
            position:'bottom',
            message:'Eror de conexión'
          })
        }
        if(err.response.status == 502){
          $q.notify({
            color:'negative',
            position:'bottom',
            message:'Código inválido'
          })
        }
      })
    }else{
          $q.notify({
            icon:'warning',
            type: 'warning',
            position:'bottom',
            message:'Ingrese un codigo'
          })
    }
    }

    function registrar(){
      if(
        user.value.name.trim() &&
        user.value.lastName.trim() &&
        user.value.email.trim() &&
        user.value.password.trim()
        ){
          if (user.value.password != repitPassword.value) {
            $q.notify({
              message: `campo ${repitPassword.value} no coincide con la contrasena`,
              color:'negative'
            })
          }else{
            if (selectedFile.value != null) {
              const formData = new FormData();
              formData.append("image", selectedFile.value);

              api.post('users/register',{
                user:user.value
              })
              .then(res => {
                console.log(res.data)
                $q.notify({
                  position:'top',
                  message: 'Usuario creado exitosamente',
                  color:'positive'
                })
                api
                  .post(`users/upload/image/${res.data.id}`, formData)
                  .then((res) => {
                    console.log(res.data);
                  })
                  .catch((err) => {
                    console.error(err);
                  });

                router.replace(`/`)
              })
              .catch((err)=>{
                console.log(err)
                if(err.code == "ERR_NETWORK"){
                  $q.notify({
                    color:'negative',
                    position:'bottom',
                    message:'Eror de conexión'
                  })
                }else{
                  $q.notify({
                    color:'negative',
                    position:'bottom',
                    message:'Lo sentimos ocurrio un error con el servidor'
                  })
                }
              })
            } else {
              $q.notify({
                message: `Algunos campos requeridos estan vacios`,
                color:'warning'
              })
            }
          }
        }else {
          $q.notify({
            message: `Algunos campos requeridos estan vacios`,
            color:'warning'
          })
        }
    }

    return {
      selectedFile,
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
