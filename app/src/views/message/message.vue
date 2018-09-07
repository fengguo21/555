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

.message {
    height: 100vh;
    background-color: #fff;
    .box {
        height: 92vh;
        .inbox {
            padding: 15px;
            display: flex;
            flex-direction: row;
            border-bottom: 1px solid #E8E8E8;
            .image {
                position: relative;
                .img {
                    width: 42px;
                    height: 42px;
                }
                .red {
                    position: absolute;
                    width: 9px;
                    height: 9px;
                    right: 0;
                    top: 0;
                }
            }
            .content {
                text-align: left;
                padding-left: 15px;
                .title {
                    font-weight: bold;
                    font-size: 16px;
                    line-height: 16px;
                    color: #1A1A1A;
                }
                @media screen {
                    .other {
                        font-size: 12px;
                        line-height: 15px;
                        margin-top: 10px;
                        color: #808080;
                    }
                    @media (max-width: 320px) {
                        .other {
                            font-size: 11px;
                            line-height: 15px;
                            margin-top: 10px;
                            color: #808080;
                        }
                    }
                }
            }
        }
    }
    .sbox {
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
    <div class="message">
        <userHead :param="paramHead"></userHead>
        <div class="box" v-if="arr.length !== 0">
            <div class="inbox" v-for="(todo,index) in arr" @click="jump(todo)">
                <div class="image">
                    <img :src="todo.url" class="img">
                    <img src="/static/icon/i-red.png" class="red" v-show="todo.isRead == '0'">
                </div>
                <div class="content">
                    <div class="title">{{todo.name}}</div>
                    <div class="other" v-show="todo.total!==0">{{todo.content}}</div>
                    <div class="other" v-show="todo.total==0">{{todo.nohave}}</div>
                </div>
            </div>
        </div>
        <div class="sbox" v-if="arr.length == 0">
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
                    name: '消息中心',
                    index: true
                },
                arr: []
            }
        },
        components: {
            userHead
        },
        created() {
            let _self = this;
            common.$on('indexToMessage', function(id) {
                console.log(212131)
                _self.getHttp();
            })
            _self.getHttp();
        },
        methods: {
            getHttp() {
                let _self = this;
                common.$emit('show-load');
                let url = common.addSID(common.urlCommon + common.apiUrl.most);
                let body = {
                    biz_module: 'pushService',
                    biz_method: 'pushMessageList',
                    biz_param: {

                    }
                };
                body.time = Date.parse(new Date()) + parseInt(common.difTime);
                body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
                httpService.myResource(url, body, function(suc) {
                    common.$emit('close-load');
                    if (suc.data.code == '1c01') {
                        let result = suc.body.biz_result.list;
                        _self.arr = [];
                        for (var i = 0; i < result.length; i++) {
                            let obj = {
                                name: result[i].name,
                                isRead: result[i].isRead,
                                total: result[i].total,
                                type: result[i].type,
                                url: '',
                                content: '',
                                nohave: ''
                            }
                            switch (obj.type) {
                                case 1:
                                    obj.url = '/static/icon/intent.png';
                                    obj.content = '意向信息已更新' + obj.total + '条，赶紧点击查看吧。';
                                    obj.nohave = '暂无意向消息更新';
                                    break;
                                case 2:
                                    obj.url = '/static/icon/i-activity.png';
                                    obj.content = '我们给您推送了新的活动消息，赶快来体验吧。';
                                    obj.nohave = '我们马上会有新活动推出，敬请期待。';
                                    break;
                                case 3:
                                    obj.url = '/static/icon/i-order.png';
                                    obj.content = '您的订单状态已有' + obj.total + '条更新啦，快点击查看吧。';
                                    obj.nohave = '暂时没有订单反馈新消息';
                                    break;
                                case 4:
                                    obj.url = '/static/icon/i-report-sell.png';
                                    obj.content = '您有' + obj.total + '条报价反馈新消息，快点击查看吧。';
                                    obj.nohave = '暂时没有报价反馈新消息';
                                    break;
                                case 5:
                                    obj.url = '/static/icon/system-message.png';
                                    obj.content = '您有' + obj.total + '条系统消息，快点击查看吧';
                                    obj.nohave = '暂时没有新的系统消息';
                                    break;
                                default:
                                    obj.url = ''
                            }
                            _self.arr.push(obj);
                        }
                        console.log(33, _self.arr)
                    } else {
                        common.$emit('message', suc.data.msg);
                    }

                }, function(err) {
                    common.$emit('close-load');
                    common.$emit('message', err.data.msg);
                })
            },
            jump(todo) {
                let _self = this;
                let router = '';
                switch (todo.type) {
                    case 1:
                        router = '/intentionNotice';
                        break;
                    case 2:
                        router = '/activityNotice';
                        break;
                    case 3:
                        router = '/orderNotice';
                        break;
                    case 4:
                        router = '/sayPriceNotice';
                        break;
                    case 5:
                        router = '/systemMessage';
                        break;
                }
                if (router) {
                    this.$router.push(router + '?type=' + todo.type);
                    common.$emit('messageDetail', todo.type);
                }

            }
        },
        mounted() {

        }
}
</script>
