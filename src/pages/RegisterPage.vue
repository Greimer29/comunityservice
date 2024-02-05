<template>
  <div class="flex flex-center full-width">
    <q-toolbar class="q-ma-none">
      <q-toolbar-title class="flex flex-center q-mt-none">
        <div class="text-grey text-italic">Complete el formulario de registro</div>
      </q-toolbar-title>
    </q-toolbar>
    <q-card class="full-width" flat>
      <q-tabs v-model="tab">
        <q-tab name="student" label="Estudiante"/>
        <q-tab name="watchmen" label="Seguridad"/>
        <q-tab name="monitor" label="Monitor"/>
      </q-tabs>
      <q-separator></q-separator>
      <q-tab-panels v-model="tab">
        <q-tab-panel name="student" label="Estudiante">
          <StudentForm />
        </q-tab-panel>

        <q-tab-panel name="watchmen" label="Seguridad">
          <WatchmenForm/>
        </q-tab-panel>

        <q-tab-panel name="monitor" label="Monitor">
          <MonitorForm/>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
import {api} from 'boot/axios'
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import StudentForm from 'src/components/singupforms/StudentForm.vue'
import MonitorForm from 'src/components/singupforms/MonitorForm.vue'
import WatchmenForm from 'src/components/singupforms/WatchmenForm.vue';

export default defineComponent({
  name:'RegisterPage',
  components:{
    StudentForm,
    MonitorForm,
    WatchmenForm
  },
    setup(){

    return{
      tab:ref('student')
    }
  }
})
</script>
