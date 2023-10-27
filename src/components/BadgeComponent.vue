<template>
  <div
    class="bg-grey-10 text-white"
    style="border-radius: 10px;"
  >
      <q-expansion-item
        v-for="(student,index) in students" :key="index"
        class="q-pa-md"
        :label="student.name +' '+ student.lastName"
        style="min-width: 400px;"
      >
        <template v-slot:header>
          <q-item-section avatar>
            <q-avatar>
              <q-img :src="student.image"/>
            </q-avatar>
          </q-item-section>

          <q-item-section>
            {{ student.name }}  {{ student.lastName }}
            <q-item-section side>
              {{ student.ci }}
            </q-item-section>
          </q-item-section>

          <q-item-section side>
            <q-avatar v-show="student.state != false " class="row items-center">
              <img src="public\icons\5aa78e387603fc558cffbf1d.png" alt="correcto/incorrecto">
            </q-avatar>
            <q-avatar v-show="student.state == false" class="row items-center">
              <img src="public\icons\images.jpg" alt="correcto/incorrecto">
            </q-avatar>
          </q-item-section>
        </template>

        <q-card class="bg-grey-9">
          <q-card-section>
            <q-ol>
            <p>Descripcion</p>
              <li v-for="(descripcion,index) in student.descripcion" :key="index"> {{ student.descripcion[index]}}</li>
            </q-ol>
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
  }
}
})
</script>
<style>
.q-icon{
  display: none;
}
</style>
