<style lang="less" scoped>
.head {
    height: 50px;
    background-color: #ff8201;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    .go_back {
        position: absolute;
        z-index: 20;
        left: 0;
        top: 0;
        width: 20%;
        height: 100%;
        padding-left: 5%;
        display: flex;
        flex-direction: row;
        align-items: center;
        img {
            height: 20px;
        }
    }
    .title {
        width: 100%;
        text-align: center;
        font-size: 1.7rem;
        color: #fff;
    }
    .revise {
        position: absolute;
        z-index: 20;
        right: 0;
        top: 0;
        width: 15%;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        img {
            width: 18px;
            height: 18px;
        }
    }
}
</style>
<template>
    <div class="head">
        <div class="go_back" @click="jumpBack()">
            <img src="/static/images/go-back.png">
        </div>
        <div class="title" v-if="param.name">{{param.name}}</div>
        <div class="revise" @click="jumpSearch" v-show="!param.show">
            <img src="/static/icons/clarity-search.png">
        </div>
        <div class="revise" @click="cancel" v-show="param.show">
            <img src="/static/icons/close.png">
        </div>
        <!-- <div class="revise" v-if="param.select" @click="revise"></div>
                        <div class="revise" v-if="!param.select" @click="over">完成</div> -->
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
        param: {

        }
    },
    created() {

    },
    methods: {
        jumpBack() {
            let _self = this;
            window.history.go(-1);
        },
        jumpSearch() {
            this.$emit('jumpSearch')
        },
        cancel() {
            this.$emit('cancel')
        }
    },

}
</script>
