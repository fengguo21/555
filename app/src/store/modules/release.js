import httpService from '../../common/httpService.js'
import common from '../../common/common.js'


const state = {
    needRelease: '',
    customerInfor: {
        name: '',
        phone: ''
    }
}

// getters
const getters = {
    needRelease: state => state.needRelease,
    customerInfor: state => state.customerInfor,
}

// actions
const actions = {
    getReleaseInfor({ commit, state }, id) { //初始状态调用接口
        return new Promise((resolve, reject) => { //
            common.$emit('show-load');
            let url = common.addSID(common.urlCommon + common.apiUrl.most);
            let body = {
                biz_module: 'intentionService',
                biz_method: 'queryIntentionInfo',
                biz_param: {
                    id: id
                }
            };
            body.time = Date.parse(new Date()) + parseInt(common.difTime);
            body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
            httpService.cart(url, body,
                function(res) {
                    common.$emit('close-load');
                    commit('getReleaseInfor', res);
                    resolve(res);
                },
                function(err) {
                    common.$emit('close-load');
                    reject(err);
                })
        })
    },
    getCustomer({ commit, state }, param) {
        commit('getCustomer', param);
    }

}

// mutations
const mutations = {
    getReleaseInfor(state, res) {
        state.needRelease = res.data.biz_result;
    },
    getCustomer(state, param) {
        state.customerInfor.name = param.name;
        state.customerInfor.phone = param.phone;
    }

}

export default {
    state,
    getters,
    actions,
    mutations
}
