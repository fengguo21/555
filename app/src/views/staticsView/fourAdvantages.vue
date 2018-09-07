<template>
    <div class="four_advantages">
        <div class="box">
            <myBanner :param="param"></myBanner>
            <div class="chinese_map">
                <img src="/static/images/chinese-map.png">
            </div>
            <div class="list">
                <div class="item" v-for="todo in arr">
                    <div class="title">
                        <img :src="todo.title">
                    </div>
                    <div class="content">{{todo.content}}</div>
                </div>
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
                wrapperHeight: '',
                show: true,
                my_header: {
                    name: '详情',
                },
                param: {
                    title: '四大优势，追求共赢',
                    time: '2017-4-14 16:30'
                },
                arr: [{
                    title: '/static/icons/1-advans.png',
                    content: '药材买卖网力图打掉中间商，直接对接买方卖方，减少中间环节，大幅提升行业流转效率'
                }, {
                    title: '/static/icons/2-advans.png',
                    content: '打通国内外药材市场，提供丰富的品类选择权，解决下游采购品种多但单一供应商无法提供的需求'
                }, {
                    title: '/static/icons/3-advans.png',
                    content: '药材买卖网通过产地资源优势，结合第三方质检，严格把控药材质量，建立行业标准，解决品质问题'
                }, {
                    title: '/static/icons/4-advans.png',
                    content: '药材每一层流通均会加价5-10%，药材买卖网直接打通药材上下游，真正让供应商和需求方获利'
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
.four_advantages .chinese_map {
    margin-top: 30px;
    width: 100%;
    height: 258px;
}

.four_advantages .box {
    padding: 0 15px;
}

.four_advantages .chinese_map img {
    width: 100%;
    height: 100%;
}

.four_advantages .list {
    width: 100%;
    padding-bottom: 30px;
}

.four_advantages .list .title {
    width: 75px;
    height: 30px;
    margin: auto;
    margin-top: 20px;
}

.four_advantages .list .title img {
    width: 100%;
    height: 100%;
}

.four_advantages .list .content {
    margin-top: 12px;
    font-size: 15px;
}
</style>
