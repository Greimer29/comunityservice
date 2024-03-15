const routes = [{
        path: '/',
        component: () =>
            import ('layouts/LoginLayout.vue'),
    },
    { path: '/register', component: () =>
            import ('pages/RegisterPage.vue') },
    {
        path: '/main',
        component: () =>
            import ('layouts/MainLayout.vue'),
        children: [
            { path: '/military', component: () =>
                    import ('pages/IndexPage.vue') },
            { path: '/students', component: () =>
                    import ('pages/StudentsPage.vue') },
            { path: '/students/permise', component: () =>
                    import ('pages/PermisePage.vue') },
            { path: '/monitor', component: () =>
                    import ('pages/MonitorPage.vue') },
            //{path: '/user/count/:id', component: () => import('pages/UserPage.vue')}
        ]
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () =>
            import ('pages/ErrorNotFound.vue')
    }
]

export default routes
