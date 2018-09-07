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

.perfect_id {
    background-color: #F5F5F5;
    position: relative;
    height: 100vh;
    .box {
        background-color: #F5F5F5;
        padding-top: 20px;
        padding-bottom: 30px;
        height: 92vh;
        overflow-y: auto;
    }
    .title_1 {
        padding-top: 20px;
        font-size: 17px;
        color: #0C9E4C;
        line-height: 17px;
    }
    .title_2 {
        font-size: 14px;
        line-height: 14px;
        color: #808080;
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .search_box {
        background-color: #fff;
        padding: 18px 13px;
        .search {
            padding: 7px 13px;
            border: 1px solid #ccc;
            border-radius: 17px;
            display: flex;
            flex-direction: row;
            position: relative;
            .icon {
                height: 20px;
            }
            .cancel {
                height: 20px;
            }
            input {
                flex: 1;
                margin-left: 10px;
            }
            .data {
                position: absolute;
                left: 0;
                z-index: 30;
                width: 100%;
                height: 220px;
                overflow-y: scroll;
                text-align: left;
                background-color: #fff;
                top: 36px;
                .search_data {
                    background-color: #e6e6e6;
                    font-size: 15px;
                    color: #000;
                    padding: 5px 10px;
                }
            }
        }
        .selected {
            font-size: 15px;
            background-color: #fff;
            padding: 0px;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            .todo {
                padding: 6px 13px;
                background-color: #fff;
                border: 1px solid #FF0000;
                border-radius: 3px;
                margin-left: 17px;
                margin-top: 14px;
                color: #FF0000;
                position: relative;
                img {
                    position: absolute;
                    height: 16px;
                    right: -8px;
                    top: -8px;
                }
            }
        }
    }
    .hot {
        .title {
            text-align: left;
            padding: 13px 17px;
            font-size: 16px;
            color: #000;
            span {
                font-size: 14px;
                color: #666;
            }
        }
        .main {
            font-size: 15px;
            background-color: #fff;
            padding: 15px 17px 10px 9px;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            .item {
                padding: 6px 13px;
                background-color: #F5F5F5;
                border-radius: 3px;
                margin-left: 17px;
                margin-bottom: 14px;
                color: #888888;
            }
            .active {
                background: #F5F5F5 url('/static/icon/red-selected.png') no-repeat;
                background-size: 20px 12px;
                background-position: bottom right;
            }
        }
    }
    .footer {
        height: 8vh;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        font-size: 15px;
        color: #fff;
        div {
            flex: 1;
            height: 100%;
            line-height: 8vh;
        }
        .back {
            background-color: #FFC600;
        }
        .next {
            background-color: #ff8201;
        }
    }
}
</style>
<template>
    <div class="perfect_id">
        <div class="box">
            <div class="title_1">您主要经营什么品种</div>
            <div class="title_2">我们会实时推送相关订单至您的手机</div>
            <div class="search_box">
                <div class="search">
                    <img src="/static/icons/search.png" class="icon">
                    <input type="text" placeholder="输入品种后，点击出现的选项" v-model="value">
                    <img src="/static/icon/cancels.png" class="cancel" v-show="value" @click="clear">
                    <div class="data" v-if="datas.length > 0 && value">
                        <div class="search_data" v-for="todo in datas" @click="getSearch(todo)">
                            {{todo.breedName}}
                        </div>
                    </div>
                </div>
                <div class="selected" v-if="arr.length > 0">
                    <div class="todo" v-for="todo in arr">
                        {{todo,5 | filterTxt}}
                        <img src="/static/icon/red-canel.png" @click="clearArr(todo)">
                    </div>
                </div>
            </div>
            <div class="hot">
                <div class="title">
                    热门药材
                    <span>(最少一个品种，最多十个品种)</span>
                </div>
                <div class="main">
                    <div class="item" v-for="todo in todos" @click="selected(todo)" v-bind:class="{active:todo.show}">
                        {{todo.keyWord}}
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="back" @click="back" v-if="!mainBusiness.router">返回上一步</div>
            <div class="next" @click="next" v-if="!mainBusiness.router">完成注册</div>
            <div class="back" @click="back" v-if="mainBusiness.router == '/account'">返回</div>
            <div class="next" @click="goAccout" v-if="mainBusiness.router == '/account'">保存</div>
        </div>
        <perfectSuccess :popup="popup" v-on:goHome="goHome" v-on:goNeed="goNeed" v-if="popup"></perfectSuccess>
        <!-- <div class="price_popup" v-show="popup">
                    <div class="pop_box">
                        <img src="/static/icon/pop-up-price.png" alt="" class="pop_img">
                        <div class="button_box">
                            <div class="button left" @click="goNeed">立即前往</div>
                            <div class="button right" @click="goHome">随便逛逛</div>
                        </div>
                    </div>
                </div>
                <div class="black" v-show="popup">
            
                </div> -->
    </div>
</template>
<script>
import common from '../../common/common.js'
import validation from '../../validation/validation.js'
import httpService from '../../common/httpService.js'
import perfectSuccess from '../../components/popUpType/perfectSuccess'
import {
    mapGetters
} from 'vuex'
export default {
    data() {
        return {
            value: '',
            todos: [],
            arr: [],
            datas: [],
            upDataInfor: {
                gender: '',
                fullname: '',
                phone: '',
                birthday: '',
                company: '',
                companyShort: '',
                bizMain: '',
                avatar: '',
                companyJob: '',
                invoice: '',
                userType: '',
                manageType: ''

            },
            register: false,
            popup: false
        }
    },
    components: {
        perfectSuccess
    },
    created() {
        let _self = this;
        if (this.$route.query.value) {
            _self.$store.dispatch('getMainBusiness', '/account');
            var str = this.$route.query.value;
            _self.arr = str.split(',');
        }
        common.$on('perfectidToMajorBusiness', function (id) {
            _self.$store.dispatch('clearRouter');
            for (var i = 0; i < _self.todos.length; i++) {
                _self.todos[i].show = false;
            }
            _self.arr = [];
        })
        common.$on('accountTomajorBusiness', function (item) { //来自个人账户页面主营品种，处理缓存问题
            _self.$store.dispatch('getMainBusiness', '/account');
            if (item) {
                _self.arr = item.split(',');
                _self.hotDrug();
            }
        })
        _self.hotDrug();
    },
    computed: {
        mainBusiness() {
            return this.$store.state.user.mainBusiness;
        },
        userInfor() {
            return this.$store.state.user.userInfor;
        },
        backRouter() {
            return this.$store.state.user.backRouter.router;
        }
    },
    methods: {
        hotDrug() {
            let _self = this;
            common.$emit('show-load');
            httpService.hotSearch(common.urlCommon + common.apiUrl.most, {
                biz_module: 'searchKeywordService',
                biz_method: 'queryHotKeyword',
                biz_param: {
                    pn: 1,
                    pSize: 20
                }
            }, function (suc) {
                common.$emit('close-load');
                let result = suc.data.biz_result.list;
                if (suc.data.code == '1c01') {
                    console.log(_self.arr.length)
                    for (var i = 0; i < result.length; i++) {
                        result[i].show = false;
                        if (_self.arr.length > 0) {
                            for (var j = 0; j < _self.arr.length; j++) {
                                if (result[i].keyWord == _self.arr[j]) {
                                    result[i].show = true;
                                }
                            }
                        }
                    }
                    _self.todos = result;
                } else {
                    common.$emit('message', suc.data.msg);
                }
            }, function (err) {
                common.$emit('close-load');
                common.$emit('message', err.data.msg);
            })
        },
        back() {
            window.history.go(-1);
        },
        next() {
            let _self = this;
            this.register = true;
            var str = '';
            for (var i = 0; i < _self.arr.length; i++) {
                if (i == 0) str = _self.arr[0];
                if (i !== 0) str = str + ',' + _self.arr[i];
            }
            _self.upDataInfor.bizMain = str;
            this.getVal()
        },
        goAccout() {
            let _self = this;
            var str = '';
            if (_self.mainBusiness.router == '/account') {
                for (var i = 0; i < _self.arr.length; i++) {
                    if (i == 0) str = _self.arr[0];
                    if (i !== 0) str = str + ',' + _self.arr[i];
                }
                _self.getVal(str);
            }
        },
        clear() {
            let _self = this;
            _self.value = '';
            _self.datas = [];
        },
        selected(todo) {
            let _self = this;
            if (_self.datas.length == 0) {
                if (_self.arr.length < 10) {
                    todo.show = !todo.show;
                    if (todo.show) _self.arr.push(todo.keyWord);
                    if (!todo.show) {
                        for (var i = 0; i < _self.arr.length; i++) {
                            if (_self.arr[i] == todo.keyWord) {
                                _self.arr.splice(i, 1);
                            }
                        }
                    }
                } else {
                    common.$emit('message', '您选择的品种已经超过十个！')
                }
            }

        },
        getSearch(todo) {
            let _self = this;
            _self.datas = [];
            _self.value = '';
            if (_self.arr.length < 10) {
                for (var i = 0; i < _self.arr.length; i++) {
                    if (_self.arr[i] == todo.breedName) {
                        common.$emit('message', '请不要重复选择同一个品种！')
                        return
                    }
                }
                _self.arr.push(todo.breedName);
            } else {
                common.$emit('message', '您选择的品种已经超过十个！')
            }

        },
        clearArr(todo) {
            let _self = this;
            for (var i = 0; i < _self.arr.length; i++) {
                if (_self.arr[i] == todo) {
                    _self.arr.splice(i, 1);
                }
            }
            for (var j = 0; j < _self.todos.length; j++) {
                if (_self.todos[j].keyWord == todo) {
                    _self.todos[j].show = false;
                }
            }

        },
        getVal(param) {
            let _self = this;
            let obj = {
                bizMain: _self.upDataInfor.bizMain,
                userType: localStorage.getItem('userType'),
                manageType: localStorage.getItem('manageType')
            }
            if (!_self.register) {
                for (var key in _self.upDataInfor) {
                    if (key == 'bizMain') {
                        _self.upDataInfor['bizMain'] = param;
                    } else {
                        _self.upDataInfor[key] = _self.userInfor[key];
                    }
                }
            }
            console.log(12, _self.upDataInfor, _self.userInfor)
            //校验
            let checkArr = [];
            let checkBizMain = validation.checkNull(_self.upDataInfor.bizMain, '主营品类不能为空！');
            checkArr.push(checkBizMain);
            for (let i = 0; i < checkArr.length; i++) {
                if (checkArr[i]) {
                    common.$emit('message', checkArr[i]);
                    return
                }
            }
            if (_self.mainBusiness.router == '/account') {
                _self.$store.dispatch('upDataInfor', this.upDataInfor).then(res => {
                	 common.$emit('message', res.data.msg);
                    window.history.go(-1)
                }), (() => {
                    common.$emit('message', '更新失败');
                })
            } else {
                _self.$store.dispatch('upDataInfor', obj).then(res => {
                	 common.$emit('message', res.data.msg);
                    if (obj.userType == 2 || obj.userType == 3) {
                        _self.popup = true;
                    } else {
                        _self.popup = false;
                        _self.$router.push('/home')
                    }


                }), (() => {
                    common.$emit('message', '更新失败');
                })
                localStorage.removeItem('userType');
                localStorage.removeItem('manageType');
            }
        },
        goNeed() {
            let _self = this;
            console.log(1, _self.arr)
            let type = '';
            let keyString = '';
            for (var i = 0; i < _self.arr.length; i++) {
                if (i == 0) type = _self.arr[0];
                if (i != 0) type = type + ',' + _self.arr[i];
                if (i == 0) keyString = _self.arr[0];
                if (i == 1) keyString = keyString + ',' + _self.arr[1];
                if (i >= 2) keyString = keyString + '...';
            }
            common.$emit('setParam', 'majorBusiness', 'urgent');
            common.$emit('setParam', 'backHome', true);
            common.$emit('Urgentneed', {
                keyWord: '',
                keyWordList: _self.arr,
                keyWordString: keyString,
                listShow: true
            })
            console.log(11, type);
            _self.popup = false;
            _self.$router.push('/urgentNeed?type=' + type);
        },
        goHome() {
            let _self = this;
            _self.$router.push('/home');
        }
    },
    watch: {
        value: function (newValue, oldValue) {
            let _self = this;

            window.clearTimeout(this.time);
            this.time = setTimeout(() => {
                common.$emit('show-load');
                let body = {
                    biz_module: 'searchKeywordService',
                    biz_method: 'querySearchKeywordBreed',
                    biz_param: {
                        keyWord: _self.value,
                        pn: 1,
                        pSize: 20
                    }
                }
                httpService.searchWord(common.urlCommon + common.apiUrl.most, body, function (suc) {
                    common.$emit('close-load');
                    let result = suc.data.biz_result.list;
                    if (suc.data.code == '1c01') {
                        _self.datas = result;
                    } else {

                    }
                }, function (err) {
                    common.$emit('close-load');
                    common.$emit('message', err.data.msg);
                })
            }, 300)
        }
    },
    mounted() {
        // this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
        //this.wrapperHeight = window.screen.height - this.$refs.wrapper.getBoundingClientRect().top;
    }
}
</script>
