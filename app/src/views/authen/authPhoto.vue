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

.auth_photo {
    .person {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        .box {
            width: 50%;
            box-sizing: border-box;
            .image {
                padding: 15px 0;
                img {
                    width: 150px;
                    height: 115px;
                }
            }
        }
    }
}
</style>
<template>
    <div class="auth_photo">
        <myHeader :param="head" v-show="!my_param.show"></myHeader>
        <div class="page-loadmore-wrapper main" ref="wrapper" :style="{ height: wrapperHeight + 'px' }" v-show="!my_param.show">
            <div class="person">
                <div class="box" v-for="(todo,index) in photo" @click="popUp(index,photo)">
                    <div class="image">
                        <img :src="todo.path">
                    </div>
                    <div class="title">{{todo.category | selectPhoto}}</div>
                </div>
            </div>
        </div>
        <popUpBigImg :param="my_param" v-show="my_param.show"></popUpBigImg>
    </div>
</template>
<script>
import common from '../../common/common.js'
import httpService from '../../common/httpService.js'
import myHeader from '../../components/header/myHeader'
import validation from '../../validation/validation.js'
import filters from '../../filters/filters.js'
import popUpBigImg from '../../components/tools/popUpBigImg'
import {
    mapGetters
} from 'vuex'
export default {
    data() {
        return {
            head: {
                name: '证件照片'
            },
            my_param: {
                url: '',
                show: false,
                whole_height: ''
            },
        }
    },
    components: {
        myHeader,
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
        getHttp(type) {

            let _self = this;
            _self.$store.dispatch('removePhoto')
            common.$emit('show-load');
            let url = common.urlCommon + common.apiUrl.most;
            let body = {
                biz_module: 'userService',
                biz_method: 'queryUserAuthenImage',
                biz_param: {
                    type: type
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
                //common.$emit('message', suc.data.msg);

                if (suc.data.code == '1c01') {
                    _self.$store.dispatch('getPhoto', suc.data.biz_result.list)
                }
            }, function (err) {
                common.$emit('close-load');
                common.$emit('message', err.data.msg);
            })
        },
        popUp(index, imgArr) {
            // let arr = [];
            // for (var i = 0; i < imgArr.length; i++) {
            //     arr.push(imgArr[i].path)
            // }
            // this.my_param.url = arr;
            // this.my_param.show = !this.my_param.show;
            // this.my_param.whole_height = document.documentElement.clientHeight;
            let arr1 = [];
            let arr2 = [];
            
            for(var i=0;i<index;i++){
                arr1.push(imgArr[i].path);
                //console.log(i)
            }
            for(var j=index;j<imgArr.length;j++){
                arr2.push(imgArr[j].path)
               // console.log(j)
            }
            
            this.my_param.url = arr2.concat(arr1);
            this.my_param.show = !this.my_param.show;
            this.my_param.whole_height = document.documentElement.clientHeight;
        },
    },
    created() {
        common.$on(function (type) {
            getHttp(type)
        })
        let type = this.$route.query.type;
        this.getHttp(type);
    },
    mounted() {
        this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    }
}
</script>