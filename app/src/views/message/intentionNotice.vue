<style lang="less" scoped>
input[type="text"],
input[type="submit"],
input[type="reset"],
select,
textarea {
    -webkit-appearance: none;
    border-radius: 0;
}

input {
    border: none;
}

.intentions {
    height: 100vh;
    background-color: #F5F5F5;
    .box {
        .is_read {
            opacity: 0.9;
        }
        .word_read {
            opacity: 0.7;
        }
        height: 92vh;
        overflow-y: scroll;
        padding: 0 15px;
        .item {
            margin-bottom: 7px;
            .top {
                color: #A6A6A6;
                font-size: 12px;
                height: 33px;
                line-height: 33px;
            }
            .main {
                text-align: left;
                border-radius: 4px;
                background-color: #fff;
                padding: 10px 10px 11px 10px;
                .content {
                    padding: 9px 4px 18px 4px;
                    color: #4D4D4D;
                    font-weight: bold;
                    font-size: 15px;
                    line-height: 20px;
                    border-bottom: 1px solid #E6E6E6;
                }
                .footer {
                    .delet {
                        color: red;
                    }
                    padding: 9px 4px 0px 4px;
                    color: #999999;
                    font-size: 15px;
                    position: relative;
                    .right {
                        position: absolute;
                        height: 14px;
                        top: 12px;
                        right: 0;
                    }
                }
            }
        }
    }
    .box {
        .fbox {
            margin-top: 100px;
            .no_message {
                width: 83px;
            }
            .words {
                font-size: 14px;
                color: #D0D0D0;
                text-align: center;
                margin-top: 10px;
            }
        }
    }
}
</style>
<template>
    <div class="intentions">
        <userHead :param="paramHead"></userHead>
        <div class="box"  v-show="arr.length !== 0" ref="wrapper">
            <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
                <div style="min-height:80vh">
                    <div class="item" v-for="todo in arr" @click="jump(todo)">
                        <div class="top">{{todo.creatTime | successTimeFormats}}</div>
                        <div class="main" v-bind:class="{is_read:todo.isRead==1}">
                            <div class="content" v-bind:class="{word_read:todo.isRead==1}">
                                {{todo.message}}
                            </div>
                            <div class="footer" v-bind:class="{word_read:todo.isRead==1}">
                                <span class="delet" v-if='paramHead.show' @click.stop="delet(todo)">删除</span>
                                <span v-show="todo.intentionType=='0' && !paramHead.show">查看详情</span>
                                <span v-show="todo.intentionType=='1' && !paramHead.show">查看详情</span>
                                <img src="/static/icon/right.png" class="right">
                            </div>
                        </div>
                    </div>
                </div>
            </mt-loadmore>
        </div>
        <div class="box" v-show="arr.length == 0">
            <div class="fbox">
                <img src="/static/icon/no-message.png" class="no_message">
                <div class="words">
                    亲，暂时没有消息哦！
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import common from '../../common/common.js'
import validation from '../../validation/validation.js'
import httpService from '../../common/httpService.js'
import filters from '../../filters/filters'
import userHead from '../../components/user/userHead'
export default {
    data() {
        return {
            paramHead: {
                name: '意向消息',
                revise: true,
                show: false,
                message: true
            },
            arr: [],
            topStatus: '',
            wrapperHeight: 0,
            allLoaded: false,
            bottomStatus: '',
            param: {
                pn: 1,
                pSize: 20
            },
            scrollTop: 0
        }
    },
    components: {
        userHead
    },
    created() {
        let _self = this;
        _self.getHttp();
        common.$on('messageDetail', function (id) {
            if (id == '1') {
                _self.getHttp();
            }
        })
    },
    watch: {
        '$route': 'getScrollTop',
    },
    methods: {
        getHttp(back) {
            let _self = this;
            common.$emit('show-load');
            let url = common.addSID(common.urlCommon + common.apiUrl.most);
            let body = {
                biz_module: 'pushService',
                biz_method: 'myMessagePushList',
                biz_param: {
                    type: 1,
                    pn: _self.param.pn,
                    pSize: _self.param.pSize
                }
            };
            body.time = Date.parse(new Date()) + parseInt(common.difTime);
            body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
            httpService.myResource(url, body, function (suc) {
                common.$emit('close-load');
                if (_self.param.pn == 1) {
                    _self.arr.splice(0, _self.arr.length);
                }
                let result = suc.data.biz_result.list;
                if (suc.data.code == '1c01') {
                    for (var i = 0; i < result.length; i++) {
                        _self.arr.push(result[i]);
                    }
                } else {
                    common.$emit('message', suc.data.msg);
                }
                if (result.length < _self.param.pSize) {
                    _self.allLoaded = true;
                }
                if (back) {
                    back();
                }
            }, function (err) {
                common.$emit('close-load');
                common.$emit('message', err.data.msg);
                if (back) {
                    back();
                }
            })
        },
        handleBottomChange(status) {
            this.bottomStatus = status;
        },
        loadBottom(id) {
            let _self = this;
            console.log(21323)
            setTimeout(() => {
                if (this.arr.length < this.param.pn * this.param.pSize) {
                    this.allLoaded = true;
                } else {
                    this.param.pn++;
                    this.getHttp(function () {
                        _self.$refs.loadmore.onBottomLoaded(id);
                    });
                }
            }, 500);
        },
        handleTopChange(status) {
            this.topStatus = status;
        },
        loadTop(id) {
            let _self = this;
            setTimeout(() => {
                _self.param.pn = 1;
                _self.getHttp(function () {
                    _self.$refs.loadmore.onTopLoaded(id);
                });
            }, 500);
        },
        delet(todo) {
            let _self = this;
            let arr = [];
            arr.push(todo.id);
            common.$emit('show-load');
            let url = common.addSID(common.urlCommon + common.apiUrl.most);
            let body = {
                biz_module: 'pushService',
                biz_method: 'deleteMyMessage',
                biz_param: {
                    messageList: arr
                }
            };
            body.time = Date.parse(new Date()) + parseInt(common.difTime);
            body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
            httpService.myResource(url, body, function (suc) {
                common.$emit('close-load');
                if (suc.data.code == '1c01') {
                    common.$emit('message', suc.data.msg);
                    console.log(1212)
                    _self.getHttp();
                } else {
                    common.$emit('message', suc.data.msg);
                }

            }, function (err) {
                common.$emit('close-load');
                common.$emit('message', err.data.msg);
            })
        },
        isRead(id) {
            let _self = this;
            common.$emit('show-load');
            let url = common.addSID(common.urlCommon + common.apiUrl.most);
            let body = {
                biz_module: 'pushService',
                biz_method: 'setMessageIsRead',
                biz_param: {
                    isReadList: [id]
                }
            };
            body.time = Date.parse(new Date()) + parseInt(common.difTime);
            body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
            httpService.myResource(url, body, function (suc) {
                common.$emit('close-load');
                if (suc.data.code == '1c01') {
                    _self.getHttp()
                    // common.$emit('message', suc.data.msg);
                } else {
                    common.$emit('message', suc.data.msg);
                }
            }, function (err) {
                common.$emit('close-load');
                common.$emit('message', err.data.msg);
            })
        },
        jump(todo) {
            let _self = this; 
            _self.isRead(todo.id);
            if (todo.intentionType == '0') {
                common.$emit("needToDetails", {
                    id: todo.intentionId,
                });
                _self.$router.push('/needDetails/' + todo.intentionId);
            } else if (todo.intentionType == '1') {
                common.$emit("resourceDetail", todo.intentionId);
                this.$router.push("/resourceDetail/" + todo.intentionId);
            }
        },
        handleScroll() {
            this.scrollTop = this.$refs.wrapper.scrollTop;
        },
        getScrollTop() {
            this.$refs.wrapper.scrollTop = this.scrollTop;
        },
    },
    mounted() {
        this.$refs.wrapper.addEventListener('scroll', this.handleScroll); 
    }
}
</script>
