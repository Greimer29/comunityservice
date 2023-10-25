<template>
  <q-page class="flex flex-center">
    <BadgeComponent :students="students" />
  </q-page>
</template>

<script>
import BadgeComponent from 'src/components/BadgeComponent.vue';
import { defineComponent,ref } from 'vue'

export default defineComponent({
  name: 'IndexPage',
  components:{
    BadgeComponent
  },
  setup(){
    const students = ref([
      {name:'Alam',lastName:'Brito',ci:'28086003',descripcion:['informatica','Permiso local','aprobada'],},
      {name:'Elsa',lastName:'Muro',ci:'12652417',descripcion:['informatica','Permiso local','negado'],},
      {name:'Carmelo',lastName:'Lames',ci:'25465123',descripcion:['informatica','Permiso local','aprobada'],}
    ])

    return{
      students
    }
  }
})
</script>
<style>
</style>
