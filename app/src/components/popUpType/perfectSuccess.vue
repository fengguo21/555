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


.black {
    width: 100%;
    height: 100vh;
    position: absolute;
    z-index: 200;
    background-color: #000;
    top: 0;
    opacity: 0.6;
}

.price_popup {
    position: absolute;
    margin-left: -137px;
    margin-top: -140px;
    top: 40%;
    left: 50%;
    z-index: 201;
    .pop_box {
        position: relative;
        height: 275px;
        .pop_img {
            width: 274px;
            height: 275px;
        }
        .button_box {
            position: absolute;
            bottom: 0px;
            z-index: 202;
            width: 250px;
            padding: 0 20px 15px 20px;
            display: flex;
            flex-direction: row;
            .button {
                flex: 1;
                color: #fff;
                padding: 10px 0;
                font-size: 16px;
                line-height: 16px;
                border-radius: 18px;
            }
            .left {
                margin-right: 8px;
                background-color: #84bf51;
            }
            .right {
                margin-left: 8px;
                background-color: #f29600;
            }
        }
    }
}
</style>
<template>
    <div>
        <div class="price_popup">
            <div class="pop_box">
                <img src="/static/icon/pop-up-price.png" alt="" class="pop_img">
                <div class="button_box">
                    <div class="button left" @click="goNeed">立即前往</div>
                    <div class="button right" @click="goHome">随便逛逛</div>
                </div>
            </div>
        </div>
        <div class="black">
    
        </div>
    </div>
</template>
<script>
import common from '../../common/common.js'
import validation from '../../validation/validation.js'
import httpService from '../../common/httpService.js'
import {
    mapGetters
} from 'vuex'
export default {
    data() {
        return {
           
        }
    },
    prop:{
        popup:''
    },
    created() {
        
    },
    methods: {
        goNeed(){
            this.$emit('goNeed');
        },
        goHome(){
            this.$emit('goHome');
        }
    },
    mounted() {
        // this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
        //this.wrapperHeight = window.screen.height - this.$refs.wrapper.getBoundingClientRect().top;
    }
}
</script>
