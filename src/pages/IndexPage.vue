<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    >
      <LoginComponent/>
  </q-page>
</template>

<script>
import LoginComponent from 'src/components/LoginComponent.vue';
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage',
  components:{
    LoginComponent
  }
})
</script>
<style>
</style>
