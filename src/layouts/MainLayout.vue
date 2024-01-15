<template>
  <q-layout view="lHh Lpr lFf" >
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
          v-show="dataUser.user.type == 4"
        />

        <q-toolbar-title style="color:rgba(195, 194, 233, 0.685);">
          Home+
        </q-toolbar-title>

        <div>
          <q-toolbar>
            <div>
              <div class="q-mb-none q-mr-md q-mt-md" style="font-size: medium;">{{ dataUser.user.nombre }} {{ dataUser.user.apellido }}</div>
              <div>{{ dataUser.user.cedula }}</div><q-menu class="q-mt-xl">
              <q-list style="min-width: 120px">
                <q-item clickable v-close-popup>
                  <q-item-section>Ajustes</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable v-close-popup>
                  <q-item-section>Cuenta</q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section>
                    <q-btn flat label="salir" @click="exit"/>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
            </div>
            <!--<q-avatar class="q-ma-xs" size="70px" font-size="52px">
              <img src="https://cdn.quasar.dev/img/avatar.png">

            </q-avatar>-->
          </q-toolbar>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref,onMounted } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

const linksList = [
  {
    title: 'Guardia',
    caption: 'Guardia views',
    icon: 'military',
    link: '/military'
  },
  {
    title: 'Students',
    caption: 'Guardia views',
    icon: 'military',
    link: '/students'
  },
  {
    title: 'Monitor',
    caption: 'Preceptor views',
    icon: 'monitor',
    link: '/monitor'
  }
]

  export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)
    const $q = useQuasar()
    const dataUser = $q.localStorage.getItem('userData')
    const router = useRouter()

    const exit = ()=>{
      router.replace('/')
      $q.localStorage.remove('userData')
    }

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      dataUser,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      exit
    }
  }
})
</script>
<style>
</style>
