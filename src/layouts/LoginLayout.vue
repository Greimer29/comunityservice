<template>
  <div class="flex flex-center q-gutter-md q-mt-xl">
    <LoginComponent :users="users"/>
  </div>
</template>

<script>
import LoginComponent from 'src/components/LoginComponent.vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name:'LoginLayout',
  components:{
    LoginComponent
  },
  setup(){
    const users = ref([
      {user:'Greimer',password:'1234'},
      {user:'Kenyer',password:'1234'},
      {user:'Yelitza',password:'1234'}
    ])
    return{
      users
    }
  }
})
</script>

<style>
</style>
