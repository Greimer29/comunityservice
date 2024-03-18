<template>
    <div class="flex flex-center q-mt-xl " >
      <LoginComponent class="q-pa-none q-ma-none" />
    </div>
</template>

<script>
import LoginComponent from 'src/components/LoginComponent.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name:'LoginLayout',
  components:{
    LoginComponent
  }
})
</script>

<style>
</style>
