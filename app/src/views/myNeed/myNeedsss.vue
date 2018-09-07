<style lang="less" scoped>
.my_needs {
    .mint-loadmore-top span {
        display: inline-block;
        transition: .2s linear;
        vertical-align: middle;
    }
    .mint-loadmore-bottom span {
        display: inline-block;
        transition: .2s linear;
        vertical-align: middle;
    }
}
.my_needs {
    height: 100vh;
    width: 100%;
    overflow: hidden;
    position: relative;
    .main {
        width: 100%;
        overflow-y: scroll;
        .list {
            .item {
                background-color: #fff;
                margin-top: 10px;
                padding-left: 10px;
                .top {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: space-between;
                    line-height: 15px;
                    padding: 10px 20px 10px 3px;
                    border-bottom: 1px solid #e6e6e6;
                    .left {
                        font-size: 13px;
                        color: #000;
                    }
                    .right {
                        font-size: 15px;
                        color: #ff8201;
                    }
                }
                .content {
                    padding: 10px 0 15px 0;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    .image {
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        justify-content: center;
                        width: 90px;
                        height: 94px;
                        overflow: hidden;
                        img {
                            width: 90px;
                            min-height: 94px;
                        }
                    }
                    .center {
                        flex: 1;
                        margin-left: 12px;
                        text-align: left;
                        .breed {
                            display: flex;
                            flex-direction: row;
                            align-items: center;
                            line-height: 17px;
                            font-size: 17px;
                            color: #000;
                            img {
                                width: 17px;
                                margin-right: 2px;
                            }
                        }
                        .spec {
                            margin-top: 12px;
                            font-size: 13px;
                            line-height: 13px;
                            color: #9A9A9A;
                        }
                        .location {
                            margin-top: 10px;
                        }
                        .price {
                            color: #FF4343;
                            font-size: 13px;
                            margin-top: 10px;
                            span {
                                font-size: 15px;
                            }
                        }
                    }
                    .right {
                        width: 135px;
                        display: flex;
                        flex-direction: row;
                        height: 94px;
                        align-items: flex-end;
                        .go_sale {
                            font-size: 15px;
                            color: #fff;
                            padding: 6px 14px;
                            background-color: #ff8201;
                            margin-right: 6px;
                            border-radius: 19px;
                        }
                        .revise {
                            background-color: #fff;
                            border: 1px solid #E7E7E7;
                            color: #999;
                        }
                        .goDetail{
                            background-color: #ff8201;
                            color:#fff;
                            font-size: 15px;
                            line-height: 16px;
                            padding: 8px 14px;
                            border-radius:16px;
                            margin:0 auto;
                        }
                    }
                    @media screen and (max-width: 320px) {
                        .right {
                            width: 110px;
                            display: flex;
                            flex-direction: row;
                            height: 94px;
                            align-items: flex-end;
                            .go_sale {
                                font-size: 13px;
                                color: #fff;
                                padding: 4px 9px;
                                background-color: #ff8201;
                                margin-right: 6px;
                                border-radius: 19px;
                            }
                            .revise {
                                background-color: #fff;
                                border: 1px solid #E7E7E7;
                                color: #999;
                            }
                            .goDetail {
                                background-color: #ff8201;
                                color: #fff;
                                font-size: 15px;
                                line-height: 16px;
                                padding: 8px 14px;
                                border-radius: 16px;
                                margin: 0 auto;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
<template>
    <div class="my_needs">
        <div>
            <myHeader :param="param"></myHeader>
            <myPurchaseSort v-on:postId="getId" :sort="sortRouter" :paramArr="sortArr"></myPurchaseSort>
        </div>
        <div class="main" ref="wrapper" :style="{ height: wrapperHeight + 'px' }" v-show="todos.length!=0">
            <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
                <div class="list">
                    <div class="item" v-for="(todo,index) in todos" >
                        <div class="top">
                            <div class="left">{{todo.pubdate | timeFormat}}</div>
                            <div class="right">{{todo.onSell | shellStatus}}</div>
                        </div>
                        <div class="content">
                            <div class="image">
                                <img :src="todo.image[0]">
                            </div>
                            <div class="center">
                                <div class="breed">
                                    <img src="/static/icon/square-zheng.png" class="zheng" v-if="todo.especial == 1 && todo.type == 1">
                                    <img src="/static/icon/square-sampling.png" class="sampling" v-if="todo.sampling == 1 && todo.type == 1">
                                    <div class="breed_name">{{todo.breedName,3 | filterTxt}}</div>
                                </div>
                                <div class="spec">规格: {{todo.spec,4 | filterTxt}}</div>
                                <div class="spec location">规格: {{todo.location,4 | filterTxt}}</div>
                                <div class="price">￥
                                    <span>{{todo.price}}/</span>{{todo.unit}}</div>
                            </div>
                            <div class="right" v-show="todo.onSell==0 || todo.onSell==-2 || todo.onSell==4">
                                <div class="go_sale" @click="goSale(todo.id)">上架</div>
                                <div class="go_sale revise" @click.stop="jumpRevise(todo.id)">编辑</div>
                            </div>
                            <div class="right" v-show="todo.onSell==1 || todo.onSell==2" @click="jumpDetail(router,todo.id)">
                                <div class="goDetail" >查看详情</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div slot="top" class="mint-loadmore-top">
                    <span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">↓</span>
                    <span v-show="topStatus === 'loading'">
                        <mt-spinner type="snake"></mt-spinner>
                    </span>
                </div>
                <div slot="bottom" class="mint-loadmore-bottom">
                    <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }"></span>
                    <span v-show="bottomStatus === 'loading'">
                        <mt-spinner type="snake"></mt-spinner>
                    </span>
                </div>
            </mt-loadmore>
        </div>
        <errPage :param="err" v-show="todos.length==0"></errPage>
    </div>
</template>
<script>
import common from '../../common/common.js'
import searchInput from '../../components/tools/inputSearch'
import myHeader from '../../components/header/myHeader'
import myPurchaseSort from '../../components/tools/myPurchaseSort'
import httpService from '../../common/httpService.js'
import filters from '../../filters/filters'
import errPage from '../../components/tools/err'
export default {
    data() {
        return {
            scrollTop: 0,
            err: {
                err: "很抱歉，没有找到相关资源",
                url: '/static/icons/maomao.png'
            },
            sortRouter: 'home',
            param: {
                name: '我的求购',
                router: 'home'
            },
            sortArr: [{
                name: '发布日期',
                asc: 'top',
                url: '/static/icons/drop_down.png',
                saveName: '发布日期',
                class: 'sort_content_detail',
                sortArr: [{
                    name: '由新到旧',
                    asc: 'low',
                    show: false,
                    pubdate: 2,
                    key: 'pubdate'
                }, {
                    name: '由旧到新',
                    asc: 'top',
                    show: false,
                    pubdate: 1,
                    key: 'pubdate'
                }, {
                    name: '全部',
                    asc: '',
                    show: false,
                    pubdate: 0,
                    key: 'pubdate'
                }]
            }, {
                name: '报价人数',
                asc: 'top',
                url: '/static/icons/drop_down.png',
                saveName: '报价人数',
                class: 'sort_content_detail',
                sortArr: [{
                    name: '由少到多',
                    asc: 'low',
                    show: false,
                    offer: 1,
                    key: 'offer'
                }, {
                    name: '由多到少',
                    asc: 'top',
                    show: false,
                    offer: 2,
                    key: 'offer'
                }, {
                    name: '全部',
                    asc: '',
                    show: false,
                    offer: 0,
                    key: 'offer'
                }]
            }, {
                name: '剩余时间',
                asc: 'top',
                url: '/static/icons/drop_down.png',
                saveName: '剩余时间',
                class: 'sort_content_detail',
                sortArr: [{
                    name: '由短到长',
                    asc: 'low',
                    show: false,
                    duedate: 1,
                    key: 'duedate'
                }, {
                    name: '由长到短',
                    asc: 'top',
                    show: false,
                    duedate: 0,
                    key: 'duedate'
                }, {
                    name: '全部',
                    asc: '',
                    show: false,
                    duedate: '',
                    key: 'duedate'
                }]
            }, {
                name: '上架状态',
                asc: 'top',
                url: '/static/icons/drop_down.png',
                saveName: '上架状态',
                class: 'sort_content_detail',
                sortArr: [{
                    name: '未上架',
                    asc: 'low',
                    show: false,
                    testing: 0,
                    key: 'testing'
                }, {
                    name: '上架申请中',
                    asc: 'low',
                    show: false,
                    testing: 1,
                    key: 'testing'
                }, {
                    name: '已上架',
                    asc: 'top',
                    show: false,
                    testing: 2,
                    key: 'testing'
                }, {
                    name: '上架失败',
                    asc: 'low',
                    show: false,
                    testing: -2,
                    key: 'testing'
                }, {
                    name: '已下架',
                    asc: 'low',
                    show: false,
                    testing: 4,
                    key: 'testing'
                }, {
                    name: '全部',
                    asc: '',
                    show: false,
                    testing: '',
                    key: 'testing'
                }]
            }],
            router: "/needDetails",
            // other_router: "revisePurchase",
            other_router: "releaseNeed",
            todos: [],
            topStatus: '',
            wrapperHeight: 0,
            allLoaded: false,
            bottomStatus: '',
            httpPraram: {
                pubdate: 0,
                offer: 0,
                duedate: 0,
                testing: 0,
                page: 1,
                pageSize: 10
            }
        }
    },
    components: {
        searchInput,
        myPurchaseSort,
        myHeader,
        errPage
    },
    filters: (filters, {

    }),
    methods: {
        getHttp(back) {
            let _self = this;
            if (_self.httpPraram.page == 1) {
                _self.allLoaded = false;
            }
            common.$emit('show-load');
            let url = common.addSID(common.urlCommon + common.apiUrl.most);
            let body = {
                biz_module: 'intentionService',
                biz_method: 'myBegIntentionList',
                biz_param: {
                    sort: {
                        "offer": _self.httpPraram.offer,
                        "pubdate": _self.httpPraram.pubdate,
                        "duedate": _self.httpPraram.duedate
                    },
                    onSell: _self.httpPraram.testing,
                    pn: _self.httpPraram.page,
                    pSize: _self.httpPraram.pageSize
                }
            };
            body.time = Date.parse(new Date()) + parseInt(common.difTime);
            body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
            httpService.myResource(url, body, function (suc) {
                common.$emit('close-load');

                if (_self.httpPraram.page == 1) {
                    _self.todos.splice(0, _self.todos.length);
                }
                let result = suc.data.biz_result.list;
                //console.log(result);
                if (suc.data.code == '1c01') {
                    for (var i = 0; i < result.length; i++) {
                        _self.todos.push(result[i]);
                    }
                    if (result.length < _self.httpPraram.pageSize) {
                        _self.allLoaded = true;
                    }
                } else {
                    common.$emit('message', suc.data.msg);
                }
                if (back) {
                    back();
                }
            }, function (err) {
                common.$emit('close-load');
                if (back) {
                    back();
                }
            })
        },
         goSale(id){
            let _self = this;
            common.$emit('show-load');
            let url = common.addSID(common.urlCommon + common.apiUrl.most);
            let body = {
                biz_module: 'intentionService',
                biz_method: 'applyOnSell',
                biz_param: {
                    intentionId:id
                }
            };
            body.time = Date.parse(new Date()) + parseInt(common.difTime);
            body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
            httpService.supplyRelease(url, body, function (suc) {
                common.$emit('close-load');
                console.log(suc);
                if (suc.data.code == '1c01') {
                   common.$emit('message', suc.data.msg);
                } else {
                    common.$emit('message', suc.data.msg);
                }
            }, function (err) {
                common.$emit('close-load');
                common.$emit('message', err.data.msg);
            })
        },
        jumpRevise(id){
            common.$emit('purchase-id', id);
            this.$router.push('/releaseNeeds/' + id);
        },
        getId(param) {
            let _self = this;
            _self.httpPraram.page = 1;
            _self.httpPraram[param.key] = param[param.key];
            _self.getHttp()
        },
        jumpDetail: function (router, id) {
            common.$emit("needToDetails", {
                id: id,
                type: 'my'
            });
            this.$router.push(router + '/' + id + '?type=my');
        },
        handleBottomChange(status) {
            this.bottomStatus = status;
        },
        loadBottom(id) {
            let _self = this;
            setTimeout(() => {
                if (_self.todos.length < _self.httpPraram.page * _self.httpPraram.pageSize) {
                    _self.allLoaded = true;
                } else {
                    _self.httpPraram.page++;
                    _self.getHttp(function () {
                        _self.$refs.loadmore.onBottomLoaded(id);
                    });
                }
            }, 500);
        },
        disTime: function (duedate) {
            var now = new Date().getTime();
            console.log(now);
            var endDate = new Date(duedate).getTime();
            console.log(endDate);
            var dis = now - endDate;
            console.log(dis);
            if (dis < 0) {
                return true;
            } else {
                return false;
            }
        },
        handleTopChange(status) {
            this.topStatus = status;
        },
        loadTop(id) {
            let _self = this;
            setTimeout(() => {
                _self.httpPraram.page = 1;
                _self.getHttp(function () {
                    _self.$refs.loadmore.onTopLoaded(id);
                });

            }, 500);
        },
        handleScroll() {
            this.scrollTop = this.$refs.wrapper.scrollTop;
        },
        getScrollTop() {
            this.$refs.wrapper.scrollTop = this.scrollTop;
        }
    },
    watch: {
        '$route': 'getScrollTop'
    },
    created() {
        let _self = this;
        _self.getHttp();
        common.$on('informMyPurchase', function (item) {
            _self.httpPraram.page = 1;
            _self.getHttp();
        });
        // common.$on("revisePurtoPur", function(item) {
        //     _self.httpPraram.page = 1;
        //     _self.getHttp();
        // })
    },
    mounted() {
        this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top - 90;
        this.$refs.wrapper.addEventListener('scroll', this.handleScroll);
    }

}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
