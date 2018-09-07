import httpService from '../../common/httpService.js'
import common from '../../common/common.js'
var data = [{
	"breedname": "天南星",
	"price": "22",
	"unit": "公斤",
	"number": "10",
	"location": "吉林",
	"value": "2",
	"url": "/static/images/1.jpg"
}, {
	"breedname": "白芷",
	"price": "32",
	"unit": "斤",
	"number": "50",
	"value": "6",
	"location": "河南",
	"url": "/static/images/1.jpg"
}, {
	"breedname": "玫瑰",
	"price": "13",
	"unit": "两",
	"number": "33",
	"value": "3",
	"location": "云南",
	"url": "/static/images/1.jpg"
}, {
	"breedname": "玫瑰",
	"price": "13",
	"unit": "两",
	"number": "33",
	"value": "3",
	"location": "云南",
	"url": "/static/images/1.jpg"
}]
//三种方式改变商品数量时候调用的公共函数
function upDate(params) {

	let url = common.addSID(common.urlCommon + common.apiUrl.most);
	let body = {
		biz_module: 'cartService',
		biz_method: 'updateCartNumber',
		biz_param: {
			id: params.state.cartList[params.index].cartId,
			number: params.number
		}
	};
	body.time = Date.parse(new Date()) + parseInt(common.difTime);
	body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
	httpService.cart(url, body,
		function(res) {

		},
		function(err) {

		})
}
const state = {
	cartList: [
		/*{
		        show: false
		    }, {
		        show: false
		    }, {
		        show: false
		    }*/
	],
	http_praram: {
		page: 1,
		pageSize: 20
	},
	all_price: 0,
	headParam: {
		name: '购物车',
		show: true,
		t_show: false
	},
	all_show: false,
	order_num: 0, //选中订单个数
	cart_num: 0
}

// getters
const getters = {
	cart: state => state.cartList,
	price: state => state.all_price,
	headParam: state => state.headParam,
	allShow: state => state.allShow,
	orderNum: state => state.order_num,
	httpPraram: state => state.http_praram
}

