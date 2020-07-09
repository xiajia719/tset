<template>
    <div class="main-container" style="padding: 110px 0px 0px 0px !important;">
        <TopAside/>
        <Content/>
    </div>
</template>

<script>
import TopAside from './top-aside'
import Content from './content'
import { mapState } from 'vuex'

export default {
    data() {
        return {
        }
    },
    mounted(){
    },
    beforeDestroy(){
    },
    methods:{
        aaaa(){
            if(this.$route.meta.fatherName == 'AuditManagement'){
                return 'padding: 110px 0px 0px 0px !important;'
            }
        }
    },
    computed: {
        ...mapState(['isSidebarNavCollapse'])
    },
    components: {
        TopAside,
        Content
    }
}
</script>
<style scoped>
</style>
