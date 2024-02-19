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
            <q-btn
              label="Export"
              color="primary"
              icon-right="archive"
              no-caps
              @click="exportTable"
            />
          </template>
        </q-table>
      </q-tab-panel>

      <q-tab-panel name="students">
        <q-card>
          <div class="q-mb-md">
            <div
              v-show="students.length == 0"
              class="flex flex-center text-bold text-italic"
            >
              <p class="text-grey-7">...No tienes alumnos registrados</p>
            </div>
          </div>

          <BadgeComponent style="border-radius: 5px" :students="students" />
        </q-card>
      </q-tab-panel>

      <q-tab-panel name="soli" class="q-px-xs">
        <div
          v-show="pendigSoli == 0"
          class="flex flex-center text-bold text-italic"
        >
          <p class="text-grey-7">...No tiene solicitudes pendientes</p>
        </div>
        <SoliComponent
          :soliPending="pendigSoli"
          @RecallPermises="getSoliPermises"
        />
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { api } from "src/boot/axios";
import { date } from "quasar";
import exportXlsFile from "export-from-json";
import HistoryComponent from "src/components/HistoryComponent.vue";
import SoliComponent from "src/components/SoliComponent.vue";
import BadgeComponent from "src/components/BadgeComponent.vue";

export default defineComponent({
  name: "MonitorPage",
  components: {
    BadgeComponent,
    HistoryComponent,
    SoliComponent,
  },
  setup() {
    const pendigSoli = ref([]);
    const tableData = ref(["nombre", "apellido"]);
    const students = ref([]);
    const userPermise = ref([]);
    const row = ref([]);

    setInterval(() => {
      getStudents();
      getSoliPermises();
      getHistoryPermises();
    }, 2000);
    onMounted(() => {
      getSoliPermises();
      getHistoryPermises();
    });
    const getStudents = () => {
      api.get("users/students").then((res) => {
        students.value = res.data;
      });
    };

    const getSoliPermises = () => {
      api.get("users/permises/requests").then((res) => {
        pendigSoli.value = res.data;
        pendigSoli.value.forEach((element) => {
          element.fecha_salida = date.formatDate(
            element.fecha_salida,
            "DD-MM-YYYY"
          );
          element.fecha_llegada = date.formatDate(
            element.fecha_llegada,
            "DD-MM-YYYY"
          );
        });
      });
    };

    const getHistoryPermises = () => {
      api.get("users/permises").then((res) => {
        tableData.value = res.data;
        tableData.value.forEach((element) => {
          element.fecha_salida = date.formatDate(
            element.fecha_salida,
            "DD-MM-YYYY"
          );
          element.fecha_llegada = date.formatDate(
            element.fecha_llegada,
            "DD-MM-YYYY"
          );
          element.hora_llegada = `${element.users.nombre} ${element.users.apellido}`;
        });
        row.value = tableData.value;
      });
    };

    const column = [
      { name: "alumName", label: "Estudiante", field: "hora_llegada" },
      { name: "alumFsalida", label: "Fecha de Salida", field: "fecha_salida" },
      {
        name: "alumFLlegada",
        label: "Fecha de Llegada",
        field: "fecha_llegada",
      },
      {
        name: "alumHSalida",
        label: "Hora de Salida",
        field: "hora_salida_firmada",
      },
      {
        name: "alumHLlegada",
        label: "Hora de Llegada",
        field: "hora_llegada_firmada",
      },
      { name: "alumTipoPermiso", label: "tipo de permiso", field: "tipo" },
      { name: "alumUsedPermise", label: "lugar", field: "lugar" },
      { name: "alumEstadoPermiso", label: "Estado", field: "estado" },
      { name: "alumUsedPermise", label: "Usado", field: "usado" },
    ];

    const exportTable = () => {
      tableData.value.forEach((element) => {
        userPermise.value.push({
          Estudiante: `${element.users.nombre} ${element.users.apellido}`,
          "Fecha de salida": element.fecha_salida,
          "Fecha de llegada": element.fecha_llegada,
          "Hora de salida": element.hora_salida_firmada,
          "Hora de llegada": element.hora_llegada_firmada,
          "Tipo de permiso": element.tipo,
          Lugar: element.lugar,
          Estado: element.estado,
          Usado: element.usado,
        });
      });
      const fileName = "Tabla_Permisos";
      const exportType = exportXlsFile.types.xls; //json, css, html, xml, txt
      exportXlsFile({ data: userPermise.value, fileName, exportType });
    };

    return {
      tab: ref("soli"),
      row,
      column,
      students,
      pendigSoli,
      exportTable,
      getSoliPermises,
    };
  },
});
</script>
<style>
.q-banner__actions {
  justify-content: start;
  justify-content: left;
}
p {
  margin: 0;
  justify-content: left;
}
</style>
