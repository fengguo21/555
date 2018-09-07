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

.system_message {
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
        padding: 0 10px;
        .item {
            text-align: left;
            background-color: #fff;
            border-radius: 5px;
            margin-top: 27px;
            padding: 0 8px 0 8px;

            .question {
                padding: 20px 0 10px 0;
                border-bottom: 1px solid #E6E6E6;
                .top {
                    display: flex;
                    flex-direction: row;
                    img {
                        width: 19px;
                        height: 19px;
                        margin: 2px 7px 0 4px;
                    }
                    .word {
                        width: 90%;
                        font-size: 15px;
                        color: #4c4c4c;
                        word-wrap: break-word;
                    }
                }
                .bottom {
                    padding-left: 30px;
                    font-size: 12px;
                    color: #999;
                    margin-top: 8px;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    .delet {
                        color: red;
                    }
                }
            }
            .noborder{
            	border: 0;
            }
            .answer {
                border: none;
                padding-bottom: 20px;
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
    <div class="system_message">
        <userHead :param="paramHead"></userHead>
        <div class="box" v-show="arr.length !== 0" ref="wrapper">
            <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
                <div style="min-height:80vh">
                    <div class="item" v-for="todo in arr" v-bind:class="{word_read:todo.isRead==1}">
                        <div class="question"  v-if="todo.suggestType==1">
                            <div class="top">
                                <img src="/static/icon/question.png" alt="">
                                <div class="word">{{todo.content}}</div>
                            </div>
                        </div>
                        <div class="question noborder" v-if="todo.suggestType==2">
                            <div class="top" >
                                <img src="/static/icon/new/v_c.png" v-if="todo.validate ==2 && todo.ucType ==1" alt="">
                                <img src="/static/icon/new/v_p.png" v-if="todo.validate ==2 && todo.ucType ==0" alt="">
                                <img src="/static/icon/new/v_n.png" v-if="todo.validate !==2 " alt="">
                                <div class="word">{{todo.message}}</div>
                            </div>
                            <div class="" v-show="todo.suggestType==2" >
                            <div class="bottom">
                                <div class="time">
                                    		认证时间: {{todo.creatTime | successTimeFormats}}
                                </div>
                                <div class="delet" v-if="paramHead.show" @click.stop="delet(todo)">删除</div>
                            </div>
                        </div>
                            
                        </div>
                        <div class="question answer" v-show="todo.suggestType==1" >
                            <div class="top">
                                <img src="/static/icon/answer.png" alt="">
                                <div class="word">{{todo.response}}</div>
                            </div>
                            <div class="bottom">
                                <div class="time">
                                    		回复时间: {{todo.utime | successTimeFormats}}
                                </div>
                                <div class="delet" v-if="paramHead.show" @click.stop="delet(todo)">删除</div>
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
                name: '系统消息',
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
    watch: {
        '$route': 'getScrollTop'
    },
    created() {
        let _self = this;
        _self.getHttp();
        common.$on('messageDetail', function (id) {
            if (id == '5') {
                _self.getHttp();
            }
        })
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
                    type: 5,
                    pn: _self.param.pn,
                    pSize: _self.param.pSize
                }
            };
            body.time = Date.parse(new Date()) + parseInt(common.difTime);
            body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
            httpService.myResource(url, body, function (suc) {
            	console.log(suc.data)
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
            // if (todo.intentionType == '0') {
            //     common.$emit("needToDetails", {
            //         id: todo.intentionId,        
            //     });
            //     _self.$router.push('/needDetails/' + todo.intentionId);
            // } else if (todo.intentionType == '1') {
            //     common.$emit("resourceDetail", todo.intentionId);
            //     this.$router.push("/resourceDetail/" + todo.intentionId);
            // }
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
