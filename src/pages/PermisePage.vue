<template>
  <div class="q-pa-md" style="width: 80%;;margin: auto; text-align: center;">
    <TimeComponent/>
    <q-input type="text" label="Lugar"/>
    <q-input type="text" label="Motivo"/>
    <q-btn label="Enviar" class="full-width q-mt-md bg-positive"/>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import TimeComponent from 'components/TimeComponent.vue'

export default defineComponent({
  name:'PermisePage',
  components:{
    TimeComponent
  },
  setup () {
    return {
    }
  }
})
</script>
