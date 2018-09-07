<style lang="less" scoped>
.place_order{
    display: flex;
    flex-direction: row;
    align-items: center;
    height:50px;
    background-color: #fff;
    .all_price{
        flex:1;
        text-align: left;
        font-size:16px;
        color:#ff8201;
        padding-left:10px;
    }
    .confirm{
        width:135px;
        font-size:18px;
        color:#fff;
        background-color: #ff8201;
        display:flex;
        flex-direction:row;
        align-items: center;
        justify-content: center;
        height:50px;
    }
}
</style>
<template>
    <div class="place_order">
        <div class="all_price">合计: ￥{{allPrice | floatType}}</div>
        <div class="confirm" @click="confirm">提交订单</div>
    </div>
</template>
<script>
import common from '../../common/common.js'
export default {
    data() {
            return {
                allPrice: ''
            }
        },
        props: {
			popshow: {},
            param: {},
        },
        computed: {
            /*allPrice() {
                return this.$store.state.cart.all_price;
            }*/
        },
        methods: {
            orderPrice() {
                let _self = this;
                var allPrice = localStorage.getItem('allPrice');
                //console.log(_self.cart)
                _self.allPrice = JSON.parse(allPrice);
                //console.log(_self.allPrice)

                /*localStorage.removeItem('cartContent');*/
            },
            confirm() {
                this.$emit('submitCartOrder')
            }
        },
        created() {
            let _self = this;
            _self.orderPrice();
            common.$on('cartPrice', function(item) {
                _self.allPrice = item;
            })
        }
}
</script>

