import httpService from '../../common/httpService.js'
import common from '../../common/common.js'


const state = {
    selectOfferList: '',
    selectOfferNum: '',
    allOfferSelect: true,

}

// getters
const getters = {
    selectOfferList: state => state.selectOfferList,
    selectOfferNum: state => state.selectOfferNum,
    allOfferSelect: state => state.allOfferSelect,
}

// actions
const actions = {
        //获取一件报价列表数据
        getSelectOffer({ commit, state }, offerId) {
            return new Promise((resolve, reject) => {
                common.$emit('show-load');
                let url = common.addSID(common.urlCommon + common.apiUrl.most);
                let body = {
                    biz_module: 'intentionService',
                    biz_method: 'sameTypeIntentionOfferList',
                    biz_param: {
                        offerId: offerId,
                        pn: 1,
                        pageSize: 20
                    }
                };
                body.time = Date.parse(new Date()) + parseInt(common.difTime);
                body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
                httpService.cart(url, body,
                    function(res) {
                        common.$emit('close-load');
                        //console.log(res);
                        let data = res.data.biz_result.list;
                        commit('getSelectOffer', data)
                        resolve(res);
                    },
                    function(err) {
                        common.$emit('close-load');
                        reject(err);
                    })
            })
        },
        changeSelectOfferNum({ commit, state }, param) {
            return new Promise((resolve, reject) => {
                commit('changeSelectOfferNum', param)
            })
        },
        allSelectOfferNum({ commit, state }) {
            return new Promise((resolve, reject) => {
                commit('allSelectOfferNum')
            })
        },

    }
    // mutations
const mutations = {
    getSelectOffer(state, param) {
        console.log(789, param)
        for (var i = 0; i < param.length; i++) {
            param[i].show = true;
        }
        state.allOfferSelect = true;
        state.selectOfferList = param;
        state.selectOfferNum = param.length;
    },
    changeSelectOfferNum(state, param) {
        let n = 0;
        let arr = state.selectOfferList;
        arr[param].show = !arr[param].show;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].show) {
                n++
            }
        }
        console.log(param)
        console.log(n, arr.length)
        if (n == arr.length) {
            state.allOfferSelect = true;
            if (n == 0) state.allOfferSelect = false;
        } else {
            state.allOfferSelect = false;
        }
        state.selectOfferList = arr;
        state.selectOfferNum = n;
    },
    allSelectOfferNum(state) {
        if (state.allOfferSelect) {
            let arr = state.selectOfferList;
            for (var i = 0; i < arr.length; i++) {
                arr[i].show = false;
            }
            state.selectOfferList = arr;
            state.allOfferSelect = false;
            state.selectOfferNum = 0;
        } else {
            let arr = state.selectOfferList;
            for (var i = 0; i < arr.length; i++) {
                arr[i].show = true;
            }
            state.selectOfferList = arr;
            state.allOfferSelect = true;
            state.selectOfferNum = arr.length;
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}