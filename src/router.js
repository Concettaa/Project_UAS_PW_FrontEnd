import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

function importComponent(path) {
    return () =>
        import (`./components/${path}.vue`);
}

const router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: "/",
            component: importComponent('DashboardLayout'),
            children: [{
                    path: "/dashboard",
                    name: "Dashboard",
                    component: importComponent('Dashboard'),
                },
                {
                    path: '/profile',
                    name: "Profile",
                    component: importComponent('Profile/Profile'),
                },
                {
                    path: '/review',
                    name: "Review",
                    component: importComponent('Review/Review'),
                },
                {
                    path: '/article',
                    name: 'Article',
                    component: importComponent('Article/Article'),
                },
                {
                    path: '/buku',
                    name: 'Book',
                    component: importComponent('Book/Book'),
                },
            ],
        },
        
        {
            path: "/",
            component: importComponent('DashboardAdmin'),
            children: [
                {
                    path: '/profileAdmin',
                    name: "ProfileAdmin",
                    component: importComponent('Profile/ProfileAdmin'),
                },
                {
                    path: '/reviewAdmin',
                    name: "ReviewAdmin",
                    component: importComponent('Review/ReviewAdmin'),
                },
                {
                    path: '/articleAdmin',
                    name: 'ArticleAdmin',
                    component: importComponent('Article/ArticleAdmin'),
                },
                {
                    path: '/bukuAdmin',
                    name: 'BookAdmin',
                    component: importComponent('Book/BookAdmin'),
                },
            ],
        },

        {
            path: '/login',
            name: 'Login',
            meta: { title: 'Login' },
            component: importComponent('Login'),
        },
        {
            path: '/loginAdmin',
            name: 'LoginAdmin',
            meta: { title: 'LoginAdmin' },
            component: importComponent('LoginAdmin'),
        },
        {
            path: "/register",
            name: "Register",
            meta: { title: 'Register'},
            component: importComponent('Register'),
        },
        {
            path: '/welcome',
            name: 'Welcome',
            meta: { title: 'Welcome' },
            component: importComponent('Welcome'),
        },
        {
            path: '*',
            // meta:{
            //     requiresAuth: false
            // },
            redirect: '/welcome',
        },
    ],
});

router.beforeEach((to, from, next) => {
    // localStorage.getItem("token") == null;
    if(localStorage.getItem("token") == null && to.name != 'Welcome'){
        next('Welcome')
        document.to.meta.title = "Welcome"
    }
    document.title = 'Welcome';
    next();
});

export default router;