<template>
    <div class="cart_header">
        <div class="header_content">
            <div class="go-back" @click="jumpBack()">
                <img src="/static/images/go-back.png">
            </div>
            <div class="title-name">
                <p>{{headParam.name}}({{cartNum}})</p>
            </div>
            <p v-show="headParam.show && cart.length !== 0" @click="jumpRevise">编辑</p>
            <p v-show="headParam.t_show && cart.length !== 0" @click="backRevise">完成</p>
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
    computed: {
        headParam() {
            return this.$store.state.cart.headParam;
        },
        cart() {
            return this.$store.state.cart.cartList;
        },
        orderNum() {
            return this.$store.state.cart.order_num;
        },
        cartNum(){
            return this.$store.state.cart.cart_num;
        }
    },
    methods: {
        jumpBack() {
            let _self = this;
            if (common.pageParam.skipPer == true) {
                common.pageParam.skipPer = false;
                window.history.go(-2)
            }else if(window.history.length == 1){
                this.$router.push('/home')
            } else {
                window.history.go(-1);
            }
        },
        jumpRevise() {
            let _self = this;
            _self.$store.dispatch('compileHead');
        },
        backRevise() {
            let _self = this;
            _self.$store.dispatch('finishHead');
        }
    }
}
</script>
<style scoped>
.cart_header {
    width: 100%;
    height: 50px;
    background: #ff8201;
}

.cart_header .header_content {
    background: #ff8201;
    top: 0;
    width: 100%;
    height: 50px;
    z-index: 2000;
}

.cart_header .title-name {
    width: 60%;
    height: 50px;
    float: left;
    font-size: 1.7rem;
    line-height: 50px;
    color: white;
}

.cart_header .go-back {
    float: left;
    width: 20%;
    padding-right: 5%;
    height: 50px;
    z-index: 20000;
    background: #ff8201;
}

.cart_header .go-back img {
    margin-top: 15px;
    height: 20px;
}

.cart_header .header_content>p {
    position: absolute;
    right: 0;
    font-size: 14px;
    top: 0;
    padding: 16px 1.5rem;
    color: white;
}

.cart_header .active {
    color: #ff8201;
}
</style>
