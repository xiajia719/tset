<template>
    <div :class="{navCollapsed:isSidebarNavCollapse}">
        <headerNav class="headewwr"/>
        <sidebarNav  class="sidebar" style="top:60px;"/>
        <mainContent/>
    </div>
</template>

<script>
import sidebarNav from './component/sidebar-nav'
import headerNav from './component/header-nav'
import mainContent from './component/main-content/index'
import { mapState } from 'vuex'
export default {
    data() {
        return {}
    },
    computed: {
        ...mapState(['isSidebarNavCollapse'])
    },
    components: {
        headerNav,
        sidebarNav,
        mainContent
    }
}
</script>

<style lang="scss" scoped>
.main-container{
    background: rgba(239,239,244,1);
    // background: #fff;
    overflow:auto
}
</style>
