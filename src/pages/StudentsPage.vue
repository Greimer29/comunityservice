<template>
    <div
      class="q-py-md q-px-xs bg-grey-12"
      round
    >
      <q-bar dark>
        <div class="col text-center text-weight-bold">Historial de permisos</div>
      </q-bar>
      <div class="q-py-md text-center">
        <q-btn label="Solicitar Permiso" color="positive" to="/students/permise"/>
      </div>
      <history-component :permiso="data" :user="user" />
    </div>
</template>

<script>
import HistoryComponent from 'components/HistoryComponent.vue';
import { defineComponent,onMounted,ref} from "vue";
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { date } from 'quasar';

export default defineComponent({
    name:'StudentsPage',
    components:{
        HistoryComponent
    },
    setup(){
      const $q = useQuasar()
      const dataForPermises = $q.localStorage.getItem('userData')
      const data = ref([])

      const getPermises = () => {
        api.get(`users/students/permises/${dataForPermises.user.id}`)
          .then(res => {
            data.value = res.data
            data.value.forEach(element => {
              element.fecha_salida = date.formatDate(date.addToDate(element.fecha_salida, { days: 1 }),'YYYY-MM-DD')
              element.fecha_llegada = date.formatDate(date.addToDate(element.fecha_llegada, { days: 1 }),'YYYY-MM-DD')
            })
          });
      }

      setInterval(()=>{
        getPermises()
      },2000)

      onMounted(()=>{
        getPermises()
      })

      return{
        data,
        user : ref(dataForPermises.user)
      }
    }
})
</script>
<style>
  .q-banner__actions{
    justify-content: start;
    justify-content: left;
  }
p {
  margin: 0;
  justify-content: left;
  text-align: left;
}
</style>
