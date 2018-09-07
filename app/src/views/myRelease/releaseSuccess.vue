<style lang="less" scoped>
.release_success {
    height: 100vh;
    overflow: hidden;
    position: relative;
    .main {
        overflow-y: scroll;
        position: relative;
        .success {
            height: 137px;
            width: 118px;
            margin-left: -59px;
            position: absolute;
            left: 50%;
            top: 60px;
        }
        .content {
            margin: 197px auto 0 auto;
        }
        .title {
            font-size: 18px;
            color: #000;
        }
        .txt {
            font-size: 14px;
            color: #999;
            margin-top: 5px;
        }
        .button {
            color: #fff;
            font-size: 16px;
            line-height: 16px;
            padding: 12px 0;
            background-color: #ff8201;
            width: 160px;
            margin: 18px auto 0 auto;
            border-radius: 20px;
        }
        .left {
            margin-top: 30px;
        }
        .right {
            background-color: #fff;
            color: #333;
            border: 1px solid #ccc;
        }
        @media screen and (max-height: 480px) {
            .success {
                width: 100px;
                height: 116px;
                margin-left: -50px;
                position: absolute;
                left: 50%;
                top: 35px;
            }
            .content {
                margin: 151px auto 0 auto;
            }
            .title {
                font-size: 16px;
                color: #000;
            }
            .txt {
                font-size: 12px;
                color: #999;
                margin-top: 5px;
            }
        }
    }
}
</style>
<template>
    <div class="release_success">
        <myHeader :param="param"></myHeader>
        <div class="main" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
            <img src="/static/icon/succ.png" class="success">
            <div class="content">
                <div class="title" v-show="type==1">修改成功</div>
                <div class="title" v-show="type==2">发布成功</div>
                <div class="txt" v-show="number==1">
                    <span v-show="type==1">亲爱的用户，您的资源已修改成功</span>
                    <span v-show="type==2">亲爱的用户，您的资源已发布成功</span>
                </div>
                <div class="txt" v-show="number==2">
                    <span v-show="type==1">亲爱的用户，您的求购已修改成功</span>
                    <span v-show="type==2">亲爱的用户，您的求购已发布成功</span>
                </div>
                <div class="button left" @click="atOnceSale">立即上架</div>
                <div class="button right" @click="continueRelease">继续发布</div>
            </div>
        </div>
        <!--<customPopUp v-show="popshow.show" :popshow="popshow" :type="type" :number="number"></customPopUp>-->
    </div>
</template>
<script>
import common from '../../common/common.js'
import httpService from '../../common/httpService.js'
import myHeader from '../../components/header/myHeader'
import customPopUp from '../../components/popUpType/customPopUp'
import filters from '../../filters/filters.js'
import {
    mapGetters
} from 'vuex'
export default {
    data() {
        return {
            param: {
                name: '发布成功',
                goBack: true
            },
            popshow: {
                show: false,
                type: 2
            },
            wrapperHeight: '',
            type: '',
            number: '',
            id: ''
        }
    },
    computed: {
        userInfor() {
            return this.$store.state.user.userInfor;
        },
        myTypes() {
            let ctype = this.$store.state.user.userInfor.ctype;
            let utype = this.$store.state.user.userInfor.utype;
            if (ctype == 0 && utype == 0) {
                return true
            } else if (ctype == 0 && utype == 3) {
                return true
            } else if (ctype == 3 && utype == 0) {
                return true
            } else if (ctype == 3 && utype == 3) {
                return true
            } else {
                return false
            }
        }
    },
    methods: {
        atOnceSale() {
            let _self = this;
                _self.goSale()
        },
        continueRelease() {
            let _self = this;
            //type==1是修改发布，2是正常发布
            //number==1是资源发布，2是求购发布
            common.$emit('inforReleases', '1');//清空发布缓存数据
            if (_self.number == 1) {
                _self.$router.push('/releaseResource/1');
            } else if (_self.number == 2) {
                _self.$router.push('/releaseNeeds/1');
            }
        },
        goSale() {
            let _self = this;
            common.$emit('show-load');
            let url = common.addSID(common.urlCommon + common.apiUrl.most);
            let body = {
                biz_module: 'intentionService',
                biz_method: 'applyOnSell',
                biz_param: {
                    intentionId: _self.id
                }
            };
            body.time = Date.parse(new Date()) + parseInt(common.difTime);
            body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
            httpService.supplyRelease(url, body, function (suc) {
                common.$emit('close-load');
                if (suc.data.code == '1c01') {
                    if (_self.number == 1) {
                        common.$emit("informMyRes", 2);
                        _self.$router.push('/myResource?type=2');
                    } else if (_self.number == 2) {
                        common.$emit('informMyPurchase', 2);
                        _self.$router.push('/myNeeds?type=2');
                    }

                    common.$emit('message', suc.data.msg);
                } else {
                    common.$emit('message', suc.data.msg);
                }
            }, function (err) {
                common.$emit('close-load');
                common.$emit('message', err.data.msg);
            })
        }
    },
    components: {
        myHeader,
        customPopUp
    },
    created() {
        var _self = this;
        _self.type = this.$route.query.type;
        //处理正常发布情况
        if (_self.type == 1) {
            _self.param.name = '修改成功'
        } else {
            _self.param.name = '发布成功'
        }
        _self.number = this.$route.query.number;
        _self.id = this.$route.query.id;
        //处理缓存情况
        common.$on('inforReleaseSuccess', function (obj) {
            _self.popshow.show = false;
            _self.type = obj.type;
            _self.number = obj.number;
            _self.id = obj.id;
            if (_self.type == 1) {
                _self.param.name = '修改成功'
            } else {
                _self.param.name = '发布成功'
            }
        })
        this.$store.dispatch('getUserInfor')
    },
    mounted() {
        this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    },
}
</script>
