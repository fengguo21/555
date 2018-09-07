<template>
    <div class="request">
        <myHeader :param="myHeader" v-on:confirmFill="goBack"></myHeader>
        <div class="main">
            <input type="text" v-model="my_code" placeholder="请输入邀请码">
        </div>
    </div>
</template>
<script>
import common from '../../common/common.js'
import myHeader from '../../components/header/myHeader'
import validation from '../../validation/validation.js'
import httpService from '../../common/httpService.js'
export default {
    data() {
            return {
                my_code: '',
                myHeader: {
                    name: '邀请码',
                    code_name: '确定',
                    confirm_fill: true
                }

            }
        },
        components: {
            myHeader
        },
        created() {

        },
        methods: {
            goBack: function() {
                //这里等待后台接口
                let _self = this;
                common.$emit('broughtCode', _self.my_code);
                window.history.go(-1);
            }
        },
        mounted() {

        }
}
</script>
<style scoped>
.request {}

input[type="text"],
input[type="submit"],
input[type="reset"],
select,
textarea {
    -webkit-appearance: none;
    border-radius: 0;
}

.request .main {
    background: white url(/static/icons/request-code.png) no-repeat 20px center;
    background-size: 25px 20px;
    width: 100%;
    height: 50px;
    margin-top: 10px;
    border: 1px solid #B3B3B3;
    border-left: none;
    border-right: none;
    padding-left: 50px;
}

.request .main input {
    outline: none;
    border: 0;
    height: 30px;
    width: 100%;
    margin-top: 10px;
    font-size: 14px;
}
</style>
