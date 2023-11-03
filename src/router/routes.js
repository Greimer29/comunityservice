
const routes = [
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
  },
  {
    path: '/main',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/military', component: () => import('pages/IndexPage.vue') },
      {
        path: '/students',
        component: () => import('pages/StudentsPage.vue'),
        children:[
        ]
      },
      {
        path: '/permise',
        component: () => import('pages/PermisePage.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
