<template>
    <div class="q-pa-md text-center" style="margin: auto; width: 100%;">
        merito
        demerito
        fecha
        <history-component :permiso="permisos" style="background-color: red;"/>
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
          status:'denegada',
        },
        {
          hsalida:'12:20pm',
          hllegada:'12:20pm',
          fecha:'1/11/2023',
          status:'denegada',
        },
        {
          hsalida:'12:20pm',
          hllegada:'12:20pm',
          fecha:'1/11/2023',
          status:'denegada',
        }
      ])

      return{
        permisos,
        date
      }
    }
})
</script>
