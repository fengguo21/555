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

.my_infor {
    width: 100%;
    .bbox {
        width: 100%;
        display: flex;
        flex-direction: row;
        aligin-items: center;
        justify-content: space-between;
        // padding: 15px 27px 15px 17px;
        line-height: 17px;
        background-color: #fff;
        border-top: 1px solid #E6E6E6;
        .right {
            display: flex;
            flex-direction: row;
            align-items: center;
            .content {
                color: #666;
                font-size: 14px;
            }
            .image {
                padding: 0 0 0 10px;
                display: flex;
                flex-direction: row;
                align-items: center;
                .right_dir {
                    height: 12px;
                    width: 8px;
                }
                .default {
                    height: 17px;
                }
            }
        }
        .name {
            font-size: 17px;
            color: #333;
        }
        .content {
            font-size: 15px;
            color: #666;
        }
    }
    @media screen {
        .bbox {
            padding: 15px 27px 15px 17px;
        }
        @media (max-width: 480px) {
            .bbox {
                padding: 12px 27px 12px 17px;
            }
        }
    }
}
</style>
<template>
    <div class="my_infor">
        <div class="bbox" v-if="type == 0">
            <div class="name">身份认证</div>
            <div class="content">个人</div>
        </div>
        <div class="bbox" v-if="type == 0">
            <div class="name">真实姓名</div>
            <div class="content">{{userInfor.name}}</div>
        </div>
        <div class="bbox" v-if="type == 0">
            <div class="name">身份证号</div>
            <div class="content">{{userInfor.idnumber}}</div>
        </div>
        <div class="bbox" v-if="type == 1">
            <div class="name">身份认证</div>
            <div class="content">企业</div>
        </div>
        <!-- <div class="bbox" v-if="type == 1 && userInfor.authenStyle">
            <div class="name">认证类别</div>
            <div class="content">{{userInfor.authenStyle | myAuthStatus}}</div>
        </div> -->
        <div class="bbox" @click="jump(type)">
            <div class="name">证件照片</div>
            <div class="right">
                <!-- <div class="image">
                    <img src="/static/icon/default-pic.png" class="default">
                </div> -->
                <div class="content">点击查看</div>
                <div class="image">
                    <img src="/static/images/jiantou.png" class="right_dir">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import common from '../../common/common.js'
import httpService from '../../common/httpService.js'
import filters from '../../filters/filters.js'
import {
    mapGetters
} from 'vuex'
export default {
    data() {
            return {


            }
        },
        props: {
            type: '',
            myType:''
        },
        computed: {
            userInfor() {
                return this.$store.state.user.userInfor;
            }
        },
        methods: {
            jump() {
                let _self = this;
                _self.$emit('allPhoto')
                // console.log(this.type)
                // common.$emit('toMyPhoto', _self.type)
                // _self.$router.push('/authPhoto?type=' + _self.type)
            }
        },
        created() {
    
        },
        mounted() {

        }
}
</script>
