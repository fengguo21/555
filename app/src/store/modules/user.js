import * as store  from '../../common/localStore.js'
import httpService from '../../common/httpService.js'
import common from '../../common/common.js'

//三种方式改变商品数量时候调用的公共函数
const state = {
    userInfor: {},
    /*accountHead: ''*/
    areaJson: {},
    mainBusiness: {
        router: '',
        main: ''
    },
    backRouter: {
        router: '',
        back: '',
        id: ''
    },
    isRead: 1,
    resourceAttention: '',
    customInfor: ''
}

// getters
const getters = {
    userInfor: state => state.userInfor,
    backRouter: state => state.backRouter,
    mainBusiness: state => state.mainBusiness,
    areaJson: state => state.areaJson,
    resourceAttention: state => state.resourceAttention,
    customInfor: state => state.customInfor
}

// actions
const actions = {
    getUserInfor({ commit, state }) { //初始状态调用接口
        return new Promise((resolve, reject) => {
            //
            common.$emit('show-load');
            let url = common.addSID(common.urlCommon + common.apiUrl.most);
            let body = {
                biz_module: 'userService',
                biz_method: 'queryUserInfo',
                biz_param: {

                }
            };
            body.time = Date.parse(new Date()) + parseInt(common.difTime);
            console.log(Date.parse(new Date()) + parseInt(common.difTime))
            body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
            httpService.cart(url, body,
                function(res) {
//                  console.log(res)
                    common.$emit('close-load');
                    commit('getUserInfor', res);
                    store.set('me',res.data.biz_result)
                    console.log(res)
                    resolve(res);
                },
                function(err) {
                    common.$emit('close-load');
                    reject(err);
                })
        })
    },
    isAttention({ commit, state }, param) {
        commit('isAttention', param)
    },
    upDataInfor({ commit, state }, params) {
        return new Promise((resolve, reject) => { //
            common.$emit('show-load');
            let url = common.addSID(common.urlCommon + common.apiUrl.most);
            let body = {
                biz_module: 'userService',
                biz_method: 'updateUserInfo',
                biz_param: params
            };
            body.time = Date.parse(new Date()) + parseInt(common.difTime);
            body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
            httpService.cart(url, body,
                function(res) {
                    common.$emit('close-load');
//                  common.$emit('message', res.data.msg);
                    if (res.data.code == '1c01') {
                        commit('upDataInfor', params);
                    }
                    resolve(res);
                },
                function(err) {
                    common.$emit('close-load');
                    common.$emit('message', err.data.msg);
                    reject(err);
                })
        })
    },
    checkName({ commit, state }, params) {
        return new Promise((resolve, reject) => { //
            common.$emit('show-load');
            let url = common.addSID(common.urlCommon + common.apiUrl.most);
	        let body = {
					biz_module: 'userService',
					biz_method: 'updateCheckUserName',
					biz_param: {
						name:params,
					},
				};
            body.time = Date.parse(new Date()) + parseInt(common.difTime);
            body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
            httpService.cart(url, body,
                function(res) {
                    common.$emit('close-load');
//                  common.$emit('message', res.data.msg);
                    if (res.data.code == '1c01') {
                        commit('checkName', params);
                    }
                    resolve(res);
                },
                function(err) {
                    common.$emit('close-load');
                    common.$emit('message', err.data.msg);
                    reject(err);
                })
        })
    },
    clearUserInfor({ commit, state }) {
        commit('clearUserInfor');
    },
    getAreaJson({ commit, state }) {
        return new Promise((resolve, reject) => { //
            common.$emit('show-load');
            let url = common.urlCommon + common.apiUrl.most;
            let body = {
                biz_module: 'locationService',
                biz_method: 'queryLocationList'
            };
            body.time = Date.parse(new Date()) + parseInt(common.difTime);
            body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
            httpService.cart(url, body,
                function(res) {
                    common.$emit('close-load');
                    if (res.data.code == '1c01') {
                        common.getAddress = false;
                        console.log(99, res.body.biz_result.list)
                        commit('getAreaJson', res);
                    }
                    resolve(res);
                },
                function(err) {
                    common.$emit('close-load');
                    reject(err);
                })
        })
    },
    getMainBusiness({ commit, state }, params) {
        commit('getMainBusiness', params);
    },
    clearRouter({ commit, state }) {
        commit('clearRouter');
    },
    changeRouter({ commit, state }, params) {
        commit('changeRouter', params)
    },
    clearChangeRouter({ commit, state }) {
        commit('clearChangeRouter')
    },
    getMessage({ commit, state }) {
        let _self = this;
        common.$emit('show-load');
        let url = common.addSID(common.urlCommon + common.apiUrl.most);
        let body = {
            biz_module: 'pushService',
            biz_method: 'showIsRead',
            biz_param: {

            }
        };
        body.time = Date.parse(new Date()) + parseInt(common.difTime);
        body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
        httpService.myResource(url, body, function(suc) {
            common.$emit('close-load');

            if (suc.data.code == '1c01') {
                let isMessage = suc.data.biz_result.isRead;

                commit('getMessage', isMessage);
            } else {
                common.$emit('message', suc.data.msg);
            }

        }, function(err) {
            common.$emit('close-load');
            common.$emit('message', err.data.msg);
        })
    },
    defaultMessage({ commit, state }) {
        commit('defaultMessage')
    },
    getCustom({ commit, state }) {
        let _self = this;
        common.$emit('show-load');
        let url = common.addSID(common.urlCommon + common.apiUrl.most);
        let body = {
            biz_module: 'userService',
            biz_method: 'queryEmployeeInfo',
            biz_param: {

            }
        };
        body.time = Date.parse(new Date()) + parseInt(common.difTime);
        body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
        httpService.queryEmployeeInfo(url, body, function(suc) {
            common.$emit('close-load');
            if (suc.data.code == '1c01') {
                let data = suc.data.biz_result;
                console.log(11, data)
                commit('getCustom', data)
            }
        }, function(err) {
            common.$emit('close-load');
        })
    }

}

