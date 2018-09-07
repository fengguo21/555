<style lang="less" scoped>
.black {
    width: 100%;
    height: 100vh;
    position: absolute;
    z-index: 300;
    background-color: #000;
    top: 0;
    opacity: 0.6;
}

.pop_custom {
    position: absolute;
    width: 288px;
    margin-left: -144px;
    margin-top: -200px;
    left: 50%;
    z-index: 301;
    top: 50%;
    border-radius: 14px;
    overflow: hidden;
    .custom_box {
        position: relative;
        background-color: #fff;
        .custom {
            width: 288px;
        }
        .cancels {
            position: absolute;
            top: 0;
            width: 30px;
            right: 13px;
        }
    }
    .nobox {
        background-color: #fff;
        padding: 14px 0 20px 0;
        .title {
            color: #333;
            font-size: 17px;
            line-height: 17px;
            margin-bottom: 11px;
        }
        .content {
            color: #999;
            font-size: 14px;
            line-height: 14px;
        }
        .button {
            width: 70%;
            padding: 12px 0;
            font-size: 17px;
            margin: 0 auto;
            border: 1px solid #84BF51;
            border-radius: 24px;
        }
        .look_it {
            background-color: #84BF51;
            color: #fff;
            margin-top: 16px;
        }
        .contiun_it {
            background-color: #fff;
            color: #84BF51;
            margin-top: 13px;
        }
    }
    .tbox {
        .scroll_box {
            height: 200px;
            overflow: scroll;
            background-color: #fff;
            .title {
                font-size: 17px;
                line-height: 17px;
                margin-top: 10px;
                color: #333;
            }
            .content {
                font-size: 14px;
                line-height: 14px;
                margin-top: 8px;
                font-size: #666;
                span {
                    color: #ff8201;
                }
            }
            .list {
                margin-top: 20px;
                .item {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    padding: 0 15px;
                    margin-bottom: 18px;
                    .item_left {
                        height: 15px;
                        width: 15px;
                        margin-right: 8px;
                    }
                    .item_right {
                        flex: 1;
                        padding: 6px 10px;
                        background-color: #FAFAFA;
                        border-radius: 4px;
                        border: 1px solid #e6e6e6;
                        .top {
                            margin-bottom: 8px;
                        }
                        .top,
                        .bottom {
                            display: flex;
                            flex-direction: row;
                            align-items: center;
                            justify-content: space-between;
                            .left {
                                display: flex;
                                flex-direction: row;
                                align-items: center;
                                .flag {
                                    margin-right: 5px;
                                    height: 16px;
                                }
                                .buy_type {
                                    height: 16px;
                                    line-height: 16px;
                                    font-size: 12px;
                                    color: #fff;
                                    padding: 0 2px;
                                    border-radius: 1px;
                                    background-color: #ff8201;
                                }
                            }
                            .right {
                                display: flex;
                                flex-direction: row;
                                align-items: center;
                                font-size: 14px;
                                span {
                                    color: #ff8201;
                                }
                                .time {
                                    height: 16px;
                                    margin-right: 4px;
                                }
                                .date {
                                    font-size: 14px;
                                }
                            }
                        }
                    }
                }
            }
        }
        .all_select {
            background-color: #F4F4F4;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding: 0 20px 0 15px;
            height: 32px;
            .left {
                display: flex;
                flex-direction: row;
                align-items: center;
                img {
                    height: 15px;
                }
                .word {
                    font-size: 14px;
                    margin-left: 9px;
                    color: #757575;
                }
            }
            .right {
                color: #757575;
                font-size: 12px;
            }
        }
        .button {
            display: flex;
            flex-direction: row;
            div {
                height: 40px;
                flex: 1;
                line-height: 40px;
            }
            .left {
                background-color: #E5E5E5;
                color: #333333;
            }
            .right {
                background-color: #84BF51;
                color: #fff;
            }
        }
    }
}
</style>
<template>
    <div>
        <div class="pop_custom">
            <div class="custom_box">
                <img src="/static/icon/pop-release-offer.png" alt="" class="custom">
                <img src="/static/icon/cancel.png" alt="" class="cancels" @click="cancelAll">
            </div>
            <div class="nobox" v-show="groomOfferList.length==0">
                <div class="title">恭喜，报价成功</div>
                <div class="content">我们将会尽快受理您的报价</div>
                <div class="button look_it" @click="lookDetail">查看报价</div>
                <div class="button contiun_it" @click="continueIt">继续报价</div>
            </div>
            <div class="tbox" v-show="groomOfferList.length!==0">
                <div class="scroll_box">
                    <div class="title">恭喜，报价成功</div>
                    <div class="content">还有<span>{{groomOfferList.length}}</span>条相同<span>{{popshow.breedName}}</span>的求购等您报价
                    </div>
                    <div class="list">
                        <div class="item" v-for="(todo,index) in groomOfferList" @click="changeSelect(index)">
                            <img src="/static/icon/select-quan.png" class="item_left" v-show="!todo.show">
                            <img src="/static/icon/select-buy-quan.png" class="item_left" v-show="todo.show">
                            <div class="item_right">
                                <div class="top">
                                    <div class="left">
                                        <img :src="todo.cFlagsPath" class="flag" v-show="todo.cFlagsPath && todo.isMy==0">
                                        <img src="/static/icon/zhongguo.png" class="flag" v-show="!todo.cFlagsPath && todo.isMy==0">
                                        <img src="/static/icon/its-mines.png" class="its_mine" v-show="todo.isMy==1">
                                        <div class="buy_type" v-show="todo.indentTypeName">{{todo.indentTypeName}}</div>
                                    </div>
                                    <div class="right">
                                        <img src="/static/icon/times.png" class="time" />
                                        <div class="date">
                                            {{todo.duedate | needTimeDay}}
                                        </div>
                                    </div>
                                </div>
                                <div class="bottom">
                                    <div class="left">
                                        需求数量: {{todo.number}}{{todo.unit}}
                                    </div>
                                    <div class="right">
                                        已报价
                                        <span>{{todo.offer}}</span>人
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="all_select">
                    <div class="left" @click="allSelect">
                        <img src="/static/icon/select-quan.png" v-show="!allOfferSelect">
                        <img src="/static/icon/select-buy-quan.png" class="item_left" v-show="allOfferSelect">
                        <div class="word">全选</div>
                    </div>
                    <div class="right">
                        已选择{{groomOfferListNum}}条
                    </div>
                </div>
                <div class="button">
                    <div class="left" @click="giveUp">放弃机会</div>
                    <div class="right" @click="confirm">抢占份额</div>
                </div>
            </div>
        </div>
        <div class="black" @click="cancel">
    
        </div>
    </div>
