import {createRouter,createWebHistory} from 'vue-router';


const router = createRouter({
    history: createWebHistory(),
    routes:[
        {}
    ]
})

router.beforeEach((to, from, next) => {
    let baseTitle='To Do App';
    document.title = `${baseTitle} | ${to.meta['title']}`
    next();
})

export default router;