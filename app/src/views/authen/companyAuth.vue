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

.company_auth {
    width: 100%;
    background-color: #F3F3F3;
    position: relative;
    @media screen {
        .title {
            font-size: 14px;
            color: #535353;
            line-height: 14px;
        }
        @media (max-width: 320px) {
            .title {
                font-size: 12px;
                color: #535353;
                line-height: 12px;
            }
        }
    }

    .title_top {
        margin-top: 22px;
    }
    .title_bottom {
        margin-bottom: 12px;
    }
    .main {
        width: 100%;
        .confirm {
            width: 90%;
            background-color: #ff8201;
            color: #fff;
            margin: 30px auto;
            height: 50px;
            border-radius: 25px;
            line-height: 50px;
            font-size: 17px;
        }
    }
    .box {
        padding-left: 20px;
        margin-top: 25px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        .tbox {
            padding: 15px 15px 15px 0;
            width: 50%;
            box-sizing: border-box;
            .inbox {
                border: 1px solid #E6E6E6;
                width: 100%;
                height: 115px;
                border-radius: 10px;
                position: relative;
                .delete {
                    position: absolute;
                    width: 20px;
                    height: 20px;
                    top: -10px;
                    right: -10px;
                    z-index: 20;
                }
            }
            .image {
                width: 100%;
                height: 100%;
                border-radius: 10px;
            }
        }
    }
    .company {
        padding: 13px;
        background-color: #fff;
        width: 90%;
        margin: 20px auto 5px auto;
        border-radius: 3px;
        input {
            width: 100%;
            font-size: 14px;
            color: #000;
        }
    }
    .company_title {
        text-align: left;
        font-size: 12px;
        color: #ff0000;
        padding-left: 5%;
    }
}
</style>
<template>
    <div class="company_auth">
        <myHeader :param="head"></myHeader>
        <myTab :param="myShow"></myTab>
        <div class="page-loadmore-wrapper main" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
            <div class="title title_top title_bottom">
                为了更好地验证企业的真实性给企业提供更便捷的服务
            </div>
            <div class="title">
                请完成以下内容
            </div>
            <div class="company">
                <input type="text" placeholder="请输入您的企业名称" v-model="company">
            </div>
            <div class="company_title">* 企业名称为必填项目</div>
            <div class="box" v-if="myShow.left">
                <div class="tbox" v-for="(todo,index) in leftImgArr">
                    <imageUpLoad :param="todo" v-on:postUrl="getUrl" v-if="!todo.url"></imageUpLoad>
                    <div class="inbox" v-if="todo.url">
                        <img :src="todo.url" class="image">
                        <img src="/static/icons/upload-delete.png" class="delete" @click="deletes(todo,index)">
                    </div>
                </div>
            </div>
            <div class="box" v-if="myShow.right">
                <div class="tbox" v-for="(todo,index) in rightImgArr">
                    <imageUpLoad :param="todo" v-on:postUrl="getUrl" v-if="!todo.url"></imageUpLoad>
                    <div class="inbox" v-if="todo.url">
                        <img :src="todo.url" class="image">
                        <img src="/static/icons/upload-delete.png" class="delete" @click="deletes(todo,index)">
                    </div>
                </div>
            </div>
            <div class="confirm" @click="confirm">
                申请认证
            </div>
        </div>
    </div>
