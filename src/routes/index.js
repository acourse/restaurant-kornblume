import { createRouter, createWebHistory, RouterView } from 'vue-router'

const routes = [
    {
        path: '',
        name: 'Home',
        component: () => import('../views/Home.vue'),
        meta: {
            title: 'Restaurant Kornblume',
            metaTags: [
                {
                    name: 'description',
                    content: ''
                },
                {
                    property: 'og:description',
                    content: ''
                },
                {
                    property: 'keywords',
                    content: 'Restaurant, Hotel, Biergarten, '
                }
            ]
        }
    },
    {
        path: '/Imprint',
        name: 'Imprint',
        component: () => import('../views/Imprint.vue'),
        meta: {
            title: 'Restaurant Kornblume',
            metaTags: [
                {
                    name: 'description',
                    content: ''
                },
                {
                    property: 'og:description',
                    content: ''
                },
                {
                    property: 'keywords',
                    content: 'Restaurant, Hotel, Biergarten, '
                }
            ]
        }
    },
    {
        path: '/datapolicy',
        name: 'DataPolicy',
        component: () => import('../views/DataPolicy.vue'),
        meta: {
            title: 'Restaurant Kornblume',
            metaTags: [
                {
                    name: 'description',
                    content: ''
                },
                {
                    property: 'og:description',
                    content: ''
                },
                {
                    property: 'keywords',
                    content: 'Restaurant, Hotel, Biergarten, '
                }
            ]
        }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('../views/NotFound.vue'),
        meta: {
            title: 'Restaurant Kornblume',
            metaTags: [
                {
                    name: 'description',
                    content: ''
                },
                {
                    property: 'og:description',
                    content: ''
                },
                {
                    property: 'keywords',
                    content: 'Restaurant, Hotel, Biergarten, '
                }
            ]
        }
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior (to, from, savedPosition) {
        if (to.hash) {
            return {
                el: to.hash,
                behavior: 'smooth',
                top: 75
            }
        } else {
            return { top: 0 }
        }
    }
})

router.beforeEach((to, from, next) => {
    const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
    const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
    const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
    if(nearestWithTitle) {
        document.title = nearestWithTitle.meta.title;
    } else if(previousNearestWithMeta) {
        document.title = previousNearestWithMeta.meta.title;
    }
    Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));
    if(!nearestWithMeta) return next();
    nearestWithMeta.meta.metaTags.map(tagDef => {
        const tag = document.createElement('meta');
        Object.keys(tagDef).forEach(key => {
            tag.setAttribute(key, tagDef[key]);
        });
        tag.setAttribute('data-vue-router-controlled', '');
        return tag;
    })
        .forEach(tag => document.head.appendChild(tag));
    next();
})

export default router
