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

.id_card {
    .inbox {
        padding: 10px 15px;
        text-align: left;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background-color: #fff;
        border-top: 1px solid #e6e6e6;
        border-bottom: 1px solid #e6e6e6;
        .name {
            font-size: 16px;
            width: 80px;
        }
        .input {
            flex: 1;
            input {
                width: 100%;
                heigth: 100%;
            }
        }
        .close {
            padding: 5px;
            img {
                width: 13px;
                height: 13px;
            }
        }
    }
    .no_border {
        border-top: none;
    }
}
</style>
<template>
    <div class="id_card">
        <div class="inbox">
            <div class="name">真实姓名</div>
            <div class="input">
                <input v-model="param.fullname" placeholder="请输入您的姓名">
            </div>
            <div class="close">
                <img src="/static/icon/my-close.png" @click="clearName" v-show="param.fullname">
                <img src="/static/icon/closes.png" @click="clearName" v-show="!param.fullname">
            </div>
        </div>
        <div class="inbox no_border">
            <div class="name">身份证号</div>
            <div class="input">
                <input v-model="param.idnumber" placeholder="请输入您的身份证号">
            </div>
            <div class="close">
                <img src="/static/icon/my-close.png" @click="clearId" v-show="param.idnumber">
                <img src="/static/icon/closes.png" @click="clearId" v-show="!param.idnumber">
            </div>
        </div>
    </div>
</template>
<script>
import common from '../../common/common.js'
import httpService from '../../common/httpService.js'
import myHeader from '../../components/header/myHeader'
import validation from '../../validation/validation.js'
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
            param: {

            }
        },
        computed: {
            userInfor() {
                return this.$store.state.user.userInfor;
            }
        },
        methods: {
            clearName() {
                this.param.fullname = ''
            },
            clearId() {
                this.param.idnumber = '';
            }
        },
        created() {

        },
        mounted() {

        }
}
</script>