</template>
<script>
import common from '../../common/common.js'
import httpService from '../../common/httpService.js'
import myHeader from '../../components/header/myHeader'
import personPhoto from '../../components/authen/personPhoto'
import myTab from '../../components/tools/tab'
import imageUpLoad from '../../components/authen/imageUpLoad'
import validation from '../../validation/validation.js'
import filters from '../../filters/filters.js'
import {
    mapGetters
} from 'vuex'
export default {
    data() {
        return {
            head: {
                name: '企业认证'
            },
            company: '',
            authenStyle: '2',
            list: [],
            myShow: {
                show: true,
                left: true,
                right: false,
                left_name: '三证合一',
                right_name: '传统三证'
            },
            leftImgArr: [{
                defaults: '/static/icon/txt-1.png',
                title: '三证合一',
                url: '',
                index: 0,
                catagory: 9
            }, {
                defaults: '/static/icon/txt-2.png',
                title: '银行开户许可证',
                catagory: 10,
                index: 1,
                url: '',
            }, {
                defaults: '/static/icon/txt-3.png',
                title: 'GMP资质证书',
                name: true,
                catagory: 11,
                index: 2,
                url: ''
            }, {
                defaults: '/static/icon/txt-4.png',
                title: '生产许可证',
                name: true,
                catagory: 14,
                index: 3,
                url: ''
            }],
            rightImgArr: [{
                defaults: '/static/icon/txt-1.png',
                title: '工商营业执照',
                url: '',
                index: 0,
                catagory: 3
            }, {
                defaults: '/static/icon/txt-2.png',
                title: '组织机构代码证',
                catagory: 4,
                index: 1,
                url: '',
            }, {
                defaults: '/static/icon/txt-3.png',
                title: '税务登记证',
                catagory: 5,
                index: 2,
                url: ''
            }, {
                defaults: '/static/icon/txt-4.png',
                title: '银行开户许可证',
                catagory: 6,
                index: 3,
                url: '',
            }, {
                defaults: '/static/icon/txt-5.png',
                title: 'GMP资质证书',
                name: true,
                catagory: 7,
                index: 4,
                url: ''
            }, {
                defaults: '/static/icon/txt-6.png',
                title: '生产许可证',
                name: true,
                catagory: 13,
                index: 5,
                url: ''
            }],
            leftArr: [{
                catagory: 9,
                path: ''
            }, {
                catagory: 10,
                path: ''
            }, {
                catagory: 11,
                path: ''
            }, {
                catagory: 14,
                path: ''
            }],
            rightArr: [{
                catagory: 3,
                path: ''
            }, {
                catagory: 4,
                path: ''
            }, {
                catagory: 5,
                path: ''
            }, {
                catagory: 6,
                path: ''
            }, {
                catagory: 7,
                path: ''
            }, {
                catagory: 13,
                path: ''
            }]

        }
    },
    components: {
        myHeader,
        myTab,
        imageUpLoad
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

        getUrl(param) {
            let _self = this;
            console.log(param);
            //三证合一
            if (_self.myShow.left) {
                _self.leftImgArr[param.index].url = param.url;
                if (param.catagory !== 14) {
                    _self.leftArr[param.catagory - 9].path = param.url;
                } else {
                    _self.leftArr[3].path = param.url;
                }
            }
            //传统三证
            if (_self.myShow.right) {
                _self.rightImgArr[param.index].url = param.url;
                if (param.catagory !== 13) {
                    _self.rightArr[param.catagory - 3].path = param.url;
                } else {
                    _self.rightArr[5].path = param.url;
                }
            }

        },
        deletes(todo, index) {
            let _self = this;
            todo.url = '';
            if (_self.myShow.left) {
                this.leftArr[index].path = '';
            }
            if (_self.myShow.right) {
                this.rightArr[index].path = '';
            }

        },
        submit() {
            let _self = this;
            let arr = '';
            if (_self.myShow.left) {
                arr = _self.leftArr;
                _self.authenStyle = '2';
            }
            if (_self.myShow.right) {
                arr = _self.rightArr;
                _self.authenStyle = '3';
            }
            common.$emit('show-load');
            let url = common.urlCommon + common.apiUrl.most;
            let body = {
                biz_module: 'userService',
                biz_method: 'webSubmitAuthenImage',
                biz_param: {
                    type: 1,
                    authenImage: arr,
                    authenStyle: _self.authenStyle,
                    company: _self.company
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
                common.$emit('message', suc.data.msg);
                if (suc.data.code == '1c01') {
                    common.$emit("toAuthResult", 1);
                    _self.$router.push('/authResult?authen=1');
                }
            }, function (err) {
                common.$emit('close-load');
                common.$emit('message', err.data.msg);
            })
        },
        confirm() {
            let _self = this;
            let val = '';
            if (!_self.company) {
                common.$emit('message', '请输入公司名称');
                return
            }
            //三证合一
            if (_self.myShow.left) {
                if (_self.userInfor.manageType == 3 || _self.userInfor.manageType == 23) {
                    for (var i = 0; i < _self.leftArr.length; i++) {
                        if (!_self.leftArr[i].path) {
                            switch (_self.leftArr[i].catagory) {
                                case 9:
                                    val = '请上传三证合一！';
                                    break;
                                case 10:
                                    val = '请上传银行开户许可证！';
                                    break;
                                case 11:
                                    val = '请上传GMP资质证书！';
                                    break;
                                case 14:
                                    val = '请上传生产许可证！';
                                    break;
                            }
                            if (val) {
                                common.$emit('message', val)
                                return
                            }
                        }
                    }
                } else {
                    for (var i = 0; i < _self.leftArr.length; i++) {
                        if (!_self.leftArr[i].path) {
                            switch (_self.leftArr[i].catagory) {
                                case 9:
                                    val = '请上传三证合一！';
                                    break;
                                case 10:
                                    val = '请上传银行开户许可证！';
                                    break;
                            }
                            if (val) {
                                common.$emit('message', val)
                                return
                            }
                        }
                    }
                }

            }
            //传统三证
            if (_self.myShow.right) {
                if (_self.userInfor.manageType == 3 || _self.userInfor.manageType == 23) {
                    for (var i = 0; i < _self.rightArr.length; i++) {
                        if (!_self.rightArr[i].path) {
                            switch (_self.rightArr[i].catagory) {
                                case 3:
                                    val = '请上传工商营业执照！';
                                    break;
                                case 4:
                                    val = '请上传组织机构代码证！';
                                    break;
                                case 5:
                                    val = '请上传税务登记证！';
                                    break;
                                case 6:
                                    val = '请上传银行开户许可证！';
                                    break;
                                case 7:
                                    val = '请上传GMP资质证书！';
                                    break;
                                case 13:
                                    val = '请上传生产许可证！';
                                    break;
                            }
                            if (val) {
                                common.$emit('message', val)
                                return
                            }
                        }
                    }
                } else {
                    for (var i = 0; i < _self.rightArr.length; i++) {
                        if (!_self.rightArr[i].path) {
                            switch (_self.rightArr[i].catagory) {
                                case 3:
                                    val = '请上传工商营业执照！';
                                    break;
                                case 4:
                                    val = '请上传组织机构代码证！';
                                    break;
                                case 5:
                                    val = '请上传税务登记证！';
                                    break;
                                case 6:
                                    val = '请上传银行开户许可证！';
                                    break;
                            }
                            if (val) {
                                common.$emit('message', val)
                                return
                            }
                        }
                    }
                }
            }

            _self.submit();

        }
    },
    created() {
        let _self = this;
        if (_self.userInfor.manageType == 3 || _self.userInfor.manageType == 23) {
            _self.leftImgArr[2].name = false;
            _self.leftImgArr[3].name = false;
            _self.rightImgArr[4].name = false;
            _self.rightImgArr[5].name = false;
        } else {
            _self.leftImgArr[2].name = true;
            _self.leftImgArr[3].name = true;
            _self.rightImgArr[4].name = true;
            _self.rightImgArr[5].name = true;
        }
        common.$on('toCompanyAuth', function (item) {
            if (_self.userInfor.manageType == 3 || _self.userInfor.manageType == 23) {
                _self.leftImgArr[2].name = false;
                _self.leftImgArr[3].name = false;
                _self.rightImgArr[4].name = false;
                _self.rightImgArr[5].name = false;
            } else {
                _self.leftImgArr[2].name = true;
                _self.leftImgArr[3].name = true;
                _self.rightImgArr[4].name = true;
                _self.rightImgArr[5].name = true;
            }
            _self.company = '';
            _self.leftArr = [{
                catagory: 9,
                path: ''
            }, {
                catagory: 10,
                path: ''
            }, {
                catagory: 11,
                path: ''
            }, {
                catagory: 14,
                path: ''
            }]
            _self.rightArr = [{
                catagory: 3,
                path: ''
            }, {
                catagory: 4,
                path: ''
            }, {
                catagory: 5,
                path: ''
            }, {
                catagory: 6,
                path: ''
            }, {
                catagory: 7,
                path: ''
            }, {
                catagory: 13,
                path: ''
            }]
        })
    },
    mounted() {
        this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    }
}
</script>