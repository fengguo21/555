<template>
    <div class="login" v-show="wxShow">
        <myHeader :param="my_header"></myHeader>
        <!-- <div id='login_container'></div> -->
        <!-- <div class="bg_white"> -->
        <div class="box">
            <!-- <mt-loadmore> -->
            <img src="/static/images/logo-login.png" class="my-logo">
            <!-- <myTab :param="myShow"></myTab> -->
            <div class="password">
                <div class="phone">
                    <p class="tel">+86</p>
                    <input type="text" placeholder="请输入手机号" v-model="param.phone">
                </div>
                <div class="pass-name">
                    <input type="text" placeholder="请输入验证码" v-model="param.codes">
                    <p v-bind:class="{ my_code: !buttonDisabled, 'my_code_nor': buttonDisabled }">
                        <input v-on:click="confirmLogin()" :value='codes' type="button" :disabled="buttonDisabled" class="pass_code">
                    </p>
                </div>
            </div>
            <div class="confirm" @click="accredit()">登录</div>
        </div>
    </div>
</template>
<script>
import common from '../../common/common.js'
import myTab from '../../components/tools/tab'
import validation from '../../validation/validation.js'
import httpService from '../../common/httpService.js'
import myHeader from '../../components/header/myHeader'

export default {
    data() {
        return {
            id: '',
            isMy: '',
            wrapperHeight: '',
            my_header: {
                name: '登录',
                router: ''
            },
            myShow: {
                show: true,
                left_name: '密码登录',
                right_name: '短信登录'
            },
            selected: 'identiCode',
            identify_code: '',
            codes: '获取验证码',
            buttonDisabled: false,
            param: {
                phone: '',
                codes: '',
                imageCode: '',
                password: ''
            },
            code: '',
            openId: '',
            wxShow: false
        }
    },
    created() {
        let _self = this;

        let url = window.location.href;
        if (url.indexOf("?code=") !== -1) {
            let behind = url.split('?code=')[1];
            let state = behind.split('&state=')[1];
            this.code = behind.split('&')[0];
            this.getOpenId();
        } else {
            this.wxShow = true;
        }
    },
    components: {
        myTab,
        myHeader
    },
    methods: {
        jump(router) {
            /*common.$emit('inforRegister',1)*/
            this.$router.push(router);
        },
        getOpenId() {
            let _self = this;
            common.$emit('show-load');
            let url = common.urlCommon + common.apiUrl.most;
            let body = {
                biz_module: 'weiXinService',
                biz_method: 'getWeiXinOpenId',
                biz_param: {
                    code: _self.code,
                    appSecret: '',
                    appId: ''
                }
            };
            body.time = Date.parse(new Date()) + parseInt(common.difTime);
            body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
            httpService.addressManage(url, body, function (suc) {
                common.$emit('close-load');
                if (suc.data.code == '1c01') {
                    if (suc.data.biz_result.openid) {
                        _self.openId = suc.data.biz_result.openid;
                        _self.wxLogin();
                    } else {
                        _self.$router.push('/login')
                    }
                } else {
                    common.$emit('message', suc.data.msg);
                }
            }, function (err) {
                common.$emit('close-load');

            })
        },
        accredit() {
            let _self = this;
            let checkArr = [];
            let checkPhone = validation.checkPhone(_self.param.phone);
            checkArr.push(checkPhone);
            for (var i = 0; i < checkArr.length; i++) {
                if (checkArr[i]) {
                    common.$emit('message', checkArr[i]);
                    return;
                }
            }
            common.$emit('show-load');
            let url = common.urlCommon + common.apiUrl.most;
            let body = {
                biz_module: 'userSmsService',
                biz_method: 'openIdBinding',
                biz_param: {
                    mobile: _self.param.phone,
                    code: _self.param.codes,
                    openId: _self.openId
                }
            };
            body.time = Date.parse(new Date()) + parseInt(common.difTime);
            body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
            httpService.addressManage(url, body, function (suc) {
                common.$emit('close-load');
                if (suc.data.code == '1c01') {
                    _self.passWordLogin();
                } else {
                    common.$emit('message', suc.data.msg);
                }
            }, function (err) {
                common.$emit('close-load');

            })
        },
        wxLogin() {
            let _self = this;

            common.$emit('show-load');
            httpService.login(common.urlCommon + '/account/openLogin.do', {
                biz_param: {
                    openId: _self.openId
                }
            }, function (response) {
                common.$emit('close-load');

                if (response.data.code == '1c01') {

                    window.localStorage.KEY = response.data.biz_result.KEY;
                    window.localStorage.SID = response.data.biz_result.SID;
                    common.KEY = window.localStorage.KEY;
                    common.SID = window.localStorage.SID;
                    common.getDate();
                    common.$emit('getInfo', 1);
                    if (common.pageParam.backRouter.split('/')[0] == 'resourceDetail') {
                        if (_self.id) {
                            common.$emit('resourceDetail', _self.id); //点击购买时未登录，登陆成功之后提醒商品那个详情页面刷新
                            common.$emit('setParam', 'skipLogin', true);
                            common.$emit('inforCartPop', 1); //通知购物车弹出
                            _self.$router.replace('resourceDetail/' + _self.id);
                        } else {
                            common.$emit('resourceDetail', common.pageParam.backRouter.split('/')[1]); //没有_self.id的时候
                            common.$emit('setParam', 'skipLogin', true);
                            common.$emit('inforCartPop', 1);
                            _self.$router.replace('resourceDetail/' + common.pageParam.backRouter.split('/')[1]);
                        }
                    } else if (common.pageParam.backRouter == 'lowPriceRes') {
                        _self.$router.replace('cart')
                    } else if (common.pageParam.backRouter == 'message') { //消息返回到下一个动作
                        _self.$router.replace('/message')
                    } else if (common.pageParam.backRouter.split('/')[1] == 'needDetails') {
                        _self.$router.replace(common.pageParam.backRouter);
                        common.$emit("loginToDetails", {
                            id: common.pageParam.backRouter.split('/')[2],
                            type: ''
                        });
                        common.$emit('setParam', 'skipLogin', true);
                    } else {
                        common.$emit('go_home', 1);
                        _self.$router.replace('home');
                    }

                } else if (response.data.code == '0e99') {
                    _self.wxShow = true;

                } else {
                    common.$emit('message', response.data.msg);
                }
            }, function (err) {
                common.$emit('close-load');
                common.$emit('message', err.data.msg);
            })
        },
        passWordLogin() {
            let _self = this;
            common.$emit('show-load');
            httpService.login(common.urlCommon + '/account/openLogin.do', {
                biz_param: {
                    openId: _self.openId
                }
            }, function (response) {
                common.$emit('close-load');

                if (response.data.code == '1c01') {

                    window.localStorage.KEY = response.data.biz_result.KEY;
                    window.localStorage.SID = response.data.biz_result.SID;
                    common.KEY = window.localStorage.KEY;
                    common.SID = window.localStorage.SID;
                    common.getDate();
                    common.$emit('getInfo', 1);
                    if (common.pageParam.backRouter.split('/')[0] == 'resourceDetail') {
                        if (_self.id) {
                            common.$emit('resourceDetail', _self.id); //点击购买时未登录，登陆成功之后提醒商品那个详情页面刷新
                            common.$emit('setParam', 'skipLogin', true);
                            common.$emit('inforCartPop', 1); //通知购物车弹出
                            _self.$router.replace('resourceDetail/' + _self.id);
                        } else {
                            common.$emit('resourceDetail', common.pageParam.backRouter.split('/')[1]); //没有_self.id的时候
                            common.$emit('setParam', 'skipLogin', true);
                            common.$emit('inforCartPop', 1);
                            _self.$router.replace('resourceDetail/' + common.pageParam.backRouter.split('/')[1]);
                        }
                    } else if (common.pageParam.backRouter == 'lowPriceRes') {
                        _self.$router.replace('cart')
                    } else if (common.pageParam.backRouter.split('/')[1] == 'needDetails') {
                        _self.$router.replace(common.pageParam.backRouter);
                        common.$emit("loginToDetails", {
                            id: common.pageParam.backRouter.split('/')[2],
                            type: ''
                        });
                        common.$emit('setParam', 'skipLogin', true);
                    } else {
                        common.$emit('go_home', 1);
                        _self.$router.replace('home');
                    }

                } else {
                    common.$emit('message', response.data.msg);
                }
            }, function (err) {
                common.$emit('close-load');
                common.$emit('message', err.data.msg);
            })
        },
        confirmLogin: function () {
            let _self = this;
            let checkPhone = validation.checkPhone(_self.param.phone);
            if (checkPhone) {
                common.$emit('message', checkPhone);
            } else {
                _self.buttonDisabled = true;
                var wait = 60;
                var time = setInterval(function () {
                    wait--;
                    _self.codes = wait;
                    if (wait == 0) {
                        clearInterval(time);
                        _self.codes = '获取验证码';
                        _self.buttonDisabled = false;
                    }
                }, 1000);

                httpService.register(common.urlCommon + common.apiUrl.most, {
                    biz_module: 'userSmsService',
                    biz_method: 'getBindingCode',
                    biz_param: {
                        mobile: _self.param.phone
                    }
                }, function (response) {
                    common.$emit('message', response.data.msg);
                }, function (err) {
                    common.$emit('message', err.data.msg);
                })
            }

        }

    },
    mounted() {

    }
}
</script>
<style scoped>
.login {
    background: url("/static/images/background-img.png") no-repeat;
    background-size: 100% 100%;
    width: 100%;
    /*height:1000px;*/
    height: 100%;
    position: relative;
}