// actions
const actions = {
	getHttp({
		commit,
		state
	}) { //初始状态调用接口
		return new Promise((resolve, reject) => { //
			common.$emit('show-load');
			let url = common.addSID(common.urlCommon + common.apiUrl.most);
			let body = {
				biz_module: 'intentionService',
				biz_method: 'cartIntentionList',
				biz_param: {
					pn: state.http_praram.page,
					pageSize: state.http_praram.pageSize
				}
			};
			body.time = Date.parse(new Date()) + parseInt(common.difTime);
			body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
			httpService.cart(url, body,
				function(res) {
					console.log(res)
					common.$emit('close-load');
					let datas = res.data.biz_result.list;
					let data = [];
					for(let i = 0; i < datas.length; i++) {
						var img = new Image();
						img.src = datas[i].image[0];
						var imgSize = {
							width: img.width,
							height: img.height
						};
						datas[i].imgsize = imgSize;
						data.push(datas[i]);
					}
					commit('GET_HTTP', data);
					resolve(res);
				},
				function(err) {
					common.$emit('close-load');
					reject(err);
				})
		})
	},
	hideAllShow({
		commit,
		state
	}) {
		commit('HIDE_ALL_SHOW');
	},
	updateCartNumber({
		commit,
		state
	}) {

	},
	showOrder({
		commit,
		state
	}, index) { //单个商品选中
		commit('SHOW_ORDER', index);
		commit('ALL_PRICE')
	},
	hideOrder({
		commit,
		state
	}, index) { //取消单个商品选中
		commit('HIDE_ORDER', index);
		commit('ALL_PRICE')
	},
	addOrderNum({
		commit,
		state
	}, index) { //增加商品数量
		return new Promise((resolve, reject) => {
			let number = state.cartList[index].cartNumber;
			if(!state.cartList[index].cartSample) {
				if(state.cartList[index].cartNumber < state.cartList[index].number) {
					number = Number(state.cartList[index].cartNumber) + 1;
					commit('ADD_NUM', {
						index: index,
						number: number
					});
					commit('ALL_PRICE')
				} else {
					common.$emit('message', '不能再增加了哦')
				}
			} else {
				if(number < state.cartList[index].sampleNumber) {
					number = Number(state.cartList[index].cartNumber) + 1;
					commit('ADD_NUM', {
						index: index,
						number: number
					});
					commit('ALL_PRICE')
				} else {
					common.$emit('message', '不能再增加了哦')
				}
			}
			upDate({
				state: state,
				index: index,
				number: number
			});

		})
	},
	cutOrderNum({
		commit,
		state
	}, index) { //减少商品数量
		return new Promise((resolve, reject) => {
			let number = state.cartList[index].cartNumber;
			console.log(99, state.cartList[index]);
			if(!state.cartList[index].cartSample) {
				if(number > state.cartList[index].moq) {
					number = number - 1;
				} else {
					common.$emit('message', '不能再减少了哦')
				}
			} else {
				if(number > 1) {
					number = number - 1;
				} else {
					common.$emit('message', '不能再减少了哦')
				}
			}
			commit('CUT_NUM', {
				index: index,
				number: number
			});
			commit('ALL_PRICE');
			upDate({
				state: state,
				index: index,
				number: number
			});
		})

	},
	allOrderShow({
		commit,
		state
	}) { //所有商品全部选中
		commit('ALL_ORDER_SHOW')
		commit('ALL_PRICE')
	},
	allOrderHide({
		commit,
		state
	}) { //所有商品都不选中
		commit('ALL_ORDER_HIDE')
		commit('ALL_PRICE')
	},
	compileHead({
		commit,
		state
	}) {
		commit('COMPILE_HEAD', state)
	},
	finishHead({
		commit,
		state
	}) {
		commit('FINISH_HEAD', state)
	},
	changeValue({
		commit,
		state
	}, param) { //手输入改变数量
		//console.log(param)
		return new Promise((resolve, reject) => {
			let pattern = /^[1-9]\d*$/;
			if(pattern.test(param.value)) {
				/*state.cartList[param.index].cartNumber = Number(param.value);*/
				if(!state.cartList[param.index].cartSample) { //是大货的时候
					if(param.value <= state.cartList[param.index].number && param.value >= state.cartList[param.index].moq) {
						param.value = Number(param.value);
						commit('CHANGE_VALUE', {
							index: param.index,
							number: param.value
						})
						commit('ALL_PRICE')
					} else if(param.value > state.cartList[param.index].number) {
						param.value = Number(state.cartList[param.index].number);
						commit('CHANGE_VALUE', {
							index: param.index,
							number: param.value
						})
						commit('ALL_PRICE')
					} else if(param.value < state.cartList[param.index].moq) {
						param.value = Number(state.cartList[param.index].moq);
						commit('CHANGE_VALUE', {
							index: param.index,
							number: param.value
						})
						commit('ALL_PRICE')
					}
				} else { //是样品的时候
					if(param.value <= state.cartList[param.index].sampleNumber) {
						param.value = Number(param.value);
						commit('CHANGE_VALUE', {
							index: param.index,
							number: param.value
						})
						commit('ALL_PRICE')
					} else {
						param.value = Number(state.cartList[param.index].sampleNumber);
					}
				}
				upDate({
					state: state,
					index: param.index,
					number: param.value
				});

			} else {

			}

		})
	},
	allPrice({
		commit,
		state
	}) { //总价
		commit('ALL_PRICE')
	},
	deteCart({
		commit,
		state
	}, param) {
		return new Promise((resolve, reject) => {

			common.$emit('show-load');
			let url = common.addSID(common.urlCommon + common.apiUrl.most);
			let body = {
				biz_module: 'cartService',
				biz_method: 'deleteCartList',
				biz_param: {
					cartList: [param.id]
				}
			};
			body.time = Date.parse(new Date()) + parseInt(common.difTime);
			body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
			httpService.cart(url, body,
				function(res) {
					common.$emit('close-load');
					if(res.data.biz_result.code = '1c01') {
						commit('DETE_CART', param);
						commit('ALL_PRICE')
						//commit('GET_HTTP')
					}

				},
				function(err) {
					common.$emit('close-load');
					reject(err);
				})
		})

	},
	deteAllCart({
		commit,
		state
	}) {
		return new Promise((resolve, reject) => {
			let arr = [];
			for(var i = 0; i < state.cartList.length; i++) {
				//console.log(state.cartList[i].show)

				if(state.cartList[i].show && state.cartList[i].onSell == 2) {
					arr.unshift(state.cartList[i].cartId)
				}
			}
			common.$emit('show-load');
			let url = common.addSID(common.urlCommon + common.apiUrl.most);
			let body = {
				biz_module: 'cartService',
				biz_method: 'deleteCartList',
				biz_param: {
					cartList: arr
				}
			};
			body.time = Date.parse(new Date()) + parseInt(common.difTime);
			body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
			httpService.cart(url, body,
				function(res) {
					common.$emit('close-load');
					commit('DETE_ALL_CART');
					resolve(res);
					commit('GET_HTTP')
					commit('ALL_PRICE');
				},
				function(err) {
					common.$emit('close-load');
					reject(err);
				})
		})

	}
}

