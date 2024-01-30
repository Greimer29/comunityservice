<template>
  <div class="q-pa-md">
    <q-form  class="q-gutter-md q-mb-md text-center" >
      <q-file type="file" filled v-model="selectedFile" label="Seleccionar imagen de usuario">
        <template v-slot:prepend>
          <q-icon name="attachment" />
        </template>
      </q-file>
      <q-input filled  v-model="user.name" label="Nombre" />
      <q-input filled v-model="user.lastName" label="Apellido" />
      <q-input filled v-model="user.age" type="number" label="Edad" />
      <q-input filled v-model="user.ci" type="number" label="Cedula" />
      <q-select filled v-model="user.carrer" :options="carrerOp" label="Carrera" />
      <q-select filled v-model="user.semester" :options="semesterOp" label="Semestre" />
      <q-input filled v-model="user.phone" type="number" label="Telefono" />
      <q-input filled v-model="user.nroRoom" type="number" label="Nro de Habitacion" />
      <q-input filled v-model="user.codKey" label="Codigo de Llave" />
      <q-input filled v-model="user.username" label="Nombre de Usuario" />
      <q-input v-model="user.password" filled :type="isPwd ? 'password' : 'text'" label="Contraseña">
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <q-input v-model="aja" filled :type="isRpwd ? 'password' : 'text'" label="RepetirContraseña">
        <template v-slot:append>
          <q-icon
            :name="isRpwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isRpwd = !isRpwd"
          />
        </template>
      </q-input>
      <q-input filled v-model="user.email" type="email" label="correo electronico" />
      <q-btn  label="REGISTRAR" color="positive" @click="registrar(user)"/>
    </q-form>
  </div>
</template>
<script>
import { defineComponent,ref } from 'vue';
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { useRouter } from 'vue-router';

export default defineComponent({
  name:'StudentForm',
  setup(){
    const router = useRouter()
    const $q = useQuasar()
    const aja = ref('')
    const selectedFile = ref();
    const carrerOp = ['Informática',"Administración de Empresas","Administración de Personal","Preescolar","Teología"]
    const semesterOp = ['1ero',"2do","3ero","4to","5to","6to","7mo","8vo","9no"]
    const user = ref({
      name:'',
      lastName:'',
      age:'',
      ci:'',
      carrer:'',
      semester:'',
      phone:'',
      password:'',
      email:'',
      codKey:'',
      nroRoom:'',
      type:3
    })

    async function registrar(){
      if (
        user.value.name.trim() &&
        user.value.lastName.trim() &&
        user.value.age.trim() &&
        user.value.ci.trim() &&
        user.value.carrer.trim() &&
        user.value.semester.trim() &&
        user.value.phone.trim() &&
        user.value.nroRoom.trim() &&
        user.value.codKey.trim() &&
        user.value.username.trim() &&
        user.value.password.trim() &&
        user.value.email.trim() &&
        aja.value.trim()
        ){
          if (user.value.password != aja.value) {
            $q.notify({
              message: `campo ${aja.value} no coincide con la contrasena`,
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
                  .post(`users/upload/image/${res.data.newUser.id}`, formData)
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
                $q.notify({
                  message: 'Lo sentimos ocurrio un problema con el servidor',
                  color:'negative'
                })
              })

            } else {
              $q.notify({
                message: `Algunos campos requeridos estan vacios`,
                color:'warning'
              })
            }
          }
       }else{
        $q.notify({
          icon:'warning',
          message: 'Hay campos vacios que son requeridos',
          color:'warning'
        })
       }
    }
    const registerUser = (usuario) => {

    }

    return {
      selectedFile,
      isPwd: ref(true),
      isRpwd: ref(true),
      user,
      carrerOp,
      aja,
      semesterOp,
      registrar,
    }
  }
})
</script>
