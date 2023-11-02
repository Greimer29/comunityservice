<template>
  <div class="q-pa-xl text-center bg-blue">
    <div>
      merito
      demerito
      Tmerito
    </div>
  </div>
    <div
      class="q-pa-md text-center bg-grey-4"
      style="margin: auto; width: 98%;"
      rounded
    >
      <history-component :permiso="permisos"/>
    </div>
</template>

<script>
import HistoryComponent from 'components/HistoryComponent.vue';
import { defineComponent, ref } from "vue";

export default defineComponent({
    name:'StudentsPage',
    components:{
        HistoryComponent
    },
    setup(){
      const date = Date()
      const permisos = ref([
        {
          hsalida:'10:20am',
          hllegada:'12:20pm',
          fecha:'1/11/2023',
          status:true,
        },
        {
          hsalida:'12:20pm',
          hllegada:'12:20pm',
          fecha:'1/11/2023',
          status:true,
        },
        {
          hsalida:'12:20pm',
          hllegada:'12:20pm',
          fecha:'1/11/2023',
          status:false,
        }
      ])

      return{
        permisos,
        date
      }
    }
})
</script>
