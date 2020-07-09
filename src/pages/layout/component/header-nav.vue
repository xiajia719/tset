<template>
    <aside class="aside__top__header">
        <a @click="$router.push({name:'CustomerManagement'})" style='cursor:pointer'>
        <img src="../../../assets/image/logo.png" alt="wb"  style="position:absolute;height:30px;top:15px;left:30px;z-index:10;">
        </a>
        <el-menu
            :default-active="activeIndex"
            class="el-menu-demo" mode="horizontal"
            @select="handleSelect"
            background-color="#304156"
            text-color="#fff"
            active-text-color="rgb(77, 188, 255)"
            v-if="headerData.length"
        >
            <el-menu-item index='/ui-work-hub' @click="goto('/ui-work-hub')">工作台</el-menu-item>
            <el-menu-item :index='item.url' @click="goto(item.url)" v-for="(item,index) in headerData" :key="index">{{item.name}}</el-menu-item>
        </el-menu>
        <div class="aside__top--right">
            <div class="user-msg"  @click="goto('/ui-work-hub')">
                <span style="display:inline-block;height:20px;width:20px;border-radius:50%;">{{accountData.name.substring(0, 1)}}</span>
                <!-- <img class="user-img" :src="avatar" alt=""> -->
                {{accountData.username}}
            </div>
            <div class="quit-system" @click="loginOut">
                <span class="iconfont icon-quit"></span>
            </div>
        </div>
    </aside>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
export default {
    inject:['reload'],
    data() {
        return {
            activeIndex: '/ui-crm-hub',
            accountData: '',
            headerData:[]
        }
    },
    created() {
        if (window.$ZYB) {
            window.$ZYB(axios).then((res) => {
                this.navList = res
                if (!this.navList.some(item => window.location.href.match(item.url))) {
                    if (process.env.NODE_ENV === 'production') {
                        this.$message.warning('没有权限访问该网址')
                        window.location.href = '/ui-work-hub'
                    }
                }
            })
        }
        if (this.account.username && this.account.username) {
            this.accountData = this.account
        } else if (localStorage.getItem('account')) {
            this.accountData = JSON.parse(localStorage.getItem('account'))
            this.$store.commit('permission/SET_ACCOUNT', this.accountData)
        } else {
            this.loginOut()
        }
        window.$ZYB(axios).then(res => {
            this.headerData = res
        })
        // this.avatar = this.accountData.name.substring(0, 1)
        // this.username = this.accountData.username
    },
    computed: {
        ...mapState('permission', ['account'])
    },
    methods: {
        handleSelect() {

        },
        loginOut() {
            localStorage.removeItem('currentModule')
            if(window.$ZYB_logOut){
                window.$ZYB_logOut(axios,this.accountData.id)
            }else{
                this.$store.commit('LOGIN_OUT')
                //防止切换角色时addRoutes重复添加路由导致出现警告
                window.location.href = '/ui-work-hub'
            }
        },
        goto(url){
            window.location.href = url
        }
    }
}
</script>

<style lang="scss" scoped>
.aside__top__header {
    border-bottom: 1px solid #e5e5e5;
    height: 60px;
    line-height: 60px;
    position: fixed;
    left:0;
    top: 0;
    right: 0;
    background: #304156;
    z-index: 1000;
    transition: left 0.25s;
    .el-menu-demo{
        padding-left: 200px;
    }
    .toggleNavCollapse {
        display: inline-block;
        margin-left: 8px;
        padding: 0 10px;
        font-size: 26px;
        vertical-align: middle;
        color: #333;
        cursor: pointer;
        transition: all 0.5s;
        &.active {
            transform: rotate(90deg);
        }
    }

    .aside__top--right {
        position: absolute;
        right: 10px;
        top: -1px;
        bottom: 0px;
        > div {
            position: relative;
            display: inline-block;
            text-align: center;
            vertical-align: middle;
            margin-left: 10px;
            padding: 0 15px;
            cursor: pointer;
            &:hover::after {
                transform-origin: 0 0;
                transform: scaleX(1);
            }
            &:first-child:before {
                border: none;
            }
            &::after {
                content: '';
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                height: 2px;
                background: #ef4747;
                transform: scaleX(0);
                transform-origin: right 0;
                transition: transform 0.5s;
            }
            &::before {
                content: '';
                position: absolute;
                height: 20px;
                top: 50%;
                left: -8px;
                margin-top: -10px;
                border-left: 1px solid #ccc;
            }
            &.email {
                i {
                    position: absolute;
                    left: 18px;
                    top: -12px;
                    border-radius: 20px;
                    background: red;
                    color: #fff;
                    text-align: center;
                    font-size: 12px;
                    line-height: 1.5;
                    min-width: 20px;
                    min-height: 20px;
                }
            }
            &.user-msg {
                display:inline-block;
                height: 100%;
                color: #758eb5;
                padding: 0 4px;
                margin-right: 10px;
            }
            .iconfont {
                position: relative;
                font-size: 24px;
                color: #758eb5;
            }
        }
    }
}
.breadcrumb-enter,
.breadcrumb-leave-active {
    opacity: 0;
    transform: translateX(20px);
}

.breadcrumb-enter-active,
.breadcrumb-leave-active {
    transition: all 0.6s;
}

.breadcrumb-leave-active {
    position: absolute;
}
</style>