// mutations
const mutations = {
	GET_HTTP(state, data) {

		let n = 0;
		var loseArr = [];
		var useArr = [];
		var arr = [];
		for(var i = 0; i < data.length; i++) { //处理失效的排序问题
			if(data[i].onSell !== 2) {
				loseArr.push(data[i])
			} else {
				useArr.push(data[i])
			}
		}
		arr = useArr.concat(loseArr)
		for(var i = 0; i < arr.length; i++) {
			arr[i].show = false;
			if(arr[i].onSell !== 2) {
				n += 1;
			}
		}
		state.all_price = 0;
		state.all_show = false;
		state.order_num = 0;
		state.cart_num = arr.length - n;
		state.cartList = arr;

	},
	HIDE_ALL_SHOW(state) {
		state.all_show = false;
	},
	SHOW_ORDER(state, index) {
		state.cartList[index].show = true;
		let j = 0;
		let n = 0;
		for(var i = 0; i < state.cartList.length; i++) {
			//记录失效的数量
			if(state.cartList[i].onSell !== 2) {
				n += 1;
			}
			if(state.cartList[i].show) {
				j += 1;
			}
		}
		if(j == state.cartList.length - n) {
			state.all_show = true;
		}
	},
	HIDE_ORDER(state, index) {
		state.cartList[index].show = false;
		state.all_show = false;
		/*let j = 0
		for (var i = 0; i < state.cartList.length; i++) {
		    if (!state.cartList[i].show) {
		        j += 1;
		        if (j == state.cartList.length) {
		            state.all_show = false;
		        }
		    }
		}*/

	},
	ADD_NUM(state, params) {
		/* if (!state.cartList[index].cartSample) {
		     if (state.cartList[index].cartNumber < state.cartList[index].number) {
		         state.cartList[index].cartNumber = Number(state.cartList[index].cartNumber) + 1;
		         upDate(state, index);
		     }
		 } else {
		     if (state.cartList[index].cartNumber < state.cartList[index].sampleNumber) {
		         state.cartList[index].cartNumber = Number(state.cartList[index].cartNumber) + 1;
		         upDate(state, index);
		     }
		 }*/
		state.cartList[params.index].cartNumber = params.number;

	},
	CUT_NUM(state, params) {
		/* if (state.cartList[index].cartNumber > 1) {
		     state.cartList[index].cartNumber = Number(state.cartList[index].cartNumber) - 1;
		     upDate(state, index);
		 }*/
		state.cartList[params.index].cartNumber = params.number;

	},
	CHANGE_VALUE(state, params) { //手动改变商品数量
		state.cartList[params.index].cartNumber = params.number;
	},
	COMPILE_HEAD(state) {
		state.headParam.show = false;
		state.headParam.t_show = true;
	},
	FINISH_HEAD(state) {
		state.headParam.show = true;
		state.headParam.t_show = false;
	},
	DETE_CART(state, param) {
		state.cartList.splice(param.index, 1)
		state.order_num = 0;
		let n = 0;
		if(state.cartList.length == 0) state.all_show = false;
		for(var i = 0; i < state.cartList.length; i++) {
			if(state.cartList[i].onSell !== 2) {
				n++
			}
		}
		state.cart_num = state.cartList.length - n;
	},
	DETE_ALL_CART(state, arr) {
		console.log(state.cartList)
		let Arr = [];
		let n = 0;
		for(var i = 0; i < state.cartList.length; i++) {
			if(!state.cartList[i].show || state.cartList[i].onSell !== 2) {
				Arr.unshift(state.cartList[i]);
			}
		}
		state.cartList = Arr;
		if(state.cartList.length == 0) state.all_show = false;
		for(var i = 0; i < state.cartList.length; i++) {
			if(state.cartList[i].onSell !== 2) {
				n++
			}
		}
		state.cart_num = state.cartList.length - n;
	},
	ALL_PRICE(state) {
		state.all_price = 0;
		state.order_num = 0;
		let sample_price = 0;
		let big_price = 0;
		console.log(11, state.cartList)
		for(var i = 0; i < state.cartList.length; i++) {
			console.log(state.cartList[i].show)
			if(state.cartList[i].show && state.cartList[i].onSell == 2) {

				state.order_num += 1;
				if(state.cartList[i].cartSample == 0) big_price += Number(state.cartList[i].cartNumber) * Number(state.cartList[i].price);
				if(state.cartList[i].cartSample == 1) sample_price += Number(state.cartList[i].cartNumber) * Number(state.cartList[i].sampleAmount);
				//console.log(state.all_price)
			}
		}
		state.all_price = (big_price + sample_price).toFixed(2);
		console.log(22, state.all_price);
	},
	ALL_ORDER_SHOW(state) {
		state.all_show = true;
		for(var i = 0; i < state.cartList.length; i++) {
			state.cartList[i].show = true;
		}

	},
	ALL_ORDER_HIDE(state) {
		state.all_show = false;
		for(var i = 0; i < state.cartList.length; i++) {
			state.cartList[i].show = false;
		}

	}
}

export default {
	state,
	getters,
	actions,
	mutations
}