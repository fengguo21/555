<style lang="less" scoped>
.black {
    width: 100%;
    height: 100vh;
    position: absolute;
    z-index: 3000;
    background-color: #000;
    top: 0;
    opacity: 0.6;
}

.pop_custom {
    position: absolute;
    width: 288px;
    margin-left: -144px;
    margin-top: -177px;
    left: 50%;
    z-index: 3001;
    top: 50%;
    border-radius: 14px;
    overflow: hidden;
    .custom_box {
        background-color: #fff;
        .custom {
            width: 288px;
        }
    }

    .tbox {
        background-color: #fff;
        padding-bottom: 20px;
        .title {
            font-size: 18px;
            color: #333;
            line-height: 35px;
        }
        .content {
            padding: 0 17px;
            text-indent: 2em;
            text-align: left;
            font-size: 14px;
            color: #666;
            line-height: 25px;
            span {
                span {
                    color: #ff8201;
                }
            }
            .go_sale{
                span{
                    color:#999999;
                }
            }
        }
        .call {
            width: 70%;
            border: 1px solid #84bf51;
            margin: 14px auto;
            color: #fff;
            font-size: 17px;
            line-height: 16px;
            padding: 10px 0;
            background-color: #84bf51;
            border-radius: 18px;
        }
        .other {
            background-color: #fff;
            color: #84bf51;
        }
    }
}
</style>
<template>
    <div>
        <div class="pop_custom">
            <div class="custom_box">
                <img src="/static/icon/pop-custom.png" alt="" class="custom" v-show='popshow.type == 1'>
                <img src="/static/icon/pop-release-offer.png" alt="" class="custom" v-show='popshow.type == 2'>
            </div>
            <div class="tbox">
                <div class="title">
                    <span v-show='popshow.type == 1'>客服服务</span>
                    <span v-show='popshow.type == 2'>上架认证</span>
                </div>
                <div class="content">
                    <span v-show='userInfor.employee <= 100000 && popshow.type == 1'>您好，您还没有专属客服人员，可拨打客服电话进行咨询哦</span>
                    <span v-show='userInfor.employee > 100000 && popshow.type == 1'>亲爱的用户, 您好, 我是您的专属客服
                        <span>{{customInfor.name}}</span>, 我将全心全意的为您提供满意周到的交易服务！</span>
                    <span v-show='popshow.type == 2' class="go_sale">
                        <span v-show="type==1 && number==1">亲，您修改的资源上架需要认证哦</span>
                        <span v-show="type==2 && number==1">亲，您发布的资源上架需要认证哦</span>
                        <span v-show="type==1 && number==2">亲，您修改的求购上架需要认证哦</span>
                        <span v-show="type==2 && number==2">亲，您发布的求购上架需要认证哦</span>
                    </span>
                </div>
                <div class="call" @click="call" v-show='popshow.type == 1'>拨打客服电话</div>
                <div class="call other" @click="goFeedBack" v-show='popshow.type == 1'>意见反馈</div>
                <div class="call" @click="personAuth" v-show='popshow.type == 2'>个人认证</div>
                <div class="call" @click="companyAuth" v-show='popshow.type == 2'>企业认证</div>
            </div>
    
        </div>
        <div class="black" @click="cancel">
    
        </div>
    </div>
</template>
<script>
import common from '../../common/common.js'
import httpService from '../../common/httpService.js'
export default {
    data() {
        return {
            phone: common.servicePhone
        }
    },
    props: {
        popshow: {

        },
        type:'',
        number:''
    },
    computed: {
        customInfor() {
            return this.$store.state.user.customInfor;
        },
        userInfor() {
            return this.$store.state.user.userInfor;
        },
    },
    methods: {
        call() {
            this.popshow.show = false;
            if (this.userInfor.employee <= 100000) window.location.href = "tel:" + this.phone;
            if (this.userInfor.employee > 100000) window.location.href = "tel:" + this.customInfor.extno;
        },
        goFeedBack() {
            this.popshow.show = false;
            this.$router.push('/feedBack')
        },
        cancel() {
            this.popshow.show = false;
        },
        companyAuth() {
            let _self = this;
            this.popshow.show = false;
            this.$router.push('/companyAuth')
        },
        personAuth() {
            let _self = this;
            this.popshow.show = false;
            this.$router.push('/personalStep1')
        },
        getCustomerPhone() {
            let _self = this;
            this.$http.get(common.urlCommon + common.apiUrl.getDate).then((response) => {
                if (response.data.code == '1c01') {
                    common.servicePhone = response.data.biz_result.serviceMobile;
                    _self.phone = response.data.biz_result.serviceMobile;
                }
            }, (err) => {
                common.$emit('message', err.data.msg);
            });
        },
    },
    watch: {

    },
    mounted() {

    },
    created() {
        if (!common.servicePhone) this.getCustomerPhone();
    }
}
</script>

