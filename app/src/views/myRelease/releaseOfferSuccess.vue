<style lang="less" scoped>
input[type="text"],
input[type="submit"],
input[type="reset"],
select,
textarea {
    -webkit-appearance: none;
    border-radius: 0;
}

input,
textarea {
    border: none;
    background-color: #fff;
}

.release_offer {
    position: relative;
    .main {
        overflow: hidden;
    }
    @media screen {
        .top_box {
            width: 100%;
            padding: 40px 0 0 0;
            .gou {
                width: 42px;
            }
            .word {
                margin-top: 10px;
            }
            .one {
                font-size: 19px;
                color: #28b54c;
                line-height: 19px;
            }
            .two {
                font-size: 15px;
                color: #999;
                line-height: 15px;
            }
            .button_box {
                margin: 20px auto 0 auto;
                width: 266px;
                display: flex;
                flex-direction: row;
                .button {
                    flex: 1;
                    font-size: 16px;
                    line-height: 16px;
                    padding: 10px 0;
                    border-radius: 18px;
                    color: #fff;
                }
                .left {
                    background-color: #f5c01c;
                    margin-right: 12px;
                }
                .right {
                    background-color: #ff8201;
                    margin-left: 12px;
                }
            }
        }
        .title {
            font-size: 17px;
            line-height: 17px;
            text-align: left;
            margin-top: 45px;
            padding: 7px 0 7px 13px;
            border-bottom: 1px solid #e6e6e6;
        }
        .footer {
            height: 227px;
            overflow-y: scroll;
            border-bottom: 1px solid #e6e6e6;
        }
    }
    @media screen and (max-height: 568px) {
        .top_box {
            padding: 20px 0 0 0;
        }
        .title {
            margin-top: 15px;
        }
        .footer {
            height: 199px;
            overflow-y: scroll;
        }
    }
    @media screen and (max-height: 480px) {
        .top_box {
            .button_box {
                margin-top: 10px;
            }
        }
        .footer {
            height: 149px;
            overflow-y: scroll;
        }
    }
    .footer {
        background-color: #fff;
        padding-left: 25px;
        .item {
            height: 57px;
            border-bottom: 1px solid #e6e6e6;
            display: flex;
            flex-direction: row;
            align-items: center;
            @media screen {
                .breedname {
                    text-align: left;
                    font-size: 16px;
                    color: #333;
                    width: 110px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    span {
                        font-size: 13px;
                        color: #ff8201;
                    }
                }
                .spec {
                    flex: 2;
                    font-size: 16px;
                }
                .province {
                    flex: 1;
                    font-size: 16px;
                }
                .go_release {
                    height: 30px;
                    width: 70px;
                    border: 1px solid #ff8201;
                    border-radius: 15px;
                    color: #ff8201;
                    line-height: 30px;
                    margin: 0 15px 0 10px;
                }
            }
            @media screen and (max-width: 320px) {
                .breedname {
                    width: 90px;
                    font-size: 15px;
                }
                .spec {
                    flex: 3;
                    font-size: 15px;
                }
                .province {
                    flex: 2;
                    font-size: 15px;
                }
                .go_release {
                    height: 30px;
                    width: 70px;
                    border: 1px solid #ff8201;
                    border-radius: 15px;
                    color: #ff8201;
                    line-height: 30px;
                    margin: 0 5px 0 5px;
                }
            }
        }
        @media screen and (max-height: 480px) {
            .item {
                height: 50px;
            }
        }
        @media screen and (max-height: 568px) {
            .item {
                height: 50px;
            }
        }
    }
}
</style>
<template>
    <div class="release_offer">
        <myHeader :param="param"></myHeader>
        <div class="page-loadmore-wrapper main" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
            <div class="top_box">
                <img src="/static/icon/gou.png" class="gou">
                <div class="word one">报价已成功</div>
                <div class="word two">我们将会尽快受理您的报价</div>
                <div class="button_box">
                    <div class="button left" @click="lookList">查看报价</div>
                    <div class="button right" @click="goUrgent">继续报价</div>
                </div>
            </div>
            <div class="title">
                推荐求购
            </div>
            <div class="footer">
                <div class="item" v-for="todo in todos">
                    <div class="breedname">
                        {{todo.breedName}}
                        <span>{{todo.number}}({{todo.unit}})</span>
                    </div>
                    <div class="spec">
                        {{todo.spec,4 | filterTxt}}
                    </div>
                    <div class="province">
                        {{todo.province,2 | filterTxt}}
                    </div>
                    <div class="go_release" @click="goNeedDetail(todo.id)">
                        去报价
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import common from '../../common/common.js'
import validation from '../../validation/validation.js'
import httpService from '../../common/httpService.js'
import myHeader from '../../components/header/myHeader'
export default {
    data() {
        return {
            param: {
                name: '完成报价',
                // backNeed: true,
                // backRouter: '/urgentNeed'
            },
            id: '',
            todos: []
        }
    },
    methods: {
        getHttp(id) {
            let _self = this;
            common.$emit('show-load');
            let url = common.urlCommon + common.apiUrl.most;
            let body = {
                biz_module: 'intentionService',
                biz_method: 'sameTypeIntentionList',
                biz_param: {
                    offerId: id,
                    pn: 1,
                    pSize: 5
                }
            }
            if (common.KEY) {
                url = common.addSID(common.urlCommon + common.apiUrl.most);
                body.version = 1;
                body.time = Date.parse(new Date()) + parseInt(common.difTime);
                body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
            }
            httpService.myAttention(url, body, function (suc) {
                common.$emit('close-load');
                let result = suc.data.biz_result;
                console.log(44, result)
                if (suc.data.code == '1c01') {
                    _self.todos = result.list;
                } else {
                    common.$emit('message', suc.data.msg);
                }
            }, function (err) {
                common.$emit('close-load');
                common.$emit('message', err.data.msg);
            })
        },
        lookList() {
            let _self = this;
            common.$emit('inforMyOffer', 1);
            common.$emit('setParam','skipLogin',true);
            _self.$router.replace('/myOffer');
        },
        goUrgent() {
            let _self = this;
            common.$emit('Urgentneed', {
                keyWord: ''
            })
            common.$emit('setParam','backHome',true);
            _self.$router.replace('/urgentNeed')
        },
        goNeedDetail(id) {
            let _self = this;
            common.$emit("needToDetails", {
                id: id,
                type: 'my'
            });
            this.$router.replace('needDetails/' + id + '?type=my');
        }
    },
    components: {
        myHeader,

    },
    created() {
        let _self = this;
        _self.id = _self.$route.query.type.split(';')[0];
        let back = _self.$route.query.type.split(';')[1];
        _self.getHttp(_self.id)
        common.$on('inforReleaseOfferSuccess', function (type) {
            _self.id = type.id;
            _self.getHttp(type.id);      
        })
    },
    mounted() {
        this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    }
}
</script>
