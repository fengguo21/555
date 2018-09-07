<template>
    <div class="drug_that">
        <!-- <myHeader :param="my_header" v-if="show"></myHeader> -->
        <div class="bg_white">
            <!--   <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
                <mt-loadmore> -->
            <div>
                <p>1.支持银行卡、微信和支付宝提现。</p>
                <p>2.提现客户必须为平台已认证客户。</p>
                <p>3.提现金额与提现时间说明如下：</p>
                <p class="son">3.1.认证客户每周工作日9:00至17:00可进行提现申请，每次申请10元以上。</p>
                <p class="son">3.2.申请提现成功后，我们将会尽快进行审核并支付，预计5-7个工作日到账。</p>
                <p>4.如果您提交的账号有误，提现款项将会退回“药款宝”，请检查后重新申请提现。</p>
                <p>5.外籍人士、特殊账户、实名用户信息错误等问题，请致电客服处理中心。 </p>
                <p class="red">注：如为信用卡充值，我们根据《中国人民银行支付结算办法》规定，原路退回客户账号。</p>
            </div>
            <!--    </mt-loadmore>
            </div> -->
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
                    name: '关于我们',
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
            // this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top ;
        }
}
</script>
<style scoped>
.drug_that {}

.drug_that .bg_white {
    background-color: #fff;
    padding-top: 0px;
    padding-bottom: 10px;
}

.drug_that p {
    text-align: left;
    margin: 10px;
    font-size: 16px;
    white-space: normal;
}

.drug_that .son {
    padding-left: 10px;
}

.drug_that .red {
    color: red;
}
</style>
