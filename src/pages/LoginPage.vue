<template class="bg-aja">
  <q-page class="flex flex-center q-gutter-md">
    <LoginComponent/>
  </q-page>
</template>

<script>
import LoginComponent from 'src/components/LoginComponent.vue';
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'loginPage',
  components:{
    LoginComponent
  }
})
</script>
<style>
</style>
