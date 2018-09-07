<style lang="less" scoped>
.auditProgress {
    width: 100%;
    .top {
        padding-left: 15px;
        display: flex;
        flex-direction: row;
        height: 50px;
        positon: relative;
        background-color: #fff;
        border-bottom: 1px solid #E6E6E6;
        img {
            height: 16px;
            position: absolute;
            top: 17px;
        }
        .words {
            font-size: 14px;
            line-height: 50px;
            padding-left: 20px;
            color: #7AB156;
        }
    }
    .footer {
        height: 105px;
        width: 100%;
        background-color: #fff;
        img {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
<template>
    <div class="auditProgress">
        <div class="top">
            <div class="prompt_icon">
                <img src="/static/icons/prompt_icon.png">
            </div>
            <div class="words">
                <span>{{words}}</span>已发布成功，请耐心等待
            </div>
        </div>
        <div class="footer">
            <img src="/static/icons/my-progress.png">
        </div>
    </div>
</template>
<script>
import common from '../../common/common.js'
export default {
    data() {
            return {}
        },
        props: {
            words: ''
        },
        methods: {

        },
        created() {

        },
        mounted() {

        },
}
</script>
