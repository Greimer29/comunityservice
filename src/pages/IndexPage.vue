<template>
  <q-page class="flex flex-center" >
      <BadgeComponent :students="tipos" />
  </q-page>
</template>

<script>
import { api } from 'src/boot/axios';
import BadgeComponent from 'src/components/BadgeComponent.vue';
import { defineComponent,ref, onMounted } from 'vue'

export default defineComponent({
  name: 'IndexPage',
  components:{
    BadgeComponent
  },
  setup(){
    const tipos = ref([])

    const getUsers = () => {
      api.get('users')
        .then(res => {
          tipos.value = res.data
          tipos.find(val => {
            val.id = 2
          })
        })
    }

    onMounted(()=>{
      getUsers()
    })

    return{
      tipos
    }
  }
})
</script>
<style>
</style>
