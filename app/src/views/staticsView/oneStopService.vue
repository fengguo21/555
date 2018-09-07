<template>
    <div class="one_stop">
        <div class="box">
            <myBanner :param="param"></myBanner>
            <div class="images" v-for="todo in arr">
                <img :src="todo.url">
            </div>
        </div>
    </div>
</template>
<script>
import common from '../../common/common.js'
import myBanner from '../../components/tools/myBanner'
export default {
    data() {
            return {
                my_header: {
                    name: '详情',
                },
                param: {
                    title: '简单真实交易，一站式服务',
                    time: '2017-4-17 09:20'
                },
                arr: [{
                    url: '/static/icons/1-one-stop.png'
                }, {
                    url: '/static/icons/2-one-stop.png'
                }, {
                    url: '/static/icons/3-one-stop.png'
                }, {
                    url: '/static/icons/4-one-stop.png'
                }, {
                    url: '/static/icons/5-one-stop.png'
                }, {
                    url: '/static/icons/6-one-stop.png'
                }, {
                    url: '/static/icons/7-one-stop.png'
                }, {
                    url: '/static/icons/8-one-stop.png'
                }, {
                    url: '/static/icons/9-one-stop.png'
                }]
            }
        },
        components: {
            myBanner
        },
        methods: {

        },
        created() {

        },
        mounted() {
            // this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top ;
        }
}
</script>
<style scoped>
.one_stop {
    width: 100%;
}

.one_stop .box {
    padding: 0 15px;
    width: 100%;
}

.one_stop .box .images {
    width: 100%;
    margin-top: 10px;
}

.one_stop .box .images img {
    width:100%;
}
</style>
