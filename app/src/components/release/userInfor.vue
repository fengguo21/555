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

.person_infor {
    .inbox {
        background-color: #fff;
        padding-left: 15px;
        div {
            display: flex;
            flex-direction: row;
            align-items: center;
            font-size: 15px;
            color: #000;
            height: 50px;
            border-bottom: 1px solid #E6E6E6;
            .left {
                width: 85px;
            }
            .right {
                flex: 1;
            }
        }
    }
}
</style>
<template>
    <div class="person_infor">
        <div class="inbox">
            <div class="name">
                <div class="left">姓名</div>
                <div class="right">
                    <input type="text" v-model="obj.name">
                </div>
            </div>
            <div class="name">
                <div class="left">联系方式</div>
                <div class="right">
                    <input type="text" v-model="obj.phone">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import common from '../../common/common.js'
import validation from '../../validation/validation.js'
import httpService from '../../common/httpService.js'
export default {
    data() {
            return {

            }
        },
        methods: {


        },
        props:{
             obj:{
                  
             }
        },
        components: {

        },
        created() {
           
        },
        mounted() {
           
        }
}
</script>
