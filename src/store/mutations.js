import { cookie } from '@/utils/common'

export default {
    LOGIN_IN(state, token) {
        state.UserToken = token
    },
    LOGIN_OUT(state) {
        localStorage.removeItem('token')
        localStorage.removeItem('account')
        cookie.set('ZYB_TOKEN', '')
        state.UserToken = ''
    },
    toggleNavCollapse(state) {
        state.isSidebarNavCollapse = !state.isSidebarNavCollapse
    },
    setCrumbList(state, list) {
        state.crumbList = list
    },
    SETCUSTOMERID(state, data) {
        state.currentCustomerId = data
    }
}