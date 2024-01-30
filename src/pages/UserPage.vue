<template>
  <q-form action="/" method="post">
    <q-input label="nombre"/>
  </q-form>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup(){
    return {
      nombre : ref('Greimer')
    }
  }
})
</script>
