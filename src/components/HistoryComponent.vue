<template>
  <div class="q-pa-md q-gutter-md">
    <q-banner inline-actions rounded class="">
      <template v-slot="header">
        <div>
          <q-image src="public\descarga.jpg" style="height: 140px; max-width: 150px"/>
        </div>
      </template>
      <template v-slot:action>
        <q-btn flat label="Turn ON Wifi" />
        <q-btn flat label="Dismiss" />
      </template>
    </q-banner>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({

})
</script>

<style>
</style>
