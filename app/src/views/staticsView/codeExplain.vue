<template>
    <div id="codeExplain" class="codeExplain">
		<myHeader :param="my_header" v-if="show"></myHeader>
        <div>
           <p class='title'>邀请码用不用填？</p>
            <p>如果您没有邀请码，不填写也能成功注册。</p>
            <p class='title'>邀请码是什么：</p>
            <p>邀请码是我们的采购及质检人员的身份标示，在邀请供应商注册时的供应商可填写邀请码，以证明该供应商是某个采购人员邀请注册的。</p>
            <p class='title'>邀请码有什么用：</p>
            <p>方便我们识别哪些供应商是增加注册的，哪些供应商是我们邀请来的。</p>
            <p class='title'>如何获取邀请码：</p>
            <p>目前仅能通过采购人员的邀请来获取验证码。</p>
        </div>
    </div>
</template>
<script>
import common from '../../common/common.js'
import myHeader from '../../components/header/myHeader'
export default {
    data() {
            return {
                wrapperHeight: '',
                show: true,
                my_header: {
                    name: '邀请码说明',
                }
            }
        },
        components: {
            myHeader
        },
        methods: {

        },
        created() {
            let from = this.$route.params.from;
            if (from == 'ios') {
                this.show = false;
            }
        },
        mounted() {
        }
}
</script>
<style scoped>
.codeExplain {}

.codeExplain .bg_white {
    background-color: #fff;
}

.codeExplain p {
    text-indent: 32px;
    text-align: left;
    margin: 10px;
    font-size: 16px;
    white-space: normal;
}

.codeExplain .header {
    font-weight: 600;
    text-indent: 0px;
}

.codeExplain .title {
    text-indent: 28px;
    font-weight: 600;
}
</style>
