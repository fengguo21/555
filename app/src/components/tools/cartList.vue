<template>
    <div class="cart_list">
        <div class="test">
            <div class="top">
                <img src="/static/icons/quan.png" class="fit" @click="confirm()" v-show="!cart.show">
                <!-- -->
                <img src="/static/icons/buy_quan.png" class="fit" @click="cancel()" v-show="cart.show">
                <p class="name">天南星</p>
                <p class="price"><span>{{price}}</span>元/公斤</p>
            </div>
            <div class="bottom">
                <img src="/static/images/1.jpg" class="drug">
                <div class="content">
                    <p class="stock">库存:<span>22公斤</span></p>
                    <p class="location">产地:<span>吉林</span></p>
                    <div class="operate">
                        <button class="mint-button mint-button--primary mint-button--small gray" v-tap="{methods:subtraction}">—</button>
                        <input type="number" v-model="num.value">
                        <button class="mint-button mint-button--primary mint-button--small gray" v-tap="{methods:addition}">+</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="dete" v-show="param.t_show">删除</div> -->
    </div>
</template>
<script>
import {
    mapGetters
} from 'vuex'
import common from '../../common/common.js'

export default {
    data() {
            return {
                num: {
                    value: 1,
                    show: false
                },
                price: 22,

            }
        },
        props: {
            param: {

            }
        },
        computed: {
            cart() {
                console.log(this.$store.state.cart.cartList)
                return this.$store.state.cart.cartList;
            }
        },
        methods: {
            subtraction() {
                let _self = this;
                _self.num.value = Number(_self.num.value - 1);

            },
            addition() {
                let _self = this;
                _self.num.value = Number(_self.num.value + 1);
            },
            confirm() {
                let _self = this;
                _self.$store.dispatch('showOrder');
                /*_self.cart.show = !_self.cart.show;*/
            },
            cancel() {
                let _self = this;
                _self.$store.dispatch('hideOrder');
            }
        },
        watch: {
            num: {
                handler: function(newVal, oldVal) {
                    let _self = this;
                    console.log(newVal, oldVal);
                    if (newVal.show) {
                        _self.param.price = Number(newVal.value) * _self.price;
                        console.log(_self.param.price)
                    }
                    if (!newVal.show) {
                        _self.param.price = 0;
                    }

                },
                deep: true
            }

        }
}
</script>
<style scoped>
.cart_list .test {
    width: 100%;
    float: left;
}

.cart_list .test_nor {
    width: 100%;
    float: left;
    margin-left: -20%;
}

.cart_list .dete {
    width: 20%;
    background: green;
    float: left;
    height: 147px;
    line-height: 147px;
}

.cart_list .top {
    padding: 10px 15px;
    position: relative;
    float: left;
    background: white;
    width: 100%;
    border-bottom: 1px solid #ccc;
}

.cart_list .top .fit {
    position: absolute;
    left: 15px;
    top: 10px;
    width: 20px;
}

.cart_list .top .name {
    float: left;
    margin-left: 35px;
}

.cart_list .top .price {
    float: right;
}

.cart_list .bottom {
    float: left;
    width: 100%;
    background: white;
    padding: 15px;
}

.cart_list .bottom img {
    width: 30%;
    height: 75px;
    float: left;
}

.cart_list .content {
    float: left;
    text-align: left;
    padding-left: 15px;
    width: 70%;
}

.cart_list .content .stock {
    margin-bottom: 5px;
}

.cart_list .content .operate {
    float: right;
}

.cart_list .content .operate button {
    width: 38px;
    height: 34px;
    background: #F5F5F5;
    margin: 0;
    color: black;
}

.cart_list .content .operate>input {
    width: 45px;
    height: 34px;
    color: black;
    text-align: center;
}
</style>
