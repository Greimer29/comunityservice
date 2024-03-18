<template>
  <div
    class="bg-grey-10 text-white"
  >
      <q-expansion-item
        v-for="(student,index) in students" :key="index"
        class="q-pa-md"
        style="min-width: 100%;"
      >
        <template v-slot:header>
          <q-item-section avatar>
            <q-avatar>
              <q-img :src="`https://homeplus.iunav.edu.ve/avatar/${student.foto_url}`" style="width: 50px;width: 60px;"/>
            </q-avatar>
          </q-item-section>

          <q-item-section>
            {{ student.nombre }}  {{ student.apellido }}
            <q-item-section side>
              {{ student.cedula }}<br>
              {{ student.edad }} años
            </q-item-section>
          </q-item-section>

          <q-item-section side>
            <div class="flex">
            </div>
          </q-item-section>
        </template>

        <q-card class="bg-grey-9">
          <q-card-section>
            <ul style="list-style: none;">
              <li> Carrera: {{ student.carrera}}</li>
              <li> Semestre: {{ student.semestre}}</li>
              <li> Nro de telefono: {{ student.telefono}}</li>
              <li> Habitacion nro: {{ student.nro_habitacion}}</li>
              <li> Codigo de llave: {{ student.cod_llave}}</li>
            </ul>
          </q-card-section>
          <q-card-section side>
              <q-btn label="eliminar usuario" class="full-width" color="negative" @click="eliminar = true"/>
          </q-card-section>
        </q-card>
      <q-dialog v-model="eliminar" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar icon="person" color="primary" text-color="white" />
            <span class="q-ml-sm">Esta cuenta sera eliminada.</span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancelar" color="primary" v-close-popup />
            <q-btn flat label="Aceptar" color="primary" v-close-popup @click="borrar(student.id)"/>
          </q-card-actions>
        </q-card>
      </q-dialog>
      </q-expansion-item>

  </div>
</template>

<script>
import { api } from 'src/boot/axios'
import { defineComponent, ref } from 'vue'

export default defineComponent({
name: 'LoginComponent',
props:{
  students:{
    type: Array
  }
},
setup(){
  const eliminar = ref(false)

  function borrar(id){
    api.delete(`users/${id}`)
    .then(res=> {
      console.log(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  return{
    customModel : ref('true'),
    eliminar,
    borrar
  }
}
})
</script>
<style>
</style>
