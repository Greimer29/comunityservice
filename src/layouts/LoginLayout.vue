<template>
  <div class="flex flex-center q-gutter-md q-mt-xl">
    <LoginComponent/>
  </div>
</template>

<script>
import LoginComponent from 'src/components/LoginComponent.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name:'LoginLayout',
  components:{
    LoginComponent
  },
  setup(){
    return{
    }
  }
})
</script>

<style>
</style>