.page-loadmore-wrapper {
    overflow-x: hidden;
}

.login #login_container {
    position: absolute;
    z-index: 10000;
    background: #fff;
    margin-left: -150px;
    margin-top: -200px;
    left: 50%;
    top: 50%;
}

.login .box {
    height: 100vh;
}

.login .my-logo {
    width: 66.5%;
    margin-top: 10.6%;
    margin-bottom: 10.6%;
}

.login .password div {
    width: 86%;
    margin-left: 7%;
    padding: 0.8rem 0;
    border: 1px solid #313232;
    margin-top: 1.8rem;
    border-radius: 3px;
}

.login .password input {
    outline: none;
    border: none;
    background-color: transparent;
    text-align: left;
    width: 70%;
}

.login .account-number {
    background: url("/static/icons/my-phone.png") no-repeat 1.25rem center;
    background-size: 20px;
}

.login .account-number {
    background: url("/static/icons/my-phone.png") no-repeat 1.25rem center;
    background-size: 15px;
}

.login .pass-word {
    background: url("/static/icons/my-password.png") no-repeat 1.25rem center;
    background-size: 17px;
}

.login #prompt {
    width: 86%;
    padding: 1.5rem;
    border: 0;
    margin: 0 0 2.7rem 7%;
}

.login .prompt .left {
    float: left;
}

.login .prompt .right {
    float: right;
}

.login .password .phone .tel {
    float: left;
    border-right: 1px solid #333333;
    height: 100%;
    padding: 0 1rem;
}

.login .password .pass-name .pass_code {
    width: 80%;
    text-align: center;
    padding-left: 0;
}

.login .password .pass-name .my_code {
    float: right;
    width: 40%;
    border-left: 1px solid #333333;
    color: #ff8201;
}

.login .password .pass-name .my_code_nor {
    float: right;
    width: 40%;
    border-left: 1px solid #333333;
    color: #CECEBF;
    text-align: center;
}

.login .password .pass-name input {
    width: 60%;
    padding-left: 1rem;
}

.login .confirm {
    width: 86%;
    font-size: 1.8rem;
    background: #FA6804;
    padding: 1rem 0;
    color: white;
    border-radius: 3px;
    margin-left: 7%;
    margin-top: 40px;
}
</style>
