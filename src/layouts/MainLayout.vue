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
          <q-toolbar class="q-pa-sm">
            <div>
              <div class="flex flex-center q-gutter-xs">
              <div>
                <q-btn round color="white">
                  <q-avatar size="50px">
                    <img :src="`https://homeplus.iunav.edu.ve/avatar/${userAvatar}`" />
                  </q-avatar>
                </q-btn>
              </div>
              <div>
                <div class="q-mb-none q-mr-md q-mt-xs text-bold" style="font-size: medium;">{{ dataUser.user.nombre }} {{ dataUser.user.apellido }}</div>
                <div>{{ dataUser.user.cedula }}</div>
              </div>
            </div>
              <q-menu class="q-mt-xl">
              <q-list style="min-width: 120px">
                <q-item clickable v-close-popup>
                  <q-item-section>Ajustes</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable v-close-popup>
                  <q-item-section @click="goTo(dataUser.user.id)">Cuenta</q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section @click="exit"> Salir </q-item-section>
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
    v-show="dataUser.user.type == '4'"
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
    const userAvatar = ref(dataUser.user.foto_url);
    const router = useRouter()
    console.log(dataUser)

    const goTo = (id) => {
      router.push(`/user/count/${id}`)
    }

    const exit = ()=>{
      router.replace('/')
      $q.localStorage.remove('userData')
    }

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      dataUser,
      userAvatar,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      exit,
      goTo
    }
  }
})
</script>
<style>
</style>
