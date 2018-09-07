<style lang="less" scoped>
.cart_err{
    position: absolute;
    margin-left:-81px;
    margin-top:-91px;
    left:50%;
    top:50%;
    .image{
        img{
            height:80px;
        }
    }
    .word{
        font-size: 17px;
        color: #999;
    }
    .button{
        font-size:18px;
        line-height: 18px;
        color:#fff;
        padding: 9px 0;
        background-color:#5dc660;
        width:108px;
        margin:20px auto;
        border-radius:18px;
    }
}
</style>
<template>
    <div class="cart_err" >
        <div class="image">
            <img :src="param.url" alt="">
        </div>
        <div class="word">{{param.err}}</div>
        <div class="button" @click="jump" v-show="param.router">
            {{param.next_step}}
        </div>
    </div>
</template>
<script>
import common from '../../common/common.js'
export default {
    data() {
        return {


        }
    },
    props: {
        param: {

        }
    },
    methods: {
        jump() {
            let _self = this;
            if (_self.param.router) {
                if (_self.param.router == 'resource') {
                    common.$emit('selectRes', 'resource');
                    _self.$router.push('home');
                } else {
                    _self.$router.push(_self.param.router)
                }
            }

        }
    }

}
</script>

