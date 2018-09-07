<style lang="less" scoped>
.cart {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    .account {
        width: 100%;
        position: absolute;
        bottom: 0px;
        box-shadow: 0 0 5px #888888;
    }
    .mains {
        padding-bottom: 60px;
    }
    .list {
        .li {
            .box {
                width: 100vw;
                padding: 20px 0 0 0;
                background-color: #fff;
                display: flex;
                flex-direction: row;
                align-items: center;
                .selects {
                    padding: 0 12px;
                    img {
                        width: 18px;
                    }
                    padding-bottom: 20px;
                }
                .select {
                    padding: 0 4px;
                    .lose_efficacy {
                        width: 34px;
                    }
                    padding-bottom: 20px;
                }
                .main {
                    flex: 1;
                    height: 94px;
                    display: flex;
                    flex-direction: row;
                    position: relative;
                    padding-bottom: 20px;
                    border-bottom: 1px solid #e6e6e6;
                    /*.image {
                        width: 81px;
                        height: 74px;
                        overflow: hidden;
                        img {
                            width: 81px;
                            min-height: 74px;
                        }
                        margin-right:15px;
                    }*/
                    .image {
						width: 81px;
                        height: 74px;
						position: relative;
						overflow: hidden;
						 margin-right:15px;
						.breedImg {
							width: 100%;
							min-height: 74px;
							position: absolute;
							top: 50%;
							left: 0;
							transform: translateY(-50%);
						}
						.breedImgs {
							min-width: 81px;
							height: 100%;
							position: absolute;
							top: 0;
							left: 50%;
							transform: translateX(-50%);
						}
					}
                    .image_opacity {
                        opacity: 0.5;
                    }
                    .center {
                        text-align: left;
                        .breed {
                            font-size: 17px;
                            line-height: 17px;
                            color: #333;
                            display: flex;
                            flex-direction: row;
                            align-items: center;
                            img {
                                height: 17px;
                                margin-right: 3px;
                            }
                        }
                        .emtry_breed {
                            color: #999;
                        }
                        .spec {
                            font-size: 13px;
                            line-height: 13px;
                            color: #999;
                            margin-top: 12px;
                        }
                        .revise_num {
                            display: flex;
                            flex-direction: row;
                            align-items: center;
                            margin-top: 8px;

                            img {
                                width: 27px;
                            }
                            .values {
                                border: none;
                                width: 50px;
                                text-align: center;
                            }
                            input[disabled] {
                                opacity: 1;
                                background-color: #fff;
                            }
                            .num {
                                font-size: 13px;
                                line-height: 27px;
                                color: #999;
                            }
                        }
                        .emtry {
                            color: #000;
                            font-size: 13px;
                            margin-top: 15px;
                        }
                    }
                    .right {
                        position: absolute;
                        top: 0px;
                        right: 15px;
                        color: #ff8201;
                    }
                    .similarity {
                        font-size: 14px;
                        color: #ff8201;
                        padding: 5px 10px;
                        line-height: 14px;
                        border: 1px solid #ff8201;
                        border-radius: 12px;
                        right: 10px;
                        top: 45px;
                    }
                }
            }
        }
    }
}
</style>
<template>
    <div class="cart">
        <div class="head">
            <cartHead></cartHead>
        </div>
        <div class="page-loadmore-wrapper mains" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
            <div class="list" v-if="cart.length !== 0">
                <div class="li" v-for="(todo,index) in cart">
                    <mt-cell-swipe :right="[{
                                                content: '删除',
                                                style: { background: 'red', color: '#fff',lineHeight:'104px'},
                                                handler:()=> myDelete(todo.cartId,index,todo)}]">
                        <div class="box">
                            <div class="selects" v-show="todo.onSell == 2">
                                <img src="/static/icons/quan.png" class="fit" @click.prevent="confirm(index)" v-show='!cart[index].show'>
                                <img src="/static/icons/buy_quan.png" class="fit" @click.prevent="cancel(index)" v-show='cart[index].show'>
                            </div>
                            <div class="select" v-show="todo.onSell !== 2">
                                <img src="/static/images/lose-efficacy.png" class="lose_efficacy">
                            </div>
                            <div class="main">
                                <div class="image" v-bind:class="{image_opacity:todo.onSell !== 2}">
                                    <img :src="todo.image[0]" :class="todo.imgsize.width>todo.imgsize.height?'breedImgs':'breedImg'" @click="haha(todo)">
                                </div>
                                <div class="center">
                                    <div class="breed" v-bind:class="{emtry_breed:todo.onSell !== 2}">
                                        <img src="/static/icon/square-sampling.png" v-if="todo.cartSample == 1 && todo.onSell == 2">
                                        <div>{{todo.breedName,7 | filterTxt}}</div>
                                    </div>
                                    <div class="spec" v-show="todo.cartSample==0">库存:{{todo.number+'('+todo.unit+')',7 | filterTxt}}&nbsp;&nbsp;产地:{{todo.location,3 | filterTxt}}</div>
                                    <div class="spec" v-show="todo.cartSample==1">库存:{{todo.sampleNumber+'份',7 | filterTxt}}&nbsp;&nbsp;产地:{{todo.location,3 | filterTxt}}</div>
                                    <div class="revise_num" v-show="headParam.show && todo.onSell == 2">
                                        <div class="num">购买数量: X{{todo.cartNumber}}</div>
                                    </div>
                                    <div class="revise_num" v-show="!headParam.show && todo.onSell == 2 && todo.cartSample==0">
                                        <div class="num">购买数量:&nbsp;</div>
                                        <img src="/static/images/subtraction_nor.png" class="subtraction" v-tap="{methods:subtraction,index:index}" v-if="todo.cartNumber <= todo.moq">
                                        <img src="/static/images/subtraction.png" class="subtraction" v-tap="{methods:subtraction,index:index}" v-if="todo.cartNumber > todo.moq">
                                        <input type="number" v-model="todo.cartNumber" class="values" @click="changeValue(index)">
                                        <img src="/static/images/addition.png" class="addition" v-tap="{methods:addition,index:index}" v-if="todo.cartNumber < todo.number">
                                        <img src="/static/images/addition_nor.png" class="addition" v-tap="{methods:addition,index:index}" v-if="todo.cartNumber >= todo.number">
                                    </div>
                                    <div class="revise_num" v-show="!headParam.show && todo.onSell == 2 && todo.cartSample==1">
                                        <div class="num">购买数量:&nbsp;</div>
                                        <img src="/static/images/subtraction_nor.png" class="subtraction" v-tap="{methods:subtraction,index:index}" v-if="todo.cartNumber <= 1">
                                        <img src="/static/images/subtraction.png" class="subtraction" v-tap="{methods:subtraction,index:index}" v-if="todo.cartNumber > 1">
                                        <input type="number" v-model="todo.cartNumber" class="values" @click="changeValue(index)">
                                        <img src="/static/images/addition.png" class="addition" v-tap="{methods:addition,index:index}" v-if="todo.cartNumber < todo.sampleNumber">
                                        <img src="/static/images/addition_nor.png" class="addition" v-tap="{methods:addition,index:index}" v-if="todo.cartNumber >= todo.sampleNumber">
                                    </div>
                                    <div class="revise_num emtry" v-show="todo.onSell !== 2">
                                        资源已下架
                                    </div>
                                </div>
                                <div class="right" v-show="todo.onSell == 2">
                                    <span v-show="todo.cartSample==0">￥{{todo.price}}</span>
                                    <span v-show="todo.cartSample==1">￥{{todo.sampleAmount}}</span>
                                </div>
                                <div class="right similarity" v-show="todo.onSell !== 2" @click="lookResource(todo.breedName)">看相似</div>
                            </div>
                        </div>
                    </mt-cell-swipe>
                </div>
            </div>
            <messageBoxs :message="message" v-show="message.show" v-on:mySure="mySure" v-on:myCancel="myCancel"></messageBoxs>
            <cartErr :param="err" v-if="cart.length == 0"></cartErr>
        </div>
        <settleAccounts v-if="cart.length !== 0" class="account" v-on:deteSelect="deteSelect"></settleAccounts>
    </div>
