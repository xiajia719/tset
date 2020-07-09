import Vue from 'vue'
import App from '@/App'
import store from '@/store/index'
import router from '@/router/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.scss'

import _ from 'lodash'
import axios from './config/httpConfig'
import * as globalFilter from './filters/filters'
import '@/icons'

import { HappyScroll } from 'vue-happy-scroll'
// 引入css
import 'vue-happy-scroll/docs/happy-scroll.css'

// 解决点击路由报in promise错误
import Router from 'vue-router'
const originalPush = Router.prototype.push
try {
    Router.prototype.push = function push(location) {
        return originalPush.call(this, location)
    }
} catch (error) {
    console.log(error)
}

// 自定义组件名
Vue.component('happy-scroll', HappyScroll)

Vue.prototype.$EventBus = new Vue()
Vue.prototype.$http = axios
Vue.prototype._ = _
for (var key in globalFilter) {
    Vue.filter(key, globalFilter[key])
}

Vue.use(ElementUI, { size: 'small', zIndex: 3000 })

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    // 内存没有usertoken
    if (!store.state.UserToken) {
        if (to.matched.length > 0 && !to.matched.some(record => record.meta.requiresAuth)) {
            next()
        } else {
            if(process.env.NODE_ENV === 'production'){
                window.location.href = '/ui-work-hub'
            }else{
                next({ path: '/login' })
            }
        }
    } else {
        // 内存中有usertoken
        if (!store.state.permission.permissionList) {
            store.dispatch('permission/FETCH_PERMISSION').then(() => {
                next({ path: to.path })
            })
        } else {
            if (to.path !== '/login') {
                if (window.isEdite) {
                    const flag = confirm('系统可能不会保存您所做的更改,确定要退出吗？')
                    if (flag) {
                        next()
                    } else {
                        next(from.fullPath)
                    }
                    return
                }
                next()
            } else {
                next(from.fullPath)
            }
        }
    }
})

router.afterEach((to, from, next) => {
    var routerList = to.matched.filter(item => item.path !== '')
    // 设置面包屑
    store.commit('setCrumbList', routerList)
    store.commit('permission/SET_CURRENT_MENU', to.name)
    // 显示当前路由
    if (to.meta.fatherName) {
        store.commit('permission/SET_CURRENT_MENU', to.meta.fatherName)
    } else {
        store.commit('permission/SET_CURRENT_MENU', to.name)
    }
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})