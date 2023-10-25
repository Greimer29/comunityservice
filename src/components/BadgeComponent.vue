<template>
  <div
    class="bg-grey-10 text-white"
    style="border-radius: 10px;"
  >
      <q-expansion-item
        v-for="(student,index) in students" :key="index"
        class="q-pa-md"
        :label="student.name +' '+ student.lastName"
        icon="perm_identity"
        style="min-width: 400px;"
      >
        <template v-slot:header>
          <q-item-section avatar>
            <q-avatar>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmpxf663mzVTlDMnWiwzlahR6kSJ4Q-2noEvewvxu-TRfP0VCEyrI3j7qNtiT_ybBa&usqp=CAU">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            {{ student.name }}  {{ student.lastName }}
            <q-item-section side>
              {{ student.ci }}
            </q-item-section>
          </q-item-section>

          <q-item-section side>
            <div class="row items-center">
              <q-icon name="star" color="green" size="24px" />
              <q-icon name="star" color="green" size="24px" />
              <q-icon name="star" color="red" size="24px" />
            </div>
          </q-item-section>
        </template>

        <q-card class="bg-grey-9">
          <q-card-section>
            <q-ol>
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
})
</script>
<style>
</style>