</template>
<script>
import {
    mapGetters
} from 'vuex'
import common from '../../common/common.js'
import httpService from '../../common/httpService.js'
import cartHead from '../../components/header/cartHead'
import settleAccounts from '../../components/tools/settleAccounts'
import cartList from '../../components/tools/cartList'
import validation from '../../validation/validation.js'
import cartErr from '../../components/cart/cartErr'
import messageBoxs from '../../components/popUpType/messageBoxs'
import filters from '../../filters/filters'
import {
    MessageBox
} from 'mint-ui'
export default {
    data() {
        return {
            err: {
                url: "/static/images/cart-err.png",
                err: '您的购物车是空的哦~',
                router: 'resource',
                next_step: '去采购'
            },
            message: {
                title: '温馨提示',
                content: '您确定',
                canceltext: '取消',
                confirmtext: '确认',
                show: false,
            },
            param: {
                name: '购物车',
                show: true,
                t_show: false
            },
            cart_data: {
                show: true,
                t_show: false,
                price: '',
                value: 1
            },
            money: {
                price: '0.00'
            },
            todos: [],
            list: [],
            topStatus: '',
            wrapperHeight: 0,
            allLoaded: false,
            bottomStatus: '',
            deteSingle: {
                id: '',
                index: '',
                todo: '',
                show: false
            }

        }
    },
    components: {
        cartHead,
        settleAccounts,
        cartList,
        cartErr,
        messageBoxs
    },
    computed: {
        cart() {
            return this.$store.state.cart.cartList;
        },
        headParam() {
            return this.$store.state.cart.headParam;
        },
        httpPraram() {
            return this.$store.state.cart.http_praram;
        },
        orderNum() {
            return this.$store.state.cart.order_num;
        }
    },
    methods: {
    	haha(todo){
    		console.log(JSON.stringify(todo))
    	},
        myDelete(id, index, todo) {
            this.deteSingle.id = id;
            this.deteSingle.index = index;
            this.deteSingle.todo = todo;
            this.deteSingle.show = true;//区别是不是滑动删除
            this.message.content = '您确定要删除该商品？';
            this.message.show = true;
        },
        deteSelect() {
            if (this.orderNum == 1) {//一件商品删除
                this.message.content = '您确定要删除该商品？';
            } else {
                this.message.content = '您确定要删除这' + this.orderNum + '件商品!';
            }

            this.message.show = true;
        },
        mySure() {
            let _self = this;
            if (this.deteSingle.show) {
                this.$store.dispatch('deteCart', {
                    id: _self.deteSingle.id,
                    index: _self.deteSingle.index
                });
                this.myCancel();
            } else {
                this.$store.dispatch('deteAllCart');
                this.message.show = false;
            }
        },
        myCancel() {
            this.deteSingle.id = '';
            this.deteSingle.index = '';
            this.deteSingle.todo = '';
            this.message.content = '';
            this.deteSingle.show = false;
            this.message.show = false;
        },
        subtraction(index) {
            let _self = this;
            _self.$store.dispatch('cutOrderNum', index.index);
        },
        addition(index) {
            let _self = this;
            _self.$store.dispatch('addOrderNum', index.index);
        },
        confirm(index) {
            let _self = this;
            _self.$store.dispatch('showOrder', index);
        },
        cancel(index) {
            let _self = this;
            _self.$store.dispatch('hideOrder', index);
        },
        lookResource(name) {
            common.$emit('lowPriceRes', {
                keyWord: name
            })
            common.$emit("setParam", 'lowPrice', {
                keyWord: name
            });
            this.$router.push('lowPriceRes');
        },
        changeValue(index) {
            common.$emit('prompt', {
                index: index,
                text: '请输入数量',
                title: '您输入的数量是'
            })
            let _self = this;
            MessageBox.prompt(' ', '请输入数量').then(({
                    value
                }) => {
                if (value) {
                    _self.$store.dispatch('changeValue', {
                        value: value,
                        index: index
                    });
                }
            }, () => {
                console.log()
            });
        },
        leftButtonHandler(evt) {
            console.log(123);
        },
        dete(id, index, todo) {
            if (todo.show) {
                this.$store.dispatch('deteCart', {
                    id: id,
                    index: index
                });
            }
        }
    },

    mounted() {
        let _self = this;
        console.log(9,this.$refs.wrapper)
        this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    },
    created() {
        let _self = this;
        this.$store.dispatch('getHttp');
    },
}
</script>

