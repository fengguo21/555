//import httpService from '../../common/httpService.js'
//import common from '../../common/common.js'
//
//const state = {
//	orderList: ''
//}
//
//// getters
//const getters = {
//	orderList: state => state.orderList,
//}
//
//// actions
//const actions = {
//	getOrderList({
//		commit,
//		state
//	}) { //获取物流
//		return new Promise((resolve, reject) => { //
//			common.$emit('show-load');
//			let url = common.addSID(common.urlCommon + common.apiUrl.most);
//			let body = {
//				biz_module: 'orderService',
//				biz_method: 'queryCountOrderStatus',
//				biz_param: {
//
//				}
//			};
//			body.time = Date.parse(new Date()) + parseInt(common.difTime);
//			body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
//			httpService.cart(url, body,
//				function(res) {
//
//					common.$emit('close-load');
//					commit('getOrderList', res);
//					resolve(res);
//				},
//				function(err) {
//					common.$emit('close-load');
//					reject(err);
//				})
//		})
//	},
//}
//
//// mutations
//const mutations = {
//	getOrderList(state, data) {
//		let arr = data.body.biz_result.list;
//		let entrance = [{
//			name: '受理中',
//			router: 'myOrder',
//			img_src: '/static/icon/new/pending.png',
//			total: ''
//		}, {
//			name: '待付款',
//			router: '',
//			img_src: '/static/images/Pending-payment.png',
//			total: ''
//		}, {
//			name: '待发货',
//			router: '',
//			img_src: '/static/icons/out-goods.png',
//			total: ''
//		}, {
//			name: '待收货',
//			router: '',
//			img_src: '/static/icons/receipt.png',
//			total: ''
//		}]
//		for(var i = 0; i < arr.length; i++) {
//			if(arr[i].total) entrance[i].total = arr[i].total;
//		}
//		state.orderList = entrance
//	}
//}
//
//export default {
//	state,
//	getters,
//	actions,
//	mutations
//}