// mutations
const mutations = {
    getUserInfor(state, res) {
        state.userInfor = res.data.biz_result;
     console.log('xxx',state.userInfor)
    },
    upDataInfor(state, res) {
        for (var key in res) {
            state.userInfor[key] = res[key];
            let me = Object.assign(store.get('me'),res)
            store.set('me',me)
            console.log('uupdate=================')
        }
    },
    checkName(state, res) {
        for (var key in res) {
            state.userInfor[key] = res[key];
        }
    },
    clearUserInfor(state) {
        state.userInfor = {}
    },
    getMainBusiness(state, params) {
        state.mainBusiness.router = '/account';
        state.mainBusiness.main = params.main;
    },
    clearRouter(state) {
        state.mainBusiness.router = '';
    },
    getAreaJson(state, res) { //暂时不用
        //state.areaJson = res.body.biz_result.list;
        let area = res.body.biz_result.list;
        let province = [];
        let city = [];
        let county = [];
        for (var i = 0; i < area.length; i++) {
            var ps = {};
            ps.value = area[i].cname;
            ps.id = area[i].id;
            ps.parentId = 0;
            province.push(ps);
            for (var j = 0; j < area[i].childList.length; j++) {
                var cs = {};
                cs.value = area[i].childList[j].cname;
                cs.id = area[i].childList[j].id;
                cs.parentId = area[i].childList[j].pid;
                city.push(cs);
                for (var k = 0; k < area[i].childList[j].childList.length; k++) {
                    var ds = {};
                    ds.value = area[i].childList[j].childList[k].cname;
                    ds.id = area[i].childList[j].childList[k].id;
                    ds.parentId = area[i].childList[j].childList[k].pid;
                    county.push(ds)
                }
            }
        }
        state.areaJson = {
            province: province,
            city: city,
            county: county
        }


    },
    changeRouter(state, params) {
        console.log(44, params.index)
        switch (params.index) {
            case 1:
                state.backRouter.router = '/releaseNeeds/1';
                state.backRouter.back = '/home';
                break;
            case 2:
                state.backRouter.router = '/releaseResource/1';
                state.backRouter.back = '/home';
                break;
            case 3:
                state.backRouter.router = '/releaseOffer/' + params.id;
                state.backRouter.back = '/urgentNeed';
                break;
            case 4:
                state.backRouter.router = '/resourceDetail/' + params.id;
                state.backRouter.back = '/lowPriceRes';
                break;
        }
    },
    clearChangeRouter(state) {
        state.backRouter.router = '';
        state.backRouter.back = '';
        state.backRouter.id = '';
    },
    getMessage(state, isMessage) {

        state.isRead = isMessage;
    },
    defaultMessage(state) {
        state.isRead = 1;
    },
    isAttention(state, param) {
        state.resourceAttention = param;
    },
    getCustom(state, param) {
        state.customInfor = param;
    }

}

export default {
    state,
    getters,
    actions,
    mutations
}