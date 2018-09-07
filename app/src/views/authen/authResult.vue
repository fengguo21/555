<style lang="less" scoped>
input[type="text"],
input[type="submit"],
input[type="reset"],
select,
textarea {
    -webkit-appearance: none;
    border-radius: 0;
}

input {
    border: none;
}

.auth_result {
    width: 100%;
    @media screen {
        .top {
            padding: 55px 0 25px 0;
            .top_img {
                width: 60px;
                margin-bottom: 25px;
            }
            .word {
                font-size: 16px;
                color: #666;
            }
            .word_top {
                margin-top: 12px;
            }
            .no_top {
                margin-bottom: 35px;
            }
            .green {
                color: green;
                margin-bottom: 35px;
            }
            .red {
                color: #E64A4A;
            }
        }
        @media (max-height:568px) {
            .top {
                padding: 20px 0 15px 0;
                .top_img {
                    width: 60px;
                    margin-bottom: 15px;
                }
                .word {
                    font-size: 16px;
                    color: #666;
                }
                .word_top {
                    margin-top: 12px;
                }
                .no_top {
                    margin-bottom: 15px;
                }
                .green {
                    color: green;
                    margin-bottom: 20px;
                }
                .red {
                    color: #E64A4A;
                }
            }
        }
        @media (max-height:480px) {
            .top {
                padding: 20px 0 15px 0;
                .top_img {
                    width: 40px;
                    margin-bottom: 15px;
                }
                .word {
                    font-size: 14px;
                    color: #666;
                }
                .word_top {
                    margin-top: 12px;
                }
                .no_top {
                    margin-bottom: 15px;
                }
                .green {
                    color: green;
                    margin-bottom: 20px;
                }
                .red {
                    color: #E64A4A;
                }
            }
        }
    }
    .main {
        position: relative;
        .footers {
            position: absolute;
            bottom: 15px;
            font-size: 13px;
            color: #939Ebb;
            width: 100%;
        }
        .again {
            height: 50px;
            background-color: #ff8201;
            color: #fff;
            font-size: 17px;
            line-height: 50px;
            width: 90%;
            margin: 0 auto;
            border-radius: 25px;
            margin-bottom: 20px;
        }
    }
    .box {
        margin-bottom: 25px;
    }
}
</style>
<template>
    <div class="auth_result">
        <myHeader :param="head" v-show="!my_param.show"></myHeader>
        <div class="page-loadmore-wrapper main" ref="wrapper" :style="{ height: wrapperHeight + 'px' }" v-show="!my_param.show">
            <div class="box">
                <div class="top" v-show="authenType == 1">
                    <img src="/static/icon/wait-auth.png" class="top_img">
                    <div class="word">您的
                        <span v-show="type == 0">实名</span>
                        <span v-show="type == 1">企业</span>认证正在审核中</div>
                    <div class="word word_top">请耐心等待...</div>
                </div>
                <div class="top" v-show="authenType == 2">
                    <img src="/static/icon/pass-auth.png" class="top_img no_top">
                    <div class="word green">恭喜您，您的认证审核已经通过啦！</div>
                </div>
                <div class="top" v-show="authenType == 3">
                    <img src="/static/icon/un-pass-auth.png" class="top_img">
                    <div class="word red">您的认证未通过，请核对您的信息</div>
                    <div class="word word_top red">进行再次认证</div>
                </div>
                <personPhoto :type="type" :myType="myType" v-on:allPhoto="allPhoto"></personPhoto>
            </div>
            <div class="again" @click="again" v-show="authenType == 3">
                再次认证
            </div>
            <div class="footers">
                药材买卖网保障您的信息安全
            </div>
        </div>
        <popUpBigImg :param="my_param" v-show="my_param.show"></popUpBigImg>
    </div>
</template>
<script>
import common from '../../common/common.js'
import httpService from '../../common/httpService.js'
import myHeader from '../../components/header/myHeader'
import personPhoto from '../../components/authen/personPhoto'
import popUpBigImg from '../../components/tools/popUpBigImg'
import validation from '../../validation/validation.js'
import filters from '../../filters/filters.js'
import {
    mapGetters
} from 'vuex'
export default {
    data() {
        return {
            head: {
                name: '认证中',
                status:'认证中'
            },
            authenType: '',
            list: [],
            type: '',
            myType: '',
            my_param: {
                url: '',
                show: false,
                whole_height: ''
            },
        }
    },
    components: {
        myHeader,
        personPhoto,
        popUpBigImg
    },
    computed: {
        userInfor() {
            return this.$store.state.user.userInfor;
        },
        photo() {
            return this.$store.state.authen.photoList;
        }
    },
    methods: {
        getHttp() {
            let _self = this;
            common.$emit('show-load');
            let url = common.urlCommon + common.apiUrl.most;
            let body = {
                biz_module: 'userService',
                biz_method: 'queryUserAuthenImage',
                biz_param: {
                    type: _self.type
                }
            }
            if (common.KEY) {
                url = common.addSID(common.urlCommon + common.apiUrl.most);
                body.version = 1;
                body.time = Date.parse(new Date()) + parseInt(common.difTime);
                body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
            }
            httpService.myAttention(url, body, function (suc) {
                common.$emit('close-load');
                if (suc.data.code == '1c01') {
                    _self.authenType = suc.data.biz_result.authenType;
                    _self.$store.dispatch('getPhoto', suc.data.biz_result.list)
                    _self.headName(_self.authenType);
                }
            }, function (err) {
                common.$emit('close-load');
                common.$emit('message', err.data.msg);
            })
        },
        headName(index) {
            let _self = this;
            switch (index) {
                case 1:
                    _self.head.name = '认证中';
                    break;
                case 2:
                    _self.head.name = '认证通过';
                    break;
                case 3:
                    _self.head.name = '认证未通过';
                    break;
            }
        },
        jump() {
            let _self = this;
            _self.$router.push('/authPhoto')
        },
        again() {
            let _self = this;
            //个人认证
            if (_self.type == 0) _self.$router.push('/personalStep1');
            //企业认证
            if (_self.type == 1) {
                common.$emit('toCompanyAuth', 1)//去判断是不是药厂和饮片厂
                _self.$router.push('/companyAuth');
            }
        },
        allPhoto() {
            //console.log(this.photo)
            let _self = this;
            let arr = [];
            for(var i=0;i<_self.photo.length;i++){
                arr.push(_self.photo[i].path)
            }
            this.my_param.url = arr;
            this.my_param.show = !this.my_param.show;
            this.my_param.whole_height = document.documentElement.clientHeight;
        }
    },
    created() {
        let _self = this;
        common.$on("toAuthResult", function (item) {
            console.log(item)
            _self.type = item;
            _self.getHttp();
            _self.$store.dispatch('getUserInfor');
        })
        _self.type = this.$route.query.authen;
        _self.getHttp();
        _self.$store.dispatch('getUserInfor');
    },
    mounted() {
        this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    }
}
</script>
