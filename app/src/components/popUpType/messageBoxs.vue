<style lang="less" scoped>
input[type="text"],
input[type="submit"],
input[type="reset"],
select,
textarea {
    -webkit-appearance: none;
    border-radius: 0;
}

input,
textarea {
    border: none;
    background-color: #fff;
}



.message_box {
    position: absolute;
    width: 76%;
    margin-left: -38%;
    margin-top: -140px;
    top: 50%;
    left: 50%;
    z-index: 3001;
    border-radius: 6px;
    overflow: hidden;
    .background {
				padding: 20px 0;
				text-align: center;
				img{
					width: 85px;
				}
				
			}
    .top {
        font-size: 18px;
        line-height: 18px;
        padding: 11px 0;
        color: #ff8201;
        background-color: #E6E6E6;
    }
    .center {
        padding: 10px;
        min-height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #000;
        background-color: #fff;
    }
    .bottom {
        display: flex;
        width: 100%;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        .button {
            flex: 1;
            line-height: 40px;
            border-top: 1px solid #E6E6E6;
            height: 40px;
        }
        .left {
            color: #000;
            background-color: #fff;
        }
        .right {
            color: #fff;
            border-top: 1px solid #ff8201;
            background-color: #ff8201;
        }
    }
}

.black {
    width: 100%;
    height: 100vh;
    position: absolute;
    z-index: 3000;
    background-color: #000;
    top: 0;
    opacity: 0.6;
}
</style>
<template>
    <div>
        <div class="message_box">
            <div class="top">{{message.title}}</div>
            <div class="background">
					<img :src="message.img" alt="" />
				</div>
            <div class="center">
                <div class="content">
                    {{message.content}}
                </div>
            </div>
            <div class="bottom">
                <div class="button left" @click="encancel">{{message.canceltext}}</div>
                <div class="button right" @click="ensure">{{message.confirmtext}}</div>
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
export default {
    data() {
        return {


        }
    },
    props: {
        message: {
            type: Object,
            default: function () {
                return {
                    title: '修改报价',
                    content: '确定修改报价信息后将等待审核！',
                    canceltext: '再想想',
                    confirmtext: '确认'
                }
            }
        },
    },
    methods: {
        ensure() {
            this.$emit('mySure');
        },
        encancel() {
            this.$emit('myCancel');
        }
    },
    created() {

    },
    mounted() {

    }
}
</script>
