import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/pages/login/login'
import NotFound from '@/pages/errorPage/404'
import Forbidden from '@/pages/errorPage/403'
import Layout from '@/pages/layout/index'
Vue.use(Router)
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(() => {})
}
/* 初始路由 */
const router = new Router({
    routes: [
        {
            path: '/login',
            component: Login
        }
    ]
})
export default router
/* 准备动态添加的路由 */
export const DynamicRoutes = [
    {
        path: '',
        component: Layout,
        name: '',
        redirect: '/CustomerManagement',
        meta: {
            requiresAuth: true,
            name: ''
        },
        children: [
            
        ]
    },
    {
        path: '/403',
        component: Forbidden
    },
    {
        path: '*',
        component: NotFound
    }
]
