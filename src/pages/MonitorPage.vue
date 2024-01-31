<template>
  <q-card @changeState="onMounted()">
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          narrow-indicator
        >
          <q-tab name="history" label="historial" />
          <q-tab name="students" label="Estudiantes" />
          <q-tab name="soli" label="solicitudes" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="history">
            <q-table
              title="Historial de permisos"
              :rows="row"
              :columns="column"
              :rows-per-page-options="[0]"
              virtual-scroll
              no-data-label="No se encontraron registros"
              no-results-label="No se encontraron coincidencias"
            >
              <template v-slot:top-right>
                <q-btn label="export" color="primary" icon-right="archive" no-caps @click="exportTable"/>
              </template>
            </q-table>
          </q-tab-panel>

          <q-tab-panel name="students">
            <q-card>
              <div class="q-mb-md">
                <div v-show="students.length == 0" class="flex flex-center text-bold text-italic">
                  <p class="text-grey-7">...No tienes alumnos registrados</p>
                </div>
              </div>

              <BadgeComponent style="border-radius: 5px;" :students="students"  />
            </q-card>
          </q-tab-panel>

          <q-tab-panel name="soli" class="q-px-xs" >
            <div v-show="pendigSoli == 0" class="flex flex-center text-bold text-italic">
              <p  class="text-grey-7">...No tiene solicitudes pendientes</p>
            </div>
            <SoliComponent :soliPending="pendigSoli" />
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
</template>

<script>
import { defineComponent,ref, onMounted } from 'vue'
import { api } from 'src/boot/axios';
import { exportFile, useQuasar , date } from 'quasar';
import HistoryComponent from 'src/components/HistoryComponent.vue';
import SoliComponent from 'src/components/SoliComponent.vue';
import BadgeComponent from 'src/components/BadgeComponent.vue';

function wrapCsvValue (val, formatFn, row) {
  let formatted = formatFn !== void 0
    ? formatFn(val, row)
    : val

  formatted = formatted === void 0 || formatted === null
    ? ''
    : String(formatted)

  formatted = formatted.split('"').join('""')
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`
}

export default defineComponent({
  name: 'MonitorPage',
  components:{
    BadgeComponent,
    HistoryComponent,
    SoliComponent
  },
  setup(){
    const pendigSoli = ref([])
    const tableData = ref([])
    const students = ref([])
    const userPermise = ref([])
    const fSF = ref('')
    const fLF = ref('')

    setInterval(()=>{
      getStudents()
      getSoliPermises()
    },2000)
    onMounted(()=>{
      getSoliPermises()
      getHistoryPermises()
    })
    const getStudents = () => {
      api.get('users/students')
        .then(res => {
          students.value = res.data
          console.log(students.value)
        })
    }
    const getSoliPermises = () => {
      api.get('users/permises/requests')
        .then(res => {
          pendigSoli.value = res.data
          pendigSoli.value.forEach(element => {
            element.fecha_salida = date.formatDate(element.fecha_salida, 'DD-MM-YYYY')
            element.fecha_llegada = date.formatDate(element.fecha_llegada, 'DD-MM-YYYY')
          });
        })
    }
    const getHistoryPermises = () => {
      api.get('users/permises')
        .then(res => {
          tableData.value = res.data
          console.log(tableData.value)
          for (let i = 0; i < tableData.value.length; i++) {
            const {fecha_salida,fecha_llegada,hora_salida_firmada,hora_llegada_firmada,tipo,estado,usado,lugar} = tableData.value[i]
            const {nombre,apellido} = tableData.value[i].users
            fSF.value = date.formatDate(fecha_salida, 'DD-MM-YYYY')
            fLF.value = date.formatDate(fecha_llegada, 'DD-MM-YYYY')

            const newUserPermise = {
              nombre:nombre,
              apellido:apellido,
              fSalida:fSF,
              fLlegada:fLF,
              hSalida:estado=='negado'?'NEGADO' : hora_salida_firmada,
              hLlegada:estado=='negado'?'NEGADO' : hora_llegada_firmada,
              tipo:tipo,
              estado:estado,
              usado:usado,
              lugar:lugar
            }
            userPermise.value.push(newUserPermise)
          }
        })
    }
    const column = [
      {name:'alumName',label:'Estudiante',field:'nombre'},
      {name:'alumLastName',label:'Apellido',field:'apellido'},
      {name:'alumFsalida',label:'Fecha de Salida',field:'fSalida'},
      {name:'alumFLlegada',label:'Fecha de Llegada',field:'fLlegada'},
      {name:'alumHSalida',label:'Hora de Salida',field:'hSalida'},
      {name:'alumHLlegada',label:'Hora de Llegada',field:'hLlegada'},
      {name:'alumTipoPermiso',label:'tipo de permiso',field:'tipo'},
      {name:'alumUsedPermise',label:'lugar',field:'lugar'},
      {name:'alumEstadoPermiso',label:'Estado',field:'estado'},
      {name:'alumUsedPermise',label:'Usado',field:'usado'},

    ]

    const exportTable = () => {
        // naive encoding to csv format
        const content = [column.map(col => wrapCsvValue(col.label))].concat(
          userPermise.value.map(row => column.map(col => wrapCsvValue(
            typeof col.field === 'function'
              ? col.field(row)
              : row[ col.field === void 0 ? col.name : col.field ],
            col.format,
            row
          )).join(','))
        ).join('\r\n')

        const status = exportFile(
          'table-export.csv',
          content,
          'text/csv'
        )

        if (status !== true) {
          $q.notify({
            message: 'Browser denied file download...',
            color: 'negative',
            icon: 'warning'
          })
        }
      }

    return{
      tab: ref('soli'),
      row:userPermise,
      column,
      students,
      pendigSoli,
      exportTable
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
}
</style>
