<template>
  <q-banner
    class="q-mt-xs q-px-none full-width bg-grey-10 text-white text-left"
    v-for="(permiso, index) in permiso"
    :key="index"
    rounded
  >
    <template v-slot:action >
      <div class="q-pa-xs">
        <q-avatar v-show="permiso.estado == 'pendiente'">
          <q-spinner color="primary" size="2em" :thickness="10" />
        </q-avatar>
        <q-avatar v-show="permiso.estado == 'aprobado'">
          <img
            src="http://99.30.244.113:9000/icons/aprobedicon.png" alt="correcto"
          />
        </q-avatar>
        <q-avatar v-show="permiso.estado == 'negado'">
          <img src="http://99.30.244.113:9000/icons/deniedicon.jpg" alt="incorrecto" />
        </q-avatar>
      </div>
      <div  class="q-px-xs  text-white ">
        <div>{{ user.nombre }} {{ user.apellido }}</div>
        <div>CI: {{ user.cedula }}</div>
        <div>{{ user.edad }} años</div>
      </div>
      <q-separator vertical color="grey"/>
      <div  class="q-px-xs  text-white ">
        <div>Permiso: {{permiso.tipo}}</div>
        <div> {{permiso.fecha_salida}}</div>
        <div>{{permiso.fecha_llegada}}</div>
      </div>
      <q-separator vertical color="grey text-white "/>
      <div class="q-px-xs" style="max-width: 150px;">
        <div>{{ user.telefono }}</div>
        <div>Salida: {{permiso.hora_salida}}</div>
        <div> Llegada: {{permiso.hora_llegada}}</div>
      </div>
      <div class="q-mt-xs" style="border-top: 2px solid grey;margin-left: 61px; min-width: 80%;">
        <div class="flex" style="justify-content: space-between;">
          <div>lugar: {{permiso.lugar}}
          </div>
          <div>
            Estado: {{ permiso.estado }}
          </div>
        </div>
            Motivo: {{permiso.motivo}}
      </div>
    </template>
  </q-banner>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "HistoryComponent",
  props: {
    permiso: {
      type: Array,
      required: true,
    },
    user:{
      type: Object,
      required: true
    }
  },
});
</script>

<style>
p {
  margin: 0;
  justify-content: left;
}

</style>