</template>
<script>
import common from '../../common/common.js'
import httpService from '../../common/httpService.js'
import {
    mapGetters
} from 'vuex'
export default {
    data() {
        return {
            selectedOfferId: []
        }
    },
    props: {
        popshow: {

        }
    },
    computed: {
        groomOfferList() {
            return this.$store.state.anOffer.selectOfferList;
        },
        groomOfferListNum() {
            return this.$store.state.anOffer.selectOfferNum;
        },
        allOfferSelect() {
            return this.$store.state.anOffer.allOfferSelect;
        },
    },
    methods: {
        cancel() {
            let _self = this;
            this.popshow.show = false;
        },
        allSelect() {
            let _self = this;
            _self.$store.dispatch('allSelectOfferNum')
        },
        changeSelect(index) {
            let _self = this;
            _self.$store.dispatch('changeSelectOfferNum', index)
        },
        release() {
            let _self = this;
            common.$emit('show-load');
            let url = common.addSID(common.urlCommon + common.apiUrl.most);
            let body = {
                biz_module: 'intentionOfferService',
                biz_method: 'batchOneKeyOffer',
                biz_param: {
                    intentionIdList: _self.selectedOfferId,
                    offerId: _self.popshow.offerId
                }
            };
            body.time = Date.parse(new Date()) + parseInt(common.difTime);
            body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
            httpService.cart(url, body,
                function (res) {
                    common.$emit('close-load');
                    common.$emit('message', res.data.msg)
                    if (res.data.code == '1c01') {
                        common.$emit('clearNeedSearch', '1')
                        common.$emit('selectRes', 'purchase')
                        _self.$router.push('/home')
                    }
                },
                function (err) {
                    common.$emit('close-load');
                    common.$emit('message', res.data.msg)
                })
        },
        confirm() {
            let _self = this;
            let arr = _self.groomOfferList;
            _self.selectedOfferId = [];
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].show) {
                    _self.selectedOfferId.push(arr[i].id);
                }
            }
            if (_self.selectedOfferId.length == 0) {
                console.log(6766)
                common.$emit('message', '请选择要报价的信息');
            } else {
                _self.popshow.show = false;
                _self.release();
            }
        },
        giveUp() {
            let _self = this;
            _self.popshow.show = false;
            common.$emit('clearNeedSearch', '1')
            common.$emit('selectRes', 'purchase')
            this.$router.push('/home')
        },
        lookDetail() {
            let _self = this;
            _self.popshow.show = false;
            common.$emit('inforMyOffer', 1);
            _self.$router.push('/myOffer?type=1')
        },
        continueIt() {
            let _self = this;
            _self.popshow.show = false;
            common.$emit('clearThisSearch', 1)
            _self.$router.push('/urgentNeed')
        },
        cancelAll() {
            this.popshow.show = false;
            common.$emit('clearNeedSearch', '1')
            common.$emit('selectRes', 'purchase')
            this.$router.push('/home')
        }
    },
    watch: {

    },
    mounted() {

    },
    created() {

    }
}
</script>

