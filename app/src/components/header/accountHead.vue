<template>
    <div class="my-header">
        <div v-bind:class="{ header_content: !param.topissue, 'header_contentt': param.topissue }">
            <div class="go-back" @click="jumpBack()">
                <img src="/static/images/go-back.png">
            </div>
            <div class="title-name">
                <p>{{param.name}}</p>
            </div>
            <p @click="jumpRevise">保存</p>
        </div>
    </div>
</template>
<script>
import common from '../../common/common.js'

export default {
    data() {
            return {}
        },
        props: {
            param: {}
        },
        methods: {
            jumpBack() {
                let _self = this;
                window.history.go(-1);
            },
            jumpRevise() {
                this.$emit("postVal", this.param);
            }


        }
}
</script>
<style scoped>
.my-header {
    width: 100%;
    height: 50px;
    background: #ff8201;
}

.my-header .header_content {
    background: #ff8201;
    position: relative;
    top: 0;
    width: 100%;
    height: 50px;
    z-index: 2000;
}

.my-header .header_contentt {
    background: #ff8201;
    width: 100%;
    height: 50px;
}

.my-header .header_contentt .mycart>img {
    width: 26px;
    margin-top: 12px;
}

.my-header .title-name {
    width: 60%;
    height: 50px;
    float: left;
    font-size: 1.7rem;
    line-height: 50px;
    color: white;
}

.my-header .go-back {
    float: left;
    width: 20%;
    padding-right: 5%;
    height: 50px;
    z-index: 20000;
    background: #ff8201;
}

.my-header .go-back img {
    margin-top: 15px;
    height: 20px;
}

.my-header .header_content>p {
    position: absolute;
    right: 0;
    font-size: 14px;
    top: 0;
    padding: 16px 1.5rem;
    color: white;
}

.my-header .header_contentt>p {
    position: absolute;
    right: 0;
    font-size: 14px;
    top: 0;
    padding: 16px 1.5rem;
    color: white;
}

.my-header .active {
    color: #ff8201;
}
</style>
