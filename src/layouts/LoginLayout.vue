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
body{
  background-image: linear-gradient(rgb(235, 33, 33),rgb(85, 9, 9),rgb(4, 4, 41));
  height: 100vh;
}
</style>
