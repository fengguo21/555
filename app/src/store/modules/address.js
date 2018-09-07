import httpService from '../../common/httpService.js'
import common from '../../common/common.js'

const state = {
	logistics: ''
}

// getters
const getters = {
	logistics: state => state.logistics,
}

// actions
const actions = {
	getLogistics({
		commit,
		state
	}) { //获取物流
		return new Promise((resolve, reject) => { //
			common.$emit('show-load');
			let url = common.addSID(common.urlCommon + common.apiUrl.most);
			let body = {
				biz_module: 'logisticsService',
				biz_method: 'queryCurrentLogisticsInfo',
				biz_param: {

				}
			};
			body.time = Date.parse(new Date()) + parseInt(common.difTime);
			body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
			httpService.cart(url, body,
				function(res) {

					common.$emit('close-load');
					commit('getLogistics', res);
					resolve(res);
				},
				function(err) {
					common.$emit('close-load');
					reject(err);
				})
		})
	},
}

// mutations
const mutations = {
	getLogistics(state, data) {
		state.logistics = data.body.biz_result;
	}
}
export default {
	state,
	getters,
	actions,
	mutations
}