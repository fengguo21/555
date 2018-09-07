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

.personal {
    .top {
        padding: 25px 15px;
        font-size: 14px;
        color: red;
        text-align: left;
    }
    .next {
        width: 90%;
        margin: 30px auto;
        background-color: #ff8201;
        color: #fff;
        height: 50px;
        border-radius: 25px;
        line-height: 50px;
        font-size: 18px;
    }
    .main{
        background-color:#F3F3F3;
    }
    .tbox {
        .photo {
            position: relative;
            height: 140px;
            width: 290px;
            margin: 0 auto;
            margin-bottom: 25px;
            border-radius: 10px;
            
            .image {
                height: 100%;
                width: 290px;
            }
            .delete {
                position: absolute;
                width: 20px;
                height: 20px;
                top: -10px;
                right: -10px;
                z-index: 20;
            }
        }
        .title {
            font-size: 18px;
            margin-bottom: 12px;
            color: #000;
        }
    }
}
</style>
<template>
    <div class="personal">
        <myHeader :param="head"></myHeader>
        <div class="page-loadmore-wrapper main" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
            <div class="top">
                * 请确保您的身份证信息真实有效
            </div>
            <div class="tbox" v-for="(todo,index) in imgArr">
                <div class="title">{{todo.title}}</div>
                <div class="photo">
                    <img :src="todo.url" v-if="todo.url" class="image">
                    <img src="/static/icons/upload-delete.png" class="delete" @click="deletes(todo,index)" v-if="todo.url">
                    <imageUpLoad :param="todo" v-on:postUrl="getUrl" v-if="!todo.url" class="image"></imageUpLoad>
                </div>
            </div>
            <div class="next" @click="confirm">申请认证</div>
        </div>
    </div>
</template>
<script>
import common from '../../common/common.js'
import httpService from '../../common/httpService.js'
import myHeader from '../../components/header/myHeader'
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
                    name: '个人认证'
                },
                imgArr: [{
                    default: '/static/icon/auth.png',
                    title: '身份证正面照片',
                    url: '',
                    index:0,
                    catagory: 1
                }, {
                    default: '/static/icon/auth2.png',
                    title: '身份证反面照片',
                    catagory: 2,
                    index: 1,
                    url: '',
                }, {
                    default: '/static/icon/auth4.png',
                    title: '手持身份证半身照片',
                    catagory: 0,
                    index: 2,
                    url: ''
                }],
                arr: [{
                    catagory: '1',
                    path: ''
                }, {
                    catagory: '2',
                    path: ''
                }, {
                    catagory: '0',
                    path: ''
                }],
                param: {
                    fullname: '',
                    idnumber: ''
                },

            }
        },
        components: {
            myHeader,
            imageUpLoad
        },
        computed: {
            userInfor() {
                return this.$store.state.user.userInfor;
            },
        },
        methods: {
            getUrl(param) {
                let _self = this;
                
                if (param.url) this.imgArr[param.index].url = param.url;
                if (param.url) this.arr[param.index].path = param.url;
            },
            deletes(todo,index) {
                let _self = this;
                todo.url = '';
                this.arr[index].path = '';
            },
            submit(){

                let _self = this;
                console.log(22,_self.param.fullname)
                common.$emit('show-load');
                let url = common.urlCommon + common.apiUrl.most;
                let body = {
                    biz_module: 'userService',
                    biz_method: 'webSubmitAuthenImage',
                    biz_param: {
                        type: 0,
                        name:_self.param.fullname,
                        idnumber:_self.param.idnumber,
                        authenImage:_self.arr
                    }
                }
                if (common.KEY) {
                    url = common.addSID(common.urlCommon + common.apiUrl.most);
                    body.version = 1;
                    body.time = Date.parse(new Date()) + parseInt(common.difTime);
                    body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
                }
                httpService.myAttention(url, body, function(suc) {
                    common.$emit('close-load');
                    common.$emit('message', suc.data.msg);
                    if(suc.data.code == '1c01'){
                        common.$emit("toAuthResult", 0);
                        _self.$router.replace('/authResult?authen=0');
                    }
                }, function(err) {
                    common.$emit('close-load');
                    common.$emit('message', err.data.msg);
                })
            },
            confirm() {
                let _self = this;
                let val = '';
                for (var i = 0; i < _self.arr.length; i++) {
                    if (!_self.arr[i].path) {              
                        switch (_self.arr[i].catagory) {
                            case '1':
                                val = '请上传身份证正面照！';
                                break;
                            case '2':
                                val = '请上传身份证反面照！';
                                break;
                            case '0':
                                val = '请上传手持身份证照！';
                                break;
                        }
                        if (val) {
                            common.$emit('message', val)
                            return
                        }
                    }
                }
                 
                _self.submit();
                    
            }
        },
        created() {
            let _self = this;
            var query = this.$route.query.val;
            var fullname = query.split(';')[0];
            var idnumber = query.split(';')[1];
            _self.param.fullname = fullname.split('=')[1];
            _self.param.idnumber = idnumber.split('=')[1];
            console.log(2,_self.param)
            common.$on('personStep1To2', function(item) {
                _self.param.fullname = item.fullname;
                _self.param.idnumber = item.idnumber;
                _self.arr = [{
                    catagory: '1',
                    path: ''
                }, {
                    catagory: '2',
                    path: ''
                }, {
                    catagory: '0',
                    path: ''
                }]
                console.log(1,_self.param)
            })
        },
        mounted() {
            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
        }
}
</script>
