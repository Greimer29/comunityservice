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
              <q-img src="public\icons\5aa78e387603fc558cffbf1d.png"/>
            </q-avatar>
          </q-item-section>

          <q-item-section>
            {{ student.nombres }}  {{ student.apellidos }}
            <q-item-section side>
              {{ student.cedula }}
            </q-item-section>
          </q-item-section>

          <q-item-section side>
            <q-avatar style="height: 35px;width: 35px;" v-show="student.state != false " class="row items-center">
              <img  src="public\icons\5aa78e387603fc558cffbf1d.png" alt="correcto/incorrecto">
            </q-avatar>
            <q-avatar v-show="student.state == false" class="row items-center">
              <img  src="public\icons\images.jpg" alt="correcto/incorrecto">
            </q-avatar>
          </q-item-section>
        </template>

        <q-card class="bg-grey-9">
          <q-card-section>
            <ul style="list-style: none;">
              <li> carrera: {{ student.carrera}}</li>
              <li> Semestre: {{ student.semestre}}</li>
              <li> nro de telefono: {{ student.telefono}}</li>
              <li> Habitacion nro: {{ student.nro_habitacion}}</li>
              <li>{{ student.type}}</li>
            </ul>
          </q-card-section>
        </q-card>
      </q-expansion-item>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
name: 'LoginComponent',
props:{
  students:{
    type: Array
  }
},
setup(){

  return{
    customModel : ref('true')
  }
}
})
</script>
<style>
.q-icon{
  display: none;
}
</style>
