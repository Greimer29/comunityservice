<template>
  <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          narrow-indicator
        >
          <q-tab name="mails" label="Solicitudes de permiso" />
          <q-tab name="alarms" label="Estudiantes" />
        </q-tabs>
        <q-separator />
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="mails">
            <div class="text-h6">Mails</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="alarms">
            <div class="text-h6">Alarms</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="movies">
            <div class="text-h6">Movies</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
</template>

<script>
import { api } from 'src/boot/axios';
import { defineComponent,ref, onMounted } from 'vue'

export default defineComponent({
  name: 'MonitorPage',
  components:{},
  setup(){

    return{
      tab: ref('mails')
    }
  }
})
</script>
<style>
</style>
