<style lang="less" scoped>
.total {
    width: 100%;
    background-color: #fff;
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    .fit_all {
        margin-left: 12px;
        width: 18px;
    }
    .fit_word {
        font-size: 15px;
        color: #333;
        margin-left: 8px;
    }
    .total_center {
        flex: 1;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        .price {
            font-size: 14px;
            color: #333;
            span {
                color: #ec6a2c;
            }
        }
        .freight {
            margin: 0 10px 0 12px;
            font-size: 9px;
        }
    }
    .account {
        width: 105px;
        height: 50px;
        background-color: #ff8201;
        font-size: 15px;
        color: #fff;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    @media screen and (max-width: 320px) {
        .fit_word {
            font-size: 13px;
        }
        .total_center {
            .price {
                font-size: 12px;
            }
            .freight {
                font-size: 9px;
            }
        }
        .account {
            width: 80px;
            font-size: 13px;
        }
    }
    .yellow {
        background-color: #f5c01c;
    }
}
</style>
<template>
    <div class="total">
        <img src="/static/icons/quan.png" class="fit_all" @click="confirm" v-show="!allShow">
        <img src="/static/icons/buy_quan.png" class="fit_all" @click="cancel" v-show='allShow'>
        <div class="fit_word">全选</div>
        <div class="total_center">
            <div class="price" v-show="headParam.show">合计:
                <span>￥ {{allPrice,7 | filterTxt}}</span>
            </div>
            <div class="freight" v-show="headParam.show">不含运费</div>
        </div>
        <div class="account" @click="account(cart,1)" v-show="headParam.show">
            结算({{orderNum}})
        </div>
        <div class="account yellow" v-show="!headParam.show" @click="account(cart,2)">
            移到收藏夹
        </div>
        <div class="account" @click="account(cart,3)" v-show="!headParam.show">
            删除
        </div>
    </div>
</template>
<script>
import common from '../../common/common.js'
import filters from '../../filters/filters'
import httpService from '../../common/httpService.js'
import {
    mapGetters
} from 'vuex'
export default {
    data() {
        return {
            show: true,
        }
    },
    props: {
        param: {

        }
    },
    computed: {
        cart() {
            return this.$store.state.cart.cartList;
        },
        allPrice() {
            return this.$store.state.cart.all_price;
        },
        allShow() {
            return this.$store.state.cart.all_show;
        },
        headParam() {
            return this.$store.state.cart.headParam;
        },
        orderNum() {
            return this.$store.state.cart.order_num;
        }
    },
    methods: {
        confirm() {
            this.$store.dispatch('allOrderShow');
        },
        cancel() {
            this.$store.dispatch('allOrderHide');
        },
        account(cart, type) {
            let arr = [];
            let attentionArr = [];
            let _self = this;
            let n = 0;
            for (var i = 0; i < cart.length; i++) {
                if (cart[i].show && cart[i].onSell == 2) {
                    var obj = {
                        intentionId: cart[i].id,
                        intentionType: 1,
                        breedName: cart[i].breedName
                    }
                    attentionArr.push(obj);
                    arr.push(cart[i]);
                }
                if (cart[i].show && cart[i].onSell == 2) n += 1;
            }
            console.log(1, attentionArr)
            if (type == 1) {
                console.log(999)
                if (n > 0) {
                    localStorage.setItem('cartContent', JSON.stringify(arr));
                    localStorage.setItem('allPrice', JSON.stringify(_self.allPrice));
                    common.$emit('cartContent', arr);
                    common.$emit('cartPrice', _self.allPrice);
                    this.$router.push('/multipleOrders');
                } else {
                    common.$emit('message', '请选择需要购买的商品！')
                }
            } else if (type == 3) {
                if (n > 0) {
                    this.$emit('deteSelect')
                }else{
                    common.$emit('message', '请选择需要删除的商品！')
                }
            } else {
                if (n > 0) {
                    _self.goAttention(attentionArr)
                } else {
                    common.$emit('message', '请选择需要收藏的商品！')
                }

            }
        },
        detelt() {
            let _self = this;
            this.$emit('deteSelect')
        },
        goAttention(arr) {
            let _self = this;
            common.$emit('show-load');
            let url = common.addSID(common.urlCommon + common.apiUrl.most);
            let body = {
                biz_module: 'userService',
                biz_method: 'userBatchAttention',
                biz_param: {
                    cartArray: arr
                }
            };
            body.time = Date.parse(new Date()) + parseInt(common.difTime);
            body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
            httpService.myAttention(url, body, function (suc) {
                common.$emit('close-load');
                common.$emit('message', suc.data.msg)
            }, function (err) {
                common.$emit('close-load');
                common.$emit('message', err.data.msg)
            })
        }
    },
    created() {

    }
}
</script>

